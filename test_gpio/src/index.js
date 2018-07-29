'use strict';
var press_count = 0;//门铃按检测计数器


$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    $('#buttongpio').on('push', function() { // 只检测搞电压
        console.log('Button push.');
        press_count++;
    });
    if (press_count >= 3){ // 连续按3次，触发

      $('#led-r').turnOn();
      setTimeout(function () {$('#led-r').turnOff();}, 3000);
      press_count == 0;

    }


});

$.end(function () {
    $('#led-r').turnOff();
});
