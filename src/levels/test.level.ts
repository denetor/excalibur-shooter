export const TestLevel = {

    // cell size
    cell: {
        x: 80,
        y: 80,
    },

    // actors to be spawned and their position
    actors: [
        // a test smart saucer
        { type: 'smartsaucer', x: 2, y: 3 },

        // V formation of 6 saucers
        { type: 'saucer', x: 2, y: 12 },
        { type: 'saucer', x: 3, y: 11 },
        { type: 'saucer', x: 4, y: 10 },
        { type: 'saucer', x: 5, y: 10 },
        { type: 'saucer', x: 6, y: 11 },
        { type: 'saucer', x: 7, y: 12 },

        // an asteroid
        {type: 'asteroid', x: 7, y: 15},

        // some single saucers
        {type: 'saucer', x: 5, y: 20},
        {type: 'saucer', x: 2, y: 22},
        {type: 'saucer', x: 8, y: 25},

        // little asteroid field
        {type: 'asteroid', x: 3, y: 30},
        {type: 'asteroid', x: 5, y: 31},
        {type: 'asteroid', x: 3, y: 32},
        {type: 'asteroid', x: 9, y: 33},
        {type: 'asteroid', x: 4, y: 34},
        {type: 'asteroid', x: 8, y: 35},
        {type: 'asteroid', x: 7, y: 36},
        {type: 'asteroid', x: 2, y: 37},
        {type: 'asteroid', x: 6, y: 38},
    ],
};