import ReactForm from './reactForm';
import Form from '../template/uikit/Form.jsx';


/**
 * Main namespace object for ReactForm package
 * @namespace RF
 */
const RF = {
  Forms: {},
  Templates: {
    Uikit: { Form },
  },
  Config: {
    Theme: 'uikit',
  },

  /**
   * Initialize ReactForm
   * @param  {String} options.id - Form id
   * @param  {SimpleSchema} options.schema - Form schema
   * @param  {Object} options.doc - Required for update form
   * @return {ReactForm} - initialized state of the form
   */
  initForm({ id, schema, doc }) {
    const form = new ReactForm({ id, schema, doc });

    this.Forms[id] = form;

    return form;
  },

  getField(formId, fieldName, type, options) {
    return this.Forms[formId].getField(fieldName, type, options);
  },
};

export default RF;
