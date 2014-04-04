var SpheroDriver = module.exports = function(sphero) {
  this.name = 'Matts Sphero';
  this.type = 'Sphero';
  this.sphero = sphero;
  this.state = 'online';
  this.color = 'none';
};

SpheroDriver.prototype.init = function(config) {
  config
    .when('online', { allow: ['set-color','move'] })
    .when('moving', { allow: [] })
    .map('set-color', this.setColor, [{name: 'rgb', type: 'text'}])
    .map('move', this.move, [{name: 'direction', type: 'text'}, {name: 'time', type:'number'}]);
};

SpheroDriver.prototype.setColor = function(rgb, cb) {
  this.sphero.setColor(rgb);
  this.color = rgb;
};

SpheroDriver.prototype.move = function(direction, time, cb) {
  if(direction === 'forward') {
    this.sphero.forward(time);
  } else if( direction === 'backward') {
    this.sphero.backward(time);
  } else if( direction === 'left' ) {
    this.sphero.left().forward(time);
  } else if(direction === 'right' ) {
    this.sphero.right().forward(time);
  }
};

