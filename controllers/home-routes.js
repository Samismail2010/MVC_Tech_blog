const router = require('express').Router();
const { Post, Comment, User } = require('../models');

//get all routes for the homepage
router.get('/',(req, res) => {
    Post.findAll({
        include: [User],
    })
    .then((dbUserData) => {
        const post = dbUserData.map((post => post.get({ plain: true })));
        //pass all post object into homepage template
        res.render('all-posts', {post});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

//get single post object
router.get('/post/:id',(req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
    .then(dbUserData => {
        if(dbUserData) {
            const post = dbUserData.get({ plain: true });

            res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) =>{
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;