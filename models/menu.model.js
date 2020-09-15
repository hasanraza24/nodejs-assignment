var mongoose = require('../config/dbconnection');;
var createError = require('http-errors');

const menuSchema = mongoose.Schema({
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
menuSchema.post('save', (err, res, next) => {
    if (err.code === 11000) {
      const error = createError(400, 'menu already exist');
      return next(error);
    }
    return next(err);
  });

menuSchema.statics = {
    async create(menuBody) {
        try {
            const menu = new this(menuBody);
            return await menu.save();
        }catch(e) {
            return Promise.reject(e);
        }
    },
    async list(query, { limit=10, skip=0 }) {
      try {
          const menus = await this.find(query).skip(parseInt(skip)).limit(parseInt(limit));
          return menus;
      }catch(e) {
          return Promise.reject(e);
      }
  },
  async get(_id) {
      try {
          const menu = await this.findOne({ _id });
          return menu;
      }catch(e) {
          return Promise.reject(e);
      }
  }
}

const menu = mongoose.model('menu', menuSchema);

module.exports = menu;