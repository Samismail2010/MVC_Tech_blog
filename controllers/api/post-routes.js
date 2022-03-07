const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req,res) => {
    Post.create({...body, userId: req.session.userId})
    .then(newPost => {
        res.json(newPost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});