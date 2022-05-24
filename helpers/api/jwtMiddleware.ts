import { expressjwt } from "express-jwt";
const util = require("util");
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const middleware = expressjwt({
    secret: "disIsJwtSecretNaja",
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/auth/login",
      "/api/auth/signup",
      "/api/auth/validateResetPasswordKey",
      "/api/auth/resetPassword",
    ],
  });

  return util.promisify(middleware)(req, res);
}
