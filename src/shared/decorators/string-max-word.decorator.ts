import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function StringMaxWords(
  max: number,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'StringMaxWords',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true;
          }
          return value.length === max;
        },
        defaultMessage(args: ValidationArguments) {
          return `$property must have less than or equal ${max} words.`;
        },
      },
    });
  };
}
