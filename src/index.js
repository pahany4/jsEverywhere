// index.js
// This is the main entry point of our application

const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
// Запускаем сервер на порте, указанном в файле .env, или на порте 4000
const port = process.env.PORT || 4000;

let notes = [
  {id: '1', content: 'This is a note', author: 'Adam Scott'},
  {id: '2', content: 'This is another note', author: 'Harlow Everly'},
  {id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison'}
];

// Строим схему с помощью языка схем GraphQL
const typeDefs = gql`
type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
}

type Pizza {
    id: ID!
    size: String!
    slices: Int!
    toppings: [String]
}

type Note {
    id: ID!
    content: String!
    author: String!
}

type Mutation {
  newNote(content: String!): Note!
}
`;

// Предоставляем функции распознавания для полей схемы
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const app = express();
// Настраиваем Apollo Server
const server = new ApolloServer({typeDefs, resolvers});
// Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api
server.applyMiddleware({app, path: '/api'});
app.listen({port}, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);