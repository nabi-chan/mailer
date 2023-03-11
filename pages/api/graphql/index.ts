import { createYoga } from "graphql-yoga";

import schema from "gql";

export default createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});
