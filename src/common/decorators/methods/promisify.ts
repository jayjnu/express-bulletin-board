import { promisify } from '../../utils';

function Promisify(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = promisify(descriptor.value);
}

export default Promisify;