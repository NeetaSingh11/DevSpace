const express = require("express");

const protect = require("../middleware/authMiddleware");
const searchController = require("../controllers/searchController");

const router = express.Router();

router.get(

    "/",

    protect,

    searchController.search

);

module.exports = router;