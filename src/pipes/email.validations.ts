import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}
  async transform(value: CreateUserDto) {
    const email = await this.isUniqueEmail(value?.email);
    if (!email) {
      return value;
    }
    throw new BadRequestException('email is already exists!');
  }

  private async isUniqueEmail(email: string) {
    const data = await this.usersService.findByMail(email);
    return data;
  }
}
