var mongoose = require('../config/dbconnection');;
var createError = require('http-errors');
var shortId = require('shortid')

const cartSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortId.generate
    },
    menus: [String],
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

cartSchema.index({ userId: 1 }, { unique: true })

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
    async addMenuItem(userId, menuIds) {
        try {
            const updatedCart = await this.findOneAndUpdate({ userId }, {
                $push: {
                    menus: { $each: menuIds }
                }
            }, { new: true })
            return updatedCart
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async removeMenuItem(userId, menuId) {
        try {
            const updatedCart = await this.findOneAndUpdate({ userId }, {
                $pull: {
                    menus: menuId
                }
            }, { upsert: true, new: true })
            return updatedCart
        } catch (e) {
            return Promise.reject(e)
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
  async getByUserId (userId) {
    try {
        const cart = await this.aggregate([
            { $match: { userId } },
            { $lookup: {
                let: { menuIds: '$menus' },
                from: 'menu',
                pipeline: [{
                    $match: { $expr: {
                        $in: ['$_id', '$$menuIds']
                    } }
                }],
                as: 'menuItems'
            } },
        ])
        return cart
    } catch (e) {
        return Promise.reject(e)
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