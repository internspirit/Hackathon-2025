


import { expressjwt } from "express-jwt";
import jwks from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
}).unless({ path: ["/api/auth/login"] }); // Public route for login

export default authMiddleware;
