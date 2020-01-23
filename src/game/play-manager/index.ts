import Player from '../../player'
import RoleManager from './role-manager'
import { getShuffledIntArray } from '../../utils'
import { RoleType } from '../../role'

export default class PlayManager extends RoleManager {
  private _players: Array<Player> = []

  constructor(
    protected _playerNumber: number,
    protected _leftRoleNumber: number
  ) {
    super(_playerNumber)
    this.assignRole()
  }

  /**
   * 将底牌中每一张牌也视为玩家，总的玩家数量
   */
  get allPlayerNumber(): number {
    return this._playerNumber + this._leftRoleNumber
  }

  get playerNumber(): number {
    return this._playerNumber
  }
  set playerNumber(n: number) {
    if (n !== this._playerNumber) {
      this._playerNumber = n
      this.numberToRoles(n, this._leftRoleNumber)
    }
  }

  assignRole(): void {
    this._players = getShuffledIntArray(0, this.allPlayerNumber).map((order, i) => {
      return new Player(this.roles[order], i, this._playerNumber)
    })
    // this._players = (new Array(this._playerNumber)).fill(0).map(e => new Player())
  }

  get playerRoleTypes(): Array<RoleType> {
    return this._players.map(e => e._roleType)
  }
}