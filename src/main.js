angular.module('main', [
  'templates-main',
  'game.container',
  'game.screens',
  'game.entities'
])

.run(function ($log, $rootScope, game) {

  game.onload();

  // Mobile browser hacks
  if (me.device.isMobile && !navigator.isCocoonJS) {
    // Prevent the webview from moving on a swipe
    window.document.addEventListener("touchmove", function (e) {
      e.preventDefault();
      window.scroll(0, 0);
      return false;
    }, false);

    // Scroll away mobile GUI
    (function () {
      window.scrollTo(0, 1);
      me.video.onresize(null);
    }).defer();

    me.event.subscribe(me.event.WINDOW_ONRESIZE, function (e) {
      window.scrollTo(0, 1);
    });
  }

  $log.info("Game started.");
});
