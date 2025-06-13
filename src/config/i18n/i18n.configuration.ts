import * as path from 'node:path';

import {
  AcceptLanguageResolver,
  I18nAsyncOptions,
  I18nOptionsWithoutResolvers,
  QueryResolver,
} from 'nestjs-i18n';
import { Environment, SupportedLanguage } from '#common/enum';
import appConfig from '../app/configuration';

const pathToLocalization = path.join(
  process.cwd(),
  'src',
  'infra',
  'localization',
);

export const i18nConfig: I18nAsyncOptions = {
  useFactory: (): I18nOptionsWithoutResolvers => ({
    skipAsyncHook: false,
    fallbackLanguage: SupportedLanguage.EN,
    loaderOptions: {
      path: path.join(pathToLocalization, 'constants'),
      watch: appConfig.environment !== Environment.PRODUCTION,
    },
    typesOutputPath: path.join(
      pathToLocalization,
      'types',
      'i18n.generated.ts',
    ),
  }),
  resolvers: [AcceptLanguageResolver, new QueryResolver(['lang'])],
};
