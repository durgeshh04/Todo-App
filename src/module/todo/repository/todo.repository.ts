import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepo {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
  ) {}

  async findAllTodos(id: string, page, limit) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.todoRepo
      .createQueryBuilder('todo')
      .leftJoin('todo.user', 'user')
      .where('user.id = :id', { id })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      lastpage: Math.ceil(total / limit),
    };
  }

  async createTodo(todo: any, id: string) {
    const data = this.todoRepo.create({ ...todo, user: { id: id } });
    return await this.todoRepo.save(data);
  }

  async updateTodo(id: string, dto: any) {
    return this.todoRepo.update(id, dto);
  }
  
}