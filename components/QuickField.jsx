import React from 'react';
import RF from '../utils/main';


const QuickField = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  contextTypes: {
    // formId is provided from parent form component
    formId: React.PropTypes.string,
  },
  getInitialState() {
    const field = RF.getField(this.context.formId, this.props.name);
    const { component, label } = field;

    return { label, component };
  },

  render() {
    const { label, component } = this.state;

    return (
      <div className="uk-form-row">
        <label className="uk-form-label">{label}</label>
        <div className="uk-form-controls">{component}</div>
      </div>
    );
  },
});

export default QuickField;
