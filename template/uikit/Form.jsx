import React from 'react';


const Form = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
  },

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
  },
});

export default Form;
