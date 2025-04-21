import { Injectable } from '@nestjs/common';
import { TodoRepo } from './repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepo: TodoRepo) {}
  async findAllTodos(id: string, page: number, limit: number): Promise<any> {
    return this.todoRepo.findAllTodos(id, page, limit);
  }

  async createTodo(todo: any, id: string): Promise<any> {
    return this.todoRepo.createTodo(todo, id);
  }

  async updateTodo(id: string, dto: any): Promise<any> {
    return this.todoRepo.updateTodo(id, dto);
  }

  async deleteTodo(id: string) {
    return this.todoRepo.deleteTodo(id);
  }
}
