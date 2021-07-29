import { SetMetadata } from '@nestjs/common'
import type { AppAbility } from '../../casl/casl-ability.factory'

type PolicyHandlerCallback = (ability: AppAbility) => boolean

export interface PolicyHandler {
  handle: PolicyHandlerCallback
}

export type CheckPolicyHandler = PolicyHandler | PolicyHandlerCallback

export const CHECK_POLICIES_KEY = 'check_policy'
const CheckPolicies = (...handlers: CheckPolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers)

export default CheckPolicies
