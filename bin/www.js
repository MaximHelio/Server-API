let app = require("../app");
let debug = require("debug")("pjt:server");
let http = require("http");
const { listen } = require("../app");
let port = "3000"

app.set("port", port) // port를 3000번으로 할당하겟다

let server = http.createServer(app); // app에 대한 모든 정보로 서버를 켠다
server.listen(port)
server.on("error", onError);
server.on("listening", onListening); //전역적인 환경에서 땡겨옴

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}