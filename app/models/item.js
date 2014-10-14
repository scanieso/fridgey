/* global moment */

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: function () {
    return this.get('name').dasherize();
  }.property('name'),

  expiration: DS.attr('string'),

  expirationFromNow: function () {
    return moment(this.get('expiration')).endOf('day').fromNow();
  }.property('expiration'),

  expirationDiff: function () {
    var now = moment(),
    exp = moment(this.get('expiration')),
    diff = exp.diff(now, 'days');

    return diff;
  }.property('expiration'),

  expirationScale: function () {
    var diff = this.get('expirationDiff'),
    scale;

    if (diff < 0) {
      scale = 'expired';
    } else if (diff < 1) {
      scale = 'expires-today';
    } else if (diff < 3) {
      scale = 'expires-soon';
    } else if (diff < 7) {
      scale = 'expires-this-week';
    } else {
      scale = '';
    }

    return scale;
  }.property('expirationDiff'),

  expired: function () {
    return this.get('expirationDiff') < 0;
  }.property('expirationDiff'),

  fridge: DS.belongsTo('fridge')
});
