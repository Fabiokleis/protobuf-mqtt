import { load } from "protobufjs";

import { connect } from "mqtt";


async function proto() {
    try {
        // const fproto_json = await load("protofile.json");
        // console.log(fproto_json);

        const fproto = await load('protofile.proto');
        console.log(fproto);

        var AwesomeMessage = fproto.lookupType("awesomepackage.AwesomeMessage");

        var payload = { 
            awesomeField: "meu teste de protobuf via mqtt",
            deviceName: "123i102dkiaso0kd12"
        };
    
        
        var e = AwesomeMessage.verify(payload);
        if (e)
            throw Error(e);
        

        var msg = AwesomeMessage.create(payload);

        var buffer = Buffer.from(AwesomeMessage.encode(msg).finish());

        console.log(buffer);
        

        var msg = AwesomeMessage.decode(buffer);
        // console.log(msg);
        mqtt(buffer);
        
        
    } catch (err) {
        throw err;
    }
}

function mqtt(msg: Buffer) {

    const client = connect("mqtt://broker.emqx.io");

    client.on("connect", () => { 
        client.subscribe("testtopic/+"); // all levels
        
        
        client.publish("testtopic/69692", msg, { qos: 1 }, (err) => {
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

