'use strict';
var AWS = require("aws-sdk");
var sns = new AWS.SNS();
console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    event.Records.forEach((record) => {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
        
        if (record.eventName == 'INSERT') {
            
            var truckNumber = JSON.stringify(record.dynamodb.NewImage.trucknumber.N);
            var truckMessage = "";
            if(truckNumber ==1){
                truckMessage = 'Ohio to Orlando';
            }else if(truckNumber == 2){
                truckMessage = 'Dallas to Austin';
            }
            var temperature = JSON.stringify(record.dynamodb.NewImage.temperature.N);
            console.log("1++++");
            console.log("temperature*******" + temperature);
            if((temperature >= 25) && (temperature < 27)){
                console.log("here");
                console.log(truckMessage);
                var params = {
                Subject: 'A new message from your device', 
                Message: 'Warning: Your truck from '+ truckMessage +' may be unsafe. Please log into system for further details.',
                TopicArn: 'arn:aws:sns:us-west-2:011376961990:vivek'
                };
                sns.publish(params, function(err, data) {
                    if (err) {
                        console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Results from sending message: ", JSON.stringify(data, null, 2));
                    }
                });
            }
            
        }
    });
    
    callback(null, `Successfully processed ${event.Records.length} records.`);
};
