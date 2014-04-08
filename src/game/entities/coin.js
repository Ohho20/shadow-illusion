angular.module('game.entities.coin', [])
  .factory('coin', function () {

    // Coin Entity
    return me.CollectableEntity.extend({

      init : function (x, y, settings) {
        settings.image = 'spinning_coin_gold';
        settings.spritewidth = 32;
        
        this.parent(x, y, settings);
      },

      onCollision : function () {
        me.audio.play('cling');

        game.data.score += 250;

        this.collidable = false;

        me.game.world.removeChild(this);
      }
    });
  });