const express = require('express');
const router = express.Router();
const {
    getMyTrove,
    updateMyTrove,
    createMyTrove,
    deleteMyTrove
} = require('../../admin controllers/myTrove/myTroveController');

//get your taste profile 

router.get('/', getMyTrove);

router.post('/', createMyTrove);

router.patch('/:id', updateMyTrove);

router.delete('/:id', deleteMyTrove);


module.exports = router;