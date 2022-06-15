import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('good')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/morning')
  getMorning(): string {
    return this.appService.getMorning();
  }

  @Get('/afternoon')
  getAfternoon(): string {
    return this.appService.getAfternoon();
  }

  @Get('/evening')
  getEvening(): string {
    return this.appService.getEvening();
  }
}
