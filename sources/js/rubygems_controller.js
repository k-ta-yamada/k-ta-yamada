export default class RubygemsController {
  constructor ($http, Flash) {
    this.$http = $http;
    this.Flash = Flash;

    this.chart = {};
    this.getGemList();
  }

  // callee constructor
  getGemList () {
    this.$http.get('/rubygems.json', { timeout: 5000 })
      .then((response) => {
        this.data_set = response.data;
        this.generateChart('renc');
        this.generateChart('tee_logger');
      })
      .catch((data, status, headers, config) => {
        let id = this.Flash.create('danger', `[${status}]getGemList`, 0);
      });
  }

  // callee getGemList
  generateChart (name) {
    this.$http.get(`/rubygems/${name}`, {timeout: 5000})
      .then((response) => {
        let chart = c3.generate({
          bindto: `#chart-${name}`,
          data: {
            // url: '/c3/' + name, mimeType: 'json',
            json: response.data,
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
        this.chart[name] = { isShow: true, chart: chart };
      })
      .catch((data, status, headers, config) => {
        let id = this.Flash.create('danger', `[${status}]generateChart`, 0);
      });
  }

  // ng-click
  toggleChart (name) {
    if (angular.isUndefined(this.chart[name])) {
      this.generateChart(name);
      return;
    }
    let isShow = this.chart[name].isShow;
    this.chart[name].isShow = !isShow;
  }

  // ng-click
  transformChart (name, form) {
    let chart = this.chart[name].chart
    chart.transform(form);
    chart.load({ labels: false });
  }
}
RubygemsController.$inject = ['$http', 'Flash'];
