
    exports.validateObjectId = require('validateObjectId');
    exports.auth = require('../middleware/auth');
    exports.validator = require('../middleware/validate');
    exports.admin = require('../middleware/admin');
    exports.jwt = require('jsonwebtoken');
    exports.config = require('config');
    exports._ = require('lodash');
    exports.mongoose = require('mongoose');
    exports.express = require('express');
    exports.router = express.Router();
