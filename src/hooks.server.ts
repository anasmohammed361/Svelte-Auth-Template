import { SvelteKitAuth } from "@auth/sveltekit";
import clientPromise from "$lib/Auth/adapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "@auth/core/providers/google"
export const handle = SvelteKitAuth({
  providers: [],
  adapter: MongoDBAdapter(clientPromise),
});
