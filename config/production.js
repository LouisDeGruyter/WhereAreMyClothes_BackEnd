module.exports = {
    log: {
        level: 'silly',
        disabled: false,
    },
    cors:{
        origins: ['https://wherearemyclothes.onrender.com','http://localhost:3000'],
        maxAge: 3*60*60,
    },
    initialezeDatabaseParameters:{
        force: false,
        alter: true
    }
};