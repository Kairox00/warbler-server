const express = require("express")
const router = express.Router({ mergeParams: true})

const {create, get, destroy} = require("../handlers/messages")

router.route("/")
    .post(create)

router.route("/:message_id")
    .get(get)
    .delete(destroy)

module.exports = router