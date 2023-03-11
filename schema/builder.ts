import SchemaBuilder from "@pothos/core";

import { Mail } from "./interface";

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

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "world",
    }),
    mails: t.field({
      type: [Mail],
      resolve: () => [
        new Mail("1", "me@me.com", ["you@you.com"], "Hello", "World"),
        new Mail("2", "me@me.com", ["you@you.com"], "Hello", "World"),
        new Mail("3", "me@me.com", ["you@you.com"], "Hello", "World"),
      ],
    }),
    mail: t.field({
      type: Mail,
      args: {
        messageId: t.arg.string({ required: true }),
      },
      resolve: (_, { messageId }) => new Mail(messageId, "me@me.com", ["you@you.com"], "Hello", "World"),
    }),
  }),
});
