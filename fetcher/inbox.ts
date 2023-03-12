import { Folder } from "imap";

import { InboxList } from "gql/enum";
import { Imap } from "utils/imap";

export class InboxFetcher extends Imap {
  constructor() {
    super();
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
