Package.describe({
  name: 'teamon:react-form',
  summary: 'Form builder and validator for React',
  version: '0.0.1',
  git: 'https://github.com/teamOnHQ/react-form.git',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    // standard
    'ecmascript',
    'react@0.14.3',
    'underscore',

    // third party
    'aldeed:simple-schema@1.3.3',
  ]);

  // client
  api.addFiles([
    'namespace.js',
    'config.js',
    'element.js',
    'reactForm.js',
    'utils.js',

    // components
    'components/Form.jsx',
    'components/QuickField.jsx',
    'components/InputField.jsx',

    // template
    'template/uikit/Form.jsx',
  ], 'client');

  api.export('RF');
});
