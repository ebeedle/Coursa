const NodeEnvironment = require('jest-environment-node');
const Promise = require('bluebird');
let db = require('../../server/db/index.js');
if (!db.queryAsync) {
  db = Promise.promisifyAll(db);
}

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    this.global.db = db; 
    console.log('environment setting up !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    this.global.yes = 'yes ?????????????'
    await super.setup();
    // this.global.db = db;
    // console.log('thisglobaldbb :', this.global.db)
    // setup();
  }
    // await someSetupTasks();
    // this.global.someGlobalObject = createGlobalObject();

  async teardown() {
    // this.global.someGlobalObject = destroyGlobalObject();
    // await someTeardownTasks();
    // teardown();
    console.log('tearing down !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;