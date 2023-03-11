import { builder } from "../builder";

builder.queryField("hello", (t) =>
  t.field({
    type: "String",
    resolve: () => "world",
  }),
);
