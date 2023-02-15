const express = require('express');
const router = express.Router()
const  {
    getAllCollection,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection
} = require('../../admin controllers/collection/collectionController');

router.get('/',getAllCollection);

router.get('/:id', getCollection);

router.post('/',createCollection);

router.patch('/:id', updateCollection);

router.delete('/:id', deleteCollection);

module.exports= router;