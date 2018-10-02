import AWS from 'aws-sdk';

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

// ======= AWS ======= \\

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

const addPlayer = (id, player) => {
  console.log(`Adding ${player} to game...`);

  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Teams',
      Key: {
        'id': id
      },
      UpdateExpression: "SET seasons[0].schedule[3].#p = list_append(seasons[0].schedule[3].#p, :new_player)",
      ExpressionAttributeNames: {
        // "#t": "type",
        "#p": "players"
      },
      ExpressionAttributeValues: {
          ":new_player": [ player ]
          // "#active": 5.5,
          // ":sch": "schedule",
          // ":p": ["Larry", "Moe", "Curly"]
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
        reject(err)

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));
        console.log(teams);

        const team = (teams && teams.Item) || {};
        resolve(team);
      }
    })
  });
};

const removePlayer = (id, playerName) => {
  console.log(`Removing ${playerName} from game...`);
};

// ======= UTILS ======= \\

const sortScheduleByDate = (schedule) => {
  const compare = (a, b) => {
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;
    return 0;
  }

  return schedule.sort(compare) || [];
};

export { getTeam, addPlayer, removePlayer, sortScheduleByDate };