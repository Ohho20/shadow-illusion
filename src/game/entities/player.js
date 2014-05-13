angular.module('game.entities.player', [])
  .factory('Player', function () {
    
    // A player entity
    return me.ObjectEntity.extend({

      // constructor
      init: function (x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal and vertical speed (accel vector)
        this.setVelocity(3, 15);
        this.type = 'main-player';

        // set the display to follow our position on both axis. 
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
      },

      // update the player pos
      update: function (dt) {

        // Handle Left to Right
        if (me.input.isKeyPressed('left')) {
          // flip the sprite on horizontal axis
          this.flipX(true);
          // update the entity velocity
          this.vel.x -= this.accel.x * me.timer.tick;
        }
        else if (me.input.isKeyPressed('right')) {
          // unflip the sprite
          this.flipX(false);
          // update the entity velocity
          this.vel.x += this.accel.x * me.timer.tick;
        }
        else {
          this.vel.x = 0;
        }

        if (me.input.isKeyPressed('jump')) {
          // make sure we are not already jumping or falling
          if (!this.jumping && !this.falling) {
            // set current vel to the maximum defined value
            // gravity will then do teh rest
            this.vel.y = -this.maxVel.y * me.timer.tick;
            // set the jumping flag
            this.jumping = true;

            me.audio.play('jump');
          }
        }

        if (me.input.isKeyPressed('fire')) {
          var fb = me.pool.pull('FireballEntity', this.pos.x, this.pos.y, {shootLeft: this.lastflipX});
          me.game.world.addChild(fb, 999);
          me.game.world.sort();
        }

        // check an dupdate player movement
        this.updateMovement();

        // check for collision
        var res = me.game.world.collide(this);

        if (res) {
          // if we collide with an enemy
          if (res.obj.type == me.game.ENEMY_OBJECT) {
            if ((res.y > 0) && !this.jumping) {
              me.audio.play('stomp');

              // bounce (force jump) 
              this.falling = false;
              this.vel.y = -this.maxVel.y * me.timer.tick;
              this.jumping = true;
            }
            else {
              // let us flicker
              this.renderable.flicker(750);
            }
          }
        }

        // update animation if necessary
        if (this.vel.x !== 0 || this.vel.y !== 0) {
          // update object animation
          this.parent(dt);
          return true;
        }

        // otherwise inform the engin we did not perform an update
        // (e.g position, animation)
        return false;
      }
    });

  });