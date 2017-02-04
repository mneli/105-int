const AWS = require("aws-sdk")
const uuidV4 = require("uuid/v4")
const path = require("path")
const config = require(path.join("..", "config.json"))

// Configure AWS lib
AWS.config.update(config.aws)

// Createa DynamoDB instance
const DB = new AWS.DynamoDB()

// Define a DynamoDB table name
// The table should be already created on AWS and has the following structure
// - id: type String, Partition key
// - time: type Number, Sort key
const MESSAGES_TABLE = "messages"

// Define params for searching and writing message to/from Dynamo
// Query - returns a filtered collection of items
// API: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property
const QUERY_PARAMS = {
  TableName: MESSAGES_TABLE,
  KeyConditionExpression: "#id=:message",
  ExpressionAttributeNames: {
    "#id": "id"
  },
  ExpressionAttributeValues: {
    ":message": {S: "message"}
  },
  ScanIndexForward: true
}
// PutItem - updated/inserts an item to Dynamo
// API: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
const PUT_PARAMS = {
  TableName: MESSAGES_TABLE,
  Item: {
    id: {S: ""},
    type: {S: ""},
    user: {S: ""},
    text: {S: ""},
    time: {N: ""}
  }
}

// Retreives all the messages from Dynamo through a Query operation
const getAll = (callback)=> {
  DB.query(QUERY_PARAMS, (err, result)=> {
    if (err) return callback(err)
    let items = result.Items.map((item)=> {
      return {
        type: item.type.S,
        text: item.text.S,
        user: item.user.S,
        time: parseInt(item.time.N)
      }
    })
    callback(null, items)
  })
}

// Writes a message to Dynamo through a PutItem operation
const save = (data, callback)=> {
  let messageParams = Object.assign({}, PUT_PARAMS, {
    Item: {
      id: {S: "message"},
      type: {S: data.type},
      text: {S: data.text},
      user: {S: data.user},
      time: {N: `${data.time}`}
    }
  })
  DB.putItem(messageParams, callback)
}

module.exports = {getAll, save}