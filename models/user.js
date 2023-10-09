const getDb  = require('../util/database').getDb;
const mongoDb = require('mongodb');

const ObjectId = mongoDb.ObjectId;

class User {
  constructor(userName, email) {
    this.userName = userName;
    this.email = email
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findById(userID) {
    const db = getDb();
    return db.collection('users')
      .findOne({_id: new ObjectId(userID)})
      .then((user) => {
        console.log(user);
        return user;
      }).catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
