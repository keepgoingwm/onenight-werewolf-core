import Role from '../../role'
import { RoleType } from '../../role'

const AvailableRoles: Array<RoleType> = [
  RoleType.Villager,
  RoleType.Seer,
  RoleType.Insomniac,
  RoleType.Robber,
  RoleType.Troublemaker,
  RoleType.Drunk,
  RoleType.Hunter,
  RoleType.Mason,
  RoleType.Werewolf,
  RoleType.Minion,
  RoleType.Tanner,
  RoleType.Doppelganger,
]

export default class RoleManager {
  protected _roles: Array<RoleType>
  private _roleDirty = false

  constructor(playerNumber: number) {
    this._roles = Role.getDefaultRoles(playerNumber)
  }

  protected numberToRoles(n: number, leftRoleNumber: number): void {
    if (!this._roleDirty) {
      this.roles = Role.getDefaultRoles(n)
    } else {
      let targetLen = n + leftRoleNumber
      if (this.roles.length >= targetLen) {
        this.roles = this.roles.slice(0, targetLen)
      } else {
        let restLen = this.roles.length - targetLen
        this.roles = this.roles.concat((new Array(restLen)).fill(0).map(e => RoleType.Villager))
      }
    }
  }

  get roles(): Array<RoleType> {
    return this._roles
  }
  set roles(v) {
    this._roles = v
  }
  setRoles(roles: Array<RoleType>): void {
    this._roleDirty = true
    this.roles = roles
  }

  /**
 * 角色配置对象
 *
 * @readonly
 * @memberof Game
 */
  get roleSelection() {
    let options = Role.getRoleOptions(AvailableRoles)

    return Role.getRoleOptions(this.roles).map(e => ({
      ...e,
      options
    }))
  }
}