const mqtt = require("mqtt");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kazi:mZRKcnXaKYTOkIwn@cluster0.8fgss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const clientMongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





clientMongo.connect(err => {
    if (err) {
        console.log("connection fail");
    } else {
        console.log("connect to mongodb!");
        connectToMQtt();
    }
});

function connectToMQtt() {
    var client = mqtt.connect("mqtt://broker.hivemq.com");
    client.on("connect", function() {
        // client.subscribe("kazi");
        // client.subscribe("totalSell");
        client.subscribe("topic_location");
        console.log("Client has subcribed successfully");
    });

    client.on('message', function(topic, message) {
        console.log("topic:-" + topic.toString() + " message:-" + message.toString());
        insertData(clientMongo, message)
    });

    function insertData(clientMongo, message) {
        var myDatabase = clientMongo.db('location-db');
        var myCollection = myDatabase.collection('location');
        myCollection.insertOne(JSON.parse(message), function(error) {
            if (error) {
                console.log(error);
                console.log("Data insert fail");
            } else {
                console.log("data insert successfully!!!");
            }
        })
    }
}