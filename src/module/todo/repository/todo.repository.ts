import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

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

    const createdTodo = await this.todoRepo.save(data);

    return {
      statusCode: 201,
      status: true,
      message: 'Todo created successfully',
      data: createdTodo,
    };
  }

  async updateTodo(id: string, dto: any) {
    const todo = await this.todoRepo.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException('todo not found');
    }

    const updatedTodo = await this.todoRepo.update(id, dto);

    return {
      statusCode: 200,
      status: true,
      message: 'todo updated successfully',
      data: updatedTodo,
    };
  }

  async deleteTodo(id: string) {
    const todo = await this.todoRepo.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException('todo not found');
    }
    await this.todoRepo.delete(id);

    return {
      statusCode: 200,
      status: true,
      message: 'todo updated successfully',
    };
  }
}
