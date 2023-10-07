// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('group-chat-app', 'root', '246810', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

exports.mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://balaji:qwerty2000@cluster0.3quxtkg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp')
    .then((client) => {
      console.log("success");
      // console.log(result);
      db = client.db();
      callback();
    }).catch((err) => {
      console.log(err);
      throw err;
    });
}

exports.getDb = () => {
  if(db) {
    return db;
  }
  throw 'Np Database Found!'
}


// module.exports = mongoConnect; 

