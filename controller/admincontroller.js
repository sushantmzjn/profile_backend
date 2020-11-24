const express = require('express');
const router = express.Router();
const admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    admin.findOne({ username: req.body.username }).then((taken) => {
        if (taken === null) {
            let password = req.body.password
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    let err = new Error('could not hash');
                    err.status = 500;
                    return next(err);
                }
                admin.create({
                    username: req.body.username,
                    password: hash
                }).then((data) => {
                    let token = jwt.sign({ _id: data._id }, "secretkey")
                    if (token) {
                        admin.updateOne({ _id: data._id }, { $set: { token: token } }).then(() => {
                            res.json({ message: "signup success !!!", token: token })

                        })
                    }

                }).catch(next)

            });

        }
        else {
            res.json({ message: "username is taken" })
        }
    })

})

router.post('/login', (req, res) => {
    admin.findOne({ username: req.body.username })
        .then((result) => {
            if (result == null) {
                res.json({ message: 'user not found', status: 404 });
            } else {
                bcrypt.compare(req.body.password, result.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            res.json({ message: 'Password not match', status: 401 });
                        }
                        res.json({ message: 'Login Succcessful', status: 200, token: result.token });
                    }).catch((err) => console.log(err))
            }
        })
        .catch((err) => console.log(err))
})

module.exports = router;