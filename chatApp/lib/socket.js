const WebSocket = require('ws')
const path = require("path")
const Messages = require(path.join(__dirname, "messages"))

const wsLog = (log)=> console.log(`[${new Date()}] ${log}`)

const getServerMessage = (message)=> JSON.stringify({
  type: "message", text: message, user: "server", time: Date.now()
})

const listen = (server)=> {
  // Create a WS connection
  const socket = new WebSocket.Server({server})

  // A callback for receiving messages
  // It send the message to everyone and saves it to Dynamo
  const onWsMessage = (message)=> {
    wsLog(`Message received: ${message}`)
    socket.clients.forEach((client)=> client.send(message))
    message = JSON.parse(message)
    Messages.save(message, (err)=> {
      if (err) console.error("Error saving the message", err)
    })
  }

  // A callback for disconnecting the user
  const onWsClose = ()=> {
    wsLog("User disconnected.")
    socket.clients.forEach((client)=> client.send(getServerMessage("User disconnected.")))
  }

  // Bind to a Client Connected event
  socket.on("connection", (ws)=> {
    wsLog("New user connected.")
    
    // Bind to "receive message" and "disconnect" events
    ws.on("message", onWsMessage)
    ws.on("close", onWsClose)
    
    // Announce everyone in the channel about a new user
    socket.clients.forEach((client)=> {
      if (client !== ws) client.send(getServerMessage("New user connected."))
    })
  })

  return socket
}

// Export a single function that initiates the socket connection
module.exports = {listen}