module.exports= {
    env: 'NODE_ENV',
    port:'PORT',
    auth:{
        jwksUri:'AUTH_JWKS_URI',
        audience:'AUTH_AUDIENCE',
        issuer:'AUTH_ISSUER',
        userInfo:'AUTH_USER_INFO',
        testUser:{
            username:'AUTH_TEST_USER_USERNAME',
            userId : 'AUTH_TEST_USER_USERID',
            password:'AUTH_TEST_USER_PASSWORD',
        },
    },
};