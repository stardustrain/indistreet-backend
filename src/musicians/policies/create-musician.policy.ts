import { PolicyHandler } from '../../common/decorators/CheckPolicies'
import { AppAbility, Action } from '../../casl/casl-ability.factory'
import { Musician } from '../entities/musician.entity'

export class CreateMusicianPolicyHandler implements PolicyHandler {
  handle(appAbility: AppAbility) {
    return appAbility.can(Action.Create, Musician)
  }
}
