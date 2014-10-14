/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'fridgey',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      NOUNPROJECTSECRET: '05aa4e7f39ad4daf8e3bb19119ce951f'
    },

    contentSecurityPolicy: {
      'connect-src': "'self' wss://s-dal5-nss-21.firebaseio.com",
      'font-src': "'self' http://fonts.gstatic.com",
      'script-src': "'self' 'unsafe-eval' http://crypto-js.googlecode.com",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
