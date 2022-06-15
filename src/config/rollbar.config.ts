import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as Rollbar from 'rollbar';

@Injectable()
export class RollbarConfig implements OnApplicationBootstrap {
  private rollbar: Rollbar;

  async onApplicationBootstrap() {
    this.rollbar = new Rollbar({
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
    });
  }
  setup() {
    return this.rollbar;
  }
}
