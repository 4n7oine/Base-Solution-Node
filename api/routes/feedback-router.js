const { Router } = require('express');

const router = new Router();

// Accept the feedback form
router.post('/feedbacks', (req, res) => {
    console.log(req.body);
    // Redirect the user back to the index.html, e.g.,
    // use status code 302
    res.redirect('/index.html');
});

module.exports = router;