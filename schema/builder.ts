import SchemaBuilder from "@pothos/core";

import { InboxFetcher } from "fetcher/inbox";

import { Inbox, Mail } from "./interface";

export const builder = new SchemaBuilder({});

builder.objectType(Mail, {
  name: "Mail",
  fields: (t) => ({
    messageId: t.exposeString("messageId"),
    from: t.exposeString("from"),
    to: t.exposeStringList("to"),
    subject: t.exposeString("subject"),
    content: t.exposeString("content"),
  }),
});

builder.objectType(Inbox, {
  name: "Inbox",
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    mails: t.expose("mails", { type: [Mail] }),
    length: t.exposeInt("length"),
  }),
});

const inbox = new InboxFetcher();

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "world",
    }),
    mail: t.field({
      type: Mail,
      args: {
        messageId: t.arg.string({ required: true }),
      },
      resolve: (_, { messageId }) => new Mail(messageId, "me@me.com", ["you@you.com"], "Hello", "World"),
    }),
    inboxes: t.field({
      type: [Inbox],
      resolve: () => inbox.inboxesResolver(),
    }),
    inbox: t.field({
      type: Inbox,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, { id }) => inbox.inboxResolver(id),
    }),
  }),
});
