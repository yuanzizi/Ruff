'use strict';

var lightValue = 0;//光照强度
var isTurnOn = false;//当前灯是否亮
var isLightMax = false;
var turnOffTimer = 0;//灭灯计时器
var sound_count = 0;//声音检测计数器
var check_getup_interval = 0;//声音检测计时器

var const_is_turn_on_lightValue = 50;//光感强度
var const_is_turn_off_time = 8;//秒
var const_is_getup_by_sound = 5;//次
var const_is_getup_interval = 10;//秒
var const_turn_on_speed = 50;
var const_turn_off_speed = 10;


$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }
//////////////////////////////////////////////////////////////////////////////////
//功能：
//      光照传感器检测光照强度，控制灯的亮灭
//
//策略：
//      1.检测光照强度大于50，光照强度高，控制灯关闭，节电
//      2.检测光照强度小于50，根据声音传感器得到的当前是否有人活动
//           a.有人活动，灯逐渐变亮
//           b.没有人活动，一定时长(Demo 用10s)后，灯逐渐变暗，最后灯灭。
//////////////////////////////////////////////////////////////////////////////////
    // $('#led').setRGB(255,255,255);

    var timer = setInterval(function (lightValue) {

        $('#led').getRGB(function (error, rgb) {
            console.log(rgb);
        });

        $('#light').getIlluminance(function (error, value) {
            if (error) {
                console.error(error);
                return;
            }
            lightValue = value;
            console.log("------lightValue = " + lightValue);

            if(isTurnOn) {
                //开始缓慢亮灯，过程不可中断
                if(!isLightMax) {
                    led_On();
                } else {

                    turnOffTimer++;
                    if (turnOffTimer >= const_is_turn_off_time) {
                        led_Off();
                        console.log('turnOffTimer: ' + turnOffTimer + ' ');

                        if(turnOffTimer == const_is_turn_off_time) {
                            sound_count = 0;
                        }

                        if(check_is_people_getup()) {
                            turnOffTimer = 0;
                            isLightMax = false;
                        }
                    }
                }
            } else {
                //当前灯灭
                if (lightValue < const_is_turn_on_lightValue) {
                    //启动亮灯检测
                    if (check_is_people_getup()) {
                        led_On();
                        reset_at_LED_on();
                    }
                }
            }
        });
    }, 1000);

    bind_device_event();
});

var check_is_people_getup = function() {

    var isGetUp = false;
    if(sound_count > 0) {
        if(check_getup_interval <= const_is_getup_interval) {

            if(sound_count >= const_is_getup_by_sound) {
                isGetUp = true;
                check_getup_interval = 0;
            } else {
                check_getup_interval++;
            }

        } else {

            isGetUp = false;
            sound_count = 0;
            check_getup_interval = 0;

        }
    }

    console.log('isGetUp: ' + isGetUp);
    console.log('sound_count: ' + sound_count);
    console.log('check_getup_interval: ' + check_getup_interval);
    return isGetUp;
}

function bind_device_event() {

    $('#sound').on('sound', function () {
        sound_count++;
        console.log('sound_count: ' + sound_count);
    });
}

function led_On() {

    $('#led').getRGB(function (error, rgb) {
        console.log(rgb);
        var i = rgb[0] ? rgb[0] : 0;
        i = i + const_turn_on_speed;
        i = i >= 250 ? 250 : i;

        $('#led').setRGB(i, i, i);

        if(i >= 250) {
            isLightMax = true;
        }

    });
}

function reset_at_LED_on() {
    isTurnOn = true;
    turnOffTimer = 0;
    sound_count = 0;
}

function led_Off() {

    $('#led').getRGB(function (error, rgb) {
        console.log(rgb);

        var i = rgb[0] ? rgb[0] : 0;
        i = i - const_turn_off_speed;
        i = i <= 0 ? 0 : i;
        $('#led').setRGB(i, i, i);

        if(i <= 0) {
            $('#led').turnOff();
            reset_at_LED_off();
        }

    });
}


function reset_at_LED_off() {
    isTurnOn = false;
    turnOffTimer = 0;
    sound_count = 0;
    isLightMax = false;
}


$.end(function () {
    //clearTimeout(runTime);
    console.log('application is end......');
});
