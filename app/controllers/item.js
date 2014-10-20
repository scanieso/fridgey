/* global moment */

import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['fridge', 'items'],
  actions: {
    deleteItem: function () {
      var fridge = this.get('controllers.fridge');

      this.store.find('item', this.get('id')).then(function (item) {
        item.destroyRecord();

        fridge.get('items').then(function (items) {
          items.removeObject(item);
          fridge.get('model').save();
        });
      });
    }
  },

  expFromNow: function () {
    return this.get('expMoment').endOf('day').fromNow();
  }.property('expMoment'),

  expScale: function () {
    var diff = this.get('expDiff'),
    scale;

    if (diff < 0) {
      scale = 'expired';
    } else if (diff === 0) {
      scale = 'expires-today';
    } else if (diff < 2) {
      scale = 'expires-soon';
    } else if (diff < 7) {
      scale = 'expires-this-week';
    } else {
      scale = '';
    }

    return scale;
  }.property('expDiff'),

  prettyExp: function () {
    return 'Expires ' + this.get('expMoment').format('MMMM Do, YYYY');
  }.property('expMoment')
});
