import { Folder } from "imap";
import { simpleParser } from "mailparser";

import { InboxList } from "gql/enum";
import { Mail } from "gql/interface";
import { Imap } from "utils/imap";

export class InboxFetcher extends Imap {
  constructor() {
    super();
  }

  async getBoxMails(path: string, start: number, end: number | string) {
    return new Promise<{ messageId: string; from: string; to: string[]; subject: string; content: string }[]>(
      (resolve, reject) => {
        this.imap.openBox(path, true, (err, mailbox) => {
          if (err) reject(err);
          const f = this.imap.seq.fetch(`${start}:${end}`, {
            bodies: [""],
            struct: true,
          });
          const mails: { messageId: string; from: string; to: string[]; subject: string; content: string }[] = [];
          f.on("message", (msg) => {
            msg.on("body", async (stream) => {
              simpleParser(stream, async (err, parsed) => {
                if (err) reject(err);
                mails.push({
                  messageId: parsed.messageId!,
                  from: parsed.from?.value[0].address!,
                  to: Array.isArray(parsed.to) ? [] : parsed.to!.value.map((to) => to.address!),
                  subject: parsed.subject!,
                  content: parsed.html ? parsed.html! : parsed.text!,
                });
              });
            });
            f.on("end", () => {
              resolve(mails);
            });
          });
        });
      },
    );
  }

  // TODO: Improve speed (currently takes 3.0s)
  async getBoxMeta(): Promise<{ [key in InboxList]: { name: string; path: string } }> {
    function transformMailboxes(
      mailboxes: Record<string, Folder>,
    ): { name: string; path: string; attribs: string[] }[] {
      return Object.entries(mailboxes).reduce(
        (result: { name: string; path: string; attribs: string[] }[], [name, mailbox]) => {
          return mailbox.children
            ? [
                ...result,
                ...Object.entries(mailbox.children).map(([childName, childMailbox]) => {
                  return { path: `${name}/${childName}`, name: childName, attribs: childMailbox.attribs };
                }),
              ]
            : [...result, { name, path: name, attribs: mailbox.attribs }];
        },
        [],
      );
    }

    return new Promise((resolve, reject) =>
      this.imap.getBoxes((err, boxes) => {
        if (err) return reject(err);
        const inboxes = transformMailboxes(boxes);
        resolve({
          [InboxList.INBOX]: {
            path: inboxes.find((inbox) => inbox.name === "INBOX")?.path || "unknown",
            name: inboxes.find((inbox) => inbox.name === "INBOX")?.name || "unknown",
          },
          [InboxList.SENT]: {
            path: inboxes.find((inbox) => inbox.attribs.includes("\\Sent"))?.path || "unknown",
            name: inboxes.find((inbox) => inbox.attribs.includes("\\Sent"))?.name || "unknown",
          },
          [InboxList.TRASH]: {
            path: inboxes.find((inbox) => inbox.attribs.includes("\\Trash"))?.path || "unknown",
            name: inboxes.find((inbox) => inbox.attribs.includes("\\Trash"))?.name || "unknown",
          },
        });
      }),
    );
  }
}
