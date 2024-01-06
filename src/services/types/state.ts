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

export enum SortingByNames {
  ALL = 'all',
  ASC_ALPHABET = 'ascAlphabet',
  DESC_ALPHABET = 'descAlphabet'
}

export enum SortingByImportance {
  ALL = 'all',
  IMPORTANT_FIRST = 'importantFirst',
  NOT_IMPORTANT_FIRST = 'notImportantFirst'
}

export enum SortingByDate {
  ALL = 'all',
  NEW_FIRST = 'newFirst',
  OLD_FIRST = 'oldFirst'
}