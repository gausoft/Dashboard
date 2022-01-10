import { Injectable, HttpException, HttpStatus, NotFoundException, MethodNotAllowedException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../prisma/prisma.service';
import { services, } from '../utils';
import { Service, Widget, User } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private readonly prismaService: PrismaService) { }
  
  async retrieveServices() {
    return this.prismaService.service.findMany();
  }

  async retrieveRegisteredServices(username: string) {
    const user = await this.retrieveUser(username);

    return this.prismaService.service.findMany({
      where: {
        userId: user.id,
        is_registred: true,
      }
    });
  }

  async registerToService(username: string, service: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
    });
    return await this.prismaService.service.updateMany({
      data: {
        is_registred: true,
      },
      where: {
        userId: user.id,
        name: service,
        is_registred: false,
      }
    });
  }

  async unRegisterToService(username: string, service: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
    });
    return await this.prismaService.service.updateMany({
      data: {
        is_registred: false,
      },
      where: {
        userId: user.id,
        name: service,
        is_registred: false,
      }
    });
  }

  async isRegisterdTo(serviceName: string, userdId: number): Promise<boolean> {
    const service = await this.prismaService.service.findFirst({
      where: {
        userId: userdId,
        name: serviceName,
      },
    });

    return service.is_registred;
  }

  async retrieveUser(username: string): Promise<User> {
    const user = await this.prismaService.user.findFirst(
      {
        where: {
          username: username,
        }
      }
    );
    return user;
  }

  async retrieveUserService(userId: number, serviceName: string): Promise<Service> {
    const isRegistered = await this.isRegisterdTo(serviceName, userId);
    
    
    if (!isRegistered) {
      throw new MethodNotAllowedException("User is not registered to this service:" + serviceName);
    }
    else {
      const service = await this.prismaService.service.findFirst(
        {
          where: {
            userId: userId,
            name: serviceName,
          }
        }
      );
      return service;
    }
  }

}
