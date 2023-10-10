const getDb  = require('../util/database').getDb;
const mongoDb = require('mongodb');

const ObjectId = mongoDb.ObjectId;

class User {
  constructor(userName, email, cart, id) {
    this.userName = userName; 
    this.email = email;
    this.cart = cart;
    this._id = id; 
  }
                 
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      item => item.productId.toString() === product._id.toString()
    );
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0) {
      console.log("if");
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else{
      console.log("else");
      updatedCartItems.push({ 
        productId : new ObjectId(product._id), 
        quantity : newQuantity
      });
    }
    const updatedCart = {
      items : updatedCartItems
    };
    const db = getDb();
    return db.collection('users')
      .updateOne(
        { _id : new ObjectId(this._id)}, 
        { $set: {cart : updatedCart}}
      )
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
