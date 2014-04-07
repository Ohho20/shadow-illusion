angular.module('main', [
  'templates-main',
  'templates-lib',
  'app',
  'form.directives',
  'date.filters',
  'progress.interceptors',
  'security.interceptors',
  'ui.select2',
  'ui.bootstrap.datepicker',
  'ui.bootstrap.pagination',
  'ui.bootstrap.buttons',
  'ngSanitize',
  'ngAnimate',
  'ui.router'
])

.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise("/app/projects");
})

.run(function ($log, $state, $rootScope, $stateParams) {
  // putting state into $rootScope so that these services are available in views
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

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


  $log.info("Application running.");
});
