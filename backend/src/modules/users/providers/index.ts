import { container } from 'tsyringe';
import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// Toda vez que houver uma implementação do tipo HashProvider, retorna uma classe de BCryptHashProvider
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
