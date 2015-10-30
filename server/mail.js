var mail = '';
var user = '';
var senha = '';
var server = '';
var porta = '465';
var siteName = 'ALTERAR_SITE_NAME';
var fromName = 'ALTERAR_FROM_NAME';

var mailUrl =  "smtp://" + user + ":" + senha + "@" + server + ":" + porta + "/";
process.env.MAIL_URL = process.env.MAIL_URL || mailUrl;

//emails rec, create, ...
Meteor.startup(function () {
    Accounts.emailTemplates.from = fromName + ' <' + mail + '>';
    Accounts.emailTemplates.siteName = siteName;

    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return 'Confirme seu Email';
    };

    //ou Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
        return 'Clique no link a seguir para verificar seu email: ' + url;
    };

    Accounts.emailTemplates.siteName = siteName;
    Accounts.emailTemplates.from = fromName + " <" + user + ">";
    Accounts.emailTemplates.resetPassword.subject = function (user) {
        return "Recuperar senha de " + user.profile.nome;
    };
    Accounts.emailTemplates.resetPassword.html = function (user, url) {
        var html = 'Olá, ' + user.profile.nome;
        html += '<p>Alguém solicitou a recuperação de senha para sua conta</p>';
        html += '<p> <a href="' + url + '">Clique aqui</a> para iniciar o processo de recuperação.</p>';
        return html;
    };
});
