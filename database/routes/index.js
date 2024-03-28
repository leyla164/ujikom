'use strict'
const express = require('express')
const router = express()

// // Import kategoriRoute dan produkRoute
// const kategoriRoute = require('./kategoriRoute');
// const produkRoute = require('./produkRoute');
const authRoute = require('./authRoute');


router.get(`/api/v1/`, (_req, res) => {
    res.json({
        "message": "Welcome to restfullapi"
    })
})

// router.use('/api/v1/kategori', kategoriRoute);
// router.use('/api/v1/produk', produkRoute);
router.use(authRoute);

module.exports = router