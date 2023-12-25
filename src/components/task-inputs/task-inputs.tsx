import React, {ChangeEvent, FunctionComponent} from 'react';

import taskInputsStyles from './task-inputs.module.css';

import {TTaskInputs} from '../../services/types/props';

export const TaskInputs: FunctionComponent<TTaskInputs> = (props) => {
  return (
    <div className={taskInputsStyles['input-wrap']}>
      <input type="text"
             value={props.taskNameValue}
             placeholder="Задача"
             className={taskInputsStyles['text-input']}
             onChange={props.setTaskNameValue}
      />
      <textarea value={props.taskDescriptionValue}
                placeholder="Описание (опционально)"
                className={taskInputsStyles['text-area']}
                style={props.isPopupInput ? {borderBottom: '1px solid rgba(171, 177, 193, .5)'} : undefined}
                onChange={props.setTaskDescriptionValue}
      />
    </div>
  )
}