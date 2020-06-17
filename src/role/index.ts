import { Operable } from './operable'
export { RoleType, OperateConfig } from './config'
import { RoleName, RoleType, nameMap, cnNameMap, operationMap, orderMap } from './config'
import { getDefaultRoles, getRoleOptions } from './utils';
import { AI } from '../ai'

class Role implements Operable {
  static nameMap = nameMap
  static cnNameMap = cnNameMap
  static operationMap = operationMap

  constructor(
    private _roleType: RoleType,
    readonly name: RoleName,
    readonly cnName: string,
    readonly avatar: string,
    readonly operateOrder: number,
    readonly ai?: AI
  ) { }

  get operate(): Function {
    return operationMap.get(this._roleType) as Function
  }
  get operateHelp(): string {
    return ''
  }
  get operateHint(): string {
    return ''
  }

  getOperate(): Function {
    return this.operate
  };
  
  handleResult() {

  }

  static factory(roleType: RoleType): Role {
    let o = new Role(
      roleType,
      nameMap.get(roleType) as RoleName,
      cnNameMap.get(roleType) as string,
      '',
      orderMap.get(roleType) as number,
      function () { return operationMap.get(roleType) }
    )
    return o
  }
  static getDefaultRoles = getDefaultRoles
  static getRoleOptions = getRoleOptions
}

export default Role
