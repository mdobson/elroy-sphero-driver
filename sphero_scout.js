var EventEmitter = require('events').EventEmitter;
var util = require('util');
var simpleSphero = require('simple-sphero');
var serialport = require('serialport');
var SpheroDriver = require('./SpheroDriver');


var SpheroScout = module.exports = function() {
  EventEmitter.call(this);
  this.drivers = [];
};
util.inherits(SpheroScout, EventEmitter);

SpheroScout.prototype.init = function(){
  var self = this;
  serialport.list(function(err, ports) {
    ports.forEach(function(port) {
      if(port.comName.search('Sphero') !== -1) {
        var sphero = simpleSphero(port.comName);
        sphero.on('ready', function() {
          self.emit('discover', SpheroDriver, sphero);
        });
      }
    });
  });
};
