import Role from '../role';
import { RoleType } from '../role';
import PlayerInfo from './player-info'

export enum PlayerType {
  Normal = 1,
  Fake
}

class Player {
  private _status: string = '0'
  private _playerType: PlayerType
  private _role: Role
  /**
   *
   */
  constructor(
    readonly _roleType: RoleType,
    // 原始role
    // 参与判定的role
    // 最终role
    order: number,
    playerNumber: number,
  ) {
    if (order <= playerNumber) {
      this._playerType = PlayerType.Normal
    } else {
      this._playerType = PlayerType.Fake
    }

    this._role = Role.factory(_roleType)
  }

  // operate() {
  //   this._role.operate
  // }
}

export default Player