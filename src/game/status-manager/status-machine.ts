import StateMachine from 'javascript-state-machine'
import Game from '../index'

export enum GameStatus {
  CONFIG = 'Config',
  RULE = 'Rule',
  OPERATE1 = 'Operate1',
  OPERATE2 = 'Operate2',
  OPERATE3 = 'Operate3',
  ARGUE = 'Argue',
  VOTE = 'Vote',
  RESULT = 'Result',
  REVIEW = 'Review',
}
export const RestartPoint = GameStatus.RULE
const StatusTransitions = [
  { name: 'next', from: GameStatus.CONFIG, to: GameStatus.RULE },
  { name: 'next', from: GameStatus.RULE, to: GameStatus.OPERATE1 },
  { name: 'next', from: GameStatus.OPERATE1, to: GameStatus.OPERATE2 },
  { name: 'next', from: GameStatus.OPERATE2, to: GameStatus.OPERATE3 },
  { name: 'next', from: GameStatus.OPERATE3, to: GameStatus.ARGUE },
  { name: 'next', from: GameStatus.ARGUE, to: GameStatus.VOTE },
  { name: 'next', from: GameStatus.VOTE, to: GameStatus.RESULT },
  { name: 'restart', from: GameStatus.RULE, to: RestartPoint },
  { name: 'restart', from: GameStatus.OPERATE1, to: RestartPoint },
  { name: 'restart', from: GameStatus.OPERATE2, to: RestartPoint },
  { name: 'restart', from: GameStatus.OPERATE3, to: RestartPoint },
  { name: 'restart', from: GameStatus.ARGUE, to: RestartPoint },
  { name: 'restart', from: GameStatus.VOTE, to: RestartPoint },
  { name: 'restart', from: GameStatus.RESULT, to: RestartPoint },
  { name: 'finish', from: GameStatus.RESULT, to: GameStatus.CONFIG },
]

export default class StatusMachine {
  private _fsm: StateMachine = new StateMachine({
    init: GameStatus.CONFIG,
    transitions: StatusTransitions,
    methods: {
      onInvalidTransition: function (transition, from, to) {
        throw new Error(`[ow] status transition ${transition} not allowed from ${from} to ${to}`);
      }
    }
  })

  constructor(protected _game: Game) {
    this._fsm.observe({
      [`onEnterState`]: () => {
        console.log('[ow] transition to', this.status);
      }
    })
  }

  protected on(methods: StateMachine.Methods) {
    this._fsm.observe(methods)
  }

  protected get status(): GameStatus {
    return this._fsm.state as GameStatus
  }

  transition(event: string): void {
    (this._fsm[event] as StateMachine.AnyCallBack)()
  }
}
