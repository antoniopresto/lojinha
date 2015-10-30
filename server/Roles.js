if(!Meteor.users.findOne()){
    let uid = Accounts.createUser({
        username: 'admin',
        email: 'antoniopresto@gmail.com',
        password: 'admin'
    })
    if(uid) Roles.addUsersToRoles(uid, ['admin']);

    if(process.env.NODE_ENV == 'production')
        throw new Error('ALTERE O USUÁRIO PADRÃO');
};

Meteor.isAdmin = (uidOrUser, throwError) => {
    let _id = (_.isObject(uidOrUser)) ? uidOrUser._id : uidOrUser
    let is = Roles.userIsInRole(_id, 'admin')
    if(!is && throwError) throw new Meteor.Error(401, 'Não autorizado.')
    return i
}
