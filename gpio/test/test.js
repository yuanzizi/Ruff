var runner = require('ruff-driver-runner');
var assert = require('assert');
var path = require('path');
var driverPath = path.join(__dirname, '..');
var when = require('ruff-mock').when;

exports['test should emit push event'] = function(done) {
    var run = false;
    runner.run(driverPath, function(error, context) {
        if (error) {
            done(error);
            return;
        }

        var button = context.device;
        var gpio = context.inputs['gpio'];

        button.on('push', function() {
            done();
        });

        gpio.emit('interrupt', 0);
    });
};

exports['test should return true when button is pushed'] = function(done) {
    runner.run(driverPath, function(error, context) {
        if (error) {
            done(error);
            return;
        }

        var button = context.device;
        var gpio = context.inputs['gpio'];

        gpio.emit('interrupt', 0);

        assert(button.isPushed());
        done()
    });
};

require('test').run(exports);
