angular.module('game.screens.title', [])
  .factory('titleScreen', function () {
    
    return me.ScreenObject.extend({
      /** 
       *  action to perform on state change
       */
      onResetEvent: function() {  
        
        // title screen
        me.game.world.addChild(
          new me.SpriteObject(
            0,0,me.loader.getImage('title_screen')
          ),
          1
        );

        // renderable component with scrolling text
        me.game.world.addChild( new (me.Renderable.extend({

          init : {},
          scrollover: {},
          update: {}, 
          draw: function (context) {

          },
          onDestroyEvent: function () {
            // just in case
            this.scrollertween.stop();
          }
        })), 2);
      },
      
      
      /** 
       *  action to perform when leaving this screen (state change)
       */
      onDestroyEvent: function() {
        ; // TODO
      }
    });
  });
