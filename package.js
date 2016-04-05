Package.describe({
  name: 'teamon:react-form',
  summary: 'Form builder and validator for React',
  version: '0.0.2',
  git: 'https://github.com/teamOnHQ/react-form.git',
});

Npm.depends({
  'underscore': '1.8.3',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3');

  api.use([
    'ecmascript',
    'aldeed:simple-schema@1.5.3',
  ]);

  api.mainModule('main.client.js', 'client');
});
