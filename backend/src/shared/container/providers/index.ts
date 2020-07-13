import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMaisTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerInstance<IMailTemplateProvider>('MailTemplateProvider', new HandlebarsMaisTemplateProvider());
container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));
