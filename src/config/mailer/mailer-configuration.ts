import { registerAs } from '@nestjs/config';

import { validateConfig } from '#config/validate-config';

import { MailerVariablesDto } from './mailer-config.dto';

export default registerAs('auth', () => {
  const validatedConfig = validateConfig(MailerVariablesDto);

  return {
    user: validatedConfig.EMAIL_USER,
    pass: validatedConfig.EMAIL_PASS,
    from: validatedConfig.EMAIL_FROM,
  };
});
