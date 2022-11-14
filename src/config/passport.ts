import User from "../models/user";
import fs from "fs";
import path from "path";
import { PassportStatic } from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

const pathToKey = path.join(__dirname, "../..", "id_rsa_pub.pem");
const PUB_KEY: string = fs.readFileSync(pathToKey, "utf8");

const options = <StrategyOptions>{
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const LocalStrategy = async (jwt_payload: any, done: Function) => {
  console.log(jwt_payload);
  User.findOne({ _id: jwt_payload.sub }, (error: Error, user: any) => {
    if (error) return done(error, false);

    if (user) done(null, user);
    else done(null, false);
  });
};

const passportConfig = (passport: PassportStatic) => {
  passport.use(new Strategy(options, LocalStrategy));
};

export default passportConfig;
