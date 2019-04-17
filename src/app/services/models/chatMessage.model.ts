export class ChatMessage {
  public  $key?: string;
  public email?: string;
  public userName?: string;
  public message?: string;
  public timeSent?: Date = new Date();

  constructor($key: string, email: string, userName: string, message: string,
              timeSent: any) {
    this.$key = $key;
    this.email = email;
    this.userName = userName;
    this.message = message;
    this.timeSent = timeSent;
  }

}
