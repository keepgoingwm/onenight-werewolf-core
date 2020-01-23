export interface Operable {
  operateOrder: number;

  operateHelp: string;
  operateHint: string;
  operate: Function;

  getOperate(): Function;
}

function getOperateType() {}

function getOperateRange() {}