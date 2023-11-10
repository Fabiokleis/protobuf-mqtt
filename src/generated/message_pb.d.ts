// package: awesomepackage
// file: message.proto

import * as jspb from "google-protobuf";

export class AwesomeMessage extends jspb.Message {
  getAwesomefield(): string;
  setAwesomefield(value: string): void;

  hasDevicename(): boolean;
  clearDevicename(): void;
  getDevicename(): string;
  setDevicename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AwesomeMessage.AsObject;
  static toObject(includeInstance: boolean, msg: AwesomeMessage): AwesomeMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AwesomeMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AwesomeMessage;
  static deserializeBinaryFromReader(message: AwesomeMessage, reader: jspb.BinaryReader): AwesomeMessage;
}

export namespace AwesomeMessage {
  export type AsObject = {
    awesomefield: string,
    devicename: string,
  }
}

