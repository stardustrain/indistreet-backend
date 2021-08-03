import { Injectable } from '@nestjs/common'
import { AbilityBuilder, Ability } from '@casl/ability'

import { User } from '../users/entities/user.entity'
import { Musician } from '../musicians/entities/musician.entity'
import { UserRole } from '../users/entities/user.entity'
import { Album } from '../albums/entities/album.entity'

import type { ExtractSubjectType, InferSubjects } from '@casl/ability'
import type { ValidateJwt } from '../users/strategies/jwt.strategy'

type Subjects =
  | InferSubjects<typeof User | typeof Musician | typeof Album>
  | 'all'
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
  createForUser(user: ValidateJwt) {
    const { can, build } = new AbilityBuilder<AppAbility>(Ability)

    if (user.role === UserRole.ADMIN) {
      can(Action.Manage, 'all')
    }

    if (user.role === UserRole.MUSICIAN) {
      can(Action.Create, [Album, Musician])
      can([Action.Update, Action.Delete], Album, {
        musician: {
          id: user.musicianId,
        },
      })
      can([Action.Update, Action.Delete], Musician, {
        id: user.musicianId,
      })
    }

    can(Action.Read, 'all')
    can(Action.Delete, User, { id: user.id })
    can(Action.Update, User, { id: user.id })

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}
