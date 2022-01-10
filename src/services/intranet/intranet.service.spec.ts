import { Test, TestingModule } from '@nestjs/testing';
import { IntranetService } from './intranet.service';

describe('IntranetService', () => {
  let service: IntranetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntranetService],
    }).compile();

    service = module.get<IntranetService>(IntranetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
