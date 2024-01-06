import React, {FunctionComponent, useState} from 'react';

import accordionStyles from './accordion.module.css';

import {SortingOptionRadio} from '../sorting-option-radio/sorting-option-radio';
import {ISortingByDateState, ISortingByImportanceState, SortingByNames} from '../../services/types/state';
import {sortingByDateInitialState, sortingByImportanceInitialState} from '../../utils/constants';
import mainStore from '../../stores';

export const Accordion: FunctionComponent<{ isActive: boolean }> = (props) => {
  const [alphabetSortingRadio, setAlphabetSortingRadio] = useState<SortingByNames>(SortingByNames.ALL);
  const [importanceSortingRadio, setImportanceSortingRadio] = useState<ISortingByImportanceState>(sortingByImportanceInitialState);
  const [dateSortingRadio, setDateSortingRadio] = useState<ISortingByDateState>(sortingByDateInitialState);

  return (
    <div className={props.isActive ?
      `${accordionStyles.accordion} ${accordionStyles['accordion_is-active']}`
      : `${accordionStyles.accordion}`}>
      <h3 className={`${accordionStyles['accordion__text']} ${accordionStyles['accordion__text_heading']}`}>Сортировать
        задачи</h3>
      <form className={accordionStyles.form}>
        <fieldset className={accordionStyles.fieldset}>
          <legend className={accordionStyles.legend}>По названию/описанию</legend>
          <SortingOptionRadio id="allNames"
                              // isChecked={alphabetSortingRadio.all}
                              isChecked={alphabetSortingRadio === SortingByNames.ALL}
                              inputName="tasksNames"
                              label="Не сортировать"
                              onClickRadio={() => {
                                setAlphabetSortingRadio(SortingByNames.ALL);
                                // mainStore.sortOptions.sortByNames(mainStore.tasks.showingTasksArray, SortingByNames.ALL);
                                mainStore.tasks.setShowingTasksArray();
                              }}
          />
          <SortingOptionRadio id="ascAlphabet"
                              // isChecked={alphabetSortingRadio.ascendingAlphabet}
                              isChecked={alphabetSortingRadio === SortingByNames.ASC_ALPHABET}
                              inputName="tasksNames"
                              label="А &#8594; Я"
                              onClickRadio={() => {
                                setAlphabetSortingRadio(SortingByNames.ASC_ALPHABET);
                                mainStore.sortOptions.sortByNames(mainStore.tasks.showingTasksArray, SortingByNames.ASC_ALPHABET)
                              }}
          />
          <SortingOptionRadio id="descAlphabet"
                              // isChecked={alphabetSortingRadio.descendingAlphabet}
                              isChecked={alphabetSortingRadio === SortingByNames.DESC_ALPHABET}
                              inputName="tasksNames"
                              label="Я &#8594; А"
                              onClickRadio={() => {
                                setAlphabetSortingRadio(SortingByNames.DESC_ALPHABET);
                                mainStore.sortOptions.sortByNames(mainStore.tasks.showingTasksArray, SortingByNames.DESC_ALPHABET)
                              }}
          />
        </fieldset>
        <fieldset className={accordionStyles.fieldset}>
          <legend className={accordionStyles.legend}>По важности</legend>
          <SortingOptionRadio id="allTasks"
                              isChecked={importanceSortingRadio.all}
                              inputName="tasksImportance"
                              label="Не сортировать"
                              onClickRadio={() => {
                                setImportanceSortingRadio({
                                  all: true,
                                  importantFirst: false,
                                  notImportantFirst: false
                                })
                              }}
          />
          <SortingOptionRadio id="important"
                              isChecked={importanceSortingRadio.importantFirst}
                              inputName="tasksImportance"
                              label="Сначала важные"
                              onClickRadio={() => {
                                setImportanceSortingRadio({
                                  all: false,
                                  importantFirst: true,
                                  notImportantFirst: false
                                })
                              }}
          />
          <SortingOptionRadio id="notImportant"
                              isChecked={importanceSortingRadio.notImportantFirst}
                              inputName="tasksImportance"
                              label="Сначала неважные"
                              onClickRadio={() => {
                                setImportanceSortingRadio({
                                  all: false,
                                  importantFirst: false,
                                  notImportantFirst: true
                                })
                              }}
          />
        </fieldset>
        <fieldset className={accordionStyles.fieldset}>
          <legend className={accordionStyles.legend}>По дате</legend>
          <SortingOptionRadio id="allDates"
                              isChecked={dateSortingRadio.all}
                              inputName="tasksDates"
                              label="Не сортировать"
                              onClickRadio={() => {
                                setDateSortingRadio({
                                  all: true,
                                  newFirst: false,
                                  oldFirst: false
                                })
                              }}
          />
          <SortingOptionRadio id="newFirst"
                              isChecked={dateSortingRadio.newFirst}
                              inputName="tasksDates"
                              label="Сначала новые"
                              onClickRadio={() => {
                                setDateSortingRadio({
                                  all: false,
                                  newFirst: true,
                                  oldFirst: false
                                })
                              }}
          />
          <SortingOptionRadio id="oldFirst"
                              isChecked={dateSortingRadio.oldFirst}
                              inputName="tasksDates"
                              label="Сначала старые"
                              onClickRadio={() => {
                                setDateSortingRadio({
                                  all: false,
                                  newFirst: false,
                                  oldFirst: true
                                })
                              }}
          />
        </fieldset>
      </form>
    </div>
  )
}