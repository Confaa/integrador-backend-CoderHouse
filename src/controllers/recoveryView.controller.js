export const getForgotPasswordPage = async (req, res) => {
  const { failToken } = req.query;
  res.render("forgotPassword", { failToken });
};

export const getChangePasswordPage = async (req, res) => {
  const { token } = req.params;
  res.render("changePassword", { token });
};
