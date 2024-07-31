/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
// NOTE you must replace DATABASE_ENV url before running this;

import { createFakeUser, insertUsers } from '../test/fixtures/user.fixture';
import { getFakeProduct, getFakeCategory, insertCategory, insertProduct } from '../test/fixtures/product.fixture';
import { createFakeToken } from '../test/fixtures/token.fixture';
import { createFakeOrder, createFakeOrderItem, insertOrder, insertOrderItem } from '../test/fixtures/order.fixture';
import prisma from '../src/lib/database';
import { RouterSchema } from './payload.schema';
import Config from '../src/config/config';

export default class DocsFaker {
  public fakeAdmin = createFakeUser(true);

  public fakeAdminToken = createFakeToken(this.fakeAdmin.id);

  public fakeUsers: ReturnType<typeof createFakeUser>[] = [];

  public fakeCategories: ReturnType<typeof getFakeCategory>[] = [];

  public fakeProducts: ReturnType<typeof getFakeProduct>[] = [];

  public fakeOrders: ReturnType<typeof createFakeOrder>[] = [];

  public fakeOrderItems: ReturnType<typeof createFakeOrderItem>[] = [];

  public cachedResponse = new Map<string, any>();

  public async insertFake(size: number) {
    await Promise.all([this.insertFakeUsers(size), this.insertFakeCategories(size)]);
    await Promise.all([this.insertFakeProducts(size), this.insertFakeOrders(size)]);
    await this.insertFakeOrderItems(size);
  }

  public async req(schema: RouterSchema) {
    let url = `http://localhost:${Config.port}${schema.route}`;
    let body: undefined | Record<string, unknown>;
    const headers: Record<string, string> = {};
    headers['Content-Type'] = 'application/json';
    if (schema.level) headers.Authorization = `Bearer ${this.fakeAdminToken}`;
    if (schema.params)
      for (const p of schema.params) {
        p.example = await this.replaceExample(p.example);
        url = url.replace(`:${p.name}`, p.example);
      }
    if (schema.queries) {
      url += '?';
      const queries = [] as string[];
      for (const q of schema.queries) {
        q.example = await this.replaceExample(q.example);
        queries.push(`${q.name}=${q.example}`);
      }
      url += queries.join('&');
    }
    if (schema.body) {
      body = {};
      for (const b of schema.body) {
        b.example = await this.replaceExample(b.example);
        body[b.name] = b.example;
      }
    }

    const response = await fetch(url, {
      method: schema.method,
      body: body ? JSON.stringify(body) : null,
      headers,
    }).then((x) => x.json());

    this.cachedResponse.set(`${schema.method}-${schema.route}`, response);
    return response;
  }

  public async deleteAll() {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    await prisma.token.deleteMany();
  }

  private async replaceExample(example: unknown) {
    if (typeof example === 'string') {
      const matched = example.match(/^\{replace:(.*):(.*)\}$/);
      if (!matched) return example;
      return this.parseEscape(matched[1], matched[2]);
    }
    if (typeof example === 'function') return example(this);
    return example;
  }

  private parseEscape(collection: string, key: string) {
    switch (collection) {
      case 'user':
        return this.fakeUsers[0][key as 'id'];
      case 'category':
        return this.fakeCategories[0][key as 'id'];
      case 'order':
        return this.fakeOrders[0][key as 'id'];
      case 'orderItem':
        return this.fakeOrderItems[0][key as 'id'];
      case 'product':
        return this.fakeProducts[0][key as 'id'];
      default:
        return null;
    }
  }

  private async insertFakeUsers(size: number) {
    for (let i = 0; i < size; i += 1) this.fakeUsers.push(createFakeUser());
    await insertUsers(...this.fakeUsers, this.fakeAdmin);
  }

  private async insertFakeCategories(size: number) {
    for (let i = 0; i < size; i += 1) this.fakeCategories.push(getFakeCategory());
    await insertCategory(...this.fakeCategories);
  }

  private async insertFakeProducts(size: number) {
    for (let i = 0; i < size; i += 1) {
      const user = this.pick(this.fakeUsers, i);
      const category = this.pick(this.fakeCategories, i);
      const product = getFakeProduct(user.id, category.id, category.name);
      this.fakeProducts.push(product);
    }
    await insertProduct(...this.fakeProducts);
  }

  private async insertFakeOrders(size: number) {
    for (let i = 0; i < size; i += 1) {
      const user = this.pick(this.fakeUsers, i);
      const order = createFakeOrder(user.id, user.name, user.email);
      this.fakeOrders.push(order);
    }
    await insertOrder(...this.fakeOrders);
  }

  private async insertFakeOrderItems(size: number) {
    for (let i = size - 1; i > -1; i -= 1) {
      const order = this.pick(this.fakeOrders, i);
      const product = this.pick(this.fakeProducts, i);
      const orderItem = createFakeOrderItem(order.id, product.id, product.price);
      this.fakeOrderItems.push(orderItem);
    }
    await insertOrderItem(...this.fakeOrderItems);
  }

  private pick<T>(arr: T[], index: number) {
    return arr[index % arr.length];
  }
}
