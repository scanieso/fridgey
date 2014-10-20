/* global moment */

import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['fridge'],
  actions: {
    addItem: function () {
      var self = this,
      fridge = this.get('controllers.fridge'),
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
    return typeof this.get('name') === 'undefined' || !this.get('name').length;
  }.property('name')
});
