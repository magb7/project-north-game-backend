const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { connection } = require("./conf");
passport.use(
  new LocalStrategy(
    {
      usernameField: "mail",
      passwordField: "password",
    },
    async (formMail, formPass, done) => {
      let user;
      try {
        const [
          res,
        ] = await connection.query(
          "SELECT id, mail, password FROM user WHERE mail=?",
          [formMail]
        );
        if (!res.length) {
          return done(null, false, {
            msg: "Incorrect user!",
          });
        }
        // Get user information
        user = res[0];
        // Compare password
        const isPasswordOk = bcrypt.compareSync(formPass, user.password);
        // handle error
        if (!isPasswordOk) {
          return done(null, false, {
            msg: "Incorrect password !",
          });
        }
      } catch (err) {
        console.log(err.sql);
        console.error(err.message);
        return done(err);
      }
      return done(null, { ...user });
    }
  )
);
