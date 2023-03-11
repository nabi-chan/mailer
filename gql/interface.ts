import { builder } from "./builder";

export const Mail = builder.simpleObject("Mail", {
  fields: (t) => ({
    messageId: t.string(),
    from: t.string(),
    to: t.stringList(),
    subject: t.string(),
    content: t.string(),
  }),
});

export const InboxCount = builder.simpleObject("InboxCount", {
  fields: (t) => ({
    unread: t.int(),
    total: t.int(),
  }),
});

export const Inbox = builder.simpleObject("Inbox", {
  fields: (t) => ({
    id: t.string(),
    name: t.string(),
    mail: t.field({ type: [Mail] }),
    count: t.field({
      type: InboxCount,
    }),
  }),
});
