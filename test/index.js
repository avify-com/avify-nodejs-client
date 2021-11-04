const Avify = require('../lib/index');

const avfy = new Avify({ mode: 'sandbox', version: 'v1' });

const start = async () => {
  const pub = await avfy.getPublicKey();
  console.log(pub);
};
start();
