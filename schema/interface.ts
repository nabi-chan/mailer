export class Mail {
  messageId: string;
  from: string;
  to: string[];
  subject: string;
  content: string;

  constructor(messageId: string, from: string, to: string[], subject: string, content: string) {
    this.messageId = messageId;
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.content = content;
  }
}
