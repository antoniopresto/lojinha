Produtos = new Mongo.Collection('produtos');
Posts = new Mongo.Collection('posts');

Images = new FS.Collection("images", {
    stores: [new FS.Store.S3("images")]
});

let fsImages = function(){
    subsManager.subscribe('images', this._id);
    return Images.find({pid: this._id}).fetch();
};

Produtos.helpers({fsImages});
Posts.helpers({fsImages});
