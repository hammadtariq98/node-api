const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user");

// console.log(process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'))
// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
opts.secretOrKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8Mh+UONZp27",
//   algorithms: ['RS256']

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        console.log(jwt_payload, done);
        
        // We will assign the `sub` property on the JWT to the database ID of user
        User.findOne({_id: jwt_payload._id}, (err, user) => {
        console.log(err, user);
            // This flow look familiar?  It is the same as when we implemented
            // the `passport-local` strategy
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            
        });
        
    }));
}