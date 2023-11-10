// package: awesomepackage
// file: listmessage.proto

import * as jspb from "google-protobuf";
import * as message_pb from "./message_pb";

export class ListAwesomeMessage extends jspb.Message {
  getLen(): number;
  setLen(value: number): void;

  clearMessagesList(): void;
  getMessagesList(): Array<message_pb.AwesomeMessage>;
  setMessagesList(value: Array<message_pb.AwesomeMessage>): void;
  addMessages(value?: message_pb.AwesomeMessage, index?: number): message_pb.AwesomeMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListAwesomeMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ListAwesomeMessage): ListAwesomeMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListAwesomeMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListAwesomeMessage;
  static deserializeBinaryFromReader(message: ListAwesomeMessage, reader: jspb.BinaryReader): ListAwesomeMessage;
}

export namespace ListAwesomeMessage {
  export type AsObject = {
    len: number,
    messagesList: Array<message_pb.AwesomeMessage.AsObject>,
  }
}

