import React, { PropTypes, Component } from 'react';
import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import RF from '../utils/main';


const TYPES = {
  method: 'method',
  methodUpdate: 'method-update',
};

const propTypes = {
  id: PropTypes.string.isRequired,
  schema: PropTypes.instanceOf(SimpleSchema).isRequired,
  type: PropTypes.oneOf(_.values(TYPES)),
  method: PropTypes.string,
  doc: PropTypes.object,
  template: PropTypes.string,
  className: PropTypes.string,

  // hooks
  onSubmit: PropTypes.func,
  beforeSubmit: PropTypes.func,
};
const childContextTypes = {
  formId: PropTypes.string,
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { id, schema, doc } = this.props;
    RF.initForm({ id, schema, doc });
  }

  // Uses Context here to pass formId to all child components
  // including nested children.
  getChildContext() {
    return { formId: this.props.id };
  }

  onSubmit(e) {
    e.preventDefault();

    const { id, type, method, onSubmit, beforeSubmit } = this.props;
    const form = RF.Forms[id];

    // before hook
    if (beforeSubmit) {
      const modified = beforeSubmit(form.doc);

      if (modified) {
        RF.Forms[id].doc = modified;
      }
    }

    let args = [];

    switch (type) {
      case TYPES.method:
        args = [form.doc];
        break;
      case TYPES.methodUpdate:
        args = [
          form.doc._id,
          _.omit(form.doc, '_id'),
        ];
        break;
    }

    Meteor.call(method, ...args, (error, result) => {
      if (error) {
        return onSubmit(error, null);
      }

      return onSubmit(null, result);
    });
  }

  render() {
    const { id, template, children, className } = this.props;
    const attr = { id, className };

    let Template;

    switch(template || RF.Config.Theme) {
      case 'uikit':
      default: {
        Template = RF.Templates.Uikit.Form;
      }
    }

    return (
      <Template {...attr} onSubmit={this.onSubmit}>
        {children}
      </Template>
    );
  }
}

Form.propTypes = propTypes;
Form.childContextTypes = childContextTypes;

export default Form;
