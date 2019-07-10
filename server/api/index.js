/**
 * @author TuanHA
 * @description 
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const app = express();

const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100
});

exports.register = function (app) {
    router.use('/webhook', require('./webhook/index'));
    router.use('/user', require('./user/index'));
    router.use('/topic', require('./topic/index'));
    router.use('/conv', require('./conv/index'));
    router.get('/', (req, res) => {
        res.send("Home page. Server running okay.");
      })
    app.use("/api", router);
};
// module.exports = router ;