// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDjvAbZ7_WyrVLGZQp3LrLIhSNFkj8VXhU',
    authDomain: 'insight-e1d4e.firebaseapp.com',
    databaseURL: 'https://insight-e1d4e.firebaseio.com',
    projectId: 'insight-e1d4e',
    storageBucket: 'insight-e1d4e.appspot.com',
    messagingSenderId: '734599135461',
    timestampsInSnapshots: true,
  }
};
