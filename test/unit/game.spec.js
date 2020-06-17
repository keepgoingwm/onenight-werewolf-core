var { assert, expect } = require("chai")
var Game = require('../../dist/index').Game
var { GameStatus, RestartPoint } = require('../../dist/game/status-manager/status-machine')
var { RoleType } = require('../../dist/role')

describe("New Game", function() {
  var g = new Game()

  it('默认Game：status', function() {
    expect(g).to.have.property('_statusManager')
  })

  it('默认Game：status 初始值', function() {
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.CONFIG)
  })

  it('默认Game：status 提示', function() {
    expect(g).to.have.nested.property('_statusManager.guide', '设定游戏人数，选择(游戏人数 + 3)个角色，或者使用默认角色配置')
  })

  it('默认Game：roles', function() {
    expect(g).to.have.property('roles')
  })

  it('默认Game：roleSelection 一层', function() {
    expect(g).to.have.nested.property('roleSelection[0].cnName', '狼人')
  })

  it('默认Game：roleSelection 选项', function() {
    expect(g).to.have.nested.property('roleSelection[0].options[1].value', RoleType.Seer)
    expect(g).to.have.nested.property('roleSelection[0].options[1].cnName', '预言家')
  })

});

describe('Game：修改人数', function() {
  var g = new Game()

  it('Game：初始检查', function() {
    expect(g).to.have.property('_roleDirty', false)
  })

  it('Game：直接修改人数为9', function() {
    g.playerNumber = 9
    expect(g).to.have.nested.property('roleSelection[11].value', RoleType.Villager)
  })

  g = new Game()

  it('Game：修改默认角色配置', function() {
    expect(g).to.have.nested.property('roleSelection[0].value', RoleType.Werewolf)
    var roles = [].concat(g.roles)
    roles[0] = RoleType.Villager
    g.setRoles(roles)

    expect(g).to.have.deep.property('roles', [RoleType.Villager, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Drunk, RoleType.Villager, RoleType.Villager, RoleType.Villager, RoleType.Villager, RoleType.Villager])
    expect(g).to.have.property('_roleDirty', true)
    expect(g).to.have.nested.property('roleSelection[0].value', RoleType.Villager)
  })

  it('Game：修改角色配置后修改人数 1', function() {
    g.playerNumber = 3
    expect(g.roles).to.have.length(6)
    expect(g).to.have.deep.property('roles', [RoleType.Villager, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker])
    expect(g.roleSelection).to.have.length(6)
    expect(g).to.have.property('_roleDirty', true)
    expect(g).to.have.nested.property('roleSelection[2].value', RoleType.Minion)
  })

  it('Game：修改角色配置后修改人数 2', function() {
    var roles = [].concat(g.roles)
    roles[0] = RoleType.Robber
    g.setRoles(roles)

    // 应该保持了前面用例的6个角色，然后修改其中一个
    expect(g).to.have.deep.property('roles', [RoleType.Robber, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker])
    expect(g).to.have.nested.property('roleSelection[0].value', RoleType.Robber)
    expect(g).to.have.nested.property('roleSelection[2].value', RoleType.Minion)
  })
})

describe("Game 基本流程", function() {
  var g = new Game()

  it('默认Game：状态推进 to RULE', function() {
    var res = g.next()
    expect(res).to.be.instanceOf(Game)
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.RULE)
  })
  it('默认Game：状态推进 to OPERATE1', function() {
    g.next()
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.OPERATE1)
  })
  it('默认Game：状态推进 to OPERATE2', function() {
    g.next()
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.OPERATE2)
  })
  it('默认Game：状态推进 to OPERATE3', function() {
    g.next()
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.OPERATE3)
  })
  it('默认Game：状态推进 to ARGUE', function() {
    g.next()
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.ARGUE)
  })
  it('默认Game：状态推进 to VOTE', function() {
    g.next()
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.VOTE)
  })
  it('默认Game：状态推进 to RESULT', function() {
    g.next()
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.RESULT)
  })

});

describe('Game 角色分配与重启', function() {

  var g = new Game()
  var defaultRoles = [RoleType.Werewolf, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Insomniac, RoleType.Mason, RoleType.Mason, RoleType.Villager, RoleType.Villager]
  var firstPlayerRoles

  it('Game：角色分配', function() {
    firstPlayerRoles = g.playerRoleTypes
    expect(firstPlayerRoles).to.have.members(defaultRoles)
      .but.not.have.ordered.members(defaultRoles)
  })

  it('Game：状态推进', function() {
    g.next()
    g.next()
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.OPERATE1)
  })

  it('Game：restart重新角色分配', function() {
    var res = g.restart()
    expect(res).to.be.instanceOf(Game)
    expect(g).to.have.nested.property('_statusManager.status', RestartPoint)
    expect(g.playerRoleTypes).to.have.members(defaultRoles)
      .but.not.have.ordered.members(firstPlayerRoles)
  })

})

describe('Game roles log', function() {

  var g = new Game()
  var defaultRoles = [RoleType.Werewolf, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Insomniac, RoleType.Mason, RoleType.Mason, RoleType.Villager, RoleType.Villager]
  var firstPlayerRoles

  it('Game：角色分配', function() {
    firstPlayerRoles = g.playerRoleTypes
    expect(firstPlayerRoles).to.have.members(defaultRoles)
  })

  it('Game：状态推进后有log', function() {
    g.next()
    expect(g).to.have.nested.property('_statusManager.status', GameStatus.RULE)
    expect(g._statusManager.getRoleLog(GameStatus.CONFIG)).to.deep.equal(firstPlayerRoles)
  })

})


describe('Game OPERATE1 操作', function() {

  var g = new Game()
  

})