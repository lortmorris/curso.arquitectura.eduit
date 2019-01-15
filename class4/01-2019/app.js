
const http = require('http');
const passport = require('passport');
const mongojs = require('mongojs');
const express = require('express');
const redis = require("redis")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const LocalStrategy = require('passport-local').Strategy;
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();
const db = mongojs('mongodb://localhost/cursoarq');
const app = express();
const server = http.createServer(app);

redisClient.on("error", (err) => {
    console.log("Error " + err);
});


passport.use(new LocalStrategy((username, password, done) => {
    db.Users.findOne({ username, password }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    });
  }
));



const responsError = res => res.json({ success: false, apikey: 'error' });

app.use((req, res, next) => {
  if (req.headers.apikey) {
    redisClient.get(req.headers.apikey, (err, doc) => {
      console.info('info: ', err, doc);
      if (err) return responsError(res);
      if (!doc) return responsError(res);
      return next();
    });
  }
  return responsError(res);
});


app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
  genid: (req) => {
    console.info('generando id');
    return new Date().getTime();
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore(),
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/*
app.post('/login1', (req, res) => {
  db.Users.findOne({ username: req.body.username, password: req.body.password }, (err, doc) => {
    if (doc) {
      // req.session.user = doc;
      return res.json({ login: 'ok'});
    }
    return res.redirect('/');
  });
});

*/

/*
app.post('/adduser', (req, res) => {
  db.Users.insert({
    username: req.body.username,
    password: req.body.password,
    added: new Date(),
  }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.json(doc);
  });
});
*/

app.get('/users', (req, res ) => {

  console.info(req.session);
  if (req.session.user) {
    return db.Users.find({}, {}, (err, docs) => {
        if (err) return res.json({ success: false });
        return res.json({ success: true, docs });
    });
  }

  return res.json({ success: false, error: 'NoLogin' });
});


app.get('/dashboard', (req, res) => res.json({ dash: 'ok' }));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);

server.listen(5000, () => console.info('listen on *:5000'));
