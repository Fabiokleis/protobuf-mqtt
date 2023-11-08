// import { load } from "protobufjs";

import { connect } from "mqtt";
import { awesomepackage } from "./compiled";

async function proto() {
    try {
        // const fproto_json = await load("protofile.json");
        // console.log(fproto_json);

        //const fproto = await load('protofile.proto');
        //console.log(fproto);

        // var AwesomeMessage = fproto.lookupType("awesomepackage.AwesomeMessage");

        let payload = { awesomeField: "teste" };
    
        var e = awesomepackage.AwesomeMessage.verify(payload);
        if (e)
            throw Error(e);
    
        let message = awesomepackage.AwesomeMessage.create(payload);

        var buffer = Buffer.from(awesomepackage.AwesomeMessage.encode(message).finish());
        mqtt(buffer);
        console.log(buffer);
        

        var msg = awesomepackage.AwesomeMessage.decode(buffer);
        console.log(msg);

        
        
    } catch (err) {
        throw err;
    }
}

function mqtt(msg: Buffer) {

    const client = connect("mqtt://broker.emqx.io");

    client.on("connect", () => { 
        client.subscribe("testtopic/+"); // all levels
        
        
        client.publish("testtopic/69692", msg, (err) => {
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

