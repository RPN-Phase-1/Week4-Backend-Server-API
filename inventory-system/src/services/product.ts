import httpStatus from 'http-status';
import prisma from '../lib/database';
import ApiError from '../lib/utils/ApiError';
import UserService from './user';
import CategoryService from './category';

export default class ProductService {
  public static async get(id: string) {
    const data = await prisma.product.findFirst({ where: { id } });
    if (!data) throw new ApiError(httpStatus.NOT_FOUND, `Product by id: ${id} not found!`);
    return data;
  }

  public static async getAll({ pageSize, pageIndex }: { pageIndex: number; pageSize: number }) {
    const datasSize = Math.max(await prisma.product.count());
    const numOfPages = Math.ceil(datasSize / Math.min(pageSize, datasSize));
    const index = Math.min(pageIndex, numOfPages);
    const skip = (index - 1) * pageSize;
    const datas = await prisma.product.findMany({ take: pageSize, skip });
    return {
      index,
      numOfPages,
      datas,
    };
  }

  public static async create<T extends Awaited<ReturnType<typeof ProductService.get>>>(data: T) {
    await UserService.getId(data.userId);
    await CategoryService.get(data.categoryId);
    return prisma.product.create({ data });
  }

  public static async update<T extends Awaited<ReturnType<typeof ProductService.get>>>(id: string, data: T) {
    await this.get(id);
    return prisma.product.update({ where: { id }, data });
  }

  public static async delete(id: string) {
    await this.get(id);
    return prisma.product.delete({ where: { id } });
  }

  public static async getProductItems(id: string) {
    await this.get(id);
    return prisma.orderItem.findMany({ where: { productId: id } });
  }

  public static async searchByCategory(name: string) {
    const results = await prisma.category.findFirst({ where: { name }, select: { products: true } });
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Category with name: ${name} not found`);
    return results.products;
  }
}
