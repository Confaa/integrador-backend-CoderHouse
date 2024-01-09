export default class ProductDTO {
  constructor(product) {
    this.title = product.title || "Title not found";
    this.description = product.description || "Description not found";
    this.price = product.price || 0;
    this.thumbnail =
      product.thumbnail ||
      "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png";
    this.status = product.status || true;
    this.code = product.code || "Code not found";
    this.stock = product.stock || 0;
    this.category = product.category || "Category not found";
  }
}
