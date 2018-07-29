'use strict';

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
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
  });
server.listen(8888);

server.on('connection', function (sock) {
        sock.on('data', function (buffer) {
            var command = buffer.toString();
            $('#RELAY-1C').turnOn();
            for(var i=0;i<4;i++){
              setTimeout(function () {
                console.log('Button pushed.');
                $('#RELAY-1C').isOn(function (error, state) {
                    if (!state) {
                        $('#RELAY-1C').turnOn();
                        console.log('RELAY-1C turn on 1');
                    }
                    else {
                        $('#RELAY-1C').turnOff();
                        console.log('RELAY-1C turn off 1');
                    }
                });
                setTimeout(function () {
                  $('#RELAY-1C').isOn(function (error, state) {
                      if (!state) {
                          $('#RELAY-1C').turnOn();
                          console.log('RELAY-1C turn on2');
                      }
                      else {
                          $('#RELAY-1C').turnOff();
                          console.log('RELAY-1C turn off2');
                      }
                  });
                }, 1000);
              }, 1000);
          }
            // 如果 TCP client 发送来的命令为 on，则点亮 LED
/*            if (command === 'on') {
                console.log('turn on LED');
                $('#led').turnOn();
            // 如果 TCP client 发送来的命令为 off，则关闭 LED
            } else if (command === 'off') {
                console.log('turn off LED');
                $('#led').turnOff();
            } else {
                console.log('Invalid command: ' + command + '111');

                for (var i=0;i<5;i++){
                    console.log('Times:',i);

                  $('#RELAY-1C').turnOn(function () {
                    console.log('RELAY-1C turn on');
                  });

                  setTimeout(function(){},1000);

                  $('#RELAY-1C').turnOff(function () {
                    console.log('RELAY-1C turn off');
                  });

                }
              }

            });
*/
            // 发送给 TCP client OK 表示成功响应此次命令
            sock.write('OK.....');

      });
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

    $('#button').on('push', function() {
        $('#RELAY-1C').turnOn();
    });

    $('#button').on('release', function() {
        console.log('Button released.');

        $('#RELAY-1C').turnOff();
        $('#led-r').turnOff();
    });

});

$.end(function () {
    //$('#led-r').turnOff();
});
