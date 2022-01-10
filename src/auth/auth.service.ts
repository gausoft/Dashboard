import { HttpException, HttpStatus, Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UpdateUserDto } from '../users/dto/update-user.dto';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {

    }
    async userExists(username: string): Promise<boolean> {
        return await !!this.usersService.findUserByUsername(username);
    }

    async validateUser(username: string, password: string): Promise<UpdateUserDto | null> {
        const user = await this.usersService.findUserByUsername(username);
        
        if (!user) {    
            return null;
        } 
        else if (!bcrypt.compareSync(password, user.password)) {
            
            return null;
            
        } 
        
        const { password: excludedProp, ...result } = user;
        return result;
        

    }
}
