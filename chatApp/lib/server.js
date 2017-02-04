const http = require("http")
const fs = require("fs")
const path = require("path")
const Messages = require(path.join(__dirname, "messages"))

const PORT = 3000
const INDEX_PATH = path.join(__dirname, "..", "public", "index.html")
const INDEX_PAGE = fs.readFileSync(INDEX_PATH)
const FAVICON_PATH = path.join(__dirname, "..", "public", "favicon.ico")
const FAVICON_IMG = fs.readFileSync(FAVICON_PATH)

// Spin up a HTTP server and listen to incomming connections
// Respond with a image when the request is a favicon.ico
// Respond with a JSON when message history gets requested
// Respond with a HTML index page otherwise
const handleServer = (req, res)=> {
  switch (req.url) {
    case "/favicon.ico":
      res.writeHead(200, {'Content-Type': 'image/ico'})
      res.end(FAVICON_IMG)
      break
    case "/messages":
      res.writeHead(200, {'Content-Type': 'application/json'})
      Messages.getAll((err, messages)=> {
        messages = JSON.stringify({messages: messages})
        res.end(messages)
      })
      break
    default:
      res.writeHead(200, {'Content-Type': 'text/html'})
      // res.end(fs.readFileSync(INDEX_PATH)) // Enable this line in development
      res.end(INDEX_PAGE) // Enable this line in production
  }
}

// Export a single function that wraps the server handler
const listen = (port) => {
  const server = http.createServer(handleServer)
  server.listen(port || PORT)
  return server
}

module.exports = {listen}