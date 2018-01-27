console.log('seettign up environment (defining db in bob.js)')
const Promise = require('bluebird');
global.db = require('../server/db/index.js');
if (!global.db.queryAsync) {
  global.db = Promise.promisifyAll(db);
}

/*

"babel-core": "^6.26.0",
"babel-loader": "^7.1.2",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react": "^6.24.1",
"webpack": "^3.6.0"

//just uninstall

"ejs": "^2.5.7",
*/