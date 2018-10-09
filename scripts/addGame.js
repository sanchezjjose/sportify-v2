var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const teamId = 'murry-hill-gang';
const seasonId = '1';
const game = {
    "12": {
        "id": "12",
        "type": "Pickup Game",
        "date": "October 15, 2018 7:00",
        "location": "Murry Bergtraum High School",
        "address": "411 Pearl St, New York, NY 10038",
        "players": [
        ]
    },
};

const params = {
    TableName: 'Teams',
    Key: {
      'id': teamId
    },
    UpdateExpression: `ADD seasons.#s.schedule :game`,
    ExpressionAttributeNames: {
      "#s": seasonId
    },
    ExpressionAttributeValues: {
        ":game": game,
    },
    ReturnValues:"ALL_NEW"
  };

  docClient.update(params, (err, data) => {
    if (err) {
      console.error('Unable to remove attribute from item. Error JSON:', JSON.stringify(err, null, 2));

    } else {
      console.log(data);
    }
  });
