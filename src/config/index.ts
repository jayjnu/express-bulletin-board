const DB_CONFIG = process.env.CLEARDB_DATABASE_URL || require('./secret.json').db_secret;

export default {
  DB_CONFIG,
  session: {
    cookie: {
      maxAge: 10 * 60 * 1000
    },
    secret: 'hello',
    resave: false, // See if my session store supports 'touch' method. If it does, set it to false
    saveUninitialized: true
  },
  passport: {
    strategies: {
      local: {
        usernameField: 'userId',
        passwordField: 'userPass',
        passReqToCallback: true
      }
    }
  }
};