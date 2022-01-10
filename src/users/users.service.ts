import { Injectable, UseInterceptors, ClassSerializerInterceptor, UnauthorizedException, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { servicesNames, services } from '../utils';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }


  async create(createUserDto: CreateUserDto): Promise<CreateUserDto | undefined> {
    let user = createUserDto;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const createdUser = await this.prisma.user.create({ data: createUserDto, }).catch((e) => { throw new BadRequestException() });
    
    delete createdUser.password;

    servicesNames.forEach(async (serviceName) => {
      await this.prisma.service.create({
        data: {
          userId: createdUser.id,
          name: serviceName, 
        }
      });
    });

    return createdUser;
  }

  async findUsers(): Promise<User[] | undefined> {
    const users =  await this.prisma.user.findMany();

    users.forEach((user) => {
      delete user.password;
    });

    return users;
  }

  async findUsersWithServices(): Promise<User[] | undefined> {
    const users =  await this.prisma.user.findMany({
      include: {
        services: true,
      },
      where: {
        services: {
            every : {
              is_registred: true,
            }
        }
      },
    });

    users.forEach((user) => {
      delete user.password;
    });

    return users;
  }

  async findUser(id: number): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: id, },
      include: {
        services: true,
      }
    }).catch((e) => {
      throw new NotFoundException("User ID does'nt exist");
    });
    
    delete user.password;

    return user;
  }

  async   findUserByUsername(username: string, withServices: Boolean = false): Promise<User | null> {

    if (withServices) {
      const user = await this.prisma.user.findFirst({
        where: { 
          username: username,
          
        },
        include: {
          services: {
            where: {
              is_registred: true,
            }
          },
        }
      }).catch((e) => {
        throw new NotFoundException("User ID does'nt exist");
      });

      return user;
    }
    return await this.prisma.user.findUnique({
      where: { username: username, },
    }).catch((e) => {
      throw new NotFoundException("User ID does'nt exist");
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: id, },
      data: updateUserDto,
    }).catch((e) => {
      throw new NotFoundException("User ID does'nt exist");
    });

    delete user.password;
    
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({ where: { id: id } });

    delete user.password;
    
    return user;
  }
}