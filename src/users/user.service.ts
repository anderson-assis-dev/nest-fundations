import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }
  async show(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async list() {
    return this.prisma.user.findMany();
  }
  async update(data: UpdatePutUserDto, id: number) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async updatePartial(data: UpdatePatchUserDto, id: number) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
