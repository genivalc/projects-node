const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Definição do Schema GraphQL
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
  }
`);

// Funções para gerar dados fictícios
const generateFakeUsers = () => {
  return [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 3, name: "Alice Smith", email: "alice@example.com" },
    { id: 4, name: "Bob Johnson", email: "bob@example.com" },
    { id: 5, name: "Eve Wilson", email: "eve@example.com" }
  ];
};

const generateFakePosts = (users) => {
  return [
    { id: 1, title: "First Post", content: "This is the content of the first post.", author: users[0] },
    { id: 2, title: "Second Post", content: "This is the content of the second post.", author: users[1] },
    { id: 3, title: "Third Post", content: "This is the content of the third post.", author: users[2] },
    { id: 4, title: "Fourth Post", content: "This is the content of the fourth post.", author: users[3] },
    { id: 5, title: "Fifth Post", content: "This is the content of the fifth post.", author: users[4] }
  ];
};

// Dados fictícios
const fakeUsers = generateFakeUsers();
const fakePosts = generateFakePosts(fakeUsers);

// Resolvers
const root = {
  users: () => fakeUsers,
  posts: () => fakePosts,
};

// Inicialização do Express
const app = express();

// Rota GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Ativa o GraphiQL para teste
}));

// Inicialização do servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
