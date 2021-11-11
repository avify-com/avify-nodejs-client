const Avify = require('../lib/index');

const avify = new Avify({ mode: 'sandbox', version: 'v1' });

const start = async () => {
  const data = await avify.checkout({
    cardHolder: 'Alexis Valenciano',
    cvc: '248',
    expMonth: '06',
    expYear: '2023',
    carcNumber: '2424242424242424'
  });
  console.log(data);
};
start();
