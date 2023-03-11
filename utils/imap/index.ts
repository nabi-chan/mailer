import Imap from "imap";

if (!process.env.GMAIL_USER) throw new Error("GMAIL_USER not set");
if (!process.env.GMAIL_PASS) throw new Error("GMAIL_PASS not set");

const imap = new Imap({
  user: process.env.GMAIL_USER,
  password: process.env.GMAIL_PASS,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
});

export function getImap(): Promise<Imap> {
  return new Promise((resolve, reject) => {
    imap.once("ready", () => resolve(imap));
    imap.once("error", (err: Error) => reject(err));
    imap.once("end", () => console.log("Connection ended"));
    imap.connect();
  });
}
