import SchemaBuilder from "@pothos/core";

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
      resolve: () => [
        new Inbox("1", "inbox1", [new Mail("1", "me@me.com", ["you@you.com"], "Hello", "World")]),
        new Inbox("2", "inbox2", [new Mail("2", "me@me.com", ["you@you.com"], "Hello", "World")]),
      ],
    }),
    inbox: t.field({
      type: Inbox,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, { id }) => new Inbox(id, "inbox1", [new Mail("1", "me@me.com", ["you@you.com"], "Hello", "World")]),
    }),
  }),
});
