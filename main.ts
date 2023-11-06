import { load } from "protobufjs";

import { connect } from "mqtt";



async function proto() {
    try {
        const fproto_json = await load("protofile.json");
        console.log(fproto_json);

        // const fproto = await load('protofile.proto');
        // console.log(fproto);

        var AwesomeMessage = fproto_json.lookupType("awesomepackage.AwesomeMessage");

        var payload = { awesomeField: "meu teste de protobuf via mqtt" };
    
        
        var e = AwesomeMessage.verify(payload);
        if (e)
            throw Error(e);
        

        var msg = AwesomeMessage.create(payload);

        var buffer = AwesomeMessage.encode(msg).finish();
        console.log(buffer);

        var msg = AwesomeMessage.decode(buffer);
        console.log(msg);

        mqtt(JSON.stringify(msg.toJSON()));
        
    } catch (err) {
        throw err;
    }
}

function mqtt(msg: string) {

    const client = connect("mqtt://broker.emqx.io");

    client.on("connect", () => { 
        client.subscribe("testtopic/+"); // all levels
        
        
        client.publish("testtopic/69", msg, { qos: 1 }, (err) => {
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

