/* globals Firebase */

import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://sweltering-inferno-1698.firebaseio.com/')
});
