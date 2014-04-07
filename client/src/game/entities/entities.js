// A player entity
game.PlayerEntity = me.ObjectEntity.extend({

  // constructor
  init: function (x, y, settings) {
    // call the constructor
    this.parent(x, y, settings);

    // set the default horizontal and vertical speed (accel vector)
    this.setVelocity(3, 15);

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

// Coin Entity
game.CoinEntity = me.CollectableEntity.extend({

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

// Enemy Entity
game.EnemyEntity = me.ObjectEntity.extend({

  init : function (x, y, settings) {
    // object settings
    settings.image = 'wheelie_right';

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














