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
    .when('online', { allow: ['set-color','move', 'left', 'right', 'random-color'] })
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
  this.color = colors[Math.floor(rand)];
  this.sphero.setColor(this.colors[colors[Math.floor(rand)]]);
  if(cb) {
    cb();
  }
};

SpheroDriver.prototype.setColor = function(color, cb) {
  if(color in this.colors) {
    this.sphero.setColor(rgb);
    this.color = rgb;
  }
  if(cb) {
    cb();
  }
};

SpheroDriver.prototype.move = function(time, cb) {
  this.sphero.forward(time);
  if(cb) {
    cb();
  }
};

SpheroDriver.prototype.turnLeft = function(cb) {
  this.sphero.left();
  if(cb) {
    cb();
  }
};

SpheroDriver.prototype.turnRight = function(cb) {
  this.sphero.right();
  if(cb) {
    cb();
  }
};

