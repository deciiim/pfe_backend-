import { Test, TestingModule } from '@nestjs/testing';
import { BonsCommandesController } from './bons-commandes.controller';

describe('BonsCommandesController', () => {
  let controller: BonsCommandesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonsCommandesController],
    }).compile();

    controller = module.get<BonsCommandesController>(BonsCommandesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
