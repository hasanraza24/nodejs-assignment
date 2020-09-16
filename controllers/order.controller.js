const Order = require('../models/order.model')
const User = require('../models/user.model')
const mailHelper = require('../helpers/mail.helper')

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

module.exports = {
  create
}