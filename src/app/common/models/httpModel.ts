import { configuration } from "./../properties/config";

export class HttpModel {
  partialURL: string;
  dataJSON: any;
  dataType: string;
  callType: string;

  constructor(
    partURL: string = "",
    dJSON: any = [],
    callType: string = configuration.callType.GET,
    dataType: string = "json"
  ) {
    this.partialURL = partURL;
    this.dataJSON = dJSON;
    this.dataType = dataType;
    this.callType = callType;
  }
}
