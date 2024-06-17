import httpStatus from 'http-status';
import prisma from '../lib/database';
import ApiError from '../lib/utils/ApiError';
import OrderService from './order';
import ProductService from './product';

export default class OrderItemService {
  public static async get(id: string) {
    const data = await prisma.orderItem.findFirst({ where: { id } });
    if (!data) throw new ApiError(httpStatus.NOT_FOUND, `OrderItem by id: ${id} not found!`);
    return data;
  }

  public static async getAll() {
    const datas = await prisma.orderItem.findMany();
    return datas;
  }

  public static async create<T extends Awaited<ReturnType<typeof OrderItemService.get>>>(data: T) {
    await OrderService.get(data.orderId);
    await ProductService.get(data.productId);
    return prisma.orderItem.create({ data });
  }

  public static async update<T extends Awaited<ReturnType<typeof OrderItemService.get>>>(id: string, data: T) {
    await this.get(id);
    return prisma.orderItem.update({ where: { id }, data });
  }

  public static async delete(id: string) {
    await this.get(id);
    return prisma.orderItem.delete({ where: { id } });
  }
}
