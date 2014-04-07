var SpheroDriver = module.exports = function(sphero) {
  this.name = 'Matts Sphero';
  this.type = 'sphero';
  this.sphero = sphero;
  this.state = 'online';
  this.color = 'none';
  this.colors = {
    'black': 0x000000,
    'blue': 0x0000ff,
    'green': 0x00ff00,
    'orange': 0xff4500,
    'pink': 0xff1444,
    'purple': 0xff00ff,
    'red': 0xff0000,
    'white': 0xffffff,
    'yellow': 0xffff00
  };
};

SpheroDriver.prototype.init = function(config) {
  config
    .when('online', { allow: ['set-color','move'] })
    .when('moving', { allow: [] })
    .map('set-color', this.setColor, [{name: 'color', type: 'text'}])
    .map('move', this.move, [{name: 'time', type:'number'}])
    .map('random-color', this.randomColor)
    .map('left', this.turnLeft)
    .map('right', this.turnRight);
};

SpheroDriver.prototype.randomColor = function(cb) {
  var colors = ['black', 'blue', 'green', 'orange', 'pink', 'purple', 'red', 'white', 'yellow'];
  var rand = Math.rand() * colors.length;
  this.sphero.setColor(this.colors[colors[Math.floor(rand)]]);
  cb();
};

SpheroDriver.prototype.setColor = function(color, cb) {
  if(color in this.colors) {
    this.sphero.setColor(rgb);
    this.color = rgb;
  }
  cb();
};

SpheroDriver.prototype.move = function(time, cb) {
  this.sphero.forward(time);
  cb();
};

SpheroDriver.prototype.turnLeft = function(cb) {
  this.sphero.left();
  cb();
};

SpheroDriver.prototype.turnRight = function(cb) {
  this.sphero.right();
  cb();
};

