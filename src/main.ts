// import { load } from "protobufjs";

import { connect } from "mqtt";
import { AwesomeMessage } from "./generated/message_pb";
import { ListAwesomeMessage } from "./generated/listmessage_pb";

async function proto() {
    try {
        // const fproto_json = await load("protofile.json");
        // console.log(fproto_json);

        //const fproto = await load('protofile.proto');
        //console.log(fproto);

        // var AwesomeMessage = fproto.lookupType("awesomepackage.AwesomeMessage");

        let msgList = new ListAwesomeMessage();

        let msg = new AwesomeMessage();
        msg.setAwesomefield("teste");
        msg.setDevicename("12345");

        msgList.addMessages(msg);
        msgList.setLen(1);

        let serialized = msg.serializeBinary();
        let buffer = Buffer.from(serialized);

        mqtt(buffer);

        let deserialized = AwesomeMessage.deserializeBinary(buffer);
        console.log(deserialized.toObject());
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

