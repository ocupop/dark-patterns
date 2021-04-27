import React from 'react'
import Label from './label'
import { Checkbox } from 'semantic-ui-react'
// import Hint from './hint'

const SwitchInput = ({
  className, hint, type, label, field, onChange, toggle,
  form: {
    errors,
    touched,
  },
}) => {
  // deleting field.value, this throws an error with the Checkbox Element.
  delete field.value

  return (
    <div className={`form-group ${className}`}>
      <div className="d-flex align-items-center">
        <Checkbox
          {...field}
          type={type}
          checked={field.checked}
          onChange={onChange}
          toggle={toggle}
        />
        <div className="mx-3">
          <Label label={label} hint={hint} />
        </div>
      </div>
    </div>
  )
}

export default SwitchInput
