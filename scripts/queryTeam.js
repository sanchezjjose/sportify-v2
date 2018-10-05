var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "Teams",
    KeyConditionExpression: "id = :id",
    FilterExpression: "seasons[0].active IN (:active)",
    // ExpressionAttributeNames: {
    //     "#teamId": "id"
    // },
    ExpressionAttributeValues: {
        ":id": "murry-hill-gang",
        ":active": true,
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        console.log(data);

        data.Items.forEach(function(item) {
            console.log(item.seasons.length);
            console.log(item.seasons);
        });
    }
});
