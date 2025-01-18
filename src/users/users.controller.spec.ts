import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { it } from 'node:test';

const userObject: CreateUserDto = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gamil.com',
  password: 'john@123',
};

const mockUsersService: Partial<UsersService> = {
  create: jest.fn(),
  findAll: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: typeof mockUsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user and return the reponse', async () => {
      const createUserResponse = {
        id: 1,
        ...userObject,
      };

      (usersService.create as jest.Mock).mockResolvedValue(createUserResponse);
      const actualResponse = await controller.create(userObject);
      expect(usersService.create).toHaveBeenCalledWith(userObject);
      expect(actualResponse).toEqual(createUserResponse);
    });
  });

  describe('users', () => {
    it('should find all users', async () => {
      const usersResponse = [
        {
          id: 1,
          ...userObject,
        },
      ];

      (usersService.findAll as jest.Mock).mockResolvedValue(usersResponse);
      const actualResponse = await controller.findAll();
      expect(usersService.findAll).toHaveBeenCalledWith();
      expect(actualResponse).toEqual(usersResponse);
    });
  });
});
