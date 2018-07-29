var driver = require('ruff-driver');

var ButtonState = {
    pushed: 0,
    released: 1
};

module.exports = driver({
    attach: function(inputs) {
        var that = this;

        this._gpio = inputs['gpio'];
        this._currentState = ButtonState.released;

        this._gpio.on('interrupt', function(state) {
            if (that._currentState === state) {
                return;
            }

            that._currentState = state;

            if (state === ButtonState.pushed) {
                that.emit('push');
            } else {
                that.emit('release');
            }
        });
    },
    exports: {
        isPushed: function() {
            return this._currentState === ButtonState.pushed;
        }
    }
});
