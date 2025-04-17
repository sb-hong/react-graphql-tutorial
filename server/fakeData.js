const UserList = [
    {
        id: 1,
        name: "John",
        username: "john",
        age: 20,
        nationality: "CANADA",
        friends: [{
            id: 2,
            name: "Pedro",
            username: "PedroTech",
            age: 20,
            nationality: "BRAZIL"
        }, {
            id: 4,
            name: "Sheng Bao",
            username: "zach",
            age: 35,
            nationality: "MALAYSIA"
        }]
    },
    {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL"
    },
    {
        id: 3,
        name: "Sarah",
        username: "cameron",
        age: 25,
        nationality: "UNITED_STATES",
        friends: [{
            id: 6,
            name: "Win Juin",
            username: "wj",
            age: 34,
            nationality: "CAMBODIA"
        }]
    },
    {
        id: 4,
        name: "Sheng Bao",
        username: "zach",
        age: 35,
        nationality: "MALAYSIA"
    },
    {
        id: 5,
        name: "Chun Hoong",
        username: "darren",
        age: 35,
        nationality: "THAILAND"
    },
    {
        id: 6,
        name: "Win Juin",
        username: "wj",
        age: 34,
        nationality: "CAMBODIA"
    },
];

const MovieList = [
    {
        id: 1,
        name: "Avengers Endgame",
        yearOfPublish: 2019,
        isInTheaters: true
    },
    {
        id: 2,
        name: "Interstellar",
        yearOfPublish: 2007,
        isInTheaters: true
    },
    {
        id: 3,
        name: "Superbad",
        yearOfPublish: 2009,
        isInTheaters: true
    },
    {
        id: 4,
        name: "Macam Tech The Movie",
        yearOfPublish: 2026,
        isInTheaters: false
    }
];

module.exports = { UserList, MovieList };