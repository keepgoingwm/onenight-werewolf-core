export interface Operable {
  operateOrder: number;

  operateHelp: string;
  operateHint: string;
  operate: Function;

  getOperate(): Function;
  handleResult(): void;
}

function getOperateType() {}

function getOperateRange() {}