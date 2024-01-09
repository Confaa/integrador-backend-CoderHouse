export const loginPage = (req, res) => {
  const { failSession, logout } = req.query;
  res.render("login", {
    title: "Login",
    failSession,
    logout,
  });
};

export const registerPage = (req, res) => {
  res.render("register", {
    title: "Register",
  });
};

export const getUserCurrentPage = async (req, res) => {
  res.render("current", {
    title: "Current User",
    user: req.user,
  });
};
