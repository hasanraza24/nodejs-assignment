const Cart = require('../models/cart.model')

const addMenuItems = async (req, res, next) => {
  try {
    console.log(req.user)
    const cart = await Cart.addMenuItem(req.user._id, req.body.menus)
    res.json({ data: { cart }, message: 'cart updated'});
  } catch (e) {
    next(e)
  }
}

const removeMenuItem = async (req, res, next) => {
  try {
    const cart = await Cart.removeMenuItem(req.user._id, req.params.menuId)
    res.json({ data: { cart }, message: 'cart updated'});
  } catch (e) {
    next(e)
  }
}

const getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.getByUserId(req.user._id)
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