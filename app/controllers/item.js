import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['fridge'],
  actions: {
    delete: function () {
      var fridge = this.get('controllers.fridge');

      var shouldDeleteItem = confirm('Are you sure? This cannot be undone.');

      if (shouldDeleteItem) {
        this.store.find('item', this.get('id')).then(function (item) {
          item.destroyRecord();

          fridge.get('items').then(function (items) {
            items.removeObject(item);
            fridge.get('model').save();
          });
        });
      }
    },

    resetStatus: function () {
      this.set('status', undefined);
      this.set('statusDate', undefined);
    },

    toggleEditMode: function () {
      this.set('isEditing', !this.get('isEditing'));
    },

    undo: function () {
      this.get('model').rollback();
      this.set('isEditing', false);
    },

    update: function () {
      console.log('updating', this.get('name'));
      var self = this;

      if (this.get('resetStatus')) {
        this.set('status', undefined);
      }

      this.store.find('item', this.get('id')).then(function (item) {
        item.save();
        self.set('isEditing', false);
        self.set('resetStatus', false);
      });
    },

    updateStatus: function () {
      this.set('statusDate', new Date());
      this.store.find('item', this.get('id')).then(function (item) {
        item.save();
      });
    }
  },

  expClassName: function () {
    var diff = this.get('expDiff'),
    scale;

    if (diff < 0) {
      scale = 'is-expired';
    } else if (diff === 0) {
      scale = 'is-expiring-today';
    } else if (diff < 2) {
      scale = 'is-expiring-soon';
    } else if (diff < 7) {
      scale = 'is-expiring-this-week';
    } else {
      scale = '';
    }

    return scale;
  }.property('expDiff')
});
