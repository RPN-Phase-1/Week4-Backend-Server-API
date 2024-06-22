import httpStatus from 'http-status';
import prisma from '../lib/database';
import ApiError from '../lib/utils/ApiError';

export default class CategoryService {
  public static async get(id: string) {
    const data = await prisma.category.findFirst({ where: { id } });
    if (!data) throw new ApiError(httpStatus.NOT_FOUND, `Category by id: ${id} not found!`);
    return data;
  }

  public static async getByName(name: string) {
    const data = await prisma.category.findFirst({ where: { name } });
    if (!data) throw new ApiError(httpStatus.NOT_FOUND, `Category by name: ${name} not found!`);
    return data;
  }

  public static async getAll({ pageSize, pageIndex }: { pageIndex: number; pageSize: number }) {
    const datasSize = await prisma.category.count();
    const numOfPages = Math.ceil(datasSize / Math.min(pageSize, datasSize));
    const index = Math.min(pageIndex, numOfPages);
    const skip = (index - 1) * pageSize;
    const datas = await prisma.category.findMany({ take: pageSize, skip });
    return {
      index,
      numOfPages,
      datas,
    };
  }

  public static async create<T extends Awaited<ReturnType<typeof CategoryService.get>>>(data: T) {
    return prisma.category.create({ data });
  }

  public static async update<T extends Awaited<ReturnType<typeof CategoryService.get>>>(id: string, data: T) {
    await this.get(id);
    return prisma.category.update({ where: { id }, data });
  }

  public static async delete(id: string) {
    await this.get(id);
    return prisma.category.delete({ where: { id } });
  }
}
