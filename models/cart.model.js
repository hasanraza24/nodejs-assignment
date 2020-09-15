var mongoose = require('../config/dbconnection');;
var createError = require('http-errors');

const cartSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
});

//pre save hook for validation
cartSchema.post('save', (err, res, next) => {
    if (err.code === 11000) {
      const error = createError(400, 'cart already exist');
      return next(error);
    }
    return next(err);
  });

cartSchema.statics = {
    async create(cartBody) {
        try {
            const cart = new this(cartBody);
            return await cart.save();
        }catch(e) {
            return Promise.reject(e);
        }
    },
    async list(query, { limit=10, skip=0 }) {
      try {
          const carts = await this.find(query).skip(parseInt(skip)).limit(parseInt(limit));
          return carts;
      }catch(e) {
          return Promise.reject(e);
      }
  },
  async get(_id) {
      try {
          const cart = await this.findOne({ _id });
          return cart;
      }catch(e) {
          return Promise.reject(e);
      }
  }
}

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;