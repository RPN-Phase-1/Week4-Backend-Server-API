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

  public static async getAll({ pageSize, pageIndex }: { pageIndex: number; pageSize: number }) {
    const datasSize = await prisma.orderItem.count();
    const numOfPages = Math.ceil(datasSize / Math.min(pageSize, datasSize));
    const index = Math.min(pageIndex, numOfPages);
    const skip = (index - 1) * pageSize;
    const datas = await prisma.orderItem.findMany({ take: pageSize, skip });
    return {
      index,
      numOfPages,
      datas,
    };
  }

  public static async create<T extends Awaited<ReturnType<typeof OrderItemService.get>>>(data: T) {
    await OrderService.get(data.orderId);
    const product = await ProductService.get(data.productId);
    if (product.quantityInStock < data.quantity)
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Product Quantity is less than OrderItem quantity');
    product.quantityInStock -= 1;
    await ProductService.update(data.productId, product);
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
