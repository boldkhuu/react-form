import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import RF from '../utils/main';


const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};
const contextTypes = {
  // formId is provided from parent form component
  formId: PropTypes.string,
};

class InputField extends Component {
  constructor(props, context) {
    super(props, context);

    const { formId } = context;
    const { name, type } = props;

    // omit special props
    const options = _.omit(props, 'name', 'type');
    const { component } = RF.getField(formId, name, type, options);

    this.state = { component };
  }

  render() {
    return React.cloneElement(this.state.component, this.props);
  }
}

InputField.propTypes = propTypes;
InputField.contextTypes = contextTypes;

export default InputField;
