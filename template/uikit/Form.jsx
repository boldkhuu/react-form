import React, { Component, PropTypes } from 'react';


const propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

class Form extends Component {
  render() {
    const { id, children, onSubmit } = this.props;
    const className = `uk-form uk-form-stacked ${this.props.className}`;

    return (
      <form
        id={id}
        onSubmit={onSubmit}
        className={className}>

        {children}
      </form>
    );
  }
}

Form.propTypes = propTypes;

export default Form;
