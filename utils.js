/* globals RF, ReactForm */

Object.assign(RF, {
  /**
   * Initialize ReactForm
   * @param  {String} options.id - Form id
   * @param  {SimpleSchema} options.schema - Form schema
   * @param  {Object} options.doc - Required for update form
   * @return {ReactForm} - initialized state of the form
   */
  initForm({ id, schema, doc }) {
    const form = new ReactForm({ id, schema, doc });

    RF.Forms[id] = form;

    return form;
  },

  getField(formId, fieldName, type, options) {
    return RF.Forms[formId].getField(fieldName, type, options);
  },
});
