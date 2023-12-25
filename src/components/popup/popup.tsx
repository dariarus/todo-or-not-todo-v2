import React, {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import popupStyles from './popup.module.css';

import {Overlay} from '../overlay/overlay';
import {TPopup} from '../../services/types/props';
import {AddTaskForm} from '../add-task-form/add-task-form';
import {TaskInputs} from '../task-inputs/task-inputs';
import {IInputsValuesState} from '../../services/types/state';
import {inputsValuesInitialState} from '../../utils/constants';
import {RadioButton} from '../radio-button/radio-button';
import taskItemStyles from '../task-item/task-item.module.css';

export const Popup: FunctionComponent<TPopup> = (props) => {
  const [inputsValues, setInputsValues] = useState<IInputsValuesState>(inputsValuesInitialState);
  const [taskIsDone, setTaskIsDone] = useState<boolean>(props.isDone);

  const popupRoot = document.getElementById('popup');

  const handleEscClose = useCallback((evt: KeyboardEvent): void => {
    if (evt.key === 'Escape') {
      props.onClosePopup();
    }
  }, [props])

  const handleChangeTaskIsDone = () => {

  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose)
    return () => {
      document.removeEventListener("keydown", handleEscClose)
    }
  }, [handleEscClose])

  if (popupRoot !== null) {
    return ReactDOM.createPortal(
      (
        <>
          <Overlay onClose={props.onClosePopup}/>
          <div className={popupStyles.popup}>
            <button className={popupStyles['popup__cross-icon']} onClick={props.onClosePopup}>
            </button>
            <h3 className={`${popupStyles['popup__text']} ${popupStyles['popup__text_heading']}`}>Редактировать
              задачу</h3>
            <form className={popupStyles.popup__form}>
              <TaskInputs
                isPopupInput={true}
                taskNameValue={props.name}
                taskDescriptionValue={props.description}
                setTaskNameValue={(e: ChangeEvent<HTMLInputElement>) => {
                  setInputsValues({
                    ...inputsValues,
                    textInputValue: e.target.value
                  })
                }}
                setTaskDescriptionValue={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setInputsValues({
                    ...inputsValues,
                    textAreaValue: e.target.value
                  })
                }}
              />
              <div className={popupStyles['popup__checkbox-wrap']}>
                <input type="checkbox"
                       id={props.name}
                       checked={taskIsDone}
                       className={taskItemStyles['task__checkbox']}
                       onChange={() => {
                         props.onChangeTaskStatus(props.id);
                         setTaskIsDone(!taskIsDone);
                       }}
                />
                <label htmlFor={props.name} className={popupStyles['popup__checkbox-label']}>Задача выполнена</label>
              </div>
              <div className={popupStyles['popup__buttons-wrap']}>
                <button className={`${popupStyles.popup__button} ${popupStyles.popup__button_type_save}`}>Сохранить</button>
                <button className={`${popupStyles.popup__button} ${popupStyles.popup__button_type_cancel}`}>Отменить</button>
              </div>
            </form>
          </div>
        </>
      ), popupRoot
    )
  } else return null

}