import ImapModule from "imap";

export class Imap {
  imap: ImapModule;
  connected: boolean = false;

  constructor() {
    if (!process.env.GMAIL_USER) throw new Error("GMAIL_USER not set");
    if (!process.env.GMAIL_PASS) throw new Error("GMAIL_PASS not set");
    this.imap = new ImapModule({
      user: process.env.GMAIL_USER,
      password: process.env.GMAIL_PASS,
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: { servername: "imap.gmail.com" },
    });
  }

  async connect(): Promise<void> {
    if (this.connected) console.log("Already connected");
    return new Promise((resolve) => {
      this.imap.once("ready", () => {
        this.connected = true;
        resolve();
      });
      this.imap.connect();
    });
  }

  async disconnect(): Promise<void> {
    if (!this.connected) throw new Error("Not connected");
    return new Promise((resolve) => {
      this.imap.once("end", () => {
        this.connected = false;
        resolve();
      });
      this.imap.end();
    });
  }
}
