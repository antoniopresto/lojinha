faker = Meteor.npmRequire('faker');
faker.random.price = (min = 100) => {
    return parseFloat((Math.random()*200).toFixed(2))+min;
};
