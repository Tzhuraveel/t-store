import { Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import { i18nConfig } from 'src/config/i18n';

@Module({
  imports: [I18nModule.forRootAsync(i18nConfig)],
})
export class LocalizationModule {}
