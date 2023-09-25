import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, request }) => {
  try {
    const data = await fetch("/api/auth", {
      headers: request.headers,
    });
    return {
      datax:data.status
    }
  } catch (error) {
    return{
      datax:400
    }
    console.log(error);
  }
  return {};
};
