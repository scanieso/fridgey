import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    deleteFridge: function () {
      this.store.find('fridge', this.get('id')).then(function (fridge) {
        fridge.destroyRecord();
      });
    }
  },

  expiring: function () {
    return this.get('items').filterBy('isExpired');
  }.property('items.@each.isExpired')
});
