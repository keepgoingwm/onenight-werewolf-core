import { RoleType, nameMap, cnNameMap } from './config'

const defaultRoleMap: { [prop: number]: Array<Array<RoleType>> } = {
  3: [[RoleType.Werewolf, RoleType.Werewolf, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Villager],
  [RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Drunk, RoleType.Villager]],
  4: [[RoleType.Werewolf, RoleType.Werewolf, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Villager, RoleType.Villager],
  [RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Drunk, RoleType.Villager]],
  5: [[RoleType.Werewolf, RoleType.Werewolf, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Villager, RoleType.Villager, RoleType.Villager],
  [RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Drunk, RoleType.Villager, RoleType.Villager]],
  6: [[RoleType.Werewolf, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Insomniac, RoleType.Villager, RoleType.Villager]],
  7: [[RoleType.Werewolf, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Insomniac, RoleType.Villager, RoleType.Villager, RoleType.Villager]],
  8: [[RoleType.Werewolf, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Insomniac, RoleType.Mason, RoleType.Mason, RoleType.Villager, RoleType.Villager]],
  9: [[RoleType.Werewolf, RoleType.Werewolf, RoleType.Minion, RoleType.Seer, RoleType.Robber, RoleType.Troublemaker, RoleType.Drunk, RoleType.Villager, RoleType.Villager, RoleType.Villager, RoleType.Villager, RoleType.Villager]]
}

export function getDefaultRoles(n: number): Array<RoleType> {
  return defaultRoleMap[n][0]
}

export function getRoleOptions(roleTypes: Array<RoleType>) {
  return roleTypes.map((roleType) => ({
    value: roleType,
    name: nameMap.get(roleType),
    cnName: cnNameMap.get(roleType)
  }))
}

export function checkRole() {
  // 角色数
  // 有狼，独狼
  // 守夜人不能1个
  // 必须有换牌角色才能有失眠者
}