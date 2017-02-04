// Initiate the server and the WebSocket connection
const app = require("./lib/server").listen(3000)
const chat = require("./lib/socket").listen(app)
