var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const teamId = 'murry-hill-gang';
const seasonId = '1';
const gameId = '9';
const playerName = 'Weezy';

const params = {
  TableName: 'Teams',
  Key: {
    'id': teamId
  },
  UpdateExpression: `SET seasons.#s.schedule.#g.#p = list_append(seasons.#s.schedule.#g.#p, :new_player)`,
  ExpressionAttributeNames: {
    "#p": "players",
    "#s": seasonId,
    "#g": gameId
  },
  ExpressionAttributeValues: {
      ":new_player": [ playerName ],
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
