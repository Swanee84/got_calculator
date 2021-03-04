import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { StandardResponse } from '../common/response.interface';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':guildCode')
  async dashboard(@Param('guildCode') guildCode: string): Promise<StandardResponse<any>> {
    const data = await this.dashboardService.dashboard(guildCode);
    const response = new StandardResponse({ data });
    return Promise.resolve(response);
  }
}
