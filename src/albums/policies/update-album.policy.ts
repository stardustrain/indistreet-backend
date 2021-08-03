import { PolicyHandler } from '../../common/decorators/CheckPolicies'
import { AppAbility, Action } from '../../casl/casl-ability.factory'
import { Album } from '../entities/album.entity'

export class UpdateAlbumPolicyHandler implements PolicyHandler {
  handle(appAbility: AppAbility) {
    return appAbility.can(Action.Update, Album)
  }
}
