import React from 'react';
import _ from 'underscore';
import RF from '../utils/main';


const InputField = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
  },
  contextTypes: {
    // formId is provided from parent form component
    formId: React.PropTypes.string,
  },
  getInitialState() {
    const formId = this.context.formId;
    const { name, type } = this.props;

    // omit special props
    const options = _.omit(this.props, 'name', 'type');
    const { component } = RF.getField(formId, name, type, options);

    return { component };
  },

  render() {
    return React.cloneElement(this.state.component, this.props);
  },
});

export default InputField;
