import { PolicyHandler } from '../../common/decorators/CheckPolicies'
import { Action } from '../../casl/casl-ability.factory'
import { User } from '../entities/user.entity'

import type { AppAbility } from '../../casl/casl-ability.factory'

export class UpdateUserPolicyHandler implements PolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, User)
  }
}
