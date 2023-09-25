import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, request }) => {
  try {
    const data = await fetch("http://localhost:3000", {
      headers: request.headers,
    });
  } catch (error) {
    console.log(error);
  }
  return {};
};
