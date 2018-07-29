'use strict';
var press_count = 0;//门铃按检测计数器
/*
var http = require('http');

var options = {
    host: 'httpbin.org',
    path: '/post',
    method: 'POST',
    headers: {
    }
};

function postState(state) {
    options.headers['Content-Length'] = state.length;
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.write(state);
    req.end();
}




var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  server.close();
});


server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(44444);
// server listening 0.0.0.0:41234

*/


/*
var http = require('http');

// Create an HTTP server
var srv = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});
srv.on('upgrade', function(req, socket, head) {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  socket.pipe(socket); // echo back
});

// now that server is running
srv.listen(8080, '192.168.31.5', function() {

  // make a request
  var options = {
    port: 8080,
    hostname: '192.168.31.5',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  var req = http.request(options);
  req.end();

  req.on('upgrade', function(res, socket, upgradeHead) {
    console.log('got upgraded!');
    socket.end();
    process.exit(0);
  });
});
*/

var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-type' : 'text/html'});
  res.write('<h1>Node.js</h1>');
  res.write('<p>Hello World</p>');
  res.end();
  });
server.listen(8888);

server.on('connection', function (sock) {
        sock.on('data', function (buffer) {
//            var command = buffer.toString();
            open_door();
          });

            // 发送给 TCP client OK 表示成功响应此次命令
        sock.write('Ok....');
});

server.on('listening', function () {
      console.log('TCP server starts to listen port 8888');
    });


$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

/*    $('#<irr-01>').on('data', function(data) {
    console.log('received data', data);
  });*/
/* 检测门铃是否连续按了3次*/

  var timer = setInterval(function () {
    if (press_count >= 2){ // 连续按3次，触发
      open_door();
      press_count = 0;
    }else {
      press_count = 0;
    }
  }，10000);

});

$.end(function () {
    //$('#led-r').turnOff();
    $('#RELAY-1C').turnOff();
});


function open_door() {
    $('#RELAY-1C').turnOff();
    setTimeout(function () {
      $('#RELAY-1C').isOn(function (error, state) {
        if (!state) {
          console.log('RELAY-1C if off:');
        }
        else {
          $('#RELAY-1C').turnOff();
          console.log('RELAY-1C turn off 1:');
        }
      });
      setTimeout(function () {
        $('#RELAY-1C').isOn(function (error, state) {
          if (!state) {
            $('#RELAY-1C').turnOn();
            console.log('RELAY-1C turn on2:');
          }
          else {
            console.log('RELAY-1C is off:');
          }
        });
      }, 1000);
    }, 1000);
    $('#RELAY-1C').turnOff(function(){
      console.log('Open Door Success~!');
    });
}


function bind_device_event() {

  $('#buttongpio').on('push', function() { // 只检测搞电压
    console.log('Button push ：' + press_count);
    press_count++;
  });
}
