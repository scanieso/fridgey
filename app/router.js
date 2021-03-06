import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('fridges', function () {
    this.route('new');
  });

  this.resource('fridge', { path: '/fridges/:fridge_id' }, function () {
    this.resource('items', { path: '/' }, function () {
      this.route('new', { path: '/items/new' });
    });
  });

});

export default Router;
