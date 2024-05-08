import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UserService } from './user.service';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
@Controller('users')
@UseGuards(RoleGuard)
//@UseInterceptors(LogInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }
  @Put(':id')
  async update(
    @Body() data: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(data, id);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(data, id);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
