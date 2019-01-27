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

app.listen(PORT, () => console.log(`

  Server listening on port ${PORT}, mapped locally to port ${PORT}.

`));
