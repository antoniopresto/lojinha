String.prototype.capitalize = function(){
    return this.slice(0,1).toUpperCase() + this.slice(1);
}

_.scapeUrl = (str = '') => {
    let url= str.replace(/\%/g, '_scapeme_');
    str = encodeURI(url);
    return str.replace(/_scapeme_/g, '%');
};

lll = (nome, ...args) => {
    Meteor.call(nome, ...args, (err, res) => console.log(err, res));
};

//Retorna valor em R$xx,00
_.reais  = (n, comRS) => {
    if(n == 'freteGratis') return 'Frete Grátis :)';

    let rs = (comRS && 'R$' || '');

    if (_.isNumber(n)) return rs + n.toFixed(2).replace('.', ',');

    if(_.isString(n)){
         return rs + parseFloat(n.replace(',', '.')).toFixed(2).replace('.', ',');
    }
};
