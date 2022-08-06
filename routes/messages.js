const express = require("express")
const router = express.Router({ mergeParams: true})

const {create} = require("../handlers/messages")

router.route("/")
.get()
.post(create)

module.exports = router