import httpStatus from 'http-status';
import prisma from '../lib/database';
import ApiError from '../lib/utils/ApiError';
import UserService from './user';

export default class OrderService {
  public static async get(id: string) {
    const data = await prisma.order.findFirst({ where: { id } });
    if (!data) throw new ApiError(httpStatus.NOT_FOUND, `Order by id: ${id} not found!`);
    return data;
  }

  public static async getAll({ pageSize, pageIndex }: { pageIndex: number; pageSize: number }) {
    const datasSize = await prisma.order.count();
    const numOfPages = Math.ceil(datasSize / pageSize);
    const index = Math.min(pageIndex, numOfPages);
    const skip = Math.min(datasSize, (index - 1) * numOfPages);
    const datas = await prisma.order.findMany({ take: pageSize, skip });
    return {
      index,
      numOfPages,
      datas,
    };
  }

  public static async create<T extends Awaited<ReturnType<typeof OrderService.get>>>(data: T) {
    await UserService.getId(data.userId);
    return prisma.order.create({ data });
  }

  public static async update<T extends Awaited<ReturnType<typeof OrderService.get>>>(id: string, data: T) {
    await this.get(id);
    return prisma.order.update({ where: { id }, data });
  }

  public static async delete(id: string) {
    await this.get(id);
    return prisma.order.delete({ where: { id } });
  }

  public static async getOrderItems(id: string) {
    await this.get(id);
    return prisma.orderItem.findMany({ where: { orderId: id } });
  }
}
