export interface IRadioButtonsState {
  allIsChecked: boolean,
  undoneIsChecked: boolean,
  doneIsChecked: boolean
}

export interface IInputsValuesState {
  textInputValue: string,
  textAreaValue: string | undefined,
  isImportant: boolean,
  isDone: boolean,
}

export enum TaskCompletion {
  ALL = 'all',
  UNDONE = 'undone',
  DONE = 'done'
}