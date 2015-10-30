// Add two middleware calls. The first attempting to parse the request body as
// JSON data and the second as URL encoded data.
var bodyParser = Meteor.npmRequire('body-parser');
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({
    extended: false
}));

//postRoutes é um filtro para aceitar apenas POST data
var POSTRoutes = Picker.filter(function (req, res) {
    return req.method == "POST";
});

Picker.route('/retornopagamento', (params, req, res, next) => {
    res.setHeader('access-control-allow-origin', "https://sandbox.pagseguro.uol.com.br");
    //Lojinha.pagseguroNotificationReceiver(req);
    res.end('ok');
});
