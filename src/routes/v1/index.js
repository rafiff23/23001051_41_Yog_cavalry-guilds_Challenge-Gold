const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const archetypeRoute = require('./archetype.route');
const deckRoute = require('./deck.route');
// const docsRoute = require('./docs.route');
const config = require('../../configs/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/archetypes',
    route: archetypeRoute,
  },
  {
    path: '/decks',
    route: deckRoute,
  },
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

//
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;