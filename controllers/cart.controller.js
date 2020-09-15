const Cart = require('../models/cart.model')

const addMenuItems = async (req, res, next) => {
  try {
    const cart = await Cart.addMenuItem(req.user.userId, req.body.menuIds)
    res.json({ data: { cart }, message: 'cart updated'});
  } catch (e) {
    next(e)
  }
}

const removeMenuItem = async (req, res, next) => {
  try {
    const cart = await Cart.removeMenuItem(req.user.userId, req.params.menuId)
    res.json({ data: { cart }, message: 'cart updated'});
  } catch (e) {
    next(e)
  }
}

const getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.getByUserId(req.user.userId)
    res.json({ data: { cart }, message: 'cart list'});
  } catch (e) {
    next(e)
  }
}

module.exports = {
  addMenuItems,
  removeMenuItem,
  getMyCart
}