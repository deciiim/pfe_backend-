import { Test, TestingModule } from '@nestjs/testing';
import { BonsCommandesService } from './bons-commandes.service';

describe('BonsCommandesService', () => {
  let service: BonsCommandesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BonsCommandesService],
    }).compile();

    service = module.get<BonsCommandesService>(BonsCommandesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
