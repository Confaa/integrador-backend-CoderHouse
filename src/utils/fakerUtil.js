import { faker } from "@faker-js/faker";
import { productService, cartService } from "../dao/repositories/index.js";

export const generateProducts = async () => {
  for (let i = 0; i < 10; i++) {
    await productService.addProduct({
      id: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.float({ min: 1, max: 1000 }),
      thumbnail: faker.string.uuid(),
      code: faker.internet.password(),
      stock: faker.number.int({ min: 0, max: 100 }),
      status: faker.datatype.boolean(),
      category: faker.commerce.department(),
    });
  }
};

export const generateCarts = async () => {
  for (let i = 0; i < 10; i++) {
    await cartService.addCart([
      {
        product: faker.string.uuid(),
        quantity: faker.number.int({ min: 1, max: 10 }),
      },
    ]);
  }
};

export const generateId = () => {
  return faker.string.uuid();
};
