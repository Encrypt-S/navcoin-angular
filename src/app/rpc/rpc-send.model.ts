export class RpcSend {
  command: string;
  params?: Array<string>;

  constructor(command: string, params?: Array<string>) {
    this.command = command;
    this.params = params;
  }
}
