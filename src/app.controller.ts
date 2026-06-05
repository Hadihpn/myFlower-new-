import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { Request, Response } from 'express';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Public()
  // @Get()
  // @ApiOperation({ summary: 'Health check' })
  // getHello(): string {
  //   return this.appService.getHello();
  // }
//   @Get()
// root(@Req() req: Request, @Res() res: Response) {
//   if (req.cookies?.access_token) {
//     return res.redirect('/dashboard');
//   }
//   return res.redirect('/login');
// }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}

