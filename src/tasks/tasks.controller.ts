import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RequestWithUser } from '../auth/request-with-user.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Req() req: RequestWithUser, @Body() dto: CreateTaskDto) {
        return this.tasksService.create(req.user.userId, dto);
    }

    @Get()
    findAll(@Req() req: RequestWithUser) {
        return this.tasksService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(
        @Req() req: RequestWithUser,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.tasksService.findOne(req.user.userId, id);
    }

    @Patch(':id')
    update(
        @Req() req: RequestWithUser,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTaskDto,
    ) {
        return this.tasksService.update(req.user.userId, id, dto);
    }

    @Delete(':id')
    remove(
        @Req() req: RequestWithUser,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.tasksService.remove(req.user.userId, id);
    }
}
