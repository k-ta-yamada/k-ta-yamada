angular.module('myApp', ['angular-loading-bar', 'ngAnimate'])
  .controller('myController', ['$scope', '$http', function($scope, $http) {
    $scope.getGemList = () => {
      $scope.isError = false;
      $http.get('/rubygems.json')
        .success(function(data) {
          // console.table(data);
          $scope.data_set = data;
          $scope.generateChart('renc');
          $scope.generateChart('tee_logger');
        })
        .error(function(data, status, headers, config) {
          $scope.errors.push({status: status, function: 'getGemList'});
          $scope.isError = true;
        });
    };

    $scope.errors = [];
    $scope.chart = {};

    $scope.generateChart = (name) => {
      // console.log(name);
      $scope.isError = false;
      $http.get('/rubygems/' + name)
        .success(function(data) {
          var chart = c3.generate({
            bindto: '#chart-' + name,
            data: {
              // url: '/c3/' + name, mimeType: 'json',
              json: data,
              keys: { value: ['number', 'downloads_count'] },
              x: 'number',
              labels: true,
              // types: { downloads_count: 'area' },
              names: { downloads_count: 'downloads/version' }
            },
            axis: { x: { type: 'category' }, },
            grid: { y: { show: true } },
            line: { connectNull: true },
            area: { zerobased: false },
            bar:  { zerobased: false, width: { ratio: 0.4 } }
          });

          $scope.chart[name] = { isShow: true, chart: chart };
        })
        .error(function(data, status, headers, config) {
          $scope.errors.push({status: status, function: 'generateChart(' + name + ')'});
          $scope.isError = true;
        });
    };

    $scope.toggleChart = (name) => {
      if (angular.isUndefined($scope.chart[name])) {
        $scope.generateChart(name);
        return;
      }
      var isShow = $scope.chart[name].isShow;
      $scope.chart[name].isShow = !isShow;
    };

    $scope.transformChart = (name, form) => {
      var chart = $scope.chart[name].chart
      chart.transform(form);
      chart.load({ labels: false });
    };

    $scope.getGemList();
  }]);
