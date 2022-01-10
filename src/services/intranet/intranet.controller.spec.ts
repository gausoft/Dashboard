import { Test, TestingModule } from '@nestjs/testing';
import { IntranetController } from './intranet.controller';

describe('IntranetController', () => {
  let controller: IntranetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntranetController],
    }).compile();

    controller = module.get<IntranetController>(IntranetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
