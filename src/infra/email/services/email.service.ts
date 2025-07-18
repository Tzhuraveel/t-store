import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import {
  EmailServiceInterface,
  SendEmailOptions,
} from '../models/interfaces/email-service.interface';

@Injectable()
export class EmailService implements EmailServiceInterface {
  constructor(private readonly mailService: MailerService) {}

  async send(options: SendEmailOptions): Promise<void> {
    await this.mailService.sendMail(options);
  }
}
