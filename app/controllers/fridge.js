import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    deleteFridge: function () {
      this.store.find('fridge', this.get('id')).then(function (fridge) {
        fridge.destroyRecord();
      });
    }
  },

  isHealthy: function () {
    var ratio = this.get('thrownOut').get('length')/this.get('items').get('length');
    return ratio < 0.5;
  }.property('thrownOut', 'items'),

  expired: function () {
    return this.get('items').filterBy('isExpired');
  }.property('items.@each.isExpired'),

  eaten: function () {
    return this.get('items').filterBy('status', 'eaten');
  }.property('items.@each.status'),

  thrownOut: function () {
    return this.get('items').filterBy('status', 'thrownOut');
  }.property('items.@each.status')
});
