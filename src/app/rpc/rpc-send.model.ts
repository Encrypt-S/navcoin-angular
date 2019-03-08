export class RpcSend {
  method: string;
  parameters?: Array<string>;

  constructor(method: string, parameters?: Array<any>) {
    this.method = method;
    this.parameters = parameters;
  }
}
