angular.module('game.container')
	.factory('assets', function () {
		
		return {
			resources: [

				/* Graphics. 
				 * @example
				 * {name: "example", type:"image", src: "data/img/example.png"},
				 */
				{name: 'area01_level_tiles', type: 'image', src: 'data/img/map/area01_level_tiles.png'},
				{name: 'gripe_run_right', type:'image', src: 'data/img/sprite/gripe_run_right.png'},
				{name: 'area01_bkg0', type: 'image', src: 'data/img/area01_bkg0.png'},
				{name: 'area01_bkg1', type: 'image', src: 'data/img/area01_bkg1.png'}, 

				{name: 'spinning_coin_gold', type: 'image', src: 'data/img/sprite/spinning_coin_gold.png'},
				{name: 'wheelie_right', type: 'image', src: 'data/img/sprite/wheelie_right.png'},

				{name: '32x32_font', type: 'image', src: 'data/img/font/32x32_font.png'},

				/* Atlases 
				 * @example
				 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
				 */
					
				/* Maps. 
				 * @example
				 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
				 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
			 	 */
			 	{name: 'area01', type: 'tmx', src: 'data/map/area01.tmx'},

				/* Background music. 
				 * @example
				 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
				 */	
				 {name: 'dst-inertexponent', type: 'audio', src: 'data/bgm/'},

				/* Sound effects. 
				 * @example
				 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
				 */
				 {name: 'cling', type: 'audio', src: 'data/sfx/'},
				 {name: 'stomp', type: 'audio', src: 'data/sfx/'},
				 {name: 'jump', type: 'audio', src: 'data/sfx/'}
			]
		}
	});