# Sphero Zetta Driver

[Zetta](http://zettajs.io) device package for Sphero Driver.

## Install

```
npm install zetta-sphero-driver
```

## Usage

```js
var zetta = require('zetta');
var Sphero = require('zetta-sphero-driver');

zetta()
  .expose('*')
  .use(Sphero)
  .listen(3000, function(err) {
    console.log('Listening on http://localhost:3000/');
  });

// or specify port

zetta()
  .expose('*')
  .use(Sphero, '/dev/rfcomm0')
  .listen(3000, function(err) {
    console.log('Listening on http://localhost:3000/');
  });

```

## License

MIT
