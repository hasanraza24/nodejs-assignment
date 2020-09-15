var Menu = require('../models/menu.model');

const createMenu = async (req, res, next) => {
    try {
        const menu = await Menu.create(req.user._id, req.body);
        res.json({ data: { menu }, message: 'Menu Created!'});
    }catch(e) {
        next(e);
    } 
};

const list = async (req, res, next) => {
    try {
        const menus = await Menu.listForUser(req.query);
        res.json({ data: { menus }});
    }catch(e) {
        next(e);
    }
}

module.exports = {
    createMenu,
    list
}