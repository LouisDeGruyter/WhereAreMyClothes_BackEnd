module.exports = {
    log: {
        level: 'silly',
        disabled: false,
    },
    cors:{
        origins: ['https://wherearemyclothes.onrender.com'],
        maxAge: 3*60*60,
    },
    initialezeDatabaseParameters:{
        force: false,
        alter: true
    }
};