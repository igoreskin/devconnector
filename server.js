const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware - instead of
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// now: 
app.use(express.json({ extended: false }));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('API running'));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Define Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));