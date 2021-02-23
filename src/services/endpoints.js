export const endpoints = {
  auth: {
    login: "/auth/login",
    signUp: "/auth/signup"
  },
  user: {
    getUser: "/user/get-user"
  },
  salon: {
    getList: "/salon/get-list",
    create: "/salon/create",
    update: "/salon/update/{:id}",
    delete: "/salon/delete/{:id}"
  }
};
