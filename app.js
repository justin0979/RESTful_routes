const Cat = require('./models/cat'),
      express = require('express'),
      expressSanitizer = require('express-sanitizer'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      methodOverride = require('method-override'),
      app = express(),
      PORT = 3000;

mongoose.connect('mongodb://mongo:27017/cat_test', { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

app.get('/', (req, res) => res.redirect('/index'));
/* ==================================================
   Seven REpresentational State Tranfer Routes follow
   ================================================== */
/*
// Index Route
app.get('/index', (req, res) => {
  Cat.find({})
     .select('name breed')
     .exec((err, foundCat) => {
      if(err) {
        const route = 'Error in index';
        res.render('error', { route: route, err: err});
      } else {
        res.render('index', { cats: foundCat });
      }
     });
});
*/
app.get('/index', (req, res) => {
  Cat.find({})
  .then(foundCat => res.render('index', {cats: foundCat}))
  .catch(err => res.render('error', { route: "Error in index", err: err }))
});

// New Route
app.get('/index/new', (req, res) => res.render('new'));

// Create Route
app.post('/index', (req, res) => {
  req.body.cat.description = req.sanitize(req.body.cat.description);

  Cat.create(req.body.cat, (err, cat) => {
    if(err) {
      const route = 'Error in creation route';
      res.render('error', { route: route, err: err });
    } else {
      res.redirect('/index');
    }
  });
});

// Show Route

app.get('/index/:id', (req, res) => {
  Cat.findById(req.params.id)
     .exec((err, cat) => {
      if(err) {
        const route = "Error in show route";
        res.render('error', { route: route, err: err });
      } else {
        res.render(`show`, { cat: cat });
      }
     });
});

// Edit Route
app.get('/index/:id/edit', (req, res) => {
  Cat.findById(req.params.id)
     .exec((err, editCat) => {
      if(err) {
        const route = "Error in edit route"
        res.render('error', { route: route, err: err });
      } else {
        res.render('edit', { cat: editCat });
      }
     });
});

// Update Route
app.put('/index/:id', (req, res) => {
  req.body.cat.description = req.sanitize(req.body.cat.description);

  Cat.findByIdAndUpdate(req.params.id, req.body.cat)
     .exec((err, updatedCat) => {
      if(err) {
        const route = 'Error while updating';
        res.render('error', { route: route, err: err });
      } else {
        res.redirect(`/index/${req.params.id}`);
      }
     });
});

// Delete Route
app.delete("/index/:id", (req, res) => {
  Cat.findByIdAndDelete(req.params.id)
     .exec((err, deletedCat) => {
      if(err) {
        const route = "Error while deleting";
        res.render('error', { route: route, err: err });
      } else {
        res.redirect('/index');
      }
     });
});

app.listen(PORT, () => console.log(`

  Server listening on port ${PORT}, mapped locally to port ${PORT}.

`));
