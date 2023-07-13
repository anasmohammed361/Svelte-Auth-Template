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


export const handle = SvelteKitAuth({
  providers: [
    Google({
      clientId: GOOGE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Email({
      id:'email',
      name:'email',
      type:"email",
      server:{
        host:EMAIL_SERVER_HOST,
        port:Number(EMAIL_SERVER_PORT),
        auth:{
          user:EMAIL_SERVER_USER,
          pass:EMAIL_SERVER_PASSWORD
        },
        from:EMAIL_FROM
      },
      sendVerificationRequest: sendVerificationRequest
    }),
  ],
  secret: AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/auth/",
  },
});
