const express = require('express')
const router = express.Router({mergeParams : true})
const tasks = require('../controllers/tasks')
const catchError = require('../handlError/catchError')

router.route('/')
    .get(catchError( tasks.home ))
    .post(catchError( tasks.create ))

router.route('/:id')
    .get(catchError( tasks.edit ))
    .put(catchError( tasks.update ))
    .delete(catchError( tasks.delete ))

module.exports = router