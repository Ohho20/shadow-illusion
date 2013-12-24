
describe('authentication', function() {
  var expect = chai.expect;

  var $rootScope, 
    $http, 
    $httpBackend, 
    $state, 
    $apiUrl,
    status, 
    userInfo,
    service,
    securityContext,
    queue;
  
  angular.module('test',[]).constant('I18N.MESSAGES', messages = {});

  beforeEach(
    module(
      'common.security',
      'common.security.service', 
      'common.security.authentication',
      'common.security.context',
      'test', 
      'stateMock', 
      'assets/templates/common/security/login/index.html',
      'app.resources',
      'app.services',
      'ngResource'
    ));

  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$http_, _$state_, _$apiUrl_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $http = _$http_;
    $state = _$state_;
    $apiUrl = _$apiUrl_;

    userInfo = {id: '1234567890', email: 'jo@bloggs.com', firstName: 'Jo', lastName: 'Bloggs', permissions: undefined};
    $httpBackend.when('GET', $apiUrl + '/login').respond(200, { authenticated: true, user: userInfo }); 
  })); 

  beforeEach(inject(function($injector) {
    authentication = $injector.get('authentication');
    securityContext = $injector.get('securityContext');
    queue = $injector.get('security.retry.queue');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $state.ensureAllTransitionsHappened();
  });

  describe('login', function() {

    it('sends a http request to login the specified user', function() {
      $httpBackend.when('POST', $apiUrl + '/login').respond(200, {authenticated: true,  user: userInfo });
      $httpBackend.expect('POST', $apiUrl + '/login');
      authentication.login('email', 'password');
      $httpBackend.flush();
      expect(securityContext.user.id).to.equal(userInfo.id);
    });

    it('calls queue.retry on a successful login', function() {
      $httpBackend.when('POST', $apiUrl + '/login').respond(200, {authenticated: true,  user: userInfo });
      var spy = sinon.spy(queue, 'retryAll');
      
      authentication.login('email', 'password');
      $httpBackend.flush();
      $rootScope.$digest();
      expect(spy.called).to.be.true;
      expect(securityContext.user.id).to.equal(userInfo.id);
    });

    it('does not call queue.retryAll after a login failure', function() {
      $httpBackend.when('POST', $apiUrl + '/login').respond(200, { user: null });
      var spy = sinon.spy(queue, 'retryAll');
      
      expect(spy.called).to.be.false;
      authentication.login('email', 'password');
      $httpBackend.flush();
      expect(spy.called).to.be.false;
    });
  });

  describe("currentUser", function() {

    it("should be unauthenticated to begin with", function() {
      expect(securityContext.authenticated).to.be.false;
    });

    it("should be authenticated if we update with user info", function() {
      var contextInfo = {authenticated: true, user: {id: 1}};
      authentication.setAuthentication(contextInfo);
      expect(securityContext.authenticated).to.be.true;
      expect(securityContext.user.id).to.equal(contextInfo.user.id);
    });

    it("should not be authenticated if we reset the securityContext", function() {
      var userInfo = { authenticated: true, user: {id: 1} };
      authentication.setAuthentication(userInfo);
      expect(securityContext.authenticated).to.be.true;
      expect(securityContext.user.id).to.equal(userInfo.user.id);

      securityContext.reset();
      expect(securityContext.authenticated).to.be.false;
      expect(securityContext.user.id).to.be.undefined;
    });
  });

  describe('requestCurrentUser', function() {
    
    it('makes a GET request to retrieve the current user', function() {
      expect(securityContext.authenticated).to.be.false;
      $httpBackend.expect('GET', $apiUrl + '/login');

      authentication.requestCurrentUser().then(function(data) {
        resolved = true;
        expect(securityContext.authenticated).to.be.true;
      expect(securityContext.user.id).to.equal(userInfo.id);
      });
      
      $httpBackend.flush();
      expect(resolved).to.be.true;
    });

    it('returns the current user immediately if they are already authenticated', function() {
      userInfo = {authenticated: true, user: {id: 1}};
      securityContext = userInfo;
      expect(securityContext.authenticated).to.be.true;
      authentication.requestCurrentUser().then(function(data) {
        resolved = true;
        expect(securityContext.user.id).to.equal(userInfo.user.id);
      });

      $httpBackend.flush();
      expect(resolved).to.be.true;
    });
  });

});