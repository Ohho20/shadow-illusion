angular.module('game.entities.enemy', [])
  .factory('Enemy', function () {

    // Enemy Entity
    return me.ObjectEntity.extend({

      init : function (x, y, settings) {
        // object settings
        settings.image = 'earth';

        var width = settings.width;
        var height = settings.height;

        // adjust the size setting info to match the sprite size
        // so that the entity is created with the correct size
        settings.spritewidth = settings.width = 64;
        settings.spriteheight = settings.height = 64;

        // invoke parent constructor
        this.parent(x, y, settings);

        // set start/end position based on the intial area size
        x = this.pos.x;
        this.startX = x;
        this.endX = x + width - settings.spritewidth;
        this.pos.x = x + width - settings.spritewidth;

        // walking and jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;

        // sprite faces left
        this.walkLeft = true;
      },

      // called by the engine when colliding with another object
      onCollision : function (res, obj) {
        if (this.alive && (res.y > 0) && obj.falling) {
          this.renderable.flicker(750);
        }
      },

      // manage the enemy movement
      update : function (dt) {
        // do nothing if not in viewport
        if (!this.inViewport) return false;

        if (this.alive) {
          if (this.walkLeft && this.pos.x <= this.startX) {
            this.walkLeft = false;
          }
          else if (!this.walkLeft && this.pos.x >= this.endX) {
            this.walkLeft = true;
          }

          this.flipX(this.walkLeft);
          this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
        }
        else {
          this.vel.x = 0;
        }

        // check for movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x !== 0 || this.vel.y !== 0) {
          // update object animation
          this.parent(dt);
          return true;
        }
        return false;
      }
    });
  });