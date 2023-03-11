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

export class Inbox {
  id: string;
  name: string;
  mails: Mail[];
  length: number;

  constructor(id: string, name: string, mails: Mail[]) {
    this.id = id;
    this.name = name;
    this.mails = mails;
    this.length = mails.length;
  }
}
