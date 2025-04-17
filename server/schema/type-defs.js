const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        favoriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublish: Int!
        isInTheaters: Boolean!
    }

    ### input ###
    input AddUserInput {
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = BRAZIL
    }

    input UpdateUserInput {
        id: ID!
        username: String!
        name: String!
    }

    ### enum ###
    enum Nationality {
        CANADA
        BRAZIL
        UNITED_STATES
        MALAYSIA
        THAILAND
        CAMBODIA
        UKRAINE
    }

    ### union ###
    type UsersSuccess {
        result: [User!]!
    }
    type MoviesSuccess {
        result: [Movie!]!
    }
    type CommonError {
        message: String!
    }

    union UsersResult = UsersSuccess | CommonError
    union MoviesResult = MoviesSuccess | CommonError

    type Query {
        users: UsersResult
        user(id: ID!): User!
        movies: MoviesResult
        movie(name: String!): Movie
    }

    type Mutation {
        addUser(input: AddUserInput!): User!
        updateUser(input: UpdateUserInput!): User!
        deleteUser(id: ID!): Boolean
    }
`;

module.exports = { typeDefs };