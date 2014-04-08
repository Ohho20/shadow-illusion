angular.module('game.entities.hud', [])
  
  .factory('HUD', function (ScoreItem) {
    return me.ObjectContainer.extend({

      init: function() {
        // call the constructor
        this.parent();
        
        // persistent across level change
        this.isPersistent = true;
        
        // non collidable
        this.collidable = false;
        
        // make sure our object is always drawn first
        this.z = Infinity;

        // give a name
        this.name = "HUD";
        
        // add our child score object at the top left corner
        this.addChild(new ScoreItem(630, 440));
      }
    });
  })

  .factory('ScoreItem', function ($injector) {
    /** 
     * a basic HUD item to display score
     */
    return me.Renderable.extend({
      /** 
       * constructor
       */
      init: function(x, y) {
        
        // call the parent constructor 
        // (size does not matter here)
        this.parent(new me.Vector2d(x, y), 10, 10); 

        // create font
        this.font = new me.BitmapFont('32x32_font', 32);
        this.font.set('right');
        
        // local copy of the global score
        this.score = -1;

        // make sure we use screen coordinates
        this.floating = true;
      },

      /**
       * update function
       */
      update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        var game = $injector.get('game');

        if (this.score !== game.data.score) { 
          this.score = game.data.score;
          return true;
        }
        return false;
      },

      /**
       * draw the score
       */
      draw : function (context) {
        var game = $injector.get('game');
        this.font.draw(context, game.data.score, this.pos.x, this.pos.y);
      }

    });
  });
