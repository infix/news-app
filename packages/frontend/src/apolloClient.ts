import ApolloClient from "apollo-boost";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});
