//import 'babel-polyfill';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HOST = process.env.HOST;
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const config = require('./config');
const secret = require('./secret');
  //const {Category, Expense, Goal, User, Question} = require('./models');
const { User } = require('./models');

const app = express();
mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.CLIENT_ROOT);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(passport.initialize());


app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
   next();
});

passport.use(
    new GoogleStrategy({
        clientID:  '172739207430-a4207nj9v3dfdmbmdf652at6m2epdi7i.apps.googleusercontent.com',
        clientSecret: secret,
        callbackURL: `${config.ROOT}/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log('ARE WE ANYWHERE ?????????????')
        User
            .findOne({googleId: profile.id})
            .exec()
            .then(user => {
                if (!user) {
                    console.log('BUILDING NEW USER')
                    var newUser = {
                        googleId: profile.id,
                        accessToken: accessToken,
                        name: profile.displayName,
                        categories: [],
                        expenses: [],
                        goals: []
                    }
                    console.log('NEW USER ', newUser)
                    return User
                        .create(newUser)
                }
                else {
                    console.log('Updating accessToken for the existing user');
                    return User
                        .findOneAndUpdate({"googleId" : profile.id}, {$set:{accessToken : accessToken}}, {new: true})
                }
            })
            .then(user => {
                console.log('USER ',user)
                return cb(null, user)
            })
            .catch(err => {
                console.log(err);
            })
    }
));

passport.use(
    new BearerStrategy(
        (accessToken, cb) => {

        User
            .findOne({accessToken: accessToken}, function(err,user){
            if(err){
                console.log('ERROR WITH BEARER ');
                return cb(err);
            }
            if(!user){
                console.log('NO USER FOUND IN BEARER')
                return cb(null, false)
            }
            else {
                console.log('USER FOUND IN BEARER ')
                console.log(user);
                return cb(null, user, {scope: 'all'})
            }
        })
        }
    )
);


app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${config.CLIENT_ROOT}`,
        session: false
    }),
    (req, res) => {
        console.log('request object pre cookies', req.user);
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect(`${config.CLIENT_ROOT}`);
    }
);

app.get('/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect(`${config.CLIENT_ROOT}`);
});

app.put('/api/logout', jsonParser, (req, res) => {
    res.status(200)
    console.log('IS THIS WORKING???? ', req.body.answerHistory)

    User
        .findOneAndUpdate({"googleId": req.body.googleId}, {$set:{"goals": req.body.goals, "expenses": req.body.expenses, "categories": req.body.categories}})
        .exec()
        .then(updatedStudent => res.status(201).json())
        .catch(err => res.status(500).json({message: 'Your update was unsuccessful'}));
});


app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        console.log('reached /api/me endpoint through bearer strategy')
        res.json({googleId: req.user.googleId})
    }
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        console.log('reached /api/questions endpoint through bearer strategy')
        console.log('REQUEST OBJECT ', req.user)
        res.json(req.user);
    }
);



