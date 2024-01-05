import React, {FunctionComponent} from 'react';

import sortOptionCheckboxStyles from './sort-option-radio.module.css';
import {TSortOptionRadio} from '../../services/types/props';

export const SortOptionRadio: FunctionComponent<TSortOptionRadio> = (props) => {
  return (
    <label htmlFor={props.id} className={sortOptionCheckboxStyles.label}>
      <input type="radio"
             id={props.id}
             name="radio"
             // value={props.value}
             checked={props.isChecked}
             className={sortOptionCheckboxStyles.input}
             onChange={props.onClickRadio}
      />
      {props.label}</label>
  )
}