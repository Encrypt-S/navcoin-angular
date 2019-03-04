export class NavDroidNotification {
  constructor(description: String, type: NotifType, url?: String) {
    this.description = description;
    this.type = type;
    if (url) {
      this.url = url;
    }
  }
  description: String;
  url?: String;
  type: NotifType;
  getTypeString() {
    let typeStr;
    switch (this.type) {
      case 1:
        typeStr = 'INFO';
        break;
      case 2:
        typeStr = 'SUCCESS';
        break;
      case 3:
        typeStr = 'WARNING';
        break;
      case 4:
        typeStr = 'ERROR';
        break;
      case 5:
        typeStr = 'UPDATE';
        break;
    }
    return typeStr;
  }
}

export enum NotifType {
  INFO = 1,
  SUCCESS = 2,
  WARNING = 3,
  ERROR = 4,
  UPDATE = 5
}
