import {makeAutoObservable, toJS} from 'mobx';
import {SortingParameters} from '../services/types/state';
import {TTask} from '../services/types/props';

export class SortingOptions {
  sortingByNameParameter: SortingParameters = SortingParameters.ALL;
  sortingByImportanceParameter: SortingParameters = SortingParameters.ALL;
  sortingByDateParameter: SortingParameters = SortingParameters.ALL;

  constructor() {
    makeAutoObservable(this);
  }

  sort<T>(a: T, b: T) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1
    }
    return 0;
  }

  sortByNames(sortingArray: TTask[], order: SortingParameters) {
    this.sortingByNameParameter = order;
    switch (order) {
      case SortingParameters.ALL:
        return;
      case SortingParameters.ASCENDING:
        return sortingArray.sort((a, b) => this.sort(a.name?.toUpperCase(), b.name?.toUpperCase()));
      case SortingParameters.DESCENDING:
        return sortingArray.sort((a, b) => this.sort(b.name.toUpperCase(), a.name.toUpperCase()));
    }
  }

  sortByImportance(sortingArray: TTask[], order: SortingParameters) {
    this.sortingByImportanceParameter = order;
    switch (order) {
      case SortingParameters.ALL:
        return;
      case SortingParameters.ASCENDING:
        return sortingArray.sort((a, b) => this.sort(b.isImportant, a.isImportant));
      case SortingParameters.DESCENDING:
        return sortingArray.sort((a, b) => this.sort(a.isImportant, b.isImportant));
    }
  }

  sortByDate(sortingArray: TTask[], order: SortingParameters) {
    this.sortingByDateParameter = order;
    switch (order) {
      case SortingParameters.ALL:
        return;
      case SortingParameters.ASCENDING:
        return sortingArray.sort((a, b) => a.closeDate && b.closeDate
          ? this.sort(b.closeDate, a.closeDate)
          : this.sort(b.createDate, a.createDate));
      case SortingParameters.DESCENDING:
        return sortingArray.sort((a, b) => a.closeDate && b.closeDate
          ? this.sort(a.closeDate, b.closeDate)
          : this.sort(a.createDate, b.createDate));
    }
  }
}