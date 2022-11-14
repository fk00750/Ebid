import path, { resolve } from "path";
import fs from "fs";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const pathToKey = path.join(__dirname, "../..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

const generatePassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt(10);
    const generateHash = await hash(password, salt);

    return new Promise((resolve) => {
      resolve(generateHash);
    });
  } catch (error) {
    throw error;
  }
};

const checkPasswordValid = async (
  currentPassword: string,
  userPassword: string
): Promise<boolean> => {
  try {
    const match = await compare(currentPassword, userPassword);

    if (!match) {
      console.log("Wrong Credentials");
    }

    return new Promise((resolve) => {
      resolve(match);
    });
  } catch (error) {
    throw error;
  }
};

const issueJWT = function (user: any) {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn: expiresIn,
  };
};

export { generatePassword, checkPasswordValid , issueJWT};
