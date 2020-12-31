import { GameStatus } from '../game/status-manager/status-machine'
import { Operable } from './operable';

// 村民 Villager
// 预言家 Seer, 失眠者 Insomniac, 强盗 Robber, 捣蛋鬼 Troublemaker, 酒鬼 Drunk, 猎人 Hunter, 守夜人 Mason, 
// 狼人 Werewolf, 爪牙 Minion,
// 皮匠 Tanner, 化身幽灵 Doppelganger,
export const availableRoles = {
  '狼人': true, // 狼人阵营：得知自己的狼同伴，孤狼可以看一张底牌（总人数大于一定数目情况下）
  '爪牙': true, // 狼人阵营：保护狼主人，替狼人挡住投票
  '预言家': true, // 平民阵营：可以查验场上一个人的身份或者底牌中的两张
  '强盗': true, // 平民阵营：可以抢夺一张场上玩家的牌，与自己互换；操作顺位“”
  '捣蛋鬼': true, // 平民阵营：交换场上两个其他玩家的角色；操作顺位“”
  '失眠者': true, // 平民阵营：夜晚结束可以看到自己最终的身份
  '酒鬼': true, // 平民阵营：酒鬼在夜晚必须将自己的身份牌与1张桌面中央的身份牌交换
  '村民': true, // 平民阵营：
  '守卫': true, // 平民阵营：在守夜人的行动阶段，所有守夜人互相确认身份
  '皮匠': true, // 皮匠阵营：
  //
  '头狼': false, // 狼人阵营：
  '狼先知': false, // 狼人阵营：查看任意一名玩家的身份
  '学徒预言家': false, // 平民阵营：查看一张底牌
  '女巫': false,   // 平民阵营：女巫在夜晚可以查看一张桌面中央的卡牌，并将该卡牌与任意一名玩家，包括女巫自己的卡牌进行交换。但是女巫并不能查看被交换玩家的卡牌。
  '揭示者': false, // 村民阵营：揭示者在晚上可以将任意一名玩家的卡牌正面朝上放置，如果翻到的是狼人的卡牌则需要将该卡牌翻回背面放置
}
  // get operateGuide () {
  //   switch (this.roleName) {
  //     case '狼人':
  //       return '看看我的狼同伴，或者看看剩下了什么好东西'
  //     case '爪牙':
  //       return '我的主人，你在哪里'
  //     case '预言家':
  //       return '请选择查验目标'
  //     case '强盗':
  //       return '请选择抢劫目标'
  //     case '捣蛋鬼':
  //       return '请选择两个目标（不能选择自己）'
  //     case '失眠者':
  //       return '等待是我今生做过最有意思的事情'
  //     case '酒鬼':
  //       return '请选择两个目标'
  //     case '村民':
  //       return '励志做个愚民，闭眼到底'
  //     case '守卫':
  //       return '看看我的好基友在哪里'
  //     default:
  //       return '你木有技能！'
  //   }
  // }


export type RoleName = 'Villager' | 'Mason' | 'Seer' | 'Insomniac' | 'Robber' | 'Troublemaker' |
 'Drunk' | 'Hunter' | 'Werewolf' | 'Minion' | 'Tanner' | 'Doppelganger' | 
 '狼先知' | '头狼' | '见习预言家' | '揭示者' | '女巫' | '王子' | '模仿者' | '超自然调查员'

export enum RoleType {
  Villager = 'Villager',
  //
  Seer = 'Seer',
  Insomniac = 'Insomniac',
  Robber = 'Robber',
  Troublemaker = 'Troublemaker',
  Drunk = 'Drunk',
  Hunter = 'Hunter',
  Mason = 'Mason',
  // 
  Werewolf = 'Werewolf',
  Minion = 'Minion',
  //
  Tanner = 'Tanner',
  Doppelganger = 'Doppelganger',
}

