import React from 'react';
import {
  CInput,
  CFormGroup,
  CFormText,
  CLabel
} from '@coreui/react'
/**
* @author
* @function Input
**/

const Input = (props) => {

  let input = null;
  switch (props.type) {
    case 'select':
      input = <CFormGroup>
        {props.label && <CLabel>{props.label}</CLabel>}
        <select
          className="form-control form-control-sm"
          value={props.value}
          onChange={props.onChange}
        >
          <option value="">{props.placeholder}</option>
          {
            props.options.length > 0 ?
              props.options.map((option, index) =>
                <option key={index} value={option.value}>{option.name}</option>
              ) : null
          }
        </select>
      </CFormGroup>
      break;
    case 'selectStatus':
      input = <CFormGroup>
        {props.label && <CLabel>{props.label}</CLabel>}
        <select
          className="form-control form-control-sm"
          value={props.value}
          onChange={props.onChange}
        >
          <option value="">{props.placeholder}</option>
          {
            props.options.map((status, index) =>
              !status.isCompleted ?
                <option key={index} value={status.value}>{status.type}</option>
                : null
            )
          }
        </select>
      </CFormGroup>
      break;
    case 'text':
    default:
      input = <CFormGroup>
        {props.label && <CLabel>{props.label}</CLabel>}
        <CInput
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          {...props}
        />
        <CFormText className="text-muted">
          {props.errorMessage}
        </CFormText>
      </CFormGroup>
  }


  return input;

}

export default Input