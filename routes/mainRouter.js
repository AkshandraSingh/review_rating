let express = require('express');
let userRouter = require('./userRouter')
let companyRouter = require('./companyRouter')
let companyReviewRouter = require('./companyReviewRouter')

let commanRouter = express.Router();

commanRouter.use('/user',userRouter)
commanRouter.use('/company',companyRouter)
commanRouter.use('/companyreview',companyReviewRouter)

module.exports = commanRouter