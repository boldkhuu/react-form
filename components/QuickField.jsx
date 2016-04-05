import React, { Component, PropTypes } from 'react';
import RF from '../utils/main';


const propTypes = {
  name: PropTypes.string.isRequired,
};
const contextTypes = {
  // formId is provided from parent form component
  formId: PropTypes.string,
};

class QuickField extends Component {
  constructor(props, context) {
    super(props, context);

    const { component, label } = RF.getField(context.formId, props.name);

    this.state = { label, component };
  }

  render() {
    const { label, component } = this.state;

    return (
      <div>
        <label>{label}</label>
        <div>{component}</div>
      </div>
    );
  }
}

QuickField.propTypes = propTypes;
QuickField.contextTypes = contextTypes;

export default QuickField;
