const Order = require('../models/order.model')
const User = require('../models/user.model')
const mailHelper = require('../helpers/mail.helper')
const Menu = require('../models/menu.model')

const create = async (req, res, next) => {
  try {
    req.body.userId = req.user._id
    const order = await Order.create(req.body)
    sendOrderEmail(order._id).then(() => {
      console.log('email sent')
    }).catch(err => {
      console.log('Error while sending email', err)
    })
    res.json({ data: { order }, message: 'order generated'});
  } catch (e) {
    next(e)
  }
}

const sendOrderEmail = async (orderId) => {
  try {
    const orderData = await Order.getOrderInfo(orderId)
    if (!orderData) {
      const err = new Error('Order not found')
      throw err
    }
    const userData = await User.get(orderData.userId)
    if (!userData) {
      const err = new Error('User not found')
      throw err
    }

    let orderItems = ''
    for (let item of orderData.menuItems) {
      orderItems += `<li>${item.name}  <b>Rs. ${item.price}</b></li>`
    }

    let text = `<p>Hi ${userData.name}</p>
      <p>Your order has been coonfirmed and will deliver in 7 working days at ${orderData.address}</p>
      <p>Orders Item</p>
      <ul>${orderItems}</ul>
      <b>Total Pice Rs. ${orderData.totalPrice}</b>
      <p>Thanks</p>
    `
    console.log(text)
    const mailData = {
      to: userData.email,
      subject: 'Order Placed',
      text
    }

    await mailHelper.sendMail(mailData)
    
  } catch (e) {
    console.log('err', e)
    return Promise.reject(e)
  }
}

// const generateNultipleOrders = async () => {
//   try {
//     const users = await User.find({},  '_id address').lean()
//     const menus = await Menu.find({}, '_id').lean()
//     let orders = []
//     let newDate = new Date()
//     for (let user of users) {
//       let num = Math.floor(Math.random() * Math.floor(menus.length))
//       newDate.setMinutes(newDate.getMinutes() + num * 20)
//       let orderMenus = []
//       console.log('num', num)
//       for (let i = 0; i <= num; i++) {
//         console.log('i', i)
//         orderMenus.push(menus[i]._id)
//       }
//       orders.push({
//         userId: user._id,
//         menus: orderMenus,
//         address: user.address,
//         createdAt: newDate
//       })
//     }
//     const ordd = await Order.insertMany(orders)
//     console.log('orders', ordd)
//   } catch (e) {
//     console.log('err', e)
//   }
// }

// localhost:4000/orders/report?startDate=2020-09-18T00:00:00.000Z&endDate=2020-09-21T00:00:00.000Z

const getOrderReport = async (req, res, next) => {
  try {
    const { userId, startDate, endDate, limit = 100, skip = 0 } = req.query
    let query = {}
    if (userId) query.userId = userId
    if (startDate && endDate) {
      query.createdAt = { $gt: new Date(startDate), $lt: new Date(endDate) }
    } else if(startDate) {
      query.createdAt = { $gt: new Date(startDate) }
    } else if (endDate) {
      query.createdAt = { $lt: new Date(endDate) }
    }
    const totalOrders = await Order.countDocuments(query)
    const orders = await Order.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) },
      { $lookup: {
        from: 'users',
        let: { user_id: '$userId' },
        pipeline: [
          { $match: {
            $expr: { $eq: [ '$_id', '$$user_id' ] }
          } },
          { $project: { name: 1, email: 1 } }
        ],
        as: 'user'
      } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $lookup: {
        from: 'menus',
          let: { menuIds: '$menus' },
          pipeline: [{
              $match: { $expr: {
                  $in: ['$_id', '$$menuIds']
              } }
          }, {
            $project: { name: 1, description: 1, price: 1 }
          }],
          as: 'menus'
      } },
      { $addFields: {
        totalPrice: { $sum: '$menus.price' }
      } }
    ])
    res.json({ data: { orders, totalOrders }, message: 'orders report'})
  } catch (e) {
    console.log('err', e)
    next(e)
  }
} 

module.exports = {
  create,
  getOrderReport
}