const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const keys = require("../config/keys")

const opts = {};
opts.jwtFormRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findeOne({username:jwt_payload.sub},function(err,User){
          
      })
    })
  );
};
