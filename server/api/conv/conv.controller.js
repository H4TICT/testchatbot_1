/**
 * @module Conv(conversation)
 * @author TuanHA
 * @description 
 * @version 1.0.0
 */

const convService = require('./conv.service');

exports.convStatus = (req, res) => {
    res.json({
        success: 200
    })
};

// exports.getListConv = convService.getListConv;