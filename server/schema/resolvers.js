const {UserList, MovieList} = require("../fakeData");
const _find = require("lodash/find");
const _includes = require("lodash/includes");
const _filter = require("lodash/filter");
const _remove = require("lodash/remove");
const _lowercase = require("lodash/lowercase");
const _toLower = require("lodash/toLower");

const resolvers = {
    Query: {
        users: (parent, args, context, info) => {
            // console.log(context.req.headers);
            if (UserList) return { result: UserList }

            return { message: "Error query users" };
        },
        user: (parent, args, context, info) => {
            const id = args.id;
            const user = _find(UserList, (v) => { return v.id === Number(id); });
            return user;
        },

        movies: (parent, args, context, info) => {
            if (MovieList) return { result: MovieList }

            return { message: "Error query movies" };
        },
        movie: (parent, args, context, info) => {
            const name = _lowercase(args.name);
            const movie = _find(MovieList, (v) => { return _includes(_toLower(v.name), name); });
            if (movie) {
                return movie;
            }
            return null;
        }
    },

    User: {
        favoriteMovies: (parent) => {
            return _filter(MovieList, (movie) => {
                return movie.yearOfPublish >= 2000 && movie.yearOfPublish <= 2010;
            });
        }
    },

    Mutation: {
        addUser: (parent, args, context, info) => {
            const user = args.input;
            const generatedId = UserList[UserList.length - 1].id + 1;

            user.id = generatedId;
            UserList.push(user);
            return user;
        },

        updateUser: (parent, args, context, info) => {
            const {id, username, name} = args.input;
            let updated;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.name = name;
                    user.username = username;
                    updated = user;
                }
            });

            return updated;
        },

        deleteUser: (parent, args, context, info) => {
            const id = args.id;
            let deleted = _remove(UserList, (v) => { return v.id === Number(id); });
            if (deleted && deleted.length > 0) {
                return true;
            }
            return false;
        }
    },

    UsersResult: {
        __resolveType(obj) {
            if (obj.result) {
                return "UsersSuccess";
            }
            if (obj.message) {
                return "CommonError";
            }
        }
    },
    MoviesResult: {
        __resolveType(obj) {
            if (obj.result) {
                return "MoviesSuccess";
            }
            if (obj.message) {
                return "CommonError";
            }
        }
    },
};

module.exports = { resolvers };