export class RpcSend {
  method: string;
  params?: Array<string>;

  constructor(method: string, params?: Array<any>) {
    this.method = method;
    this.params = params;
  }
}
