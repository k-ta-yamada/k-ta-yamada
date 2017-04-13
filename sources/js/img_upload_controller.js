const FILE_SIZE_LIMIT = Math.pow(1024, 2);
const FILE_TYPE = /^image\/.*/;
const FILE_DATA_CHUNK_SIZE = 3;
const PATH = window.location.pathname;

export default class ImgUploadController {
  constructor ($http, $window, Flash) {
    this.$http = $http;
    this.$window = $window;
    this.Flash = Flash;
  }

  // ng-init
  // init () {
  //   this.Flash.clear();
  //   let url = PATH + '/list';
  //   this.$http.get(url, { timeout: 5000 })
  //     .then((response) =>
  //           this.files = _.chunk(response.data, FILE_DATA_CHUNK_SIZE))
  //     .catch((d, s, h, c) => this.xhrErrHandler(d, s, h, c, 'init'));
  //     // .finally(() => console.warn('--------------------------------------------------'));
  // }

  // private callee anywhere
  xhrErrHandler (data, status, headers, config, callee) {
    if (status == 404) {
      console.error(`[${status}] ${callee}`);
      this.Flash.create('danger', `[${status}] ${callee}`, 0);
    } else {
      console.error(`[${status}] ${callee} : ${data}`);
      this.Flash.create('danger', `[${status}] ${callee} : ${data}`, 0);
    };
  };

  // ng-class
  col () {
    let size = parseInt(12 / FILE_DATA_CHUNK_SIZE);
    return `col-md-${size} col-xs-${size}`;
  }

  // private callee isValid
  // validation (files) {
  //   let errMsgs = [];

  //   if (files.length == 0) {
  //     errMsgs.push('attached nothing');
  //     return errMsgs;
  //   }
  //   _.forEach(files, (file, k) => {
  //     let temp = [];
  //     if (file.size > FILE_SIZE_LIMIT) temp.push(`<li>size over : ${file.size} / ${FILE_SIZE_LIMIT}`);
  //     if (!file.type.match(FILE_TYPE)) temp.push(`<li>not allow file type : ${file.type}`);
  //     if (temp.length > 0) errMsgs.push(`${file.name}<ul>${temp.join()}`);
  //   });
  //   return errMsgs;
  // }

  // private callee upload
  // isValid (files) {
  //   this.Flash.clear();
  //   let result = this.validation(files);
  //   _.forEach(result, (msg) => {
  //     console.warn(msg);
  //     this.Flash.create('warning', msg, 0);
  //   });
  //   return result.length == 0;
  // }

  // // private callee upload
  // postSuccess () {
  //   this.memo = "";
  //   this.message = "";
  //   this.pass = "";
  //   // ref: http://stackoverflow.com/a/24282495/6622514
  //   $("#file").replaceWith($("#file").val("").clone(true));
  //   this.init();
  // }

  // ng-click
  // upload (id) {
  //   let config = { timeout: 10000,
  //                  headers: { "Content-type": undefined },
  //                  transformRequest: null };
  //   let files = $("#file").prop("files");

  //   if (!this.isValid(files)) return;

  //   let formData = new FormData();
  //   formData.append('message', this.message || "");
  //   formData.append('memo', this.memo || "");
  //   formData.append('pass', this.pass);
  //   angular.forEach(files, (file) => formData.append('files[]', file));

  //   this.$http.post('img_upload', formData, config)
  //     .then(response => this.postSuccess())
  //     .catch((d, s, h, c) => this.xhrErrHandler(d, s, h, c, 'upload'));
  //     // .finally(() => console.warn('--------------------------------------------------'));
  // }

  // ng-click
  download (id) {
    let url = PATH + '/dl/' + id;
    this.$window.open(url, '_blank');
  }

  // private callee delete
  // deleteSuccess (data) {
  //   this.init();
  //   this.Flash.create('success', `id [${data.id}] is deleted.`, 3000);
  // }

  // ng-click
  // delete (id) {
  //   this.Flash.clear();
  //   if (!this.$window.confirm('ok?')) return;
  //   let url = PATH + '/' + id;
  //   this.$http.delete(url, { timeout: 5000 })
  //     .then(response => this.deleteSuccess(response.data))
  //     .catch((d, s, h, c) => this.xhrErrHandler(d, s, h, c, 'delete'));
  //     // .finally(() => console.warn('--------------------------------------------------'));
  // }
}
ImgUploadController.$inject = ['$http', '$window', 'Flash'];
