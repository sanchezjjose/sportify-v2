var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const teamId = 'murry-hill-gang';
const seasonId = '1';
const gameId = '9';
const newPlayers = [ 'Dave', 'Jose' ];

const params = {
    TableName: 'Teams',
    Key: {
      'id': teamId
    },
    UpdateExpression: `SET seasons.#s.schedule.#g.#p = :players`,
    ExpressionAttributeNames: {
      "#p": "players",
      "#s": seasonId,
      "#g": gameId
    },
    ExpressionAttributeValues: {
        ":players": newPlayers,
        // ":seasonId": seasonId,
        // ":gameId": gameId
    },
    ReturnValues:"ALL_NEW"
  };

  docClient.update(params, (err, data) => {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));

    } else {
      console.log(data);
    }
});
