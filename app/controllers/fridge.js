import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    deleteFridge: function () {
      this.store.find('fridge', this.get('id')).then(function (fridge) {
        fridge.destroyRecord();
      });
    }
  },

  grade: function () {
    var ratio,
    grade;

    ratio = Number(this.get('eaten').get('length')/this.get('outOfFridge').get('length'));

    if (ratio >= 0.9) {
      grade = 'A';
    } else if (ratio >= 0.8) {
      grade = 'B';
    } else if (ratio >= 0.7) {
      grade = 'C';
    } else if (ratio >= 0.6) {
      grade = 'D';
    } else if (ratio >= 0.5) {
      grade = 'F';
    }

    return grade;
  }.property('eaten', 'outOfFridge'),

  expired: function () {
    return this.get('items').filterBy('isExpired');
  }.property('items.@each.isExpired'),

  eaten: function () {
    return this.get('items').filterBy('status', 'eaten');
  }.property('items.@each.status'),

  inFridge: function () {
    return this.get('items').filterBy('isInFridge');
  }.property('items.@each.isInFridge'),

  outOfFridge: function () {
    return this.get('items').filterBy('isInFridge', false);
  }.property('items.@each.isInFridge'),

  thrownOut: function () {
    return this.get('items').filterBy('status', 'thrownOut');
  }.property('items.@each.status')
});
