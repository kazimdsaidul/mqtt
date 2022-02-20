const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://broker.hivemq.com");



client.on("connect", function() {
    client.subscribe("kazi");
    console.log("Client has subcribed successfully");
});

client.on('message', function(topic, message) {
    console.log(message.toString());
});