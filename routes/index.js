const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')

//------------ Welcome Route ------------//
router.get('/',ensureAuthenticated, (req, res) => {
    const shortUrls = await ShortUrl.find();
  res.render('welcome', { shortUrls: shortUrls });
    
});
app.post("/shortUrls", async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
  
    res.redirect("/");
  });
  
  app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
  
    shortUrl.clicks++;
    shortUrl.save();
  
    res.redirect(shortUrl.full);
  });
  

//------------ Dashboard Route ------------//
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dash', {
    name: req.user.name
}));

module.exports = router;