export const nameMap: Map<RoleType, RoleName> = new Map([
  [RoleType.Villager, 'Villager'],
  //
  [RoleType.Seer, 'Seer'],
  [RoleType.Insomniac, 'Insomniac'],
  [RoleType.Robber, 'Robber'],
  [RoleType.Troublemaker, 'Troublemaker'],
  [RoleType.Drunk, 'Drunk'],
  [RoleType.Hunter, 'Hunter'],
  [RoleType.Mason, 'Mason'],
  // 
  [RoleType.Werewolf, 'Werewolf'],
  [RoleType.Minion, 'Minion'],
  //
  [RoleType.Tanner, 'Tanner'],
  [RoleType.Doppelganger, 'Doppelganger'],
])

export const cnNameMap: Map<RoleType, string> = new Map([
  [RoleType.Villager, '村民'],
  //
  [RoleType.Seer, '预言家'],
  [RoleType.Insomniac, '失眠者'],
  [RoleType.Robber, '强盗'],
  [RoleType.Troublemaker, '捣蛋鬼'],
  [RoleType.Drunk, '酒鬼'],
  [RoleType.Hunter, '猎人'],
  [RoleType.Mason, '守夜人'],
  // 
  [RoleType.Werewolf, '狼人'],
  [RoleType.Minion, '爪牙'],
  //
  [RoleType.Tanner, '皮匠'],
  [RoleType.Doppelganger, '化身幽灵'],
])

export const NightNight = `漫漫长夜。。。`

// 获取指定玩家
// 获取特定角色
// 交换指定玩家
// 复制特定玩家
// 组合
// 二段操作（化身幽灵）
// 结果阶段操作

export type OperateType = 'none' | 'getPlayByRoleType' | 'getRoleByPlayerOrder' | 'swapPlayerOrder' | 'copyPlayer'
export interface OperateConfig {
  type: OperateType;
  targetRoleType?: RoleType;
  rangeFrom?: Array<number> | number;
  rangeTo?: Array<number> | number;
  next?: OperateConfig  // 二段操作
}

export const operationMap: Map<RoleType, (status: GameStatus, type: string) => OperateConfig> = new Map([
  [RoleType.Villager, function (status, type): OperateConfig {
    switch (status) {
      case GameStatus.OPERATE1:
        return {
          type: 'none'
        }
      case GameStatus.OPERATE2:
        return {
          type: 'none',
        }
      default:
        return {
          type: 'none',
        }
    }
  }],
  [RoleType.Seer, function (status, type): OperateConfig {
    switch (status) {
      case GameStatus.OPERATE1:
        return {
          type: 'getRoleByPlayerOrder',
          rangeFrom: [1, 2, 3]
        }
      default:
        return {
          type: 'none',
        }
    }
  }],
  // [RoleType.Insomniac, function () { }],
  // [RoleType.Robber, function () { }],
  // [RoleType.Troublemaker, function () { }],
  // [RoleType.Drunk, function () { }],
  // [RoleType.Hunter, function () { }],
  // [RoleType.Mason, function () { }],
  // [RoleType.Werewolf, function () { }],
  // [RoleType.Minion, function () { }],
  // [RoleType.Tanner, function () { }],
  // [RoleType.Doppelganger, function () { }],
])

/**
 * 操作顺序：
 * 化身幽灵 ⇉ 模仿者 ⇉ 狼人 ⇉ 头狼 ⇉ 狼先知 ⇉ 爪牙 ⇉ 守夜人 ⇉ 预言家 ⇉ 见习预言家 ⇉ 超自然调查员 ⇉ 强盗 ⇉ 女巫 ⇉ 捣蛋鬼 ⇉ 酒鬼 ⇉ 失眠者 ⇉ 揭示者 ⇉ 灵气先知
 */
export const orderMap: Map<RoleType, number> = new Map([
  [RoleType.Villager, -10],
  //
  [RoleType.Seer, 50],
  [RoleType.Insomniac, 100],
  [RoleType.Robber, 60],
  [RoleType.Troublemaker, 70],
  [RoleType.Drunk, 80],
  [RoleType.Hunter, 110],
  [RoleType.Mason, 40],
  // 
  [RoleType.Werewolf, 20],
  [RoleType.Minion, 30],
  //
  [RoleType.Tanner, 90],
  [RoleType.Doppelganger, 10],
])