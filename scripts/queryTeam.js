var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "Teams",
    KeyConditionExpression: "id = :id",
    ProjectionExpression: "id",
    FilterExpression: "contains(seasons, :active)",
    // ExpressionAttributeNames: {
    //     "#teamId": "id"
    // },
    ExpressionAttributeValues: {
        ":id": "murry-hill-gang",
        ":active": 
		{
			"id": "2",
			"title": "Winter 2019",
			"active": "false",
			"schedule": [{
				"id": "1",
				"type": "Pickup Game",
				"date": "January 25, 2019 7:00",
				"location": "Murry Bergtraum High School",
				"address": "411 Pearl St, New York, NY 10038",
				"players": [
					"Max Moise",
					"Jose Sanchez",
					"Edwin",
					"Chris",
					"Fan Feng",
					"Hao Tan",
					"Ernest Lindain",
					"Dave",
					"William Lin"
				]
			}]
		}

    },
    ReturnValues:"UPDATED_NEW"
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        console.log(data);

        // data.Items.forEach(function(item) {
        //     console.log(item.seasons.length);
        //     console.log(item.seasons);
        // });
    }
});
