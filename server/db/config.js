const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }


/*
Visual Tables:
  -http://ondras.zarovi.cz/sql/demo/ 
  -load from server
  -keyword 'berkScanner'  
*/

  // Create users table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(200),
      password VARCHAR(100),
      salt VARCHAR(100),
      phone VARCHAR(10),
      preference VARCHAR(1)
    );`)
    .then(() => {
      // Create classes table
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS courses (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          number INT,
          name VARCHAR(150),
          teachers VARCHAR(150),
          code VARCHAR(100),
          description VARCHAR(100),
          status VARCHAR(3),
          year INT,
          term VARCHAR(15)
        );`);
    })
     .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS users_courses (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          class_id INT
        );`);
    })
      .then(() => {
       return db.queryAsync(`
         CREATE TABLE IF NOT EXISTS users_secondary_courses (
           id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
           user_id INT,
           class_id INT
         );`);
     })
     .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS secondary_courses (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          parent_id INT,
          parent_number INT,
          number INT,
          name VARCHAR(150),
          code VARCHAR(100),
          status VARCHAR(3)
        );`);
    })

    .error(err => {
      console.log(err);
    });
};
