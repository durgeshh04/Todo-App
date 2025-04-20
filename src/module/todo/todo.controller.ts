import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from './interfaces/request-with-user.interface';

@ApiTags('Todo-API')
@ApiBearerAuth()
@Controller('Todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get('todos')
  async findAllTodos(@Req() req: RequestUser, @Query('page') page: string, @Query('limit') limit: string): Promise<string> {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    return this.todoService.findAllTodos(req.user.id, pageNum, limitNum);
  }

  @UseGuards(JwtAuthGuard)
  @Post('todo-create')
  async createTodo(
    @Body() todo: CreateTodoDto,
    @Req() req: RequestUser,
  ): Promise<any> {
    return this.todoService.createTodo(todo, req.user.id);
  }
}
