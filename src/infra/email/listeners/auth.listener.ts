import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { USER_SIGNED_UP } from '#common/events/constants';

import { EMAIL_SERVICE } from '../models/constants/email.constants';
import { SignUpPayload } from '../models/interfaces/auth-listener.interface';
import { EmailServiceInterface } from '../models/interfaces/email-service.interface';

@Injectable()
export class AuthListener {
  constructor(
    @Inject(EMAIL_SERVICE) private readonly emailService: EmailServiceInterface,
  ) {}

  @OnEvent(USER_SIGNED_UP, { async: true })
  async handleSignUp(payload: SignUpPayload): Promise<void> {
    await this.emailService.send({
      to: payload.email,
      template: 'welcome',
      subject: 'Welcome to T-store',
      context: {
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
    });
  }
}
