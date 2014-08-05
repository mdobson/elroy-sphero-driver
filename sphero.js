var util = require('util');
var Device = require('zetta').Device;

function getColor(c) {
  var color = c.match(/[0-9a-fA-F]{1,2}/g);
  while (color.length < 3) {
    color.push('00');
  }
  color = parseInt(color.join(''), 16);
  return color;
}

var Sphero = module.exports = function(sphero) {
  Device.call(this);
  this.color = 'none';
  this._sphero = sphero;
};
util.inherits(Sphero, Device);

Sphero.prototype.init = function(config) {
  config
    .type('sphero')
    .name('Sphero')
    .state('online')
    .when('online', { allow: ['set-color','move', 'left', 'right', 'random-color'] })
    .when('moving', { allow: [] })
    .map('set-color', this.setColor, [{name: 'color', type: 'color'}])
    .map('move', this.move, [{name: 'time', type:'number'}])
    .map('random-color', this.randomColor)
    .map('left', this.turnLeft)
    .map('right', this.turnRight);

  var self = this;
  this._sphero.on('end', function() {
    self.state = 'offline';
  });

  this._sphero.on('error', function(err) {
    self.state = 'offline';
  });
};

Sphero.prototype.randomColor = function(cb) {
  var color = Math.floor(Math.random() * Math.pow(2, 24));
  this.color = '#' + color.toString(16);
  this._sphero.setColor(color);
  cb();
};

Sphero.prototype.setColor = function(colorStr, cb) {
  var color = getColor(colorStr);
  this.color = colorStr;
  this._sphero.setColor(color);
  cb();
};

Sphero.prototype.move = function(time, cb) {
  this._sphero.forward(time);
  cb();
};

Sphero.prototype.turnLeft = function(cb) {
  this._sphero.left();
  cb();
};

Sphero.prototype.turnRight = function(cb) {
  this._sphero.right();
  cb();
};

