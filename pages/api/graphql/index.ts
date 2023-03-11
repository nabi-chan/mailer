import { createYoga } from "graphql-yoga";

import { builder } from "schema/builder";

export const schema = builder.toSchema();

export default createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});
