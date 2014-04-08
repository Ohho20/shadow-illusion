angular.module('game.entities.coin', [])
  .factory('Coin', function ($injector) {

    // Coin Entity
    return me.CollectableEntity.extend({

      init : function (x, y, settings) {
        settings.image = 'spinning_coin_gold';
        settings.spritewidth = 32;
        
        this.parent(x, y, settings);
      },

      onCollision : function () {
        me.audio.play('cling');

        var game = $injector.get('game');
        game.data.score += 250;

        this.collidable = false;

        me.game.world.removeChild(this);
      }
    });
  });