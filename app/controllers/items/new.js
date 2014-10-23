/* global moment */

import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['fridge'],
  fridge: Ember.computed.alias('controllers.fridge'),

  actions: {
    addItem: function () {
      var self = this,
      fridge = this.get('fridge'),
      name = this.get('name'),
      expiration = this.get('expiration'),
      item;

      item = this.store.createRecord('item', {
        name: name,
        expiration: expiration,
        fridge: fridge.get('model')
      });

      item.save().then(function () {
        self.set('name', '');
        self.set('expiration', moment().format('YYYY-MM-DD'));

        fridge.get('items').then(function (items) {
          items.pushObject(item);
          fridge.get('model').save();
        });
      });
    }
  },

  isInvalid: function () {
    return typeof this.get('name') === 'undefined' || !this.get('name') || !this.get('expiration');
  }.property('name', 'expiration'),

  placeholderText: function () {
    return 'Add an item in "' + this.get('fridge.name') + '"...';
  }.property('fridge.name')
});
