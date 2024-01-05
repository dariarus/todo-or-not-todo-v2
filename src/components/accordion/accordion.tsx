import React, {FunctionComponent} from 'react';

import accordionStyles from './accordion.module.css';

import {SortOptionRadio} from '../sort-option-radi/sort-option-radio';

export const Accordion: FunctionComponent<{ isActive: boolean }> = (props) => {
  return (
    <>
      {
        // props.isActive &&
        <div className={props.isActive ?
          `${accordionStyles.accordion} ${accordionStyles['accordion_is-active']}`
          : `${accordionStyles.accordion}`}>
          <h3 className={`${accordionStyles['accordion__text']} ${accordionStyles['accordion__text_heading']}`}>Сортировать задачи</h3>
          <form className={accordionStyles.form}>
            <div>
              <h4 className={`${accordionStyles['accordion__text']} ${accordionStyles['accordion__text_subheading']}`}>По названию/описанию</h4>
              <SortOptionRadio id="descAlphabet" isChecked={true} onClickRadio={() => console.log('hi')}
                               label="А &#8594; Я"/>
              <SortOptionRadio id="ascAlphabet" isChecked={false} onClickRadio={() => console.log('hi')}
                               label="Я &#8594; А"/>
              <SortOptionRadio id="allNames" isChecked={false} onClickRadio={() => console.log('hi')}
                               label="Не сортировать"/>
            </div>
            <div>
              <h4 className={`${accordionStyles['accordion__text']} ${accordionStyles['accordion__text_subheading']}`}>По важности</h4>
              <SortOptionRadio id="important" isChecked={true} onClickRadio={() => console.log('hi')}
                               label="Сначала важные"/>
              <SortOptionRadio id="notImportant" isChecked={false} onClickRadio={() => console.log('hi')}
                               label="Сначала неважные"/>
              <SortOptionRadio id="allTasks" isChecked={false} onClickRadio={() => console.log('hi')}
                               label="Не сортировать"/>
            </div>
            <div>
              <h4 className={`${accordionStyles['accordion__text']} ${accordionStyles['accordion__text_subheading']}`}>По дате</h4>
              <SortOptionRadio id="newFirst" isChecked={true} onClickRadio={() => console.log('hi')}
                               label="Сначала новые"/>
              <SortOptionRadio id="oldFirst" isChecked={false} onClickRadio={() => console.log('hi')}
                               label="Сначала старые"/>
              <SortOptionRadio id="allDates" isChecked={false} onClickRadio={() => console.log('hi')}
                               label="Не сортировать"/>
            </div>
          </form>
        </div>
      }
    </>


  )
}