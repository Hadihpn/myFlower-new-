import { Controller, Get, Render, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from '@common/decorators/public.decorator';
import { WebJwtAuthGuard } from '@/common/guards/web-jwt-auth.guard';
import { join } from 'path';

@Controller() // بدون پیشوند api برای صفحات وب
export class WebController {
  @Public()
  @Get('login')
  @Render('auth/login')
  getLoginPage(@Req() req: Request, @Res() res: Response) {
    // اگر کاربر قبلاً لاگین کرده، بفرستش به داشبورد
    if (req.cookies?.access_token) {
      return res.redirect('/dashboard');
    }
    console.log("req.query",req.query.status);
    
      const success = req.query.status === 'registered' ? 'ثبت‌نام با موفقیت انجام شد. حالا وارد شوید.' : null;

    const error =
      req.query.error === 'invalid'
        ? 'ایمیل یا رمز عبور اشتباه است'
        : req.query.error === 'server'
          ? 'خطای سرور، دوباره تلاش کنید'
          : null;

    return { title: 'ورود به سیستم',success: success, error: error, email: req.query.email || '' };
  }
  @Public()
  @Get('register')
  @Render('auth/register')
  getRegisterPage(@Req() req: Request, @Res() res: Response) {
    // اگر کاربر قبلاً لاگین کرده، بفرستش به داشبورد
    if (req.cookies?.access_token) {
      return res.redirect('/dashboard');
    }

    return { title: 'ثبت نام' };
  }

  @UseGuards(WebJwtAuthGuard)
  @Get('dashboard')
  @Render('dashboard/index')
  getDashboard(@Req() req: Request) {
    // اطلاعات کاربر از طریق JwtStrategy به req.user اضافه شده است
    console.log('panel', req.user);

    return {
      title: 'پنل کاربری',
      user: req.user,
    };
  }

  // @Public()
  // @Get('/')
  // index(@Res() res: Response) {
  //   return res.redirect('/dashboard');
  // }
  @Public()
  @Get('/')
  @Render('landing/index')
  landing(@Req() req) {
    console.log('panel', req.user);

    return {
      title: 'Plant Monitoring System',
      user: req.user || null,
    };
  }
  //   @Public()
  // @Get('/login')
  // @Render('auth/login')
  // login() {
  //   console.log("login page");

  //   return {
  //     title: 'Login',
  //   };
  // }
  @Get('/test')
  @Public()
  test() {
    return 'ok';
  }
}
