import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addFridge: function () {
      var self = this,
      name = this.get('name');

      var fridge = this.store.createRecord('fridge', {
        name: name
      });

      fridge.save().then(function () {
        self.set('name', '');
        self.transitionToRoute('fridges');
      });
    }
  }
});