let server;
function runServer(host, port) {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://username:password@ds137220.mlab.com:37220/easy-budget', function(err) {
            if(err) {
                return reject(err);
            }
        })
        server = app.listen(port, host, () => {
            console.log(`Server running on ${host}:${port}`);
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer(config.HOST, config.PORT);
}

module.exports = {
    app, runServer, closeServer
};


// app.post('/category', jsonParser, (req, res) => {
//     Category
//         .create({
//             name: req.body.name
//         })
//         .then(category => {
//             res.status(201).json(category.apiRepr())
//         })
//         .catch(err => {
//             res.status(500).json({error: '500 error'})
//         })
// });


// app.post('/expense', jsonParser, (req, res) => {
//     Expense
//         .create({
//             category: req.body.category,
//             cost: req.body.cost,
//             description: req.body.description,
//             date: req.body.date
//         })
//         .then(expense => {
//             res.status(201).json(expense.apiRepr())
//         })
//         .catch(err => {
//             res.status(500).json({error: '500 error'});
//         })
// })


// app.post('/goal', jsonParser, (req, res) => {
//     Goal
//         .create({
//             category: req.body.category,
//             goal: req.body.goal
//         })
//         .then(goal => {
//             res.status(201).json(goal.apiRepr())
//         })
//         .catch(err => {
//             res.status(500).json({error: '500 error'});
//         })
// })


// app.get('/category', jsonParser, (req, res) => {
//     Category
//         .find()
//         .exec()
//         .then(categories => {
//             res.json(categories.map(category => category.apiRepr()))
//         })
//         .catch(err => {
//             res.status(500).json({error: 'Something went horribly wrong'})
//         })
// })


// app.get('/goal', jsonParser, (req, res) => {
//     Goal
//         .find()
//         .exec()
//         .then(goals => {
//             res.json(goals.map(goal => goal.apiRepr()))
//         })
//         .catch(err => {
//             res.status(500).json({error: 'Something went horribly wrong'})
//         })
// })


// app.get('/expense', jsonParser, (req, res) => {
//     Expense
//         .find()
//         .exec()
//         .then(expenses => {
//             res.json(expenses.map(expense => expense.apiRepr()))
//         })
//         .catch(err => {
//             res.status(500).json({error: 'Something went horribly wrong'})
//         })
// })


// app.delete('/expense', jsonParser, (req, res) => {
//   Expense
//     .findByIdAndRemove(req.body.expenseId)
//     .exec()
//     .then(() => {
//       res.status(204).json({message: 'success'});
//     })
//     .catch(err => {
//       res.status(500).json({error: 'something went terribly wrong'});
//     });
// });


// new guy
// const DATABASE_URL = 'mongodb://localhost/MintLite';
// const PORT = 8080;

// console.log(`Server running in ${process.env.NODE_ENV} mode`);


// const app = express();
// mongoose.Promise = global.Promise;
// const jsonParser = bodyParser.json();

// app.use(express.static(process.env.CLIENT_PATH));


//'mongodb://testuser:testpassword@ds137759.mlab.com:37759/easybudgetapp'
// function runServer() {
//     return new Promise((resolve, reject) => {
//         mongoose.connect('mongodb://localhost/MintLite', function(err){
//         if(err) {
//             return reject(err);
//         }
//         app.listen(PORT, HOST, (err) => {
//         if (err) {
//             console.error(err);
//             reject(err);
//         }
//         const host = HOST || 'localhost';
//         console.log(`Listening on ${host}:${PORT}`);
//         });
//     });
// });
// }

// if (require.main === module) {
//     runServer();
// }



// const express = require('express');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const BearerStrategy = require('passport-http-bearer').Strategy;

// const config = require('./config');
// const secret = require('./secret');

// const app = express();

// const database = {
// };

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', config.CLIENT_ROOT);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });

// app.use(passport.initialize());

// passport.use(
//     new GoogleStrategy({
//         clientID:  '172739207430-a4207nj9v3dfdmbmdf652at6m2epdi7i.apps.googleusercontent.com',
//         clientSecret: secret,
//         callbackURL: `${config.ROOT}/auth/google/callback`
//     },
//     (accessToken, refreshToken, profile, cb) => {
//         // Job 1: Set up Mongo/Mongoose, create a User model which store the
//         // google id, and the access token
//         // Job 2: Update this callback to either update or create the user
//         // so it contains the correct access token
//         const user = database[accessToken] = {
//             googleId: profile.id,
//             accessToken: accessToken
//         };
//         return cb(null, user);
//     }
// ));

// passport.use(
//     new BearerStrategy(
//         (token, done) => {
//             // Job 3: Update this callback to try to find a user with a
//             // matching access token.  If they exist, let em in, if not,
//             // don't.
//             if (!(token in database)) {
//                 return done(null, false);
//             }
//             return done(null, database[token]);
//         }
//     )
// );

// app.get('/auth/google',
//     passport.authenticate('google', {scope: ['profile']}));

// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: `${config.CLIENT_ROOT}`,
//         session: false
//     }),
//     (req, res) => {
//         res.cookie('accessToken', req.user.accessToken, {expires: 0});
//         res.redirect(`${config.CLIENT_ROOT}`);
//     }
// );

// app.get('/auth/logout', (req, res) => {
//     req.logout();
//     res.clearCookie('accessToken');
//     res.redirect('/');
// });

// app.get('/api/me',
//     passport.authenticate('bearer', {session: false}),
//     (req, res) => res.json({
//         googleId: req.user.googleId
//     })
// );

// app.get('/api/questions',
//     passport.authenticate('bearer', {session: false}),
//     (req, res) => res.json(['Question 1', 'Question 2'])
// );

// let server;
// function runServer(host, port) {
//     return new Promise((resolve, reject) => {
//         server = app.listen(port, host, () => {
//             console.log(`Server running on ${host}:${port}`);
//             resolve();
//         }).on('error', reject);
//     });
// }

// function closeServer() {
//     return new Promise((resolve, reject) => {
//         server.close(err => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve();
//         });
//     });
// }

// if (require.main === module) {
//     runServer(config.HOST, config.PORT);
// }

// module.exports = {
//     app, runServer, closeServer
// };
