import gql from 'graphql-tag'

export const typeDefs = gql`
    type Post {
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!
    }
    type Query{
        getPosts: [Post]
    }

    type User {
        id: ID!,
        email: String!,
        token: String!,
        username: String!,
        createdAt: String!
    }

    input RegisterInput {
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`
