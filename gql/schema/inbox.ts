import { InboxFetcher } from "fetcher/inbox";
import { Inbox } from "gql/interface";

import { builder } from "../builder";

const inbox = new InboxFetcher();

builder.queryField("inboxes", (t) =>
  t.field({
    type: [Inbox],
    resolve: () => inbox.inboxesResolver(),
  }),
);

builder.queryField("inbox", (t) =>
  t.field({
    type: Inbox,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => inbox.inboxResolver(args.id),
  }),
);
