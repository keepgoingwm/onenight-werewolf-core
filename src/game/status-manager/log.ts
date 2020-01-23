import { GameStatus } from './status-machine'
import { RoleType } from '../../role'

export interface Loggable {
  _roleLogs: Map<GameStatus, Array<RoleType>>
  _operateLogs: Map<GameStatus, {}>

  setRoleLog(status: GameStatus, log: Array<RoleType>): void
  getRoleLog(status: GameStatus): Array<RoleType>

  setOperateLog(status: GameStatus, log: {}): void
  getOperateLog(status: GameStatus): {}
  getOperateLog(status: GameStatus, index: number): {}
}