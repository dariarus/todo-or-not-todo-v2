import React, {FunctionComponent} from 'react';

import checkboxStyles from './is-done-checkbox.module.css';

import {TIsDoneCheckbox} from '../../services/types/props';

export const IsDoneCheckbox: FunctionComponent<TIsDoneCheckbox> = (props) => {
  return (
    <input type="checkbox"
           id={props.labelId}
           checked={props.checked}
           className={checkboxStyles.checkbox}
           onChange={props.onChange}
    />
  )
}