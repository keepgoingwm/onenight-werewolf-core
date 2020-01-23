import Game from '../index'
import { Loggable } from './log'
import StatusMachine from './status-machine'
import { GameStatus } from './status-machine'
import { RoleType } from '../../role'

type guideBuilder = (game: Game) => string

const guideMap: Map<GameStatus, guideBuilder> = new Map([
  [GameStatus.CONFIG, function (game: Game) {
    return `设定游戏人数，选择(游戏人数 + ${game.leftRoleNumber})个角色，或者使用默认角色配置`
  }],
  [GameStatus.RULE, function (game: Game) {
    return '顺时针传递手机，进行身份的获取和对应的操作'
  }],
  [GameStatus.OPERATE1, function (game: Game) {
    return '请记住自身的角色和操作'
  }],
  [GameStatus.OPERATE2, function (game: Game) {
    return '注意伪装'
  }],
  [GameStatus.OPERATE3, function (game: Game) {
    return '注意伪装'
  }],
  [GameStatus.ARGUE, function (game: Game) {
    return '建议先完成一轮顺序发言，然后大家限时集中讨论'
  }],
  [GameStatus.VOTE, function (game: Game) {
    return '投出狼人，如果认为场上没有狼人，就投底牌'
  }],
])

class StatusManager extends StatusMachine implements Loggable {
  private _guideFactory: (s: GameStatus) => string
  _roleLogs: Map<GameStatus, Array<RoleType>> = new Map();
  _operateLogs: Map<GameStatus, {}> = new Map;

  constructor(_game: Game) {
    super(_game)
    this._guideFactory = function (status: GameStatus) {
      return (guideMap.get(status) as guideBuilder)(_game)
    }

    this.on({
      onBeforeNext: () => { this.setRoleLog(this.status, _game.playerRoleTypes) },
      onRestart: () => { _game.assignRole() }
    })
  }

  get guide(): string {
    return this._guideFactory(this.status)
  }

  /**
   * Loggable
   */
  setRoleLog(status: GameStatus, log: Array<RoleType>): void {
    this._roleLogs.set(status, log.slice(0))
  }
  getRoleLog(status: GameStatus): Array<RoleType> {
    let res = this._roleLogs.get(status)
    if (res) {
      return res
    } else {
      throw new Error('[ow] status not logged')
    }
  }
  setOperateLog(status: GameStatus, log: {}): void {
    throw new Error("Method not implemented.");
  }
  getOperateLog(status: GameStatus): {} {
    // TODO 需要防作弊
    return {}
  }
}

export default StatusManager