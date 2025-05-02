import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async create(userId: number, dto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                deadline: new Date(dto.deadline), // ✅ perbaikan di sini
                status: dto.status,
                userId,
            },
        });
    }

    async findAll(userId: number) {
        return this.prisma.task.findMany({
            where: { userId },
            orderBy: { deadline: 'asc' },
        });
    }

    async findOne(userId: number, id: number) {
        const task = await this.prisma.task.findFirst({
            where: { id, userId },
        });
        if (!task) throw new NotFoundException();
        return task;
    }

    async update(userId: number, id: number, dto: UpdateTaskDto) {
        const { title, description, deadline, status } = dto;

        const result = await this.prisma.task.updateMany({
            where: {
                id,
                userId,
            },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(deadline && { deadline: new Date(deadline) }),
                ...(status && { status }),
            },
        });

        if (result.count === 0) {
            throw new NotFoundException('Tugas tidak ditemukan atau bukan milik Anda');
        }

        return { message: 'Tugas berhasil diperbarui' };
    }



    async remove(userId: number, id: number) {
        await this.findOne(userId, id);
        return this.prisma.task.delete({ where: { id } });
    }
}
