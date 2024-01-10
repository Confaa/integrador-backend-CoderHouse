import passport from "passport";
import jwt, { ExtractJwt } from "passport-jwt";
import envConfig from "./env.config.js";

const JWTStrategy = jwt.Strategy;
const initPassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: envConfig.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token ?? null;
  }
  return token;
};

export default initPassport;
