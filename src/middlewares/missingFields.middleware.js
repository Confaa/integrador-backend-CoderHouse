export const missingFields = (req, res, next) => {
  const { title, description, price, code, stock, category } = req.body;
  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).json({ message: "Missing fields" });
  }
  next();
};
