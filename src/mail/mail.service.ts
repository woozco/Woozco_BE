import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { VerifyDto } from 'src/auth/dto/verify.dto';

@Injectable()
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      }
    });
  }

  async sendMail(veriftDto : VerifyDto, isRegister : boolean) {
    let mail;
    if(isRegister) {
      mail = {
        to: veriftDto.email,
        from: process.env.EMAIL_FROM,
        subject: '[Woozco] 이메일 인증',
        html: `<b>[Woozco] 이메일 인증</b><p>${veriftDto.verifyCode}</p>`, 
      }
    }
    else {
      mail = {
        to: veriftDto.email,
        from: process.env.EMAIL_FROM,
        subject: '[Woozco] 스터디 시작 알림',
        html: `<b>[Woozco] 스터디가 시작됐어용</b>`, 
      }
    }
    
    try {
      await this.transporter.sendMail(mail);
    } catch (error) {
      console.error(error);
    }
  }
}