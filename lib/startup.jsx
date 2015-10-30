Meteor.startup(function(){
    if(typeof TAPi18n !== 'undefined' && TAPi18n.setLanguage)
        TAPi18n.setLanguage('pt-BR');
});
