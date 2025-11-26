const ROUTES = {
   HOME: "/",
   SIGN_IN: "/sign-in",
   SIGN_UP: "/sign-up",
   // dynamic routes with the param of id
   PROFILE: (id: string) => `/profile/${id}`,
   TAGS: (id: string) => `/tags/${id}`,
};

export default ROUTES;
