import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const port = process.env.PORT || 3000;
    return `🚀 Server Packet Tracking started on port ${port}`;
  }
}
