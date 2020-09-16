var mongoose = require('../config/dbconnection');;
var shortId = require('shortid')
var createError = require('http-errors');

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortId.generate
    },
    menus: [String],
    address: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
}, { timestamps: true });

orderSchema.index({ name: 1 }, { unique: true })

//pre save hook for validation
orderSchema.post('save', (err, res, next) => {
    if (err.code === 11000) {
      const error = createError(400, 'order already exist');
      return next(error);
    }
    return next(err);
  });

orderSchema.statics = {
    async create(orderBody) {
        try {
            const order = new this(orderBody);
            return await order.save();
        }catch(e) {
            return Promise.reject(e);
        }
    },
    async list(query, { limit=10, skip=0 }) {
      try {
          const orders = await this.find(query).skip(parseInt(skip)).limit(parseInt(limit));
          return orders;
      }catch(e) {
          return Promise.reject(e);
      }
  },
  async get(_id) {
      try {
          const order = await this.findOne({ _id });
          return order;
      }catch(e) {
          return Promise.reject(e);
      }
  },
  async getOrderInfo(_id) {
    try {
      const order = await this.aggregate([
        { $match: { _id } },
        { $lookup: {
          from: 'menus',
            let: { menuIds: '$menus' },
            pipeline: [{
                $match: { $expr: {
                    $in: ['$_id', '$$menuIds']
                } }
            }],
            as: 'menuItems'
        } },
    ])
    return order
    } catch (e) {
      return Promise.reject(e)
    }
  }

}

const order = mongoose.model('order', orderSchema);

module.exports = order;