//------------- original backend/src/app.js  ----------------
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');

// const app = express();
// const routes = require("./routes/index");

// //middlewares
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());

// app.use("/", routes);

// module.exports = app;

//------------- testDeploy in vercel  backend/src/app.js  ----------------
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const routes = require("./routes/index");

//middlewares
app.use(cors({
  origin: "https://testimonial-cms-e44.vercel.app",  // ← tu frontend
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

app.use("/", routes);

module.exports = app;