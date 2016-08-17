angular.module('myApp', ['angular-loading-bar', 'ngAnimate'])
  .controller('myController', ['$scope', '$http', function($scope, $http) {
    $scope.getGemList = () => {
      $http.get('/rubygems.json')
        .success(function(data) {
          // console.table(data);
          $scope.data_set = data;
          $scope.generateChart('renc');
          $scope.generateChart('tee_logger');
        });
    };

    $scope.chart = {};

    $scope.generateChart = (name) => {
      // console.log(name);
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
              names: { downloads_count: 'downloads/version' },
            },
            axis: { x: { type: 'category' }, },
            grid: { y: { show: true } },
            line: { connectNull: true },
            area: { zerobased: false },
            bar:  { zerobased: false, width: { ratio: 0.4 } },
          });

          $scope.chart[name] = {
            isShow: true,
            chart: chart,
          };
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
