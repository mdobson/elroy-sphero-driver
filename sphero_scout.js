var EventEmitter = require('events').EventEmitter;
var util = require('util');
var simpleSphero = require('simple-sphero');
var serialport = require('serialport');
var SpheroDriver = require('./sphero_driver');


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
        console.log('Sphero port found', port.comName);
        var sphero = simpleSphero(port.comName);
        sphero.on('ready', function() {
          self.emit('discover', SpheroDriver, sphero);
        });
      }
    });
  });
};
