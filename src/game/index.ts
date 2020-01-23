import StatusManager from './status-manager'
import PlayManager from './play-manager'

export const DEFAULT_PLAYER_NUMBER = 8
export const LEFT_ROLE_NUMBER = 3

/**
 * 游戏类
 *
 * @class Game
 */
class Game extends PlayManager {
  private _statusManager: StatusManager

  constructor(
    _playerNumber: number = DEFAULT_PLAYER_NUMBER,
    _leftRoleNumber: number = LEFT_ROLE_NUMBER
  ) {
    super(_playerNumber, _leftRoleNumber)
    this._statusManager = new StatusManager(this)
  }

  get leftRoleNumber(): number {
    return this._leftRoleNumber
  }

  next(): Game {
    this._statusManager.transition('next')
    return this
  }

  /**
   * 游戏重启
   */
  restart(): Game {
    this._statusManager.transition('restart')
    return this
  }

  /**
   * 游戏结束
   */
  finish(): Game {
    this._statusManager.transition('finish')
    return this
  }
}

export default Game;