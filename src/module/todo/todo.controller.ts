import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create.dto';
import { UpdateTodoDto } from './dtos/update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from './interfaces/request-with-user.interface';

@ApiTags('Todo-API')
@ApiBearerAuth()
@Controller('Todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiQuery({name: 'page', example: 1})
  @ApiQuery({name: 'limit', example: 5})
  @Get('todos')
  async findAllTodos(
    @Req() req: RequestUser,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<string> {
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTodo(@Body() dto: UpdateTodoDto, @Param('id') id: string) {
    return this.todoService.updateTodo(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
