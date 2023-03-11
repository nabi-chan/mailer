import SchemaBuilder from "@pothos/core";

export const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "world",
    }),
  }),
});
