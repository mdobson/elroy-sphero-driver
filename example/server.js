var zetta = require('zetta');
var Sphero = require('../index');

zetta()
  .name('local')
  .expose('*')
  .use(Sphero)
  .listen(3000, function(err) {
    if(err) {
      console.log(err);
    }
    console.log('Listening on http://localhost:3000/');
  });
