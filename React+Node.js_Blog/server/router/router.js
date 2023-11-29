const express = require('express');
const router = express.Router();
const controller = require('../Controller/Cstroy');
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ''));
});


router.get('/', controller.get_story);
router.post('/blogupload', controller.post_story);
router.delete('/story/:todoId', controller.del_story);
router.patch('/story/:todoId', controller.patch_story);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
module.exports = router;