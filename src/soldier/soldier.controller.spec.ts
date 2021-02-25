import { Test, TestingModule } from '@nestjs/testing';
import { SoldierController } from './soldier.controller';

describe('SoldierController', () => {
  let controller: SoldierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldierController],
    }).compile();

    controller = module.get<SoldierController>(SoldierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
