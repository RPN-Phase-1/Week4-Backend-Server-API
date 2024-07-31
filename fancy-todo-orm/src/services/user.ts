import { Service } from "#todo/lib/service";

export class UserService extends Service {
  public override all() {
    return this.db.user.findMany();
  }

  public override show(id: string) {
    return this.db.user.findUnique({ where: { id }});
  }

  public override create(name: string, email: string, phone: string) {
    return this.db.user.create({ data: { name, email, phone }});
  }

  public override update(id: string, name: string, email: string, phone: string) {
    return this.db.user.update({ where: { id }, data: { name, email, phone }});
  }

  public override delete(id: string) {
    return this.db.user.delete({ where: { id }});
  }
}
