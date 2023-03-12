import { InboxFetcher } from "fetcher/inbox";
import { InboxList } from "gql/enum";
import { Inbox, InboxCount, Mail } from "gql/interface";

import { builder } from "../builder";

const inbox = new InboxFetcher();

builder.queryField("inboxes", (t) =>
  t.field({
    type: [Inbox],
    resolve: async () => {
      await inbox.connect();
      const meta = await inbox.getBoxMeta();
      await inbox.disconnect();

      return Object.entries(meta).map(([key, value]) => ({
        type: key as InboxList,
        ...value,
      }));
    },
  }),
);

builder.queryField("inbox", (t) =>
  t.field({
    type: Inbox,
    args: {
      type: t.arg({ type: InboxList, required: true }),
    },
    resolve: async (_, args) => {
      await inbox.connect();
      const meta = await inbox.getBoxMeta();
      await inbox.disconnect();

      return {
        type: args.type,
        ...meta[args.type],
      };
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
      await inbox.connect();
      const mails = await inbox.getBoxMails(parent.path as string, 1, 10);
      await inbox.disconnect();
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
