var SpheroDriver = module.exports = function(sphero) {
  this.name = 'Matts Sphero';
  this.type = 'sphero';
  this.sphero = sphero;
  this.state = 'online';
  this.color = 'none';
};

SpheroDriver.prototype.init = function(config) {
  config
    .when('online', { allow: ['set-color','move'] })
    .when('moving', { allow: [] })
    .map('set-color', this.setColor, [{name: 'rgb', type: 'text'}])
    .map('move', this.move, [{name: 'time', type:'number'}])
    .map('left', this.turnLeft)
    .map('right', this.turnRight);
};

SpheroDriver.prototype.setColor = function(rgb, cb) {
  this.sphero.setColor(rgb);
  this.color = rgb;
};

SpheroDriver.prototype.move = function(time, cb) {
  this.sphero.forward(time);
};

SpheroDriver.prototype.turnLeft = function(cb) {
  this.sphero.left();
  cb();
};

SpheroDriver.prototype.turnRight = function(cb) {
  this.sphero.right();
  cb();
};

