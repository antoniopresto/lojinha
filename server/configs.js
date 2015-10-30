setConfig = (nome, valor) => {
    return Configs.upsert({nome: nome}, {$set: {valor}});
};

getConfig = (nome) => {
    return (Configs.findOne({nome: nome}) || {}).valor;
};

Meteor.methods({
    setConfig(nome, valor){
        Meteor.isAdmin(this.userId, true);
        return Configs.upsert({nome: nome}, {$set: {valor}});
    },
    getConfig(nome){
        Meteor.isAdmin(this.userId, true);
        return (Configs.findOne({nome: nome}) || {}).valor;
    }
});
