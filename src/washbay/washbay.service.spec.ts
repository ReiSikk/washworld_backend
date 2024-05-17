import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WashBayService } from './washbay.service';
import { WashBay } from './entities/washbay.entity';

describe('WashBayService', () => {
  let service: WashBayService;
  let repo: Repository<WashBay>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WashBayService,
        {
          provide: getRepositoryToken(WashBay),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<WashBayService>(WashBayService);
    repo = module.get<Repository<WashBay>>(getRepositoryToken(WashBay));
  });

  it('should create a new wash bay', async () => {
    const washBay = new WashBay();
    washBay.id = 1;
    washBay.bayNr = '01';
    washBay.bayType = 'Self wash';
    washBay.dimensionWidth = '3.5m';
    washBay.dimensionHeight = '2.0m';
    washBay.available = true;

    jest.spyOn(repo, 'save').mockResolvedValue(washBay);

    expect(await service.create(washBay)).toEqual(washBay);
    expect(repo.save).toHaveBeenCalledWith(washBay);
  });
});