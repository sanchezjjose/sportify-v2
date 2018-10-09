import AWS from 'aws-sdk';

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const getTeam = (id) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Teams',
      Key: {
        'id': id
      }
    };

    docClient.get(params, (err, data) => {
      if (err) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
        reject(err)

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));

        if (Object.keys(teams).length > 0) {
          const team = (teams && teams.Item) || {};
          resolve(team);

        } else {
          reject(new Error(`Team ${id} not found.`));
        }
      }
    })
  });
};

const addPlayer = (teamId, seasonId, gameId, playerName) => {
  console.log(`Adding ${playerName} to game...`);

  return new Promise((resolve, reject) => {
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
          ":new_player": [ playerName ]
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
        reject(err)

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));
        const team = (teams && teams.Item) || {};

        resolve(team);
      }
    })
  });
};

const removePlayer = (id, playerName) => {
  console.log(`Removing ${playerName} from game...`);
};

export { getTeam, addPlayer, removePlayer };
