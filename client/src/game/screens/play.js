angular.module('game.screens.play', [
		'game.entities.hud'
	])
	.factory('PlayScreen', function ($injector, HUD) {
		
		return me.ScreenObject.extend({
			/**
			 *  action to perform on state change
			 */
			onResetEvent: function() {
				// play the audio track
				me.audio.playTrack('DST-InertExponent');

				// load a level
				me.levelDirector.loadLevel('level01');

				// reset the score
				var game = $injector.get('game');
				game.data.score = 0;

				// add our HUD to the game world
				this.HUD = new HUD();
				me.game.world.addChild(this.HUD);
			},

			/**
			 *  action to perform when leaving this screen (state change)
			 */
			onDestroyEvent: function() {
				// remove the HUD from the game world
				me.game.world.removeChild(this.HUD);

				me.audio.stopTrack();
			}
		});
	});
