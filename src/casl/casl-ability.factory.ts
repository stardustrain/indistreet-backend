import { Injectable } from '@nestjs/common'
import { AbilityBuilder, Ability } from '@casl/ability'

import { User } from '../users/entities/user.entity'
import { Musician } from '../musicians/entities/musician.entity'
import { UserRole } from '../users/entities/user.entity'

import type { ExtractSubjectType, InferSubjects } from '@casl/ability'

type Subjects = InferSubjects<typeof User | typeof Musician> | 'all'
export type AppAbility = Ability<[Action, Subjects]>

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(Ability)

    if (user.role === UserRole.ADMIN) {
      can(Action.Manage, 'all')
    } else {
      can(Action.Read, 'all')
      can(Action.Delete, User, { id: user.id })
      can(Action.Update, User, { id: user.id })
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}
