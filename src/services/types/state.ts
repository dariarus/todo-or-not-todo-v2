export interface IRadioButtonsState {
  allIsChecked: boolean,
  undoneIsChecked: boolean,
  doneIsChecked: boolean
}

export interface ISortingByNameState {
  all: boolean,
  ascendingAlphabet: boolean // А-Я
  descendingAlphabet: boolean, // Я-А
}

export interface ISortingByImportanceState {
  all: boolean,
  importantFirst: boolean,
  notImportantFirst: boolean
}

export interface ISortingByDateState {
  all: boolean,
  newFirst: boolean,
  oldFirst: boolean
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

export enum SortingParameters {
  ALL = 'all',
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}