angular.module('app.timesheets', [
  'app.timesheets.controllers',
  'ui.router',
  'authorization.services'
])

  .config(function ($stateProvider, authorizationProvider) {

    $stateProvider
      .state('app.timesheets', {
        url: '/users/:user_id/timesheets',
        controller: 'TimesheetCtrl',
        templateUrl: 'assets/templates/app/timesheets/index.html',
        data: {
          section: 'Timesheets'
        }
      })

      .state('app.timesheets.detail', {
        url: '/detail/:_id',
        controller: 'TimesheetDetailCtrl',
        templateUrl: 'assets/templates/app/timesheets/detail.html',
        data: {
          section: 'Timesheet Details'
        },
        resolve : {
          timesheet : [
            'data', 
            '$stateParams', 
            function (data, $stateParams) {
              return data.get('timesheets', $stateParams);
            }
          ],
          timeunits : [
            'data',
            '$stateParams',
            function (data, $stateParams) {
              return data.list('timeunits', {timesheet_id: $stateParams._id, user_id: $stateParams.user_id});
            }
          ]
        }
      })

      .state('app.timesheets.detail.edit', {
        url: '/edit',
        controller: 'TimesheetEditCtrl',
        templateUrl: 'assets/templates/app/timesheets/form.html',
        data: {
          section: 'Edit Timesheet',
          saveText: 'Update'
        }
      })

      .state('app.timesheets.create', {
        url: '/create',
        controller: 'TimesheetCreateCtrl',
        templateUrl: 'assets/templates/app/timesheets/form.html',
        data: {
          section: 'Create Timesheet',
          saveText: 'Create'
        }
      });
  })

  .run(function (api) {
    api.add({
      resource: 'timesheets',
      url: '/users/:user_id/timesheets',
      params: {
        user_id: '@user_id'
      }
    });
  }); 
