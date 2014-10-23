/* global moment */

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  expiration: DS.attr('string', {
    defaultValue: function () {
      return moment().format('YYYY-MM-DD');
    }
  }),
  fridge: DS.belongsTo('fridge', { async: true }),

  status: DS.attr('string'),
  statusDate: DS.attr('date'),

  slug: function () {
    return this.get('name').dasherize();
  }.property('name'),

  expMoment: function () {
    return moment(this.get('expiration'));
  }.property('expiration'),

  expDiff: function () {
    var now = moment().endOf('day'),
    exp = this.get('expMoment').endOf('day');

    return exp.diff(now, 'days');
  }.property('expMoment'),

  expFromNow: function () {
    return this.get('expMoment').endOf('day').fromNow();
  }.property('expMoment'),

  isExpired: function () {
    return this.get('expDiff') < 0;
  }.property('expDiff'),

  prettyExp: function () {
    return 'Expires ' + this.get('expMoment').format('MMMM Do, YYYY');
  }.property('expMoment'),

  statusClassName: function () {
    if (this.get('status')) {
      return 'is-' + this.get('status').dasherize();
    }
  }.property('status')
});
