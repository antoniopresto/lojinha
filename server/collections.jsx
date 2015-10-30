Configs = new Mongo.Collection('configs');
Produtos = new Mongo.Collection('produtos');
Posts = new Mongo.Collection('posts');

IMAGE_BASE_URL = (process.env.S3_BUCKET) ? S3_BASE_URL : CFS_BASE_URL;

let fileNameSufix = 'presto';

let transformWrite = function(fileObj, readStream, writeStream) {
    gm(readStream).resize(700).stream('JPG').pipe(writeStream);
};

let fileKeyMaker = function (fileObj) {
    // Lookup the copy
    var store = fileObj && fileObj._getInfo('images');
    // If the store and key is found return the key
    if (store && store.key) return store.key;

    let prefix = `${parseInt(Math.random()*999*999)}-${fileNameSufix}`;

    var originalName = fileObj.name() || '';
    let extension = (originalName.match(/\.(.{1,5})$/g) || [])[0];
    let filename = prefix + extension;

    // If no store key found we resolve / generate a key
    let _re =  fileObj.collectionName + '/' + fileObj._id + '-' + filename;

    if(Meteor.isDev) console.log({fileKeyMaker: _re});

    return _re;
};

//S3 Store config
let s3Store = process.env.S3_BUCKET && new FS.Store.S3("images", {
    region: process.env.S3_REGION || "sa-east-1",
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_KEY,
    bucket: process.env.S3_BUCKET,
    ACL: process.env.S3_ACL || "public-read",
    fileKeyMaker,
    transformWrite
});

let imageStore = s3Store || new FS.Store.GridFS("images", {
        fileKeyMaker,
        transformWrite
});

Images = new FS.Collection("images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

////////////// Hooks & Helpers ///////////////////////
///
let fsImages = function() {
    subsManager.subscribe('images', this._id);
    return Images.find({
        pid: this._id
    }).fetch();
};

Produtos.helpers({
    fsImages
});
Posts.helpers({
    fsImages
});

let handlePostImageChange = function(uid, doc) {
    if (Meteor.isDev)
        console.log(doc, ' imagem alterada')
    if (doc.pid) {
        //apenas uma img por post - (to improve!)
        Images.remove({pid: doc.pid,_id: {$ne: doc._id}});

        let url = '/img/uploading.gif';

        // doc é apenas uma copia do objeto,
        // para acessar o helper é necessário um findOne
        if(doc.copies){
            url = IMAGE_BASE_URL +'/'+Images.findOne(doc._id)._getInfo('images').key;
        }

        let query = {
            $set: {
                imageIds: [doc._id],
                images: [url]
            }
        };

        if(Meteor.isDev) console.log({url});

        Posts.update(doc.pid, query);
        Produtos.update(doc.pid, query);
    }
};

let removeRelatedImages = function(uid, doc) {
    let _re = Images.remove({ pid: doc._id });
    if (Meteor.isDev)
        console.log('posts delete hook', _re, doc._id);
};

Images.files.after.insert(handlePostImageChange);
Images.files.after.update(handlePostImageChange);

Produtos.after.remove(removeRelatedImages);
Posts.after.remove(removeRelatedImages);

let updateRelatedPosts = function(uid, doc) {
    let posts = Posts.find({
        produtoCods: doc.cod
    }).fetch();

    _.map(posts, (post) => {
        // busca produtos que estão em post.cods que ainda existem
        let produtos = Produtos.find({
            cod: {
                $in: post.produtoCods
            },
            status: 'publicado'
        }).fetch();

        // novos produtoCods, retirado inexistentes
        let produtoCods = _.map(produtos, (p) => p.cod);

        Posts.update(post._id, {
            $set: {
                produtoCods,
                produtos
            }
        });
    })
};

Produtos.after.remove(updateRelatedPosts);
Produtos.after.update(updateRelatedPosts);

//////////// Index ///////////////////////
///
Posts._ensureIndex({
    time: 1
});
Produtos._ensureIndex({
    cod: 1
});
Configs._ensureIndex({
    nome: 1
});
/////////// Allow Deny//////////////////////
///
Images.allow({
    'insert': function(uid) {
        return Meteor.isAdmin(uid);
    },

    update: function(uid) {
        return Meteor.isAdmin(uid);
    },

    remove: function(uid) {
        return Meteor.isAdmin(uid);
    },

    download: function(userId, fileObj) {
        return true
    }
});
