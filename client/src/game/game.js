// Game namespace
angular.module('game.container', [
	'game.controllers'
])
	.factory('game', function ($location, TitleScreen, PlayScreen, Player, Enemy, Fireball, resources) {

		return {

			// an object where to store game information
			data : {
				// score
				score : 0
			},
			
			// Run on page load.
			onload : function () {
				// Initialize the video.
				if (!me.video.init("screen", 640, 480, true, 'auto')) {
					alert("Your browser does not support HTML5 canvas.");
					return;
				}

				// add "#debug" to the URL to enable the debug Panel
				if ($location.hash === "#debug") {
					me.plugin.register.defer(debugPanel, "debug");
				}

				// Initialize the audio.
				me.audio.init("mp3,ogg");

				// Set a callback to run when loading is complete.
				me.loader.onload = this.loaded.bind(this);

				// Load the resources.
				me.loader.preload(resources);

				// Initialize melonJS and display a loading screen.
				me.state.change(me.state.LOADING);
			},

			// Run on game resources loaded.
			loaded: function () {
				me.state.set(me.state.MENU, new TitleScreen());
				me.state.set(me.state.PLAY, new PlayScreen());

				// set a global fading transition for the screen
				me.state.transition("fade", "#FFFFFF", 250);

				// add our player entity in the entity pool
				me.pool.register("mainPlayer", Player);
				me.pool.register("EnemyEntity", Enemy);
				me.pool.register('FireballEntity', Fireball);

				// enable the keyboard
				me.input.bindKey(me.input.KEY.LEFT, 'left');
				me.input.bindKey(me.input.KEY.RIGHT, 'right');
				me.input.bindKey(me.input.KEY.X, 'jump', true);

				// Start the game.
				me.state.change(me.state.MENU);
			}
		};
	});