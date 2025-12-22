import { Injectable } from '@nestjs/common';
import { CreateDailySummaryDto } from './dto/create-daily-summary.dto';
import { UpdateDailySummaryDto } from './dto/update-daily-summary.dto';

@Injectable()
export class DailySummaryService {
  create(createDailySummaryDto: CreateDailySummaryDto) {
    return 'This action adds a new dailySummary';
  }

  findAll() {
    return `This action returns all dailySummary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailySummary`;
  }

  update(id: number, updateDailySummaryDto: UpdateDailySummaryDto) {
    return `This action updates a #${id} dailySummary`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailySummary`;
  }
}
