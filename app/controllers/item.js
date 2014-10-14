import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['fridge'],
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
  }
});
