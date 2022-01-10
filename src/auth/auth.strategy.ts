import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,) {
        super({
            passReqToCallback: true
        });
    }

    async validate(req: Request, username, password): Promise<boolean> {
        
        if ((await this.authService.userExists(username))) {
            if (!(await this.authService.validateUser(username, password)))
                throw new BadRequestException('Incorrect password');
                
            else {
                return true;
            }
        }
        throw new NotFoundException("Users doesn't exists");
        
    }
}