import {ISortingByNameState} from '../services/types/state';

export const radioButtonsInitialState = {
  allIsChecked: true,
  undoneIsChecked: false,
  doneIsChecked: false
};

export const inputsValuesInitialState = {
  textInputValue: '',
  textAreaValue: '',
  isImportant: false,
  isDone: false,
};

export const sortingByNameInitialState = {
  all: true,
  descendingAlphabet: false, // А-Я
  ascendingAlphabet: false // Я-А
}

export const sortingByImportanceInitialState = {
  all: true,
  importantFirst: false,
  notImportantFirst: false
}

export const sortingByDateInitialState = {
  all: true,
  newFirst: false,
  oldFirst: false
}