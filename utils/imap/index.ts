// import ImapModule from "imap";
import { ImapFlow } from "imapflow";

export class Imap {
  imap: ImapFlow;
  connected: boolean = false;

  constructor() {
    if (!process.env.GMAIL_USER) throw new Error("GMAIL_USER not set");
    if (!process.env.GMAIL_PASS) throw new Error("GMAIL_PASS not set");
    this.imap = new ImapFlow({
      host: "imap.gmail.com",
      port: 993,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async connect(): Promise<void> {
    if (this.connected) return console.log("Already connected");
    this.connected = true;
    return this.imap.connect();
  }

  async disconnect(): Promise<void> {
    if (!this.connected) throw new Error("Not connected");
    this.connected = false;
    return this.imap.logout();
  }
}
