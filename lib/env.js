Router = FlowRouter;

CFS_BASE_URL = '/uploads';
S3_BASE_URL = 'http://senhoradesi.s3.amazonaws.com';
FS.HTTP.setBaseUrl(CFS_BASE_URL);

if(Meteor.isServer){
    Meteor.isDev = process.env.NODE_ENV == 'development';

    Meteor.methods({
        isDev(){
            this.unblock();
            return Meteor.isDev;
        }
    });

}else{
    Meteor.call('isDev', (e, r)=>{
        Meteor.isDev = r;
        Session.set('isDev', 1);
    });
}
