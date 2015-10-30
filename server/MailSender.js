MailSender = {};
var Fiber = Meteor.npmRequire('fibers');

MailSender.FROM = process.env.MAIL_FROM || 'contato@senhoradesi.com';

/*
MailSender.html(toEmail, {
    titulo,
    conteudo,
    obrigado
}, assunto);
 */
MailSender.html = function (_to, _htmlObj, _assunto) {
    var html, mailObj;
    SSR.compileTemplate('emailHtml', Assets.getText('email-template.html'));
    html = SSR.render('emailHtml', _htmlObj);

    if (!_.isObject(_to)) _to = {
        to: _to
    };

    mailObj = {
        from: ' Senhora De Si <' + MailSender.FROM + '>',
        to: _to.to,
        cc: _to.cc,
        bcc: _to.bcc,
        replyTo: _to.replyTo,
        subject: _assunto,
        html: html
    };
    if (_htmlObj.attachments) {
        mailObj.attachments = _htmlObj.attachments;
    }
    Fiber(function () {
            var error;
            try {
                Email.send(mailObj);
            } catch (_error) {
                error = _error;
                console.log(error);
            }
        })
        .run();
};

MailSender.text = function (_to, _text, _assunto) {
    if (!_.isObject(_to)) _to = {
        to: _to
    };

    Fiber(function () {
            var e;
            try {
                return Email.send({
                    from: ' Senhora De Si <' + MailSender.FROM + '>',
                    to: _to.to,
                    cc: _to.cc,
                    bcc: _to.bcc,
                    replyTo: _to.replyTo,
                    subject: _assunto,
                    text: _text
                });
            } catch (_error) {
                e = _error;
                return console.log(e);
            }
        })
        .run();
};
