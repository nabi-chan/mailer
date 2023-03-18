import { InboxFetcher } from "fetcher/inbox";
import { InboxList } from "gql/enum";
import { Inbox, InboxCount, Mail } from "gql/interface";

import { builder } from "../builder";

const inbox = new InboxFetcher();

builder.queryField("inboxes", (t) =>
  t.field({
    type: [Inbox],
    resolve: async () => {
      const response = await inbox.getBoxMeta();

      return response;
    },
  }),
);

builder.queryField("inbox", (t) =>
  t.field({
    type: Inbox,
    args: {
      name: t.arg({ type: "String", required: true }),
    },
    resolve: async (_, args) => {
      const response = await inbox.getBoxMeta();
      return response.find((item) => item.name === args.name)!;
    },
  }),
);

builder.objectField(Inbox, "mails", (t) =>
  t.field({
    type: [Mail],
    args: {
      messageId: t.arg.string(),
      from: t.arg.string(),
      to: t.arg.stringList(),
      subject: t.arg.string(),
      content: t.arg.string(),
    },
    resolve: async (parent) => {
      const mails = await inbox.getBoxMails(parent.path as string, 1, 10);
      return mails;
    },
  }),
);

builder.objectField(Inbox, "count", (t) =>
  t.field({
    type: InboxCount,
    resolve: () => ({
      unread: 0,
      total: 0,
    }),
  }),
);
