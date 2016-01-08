/* globals ReactForm: true */

ReactForm = class ReactForm {
  constructor({ id, schema, doc = {} }) {
    this.id = id;
    this.schema = schema;
    this.doc = doc;
    this.fields = {};

    // clean doc
    this._cleanDoc();
  }


  /**
   * Public methods
   */

  /**
   * Returns field component
   * @param  {String} name - Field name
   * @param  {String} type - Field type
   * @param  {Object} options - Additional options
   * @return {ReactElement} - Generated ReactElement from the field info
   */
  getField(name, type, options) {
    return {
      component: this._getFieldComponent(name, type, options),
      label: this._getLabel(name),
    };
  }


  /**
   * Private methods
   */

  /**
   * Returns React component of provided field
   * @param  {String} name - Field name
   * @param  {String} fieldType - Field type
   * @param  {Object} options - Additional options
   * @return {ReactElement} - React component
   */
  _getFieldComponent(name, fieldType, options = {}) {
    const self = this;
    const element = self._getComponentAttributes(name, fieldType, options);

    return element.createElement();
  }

  _getComponentAttributes(name, fieldType, options) {
    const self = this;
    const { defaultValue, type } = self.schema.schema(name);
    const initialValue = self.doc[name] || defaultValue;

    const defaultAttr = {
      name,
      defaultValue: initialValue,

      // field change event
      // saves current value to form object
      onChange(e) {
        const { name, value, checked, type } = e.target;
        self.doc[name] = type === 'checkbox' ? checked : value;
      },
    };

    let tag = 'input';
    let attr = {};
    let children = [];

    // if field type is provided
    switch (fieldType) {
      case 'text':
        attr = { type: 'text' };
        break;
      case 'textarea':
        tag = 'textarea';
        attr = { rows: options && options.rows };
        break;
      case 'select':
        tag = 'select';
        if (options && options.options) {
          children = options.options.map(option => {
            return new Element('option', { value: option.value }, option.label);
          });
        }
        break;
    }

    // if field type is not provided
    // generate component attributes based on schema type
    if (!fieldType) {
      switch (type.name) {
        case 'String':
          attr = { type: 'text' };
          break;
        case 'Number':
          attr = { type: 'number' };
          break;
        case 'Boolean':
          attr = {
            type: 'checkbox',
            checked: initialValue,
          };
          break;
        case 'Date':
          attr = {
            type: 'date',
            value: initialValue && initialValue.toJSON().slice(0, 10),
          };
          break;
      }
    }

    return new Element(tag, Object.assign(attr, defaultAttr), children);
  }

  /**
   * Returns field label which is defined in the simple schema
   * @param  {String} name - Field name
   * @return {String} - Returns empty string if label is not defined
   */
  _getLabel(name) {
    return this.schema.schema(name).label || '';
  }

  /**
   * Remove properties which is not in the schema definition
   * @return {undefined}
   */
  _cleanDoc() {
    const self = this;
    const valid = [
      ...Object.keys(self.schema.schema()),

      // required for update
      '_id',
    ];

    _.each(self.doc, (value, key) => {
      if (valid.indexOf(key) < 0) {
        delete self.doc[key];
      }
    });
  }
};
