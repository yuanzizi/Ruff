var runner = require('ruff-app-runner');
var verify = require('ruff-mock').verify;

exports['test should call turn on while application is ready'] = function() {
    runner.run(appPath, function() {
        verify($('#led-r')).turnOn();
    });
};

require('test').run(exports);
