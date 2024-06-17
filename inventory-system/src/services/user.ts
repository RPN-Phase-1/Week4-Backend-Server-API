import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import prisma from '../lib/database';
import ApiError from '../lib/utils/ApiError';

export default class UserService {
  public static async getId(id: string) {
    const data = await prisma.user.findFirst({ where: { id } });
    if (!data) throw new ApiError(httpStatus.NOT_FOUND, `User by id: ${id} not found!`);
    return data!;
  }

  public static async getEmail(email: string) {
    const data = await prisma.user.findUnique({ where: { email } });
    return data;
  }

  public static async getAll() {
    const datas = await prisma.user.findMany();
    return datas;
  }

  public static async create<T extends Awaited<ReturnType<typeof UserService.getId>>>(data: T) {
    const passwd = Reflect.get(data, 'password');
    if (passwd) Reflect.set(data, 'password', bcrypt.hashSync(passwd as string, 8));
    return prisma.user.create({ data });
  }

  public static async update<T extends Awaited<ReturnType<typeof UserService.getId>>>(id: string, data: T) {
    await this.getId(id);
    const passwd = Reflect.get(data, 'password');
    if (passwd) Reflect.set(data, 'password', bcrypt.hashSync(passwd as string, 8));
    return prisma.user.update({ where: { id }, data });
  }

  public static async delete(id: string) {
    await this.getId(id);
    return prisma.user.delete({ where: { id } });
  }

  public static async getOrders(id: string) {
    await this.getId(id);
    return prisma.order.findMany({ where: { userId: id } });
  }

  public static async getProducts(id: string) {
    await this.getId(id);
    return prisma.product.findMany({ where: { userId: id } });
  }
}
