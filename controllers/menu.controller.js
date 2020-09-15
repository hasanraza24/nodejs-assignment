var Menu = require('../models/menu.model');
const config = require('../config/config')

const createMenu = async (req, res, next) => {
    try {
        console.log('req.file', req.file)
        req.body.imageUrl = `http://${config.host}:${config.port}/images/${req.file.filename}`
        const menu = await Menu.create(req.body);
        res.json({ data: { menu }, message: 'Menu Created!'});
    }catch(e) {
        next(e);
    } 
};

const list = async (req, res, next) => {
    try {
        const menus = await Menu.list(req.query, {});
        res.json({ data: { menus }});
    }catch(e) {
        next(e);
    }
}

module.exports = {
    createMenu,
    list
}