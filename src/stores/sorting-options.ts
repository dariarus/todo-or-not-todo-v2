import {makeAutoObservable, toJS} from 'mobx';
import {SortingByDate, SortingByImportance, SortingByNames} from '../services/types/state';
import {TTask} from '../services/types/props';

export class SortingOptions {
  sortingByNameParameter: SortingByNames = SortingByNames.ALL;
  sortingByImportanceParameter: SortingByImportance = SortingByImportance.ALL;
  sortingByDateParameter: SortingByDate = SortingByDate.ALL;

  constructor() {
    makeAutoObservable(this);
  }

  sortByNames(sortingArray: TTask[], order: SortingByNames) {
    this.sortingByNameParameter = order;
    const sortTasksByName = (a: TTask, b: TTask) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return 1;
      } else if (nameA < nameB) {
        return -1
      }
      return 0;
    }

    switch (order) {
      case SortingByNames.ALL:
        return;
      case SortingByNames.ASC_ALPHABET:
        return sortingArray.sort((a, b) => sortTasksByName(a, b));
      case SortingByNames.DESC_ALPHABET:
        return sortingArray.sort((a, b) => sortTasksByName(b, a));
    }
  }
}