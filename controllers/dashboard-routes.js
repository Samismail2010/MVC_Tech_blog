const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        }
    })
    .then(dbUserData => {
        const post = dbUserData.map((post) => post.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts
        });
    })
    .catch(err => {
        console.log(err);
        res.redirect('login');
    });
});

router.get('/new')