import { Test, TestingModule } from '@nestjs/testing';
import { SoldierService } from './soldier.service';

describe('SoldierService', () => {
  let service: SoldierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldierService],
    }).compile();

    service = module.get<SoldierService>(SoldierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
