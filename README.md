# Avify Javascript Client Library

![Avify Logo](https://avify.co/wp-content/uploads/2021/10/Avify-logo.svg)



![NPM Downloads](https://img.shields.io/npm/dw/:avify-client)   [![GitHub issues open](https://img.shields.io/github/issues/bananacode-co/avify-npm)](https://github.com/bananacode-co/avify-npm/issues)



### INSTALLATION

```bash
npm i avify-client
```

### USAGE

* Javascript

```javascript
const Avify = require('avify-client');
const avify = new Avify({ mode: 'sandbox', version: 'v1' });
avify.checkout({
    cardHolder: 'John Doe',
    cvc: '248',
    expMonth: '06',
    expYear: '2023',
    carcNumber: '2424242424242424',
})
.then((res) => {
	console.log(res.data);
});
```

- Typescript

```typescript
import Avify from 'avify-client';
const avify = new Avify({ mode: 'sandbox', version: 'v1' });
avify.checkout({
    cardHolder: 'John Doe',
    cvc: '248',
    expMonth: '06',
    expYear: '2023',
    carcNumber: '2424242424242424',
})
.then((res) => {
	console.log(res.data);
});
```

### TODO
* Modify test scripts

