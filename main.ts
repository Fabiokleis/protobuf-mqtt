import { load } from "protobufjs";

import { connect } from "mqtt";



async function proto() {
    try {
    //const fproto_json = await load("protofile.json");
    //console.log(fproto_json);

    const fproto = await load('protofile.proto');
    console.log(fproto);

    var AwesomeMessage = fproto.lookupType("awesomepackage.AwesomeMessage");

    var payload = { awesomeField: "AwesomeString" };
    
    
    AwesomeMessage.verify(payload);


    var msg = AwesomeMessage.create(payload);
    console.log(msg);

    var buffer = AwesomeMessage.encode(msg).finish();
    console.log(buffer);

    var msg = AwesomeMessage.decode(buffer);
    console.log(msg);
    
    } catch (err) {
        throw err;
    }
}

function mqtt() {

    const client = connect("mqtt://broker.emqx.io");

    client.on("connect", () => { 
        client.subscribe("testtopic/+"); // all levels
        
        
        client.publish("testtopic/69", "hello!", { qos: 1 }, (err) => {
            if (err)
                throw err;
        });
    });

    // receive
    client.on("message", async (topic, message) => {
        console.log(topic);
        console.log(message.toString());
    });

}


proto();
mqtt();

