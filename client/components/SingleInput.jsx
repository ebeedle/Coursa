import React from 'react';

const SingleInput = ({title, name, type, value, onChange, placeholder=""}) => (
  <div className="form-group">
    <label htmlFor={name}> {title}: </label>
    <input
      type={type}
      className="form-control"
      name={name}
      placeholder={placeholder}
      value={value}
      required="required"
      onChange={onChange} />
  </div>
)

export default SingleInput;