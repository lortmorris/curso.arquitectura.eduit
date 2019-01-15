
const http = require('http');
const passport = require('passport');
const mongojs = require('mongojs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const LocalStrategy = require('passport-local').Strategy;

const db = mongojs('mongodb://localhost/cursoarq');
const app = express();
const server = http.createServer(app);
passport.use(new LocalStrategy((username, password, done) => {
    db.User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


app.use(express.static('public'));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/dashboard', (req, res) => res.json({ dash: 'ok' }));
app.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);


server.listen(5000, () => console.info('listen on *:5000'));
