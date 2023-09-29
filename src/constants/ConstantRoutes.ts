export const ConstantRoutes = {
  baseUrl: "/api",
  test: {
    getTests: "/tests",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/create",
    refreshToken: "/auth/refresh/token",
    forgotPassword: "/auth/forgotpassword",
    resetPassword: "/auth/resetpassword/:resetToken",
    changePassword: "/auth/changepassword",
  },
  user: {
    getRoute: "/users",
    postRoute: "/user",
    putRoute: "/user/:id",
    deleteRoute: "/user/:id",
    getSingleRoute: "/user/:id",
  },
};
