export default class ProductDTO {
  constructor(
    title,
    description,
    price,
    thumbnail,
    status,
    code,
    stock,
    category,
  ) {
    this.title = title || "Title not found";
    this.description = description || "Description not found";
    this.price = price || 0;
    this.thumbnail =
      thumbnail ||
      "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png";
    this.status = status || true;
    this.code = code || "Code not found";
    this.stock = stock || 0;
    this.category = category || "Category not found";
  }
}
