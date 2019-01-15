# API Key, tokens and security


## Redis



Fb, Tt, email.

Fb => fbid
Tt => tid

[email, email, email]

if (db.users.findOne(email)) {
  db.users.update({
    fbid,
    tid,
    });
} else {
  db.users.insert({

    });
}


## Frontend flows.

Homa => Login API
JWT <= Response


## KEYS

apikey: 1029381903uoiqndo1dij1o2d
secretkey:   a/sdkalsjd98j91jx91jdoijdo1iio12j
token <======= response


## Products

keycloak
Auth0


# Task

passport: login fb.
html: click login => show fb login window => show endpoint protected.

DB: MongoDB
Login counter.
