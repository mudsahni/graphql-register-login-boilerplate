import postResolvers from './posts.js'
import userResolvers from './users.js'

const resolvers = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}
export default resolvers