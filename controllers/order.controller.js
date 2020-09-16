const Order = require('../models/order.model')
const mailHelper = require('../helpers/mail.helper')

const create = async (req, res, next) => {
  try {
    req.body.userId = req.user._id
    const order = await Order.create(req.body)
    sendOrderEmail().then(() => {
      console.log('email sent')
    }).catch(err => {
      console.log('Error while sending email', err)
    })
    res.json({ data: { order }, message: 'order generated'});
  } catch (e) {
    next(e)
  }
}

// const sendOrderEmail = async (orderId) => {
//   try {
//     const orderData = await Order.getOrderInfo(orderId)
//     console
//   } catch (e) {
//     return Promise.reject(e)
//   }
// }

module.exports = {
  create
}