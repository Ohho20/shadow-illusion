angular.module('game.container')
  .factory('resources', function () {

    var img = 'assets/img/';
    var bg = 'assets/img/bg/';
    var font = 'assets/img/font/';
    var gui = 'assets/img/gui/';
    var map = 'assets/map/';
    var sprite = 'assets/img/sprite/';
    var bgm = 'assets/bgm/';
    var sfx = 'assets/sfx/';
    var particles = 'assets/img/particles/';
    
    return  [
      /* Graphics. 
       * @example
       * {name: "example", type:"image", src: "data/img/example.png"},
       */

      // backgrounds
      {name: 'cave', type: 'image', src: bg + 'cave.png'},
      {name: 'mountains', type:'image', src: bg + 'mountains.png'},
      {name: 'sky-fg', type: 'image', src: bg + 'sky-fg.png'},
      {name: 'sky', type: 'image', src: bg + 'sky.png'},
      {name: 'water-cave', type: 'image', src: bg + 'water-cave.png'}, 

      // forest
      {name: 'forest-2-small', type: 'image', src: img + 'forest/forest-2-small.png'},
      {name: 'forest-3-small', type: 'image', src: img + 'forest/forest-3-small.png'},
      {name: 'forest-4-small', type: 'image', src: img + 'forest/forest-4-small.png'},
      {name: 'ground-1-small', type: 'image', src: img + 'forest/ground-1-small.png'},

      // Ground
      {name: 'ground0', type: 'image', src: img + 'Ground/ground0.png'},
      {name: 'ground1', type: 'image', src: img + 'Ground/ground1.png'},
      {name: 'ground2', type: 'image', src: img + 'Ground/ground2.png'},
      {name: 'ground3', type: 'image', src: img + 'Ground/ground3.png'},
      {name: 'ground4', type: 'image', src: img + 'Ground/ground4.png'},
      {name: 'ground5', type: 'image', src: img + 'Ground/ground5.png'},
      {name: 'ground6', type: 'image', src: img + 'Ground/ground6.png'},
      {name: 'ground7', type: 'image', src: img + 'Ground/ground7.png'},
      {name: 'ground8', type: 'image', src: img + 'Ground/ground8.png'},
      {name: 'ground9', type: 'image', src: img + 'Ground/ground9.png'},
      {name: 'groundl', type: 'image', src: img + 'Ground/groundl.png'},
      {name: 'groundr', type: 'image', src: img + 'Ground/groundr.png'},

      // Stone
      {name: 'stone0', type: 'image', src: img + 'Stone/ground0.png'},
      {name: 'stone1', type: 'image', src: img + 'Stone/ground1.png'},
      {name: 'stone2', type: 'image', src: img + 'Stone/ground2.png'},
      {name: 'stone3', type: 'image', src: img + 'Stone/ground3.png'},
      {name: 'stone4', type: 'image', src: img + 'Stone/ground4.png'},
      {name: 'stone5', type: 'image', src: img + 'Stone/ground5.png'},
      {name: 'stone6', type: 'image', src: img + 'Stone/ground6.png'},
      {name: 'stone7', type: 'image', src: img + 'Stone/ground7.png'},
      {name: 'stone8', type: 'image', src: img + 'Stone/ground8.png'},
      {name: 'stone9', type: 'image', src: img + 'Stone/ground9.png'},
      {name: 'stonel', type: 'image', src: img + 'Stone/groundl.png'},
      {name: 'stoner', type: 'image', src: img + 'Stone/groundr.png'},


      // sprites
      {name: 'dark', type: 'image', src: sprite + 'dark.png'},
      {name: 'earth', type: 'image', src: sprite + 'earth.png'},
      {name: 'fire', type: 'image', src: sprite + 'fire.png'},
      {name: 'light', type: 'image', src: sprite + 'light.png'},
      {name: 'paladin', type: 'image', src: sprite + 'paladin.png'},
      {name: 'plant', type: 'image', src: sprite + 'plant.png'},
      {name: 'water', type: 'image', src: sprite + 'water.png'},

      // particles
      {name: 'blue', type: 'image', src: particles + 'blue.png'},
      {name: 'explosion', type: 'image', src: particles + 'explosion.png'},
      {name: 'fireball', type: 'image', src: particles + 'fireball.png'},
      {name: 'rain', type: 'image', src: particles + 'rain.png'},
      {name: 'smoke', type: 'image', src: particles + 'smoke.png'},


      // font and title
      {name: '32x32_font', type: 'image', src: font + '32x32_font.png'},
      {name: "title_screen", type:"image", src: gui + 'title_screen.png'},
        
      /* Maps. 
       * @example
       * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
       * {name: "example01", type: "tmx", src: "data/map/example01.json"},
       */
      {name: 'level01', type: 'tmx', src: map + 'level01.tmx'},
      {name: 'level02', type: 'tmx', src: map + 'level02.tmx'},
      {name: 'level03', type: 'tmx', src: map + 'level03.tmx'},
      {name: 'level04', type: 'tmx', src: map + 'level04.tmx'},
      {name: 'level05', type: 'tmx', src: map + 'level05.tmx'},

      /* Background music. 
       * @example
       * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
       */ 
       {name: 'dst-inertexponent', type: 'audio', src: bgm},

      /* Sound effects. 
       * @example
       * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
       */
       {name: 'cling', type: 'audio', src: sfx},
       {name: 'stomp', type: 'audio', src: sfx},
       {name: 'jump', type: 'audio', src: sfx}
    ];
  });