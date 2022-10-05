var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var auth_exports = {};
__export(auth_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(auth_exports);
var import_api = require("@redwoodjs/api");
var import_db = require("../lib/db");
const nodemailer = require("nodemailer");
const handler = async (event, context) => {
  const forgotPasswordOptions = {
    handler: async (user) => {
      try {
        let transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
        const resetLink = `${process.env.APP_URL}/reset-password?resetToken=${user.resetToken}`;
        const message = {
          from: process.env.AUTH_EMAIL_FROM,
          to: user.email,
          subject: "Reset Forgotten Password",
          html: `Click on the link below to reset your password. It will expire after 24hrs. <p><a href="${resetLink}">Reset Password</a></p><p>or copy and paste the link below into a web browser:</p><p>${resetLink}</p>`
        };
        await transporter.sendMail(message);
      } catch (err) {
        console.log(err);
        logger.error(err);
      }
      return user;
    },
    expires: 60 * 60 * 24,
    errors: {
      usernameNotFound: "If an account exists, an email will be sent to reset your password in the next few minutes. Please check your spam/junk folder if you don't see it in your inbox.",
      usernameRequired: "If an account exists, an email will be sent to reset your password in the next few minutes. Please check your spam/junk folder if you don't see it in your inbox."
    }
  };
  const loginOptions = {
    handler: (user) => {
      return user;
    },
    errors: {
      usernameOrPasswordMissing: "Invalid credentials",
      usernameNotFound: "Invalid credentials",
      incorrectPassword: "Invalid credentials"
    },
    expires: 60 * 60 * 24 * 365 * 10
  };
  const resetPasswordOptions = {
    handler: (_user) => {
      return true;
    },
    allowReusedPassword: true,
    errors: {
      resetTokenExpired: "resetToken is expired",
      resetTokenInvalid: "resetToken is invalid",
      resetTokenRequired: "resetToken is required",
      reusedPassword: "Must choose a new password"
    }
  };
  const signupOptions = {
    handler: ({
      username,
      hashedPassword,
      salt,
      userAttributes
    }) => {
      return import_db.db.user.create({
        data: {
          email: username,
          hashedPassword,
          salt
        }
      });
    },
    errors: {
      fieldMissing: "${field} is required",
      usernameTaken: '"${username}" already in use'
    }
  };
  const authHandler = new import_api.DbAuthHandler(event, context, {
    db: import_db.db,
    authModelAccessor: "user",
    credentialModelAccessor: "userCredential",
    authFields: {
      id: "id",
      username: "email",
      hashedPassword: "hashedPassword",
      salt: "salt",
      resetToken: "resetToken",
      resetTokenExpiresAt: "resetTokenExpiresAt",
      challenge: "webAuthnChallenge"
    },
    cookie: {
      HttpOnly: true,
      Path: "/",
      SameSite: "Strict",
      Secure: process.env.NODE_ENV !== "development" ? true : false
    },
    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions,
    webAuthn: {
      enabled: true,
      expires: 60 * 60 * 24 * 365 * 10,
      name: "Redwood Application",
      domain: process.env.NODE_ENV === "development" ? "localhost" : "server.com",
      origin: process.env.NODE_ENV === "development" ? "http://localhost:8910" : "https://server.com",
      type: "platform",
      timeout: 6e4,
      credentialFields: {
        id: "id",
        userId: "userId",
        publicKey: "publicKey",
        transports: "transports",
        counter: "counter"
      }
    }
  });
  return await authHandler.invoke();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=auth.js.map
