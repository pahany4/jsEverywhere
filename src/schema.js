
const { gql } = require('apollo-server-express');

// Строим схему с помощью языка схем GraphQL
module.exports = gql`
scalar DateTime
type Note {
id: ID!
content: String!
author: String!
createdAt: DateTime!
updatedAt: DateTime!
}
type Query {
notes: [Note!]!
note(id: ID!): Note!
}
type Mutation {
newNote(content: String!): Note!
updateNote(id: ID!, content: String!): Note!
deleteNote(id: ID!): Boolean!
}
`;