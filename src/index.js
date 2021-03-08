import { ApolloServer } from 'apollo-server';
// const gql = require('graphql-tag')
import mongoose from 'mongoose'

import { typeDefs } from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'
import config from '../config.js'



const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(config.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MONGODB connected.")
    return server.listen({ port: 5000 })
}).then(res => {
    console.log(`Server running at ${res.url}`)
})

