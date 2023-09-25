import { SvelteKitAuth } from "@auth/sveltekit";
import clientPromise from "$lib/server/Auth/adapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import {
  AUTH_SECRET,
  EMAIL_FROM,
  EMAIL_SERVER_HOST,
  EMAIL_SERVER_PASSWORD,
  EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER,
  GOOGE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "$env/static/private";
import Google from "@auth/core/providers/google";
import Email from "@auth/core/providers/email";
import { sendVerificationRequest } from "$lib/server/Auth/emailBuiltin";
import { SignJWT, jwtVerify } from "jose";

export const handle = SvelteKitAuth({
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  providers: [
    Google({
      clientId: GOOGE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Email({
      id: "email",
      name: "email",
      type: "email",
      server: {
        host: EMAIL_SERVER_HOST,
        port: Number(EMAIL_SERVER_PORT),
        auth: {
          user: EMAIL_SERVER_USER,
          pass: EMAIL_SERVER_PASSWORD,
        },
        from: EMAIL_FROM,
      },
      sendVerificationRequest: sendVerificationRequest,
    }),
  ],
  secret: AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/auth/",
  },
  jwt: {
    async encode({ token, secret, maxAge }): Promise<string> {
      const sec = new TextEncoder().encode(secret);
      const signedToken = new SignJWT(token as any)
        .setProtectedHeader({ alg: "HS256" })
        .sign(sec);
      console.log(signedToken);

      return signedToken;
    },
    async decode({ token, secret }) {
      const sec = new TextEncoder().encode(secret);
      const { payload, protectedHeader } = await jwtVerify(token!, sec);
      console.log({ token, secret });

      console.log(payload);
      return payload;
    },
  },
});
