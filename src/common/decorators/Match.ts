import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { propEq } from 'ramda'

import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'Match' })
class MathConstraint implements ValidatorConstraintInterface {
  public validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints
    return propEq(relatedPropertyName, value, args.object)
  }

  public defaultMessage(validationArguments: ValidationArguments) {
    const [target] = validationArguments.constraints
    return `${validationArguments.property} must match ${target} regular expression`
  }
}

const Match =
  (property: string, validationOptions?: ValidationOptions) =>
  (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MathConstraint,
    })
  }

export default Match
