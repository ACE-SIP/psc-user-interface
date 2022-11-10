const requireLogin = require('../middleware/token');

/* GET pages. */
module.exports  = (app) => {
  // home page
  app.get('/', (req, res) => {
    // require('../db/mongoose');
    res.render('index', {
      title: 'Home',
      name: 'wayne',
    });
  });

  app.get('/login', requireLogin, (req, res) => {
    res.render('login', {
      title: 'Home',
      name: 'wayne',
    });
  });

  app.get('/register', (req, res) => {
    res.render('register', {
      title: 'Register Page',
      name: 'wayne',
    });
  });

  app.get('/dashboard', (req, res) => {
    console.log(req)
    res.render('dashboard', {
      title: 'Dashboard',
      name: req.session.userName,
      role: req.session.userRole
    });
  });

  app.get('/notifications', requireLogin, (req, res) => {
    res.render('notifications', {
      title: 'Notifications Overview',
      name: 'wayne',
      role: req.session.userRole
    });
  });
  app.get('/charts', requireLogin, (req, res) => {
    res.render('charts', {
      title: 'Chart Overview',
      name: 'wayne',
      role: req.session.userRole
    });
  });
  app.get('/messages', requireLogin, (req, res) => {
    res.render('messages', {
      title: 'Message Overview',
      name: 'wayne',
      role: req.session.userRole
    });
  });

  app.get('/orders/details', requireLogin, (req, res) => {
    res.render('orders/details', {
      title: 'Report',
      name: 'wayne',
      role: req.session.userRole
    });
  });
  app.get('/orders/all', requireLogin, (req, res) => {
    res.render('orders/orders', {
      title: 'Report',
      name: 'wayne',
      role: req.session.userRole
    });
  });
  app.get('/orders/report', requireLogin, (req, res) => {
    res.render('orders/reports', {
      title: 'Report',
      name: 'wayne',
      role: req.session.userRole
    });
  });
  app.get('/orders/tracking', requireLogin, (req, res) => {
    res.render('orders/tracking', {
      title: 'Report',
      name: 'wayne',
      role: req.session.userRole
    });
  });

  app.get('/devices/register',requireLogin, (req, res) => {
    res.render('devices/register', {
      title: 'Devices Register',
      name: 'wayne',
      role: req.session.userRole
    });
  });
  app.get('/devices/all', requireLogin, (req, res) => {
    res.render('devices/all', {
      title: 'Display All Devices',
      name: 'wayne',
      role: req.session.userRole
    });
  });

  app.get('/profile',requireLogin, (req, res) => {
    res.render('profile/overview', {
      title: 'Profile Overview',
      name: 'wayne',
      role: req.session.userRole
    });
  });

  app.get('/profile/settings',requireLogin, (req, res) => {
    res.render('profile/settings', {
      title: 'Profile Setting',
      name: 'wayne',
      role: req.session.userRole
    });
  });




  // error handler for every request
  app.get('*', (req, res )=> {
    res.render('error', {
      title: 'Error',
      name: 'Page',
      error: 'Page Not Found.',
    });
  });
}
