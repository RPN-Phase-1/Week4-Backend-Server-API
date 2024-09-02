import { Service } from "#todo/lib/service";

export class TodoService extends Service {
  public override all() {
    return this.db.todo.findMany();
  }

  public override show(id: string) {
    return this.db.todo.findUnique({ where: { id }});
  }

  public override create(title: string, description: string, status: string, userId: string) {
    return this.db.todo.create({ data: { title, description, status, userId }});
  }

  public override update(id: string, title: string, description: string, status: string, userId: string) {
    return this.db.todo.update({ where: { id }, data: { title, description, status, userId } });
  }

  public override delete(id: string) {
    return this.db.todo.delete({ where: { id }});
  }
}
