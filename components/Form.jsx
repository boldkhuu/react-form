import React from 'react';
import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import RF from '../utils/main';


const TYPES = { method: 'method', methodUpdate: 'method-update' };

const Form = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    schema: React.PropTypes.instanceOf(SimpleSchema).isRequired,
    type: React.PropTypes.oneOf(_.values(TYPES)),
    method: React.PropTypes.string,
    doc: React.PropTypes.object,
    template: React.PropTypes.string,
    className: React.PropTypes.string,

    // hooks
    onSubmit: React.PropTypes.func,
    beforeSubmit: React.PropTypes.func,
  },
  componentWillMount() {
    const { id, schema, doc } = this.props;

    RF.initForm({ id, schema, doc });
  },

  // Uses Context here to pass formId to all child components
  // including nested children.
  childContextTypes: {
    formId: React.PropTypes.string,
  },
  getChildContext() {
    return { formId: this.props.id };
  },

  _onSubmit(e) {
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
  },

  render() {
    const { id, template, children, className } = this.props;

    const attr = {
      id,
      className,
    };

    let Template;

    switch(template || RF.Config.theme) {
      case 'uikit':
      default: {
        Template = RF.Templates.Uikit.Form;
      }
    }

    return (
      <Template {...attr} onSubmit={this._onSubmit}>
        {children}
      </Template>
    );
  },
});

export default Form;
