const Avify = require('../lib/index');

const avify = new Avify({ mode: 'sandbox', version: 'v1' });

const start = async () => {
  const pub = await avify.getPublicKey();
  console.log(pub);
};
start();
