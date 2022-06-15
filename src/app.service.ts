import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AppService {
  getMorning(): string {
    throw new BadRequestException('Goog Morning!');
  }

  getAfternoon(): string {
    throw new ConflictException('Goog Afternoon!');
  }

  getEvening(): string {
    throw new UnauthorizedException('Goog Evening!');
  }
}
