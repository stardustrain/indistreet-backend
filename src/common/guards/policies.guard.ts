import { Injectable, CanActivate } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { CaslAbilityFactory } from '../../casl/casl-ability.factory'
import { CHECK_POLICIES_KEY } from '../decorators/CheckPolicies'

import type { ExecutionContext } from '@nestjs/common'
import type { CheckPolicyHandler } from '../decorators/CheckPolicies'
import type { AppAbility } from '../../casl/casl-ability.factory'

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext) {
    const policyHandlers = this.reflector.get<CheckPolicyHandler[]>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    )

    const { user } = context.switchToHttp().getRequest()
    const ability = this.caslAbilityFactory.createForUser(user)

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    )
  }

  private execPolicyHandler(handler: CheckPolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability)
    }

    return handler.handle(ability)
  }
}
