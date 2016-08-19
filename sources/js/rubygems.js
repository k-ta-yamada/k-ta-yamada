angular.module('myApp', ['angular-loading-bar', 'ngAnimate'])
  // .controller('myController', ['$scope', '$http', function($scope, $http)
  .controller('myController', myController);
  function myController($scope, $http) {
    var _this = this;
    this.errors = [];
    this.chart = {};
    this.isError = false;

    this.generateChart = function(name) {
      // console.log(name);
      _this.isError = false;
      $http.get('/rubygems/' + name, {timeout: 5000})
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
            axis: { x: { type: 'category' } },
            grid: { y: { show: true } },
            line: { connectNull: true },
            area: { zerobased: false },
            bar:  { zerobased: false, width: { ratio: 0.4 } },
            // legend: { position: 'right' }
          });

          _this.chart[name] = { isShow: true, chart: chart };
        })
        .error(function(data, status, headers, config) {
          _this.errors.push({status: status, function: 'generateChart(' + name + ')'});
          _this.isError = true;
        });
    };

    this.toggleChart = function(name) {
      if (angular.isUndefined(_this.chart[name])) {
        _this.generateChart(name);
        return;
      }
      var isShow = _this.chart[name].isShow;
      _this.chart[name].isShow = !isShow;
    };

    this.transformChart = function(name, form) {
      var chart = _this.chart[name].chart
      chart.transform(form);
      chart.load({ labels: false });
    };

    this.getGemList = function() {
      _this.isError = false;
      $http.get('/rubygems.json', {timeout: 5000})
        .success(function(data) {
          // console.table(data);
          _this.data_set = data;
          _this.generateChart('renc');
          _this.generateChart('tee_logger');
        })
        .error(function(data, status, headers, config) {
          _this.errors.push({status: status, function: 'getGemList'});
          _this.isError = true;
        });
    };

    this.getGemList();
  };
