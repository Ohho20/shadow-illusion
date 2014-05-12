angular.module('game.entities.fireball', [])
  .factory('Fireball', function () {

    return me.ObjectEntity.extend({

      init: function (x, y, settings) {
        // call the constructor
        settings.image = 'fireball';
        settings.width = settings.spritewidth = 73;
        settings.height = settings.spriteheight = 16;
        this.parent(x, y, settings);

        this.gravity = 0;
        this.type = 'fireball';
        this.shootLeft = settings.shootLeft;

        // set the default horizontal and vertical speed (accel vector)
        this.setVelocity(6, 8);
        this.startX = x;
        this.endX = x + 300;

        // set the origin for firing
        this.pos.x = this.shootLeft ? x - 56 : x + 24;
        this.pos.y = y + 32;
      },

      update: function (dt) {
        if (!this.inViewport) {
          me.game.world.removeChild(this);
        }

        this.renderable.flipX(this.shootLeft);
        this.vel.x += (this.shootLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
        this.updateMovement();

        if (this.vel.x === 0) {
          me.game.world.removeChild(this);
          return false;
        }

        var res = me.game.world.collide(this);

        if (res) {
          if (res.obj.type !== 'main-player') {
            me.audio.play('stomp');
            me.game.world.removeChild(this);
          }
        }

        return true;
      }
    });
  });