const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", function() {
    setInterval(function() {
        var random = Math.random() * 50;

        console.log(random);
        client.publish("kazi", "temperature value: " + random.toString());

    }, 5000);


    setInterval(function() {
        var random = Math.random() * 10;

        console.log("Total sell " + random);
        client.publish("totalSell", "temperature value: " + random.toString());

    }, 2000);
});