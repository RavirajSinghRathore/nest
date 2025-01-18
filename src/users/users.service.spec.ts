import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

const userObject: CreateUserDto = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gamil.com',
  password: 'john@123',
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const mockUserRepository = {
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as Partial<jest.Mocked<Repository<User>>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return userObject', async () => {
    const userResponse = {
      id: 1,
      ...userObject,
    };

    userRepository.save.mockResolvedValue(userResponse);
    const actualResponse = await service.create(userObject);
    expect(userRepository.save).toHaveBeenCalledWith(userObject);
    expect(actualResponse).toEqual(userResponse);
  });

  it('should be return the all users of db', async () => {
    const usersResponse = [
      {
        id: 1,
        ...userObject,
      },
    ];

    userRepository.find.mockResolvedValue(usersResponse);
    const actualResponse = await service.findAll();
    expect(userRepository.find).toHaveBeenCalledWith();
    expect(actualResponse).toEqual(usersResponse);
  });
});
