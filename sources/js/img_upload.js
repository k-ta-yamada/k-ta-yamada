"use strict";
var myApp = angular.module('myApp', ['angular-loading-bar', 'ngFlash', 'ngAnimate']);
myApp.controller('myController', ['$scope', '$http', 'Flash', '$window', function($scope, $http, Flash, $window) {
  let _this = this;

  this.files = [];
  let temp_hide = [];
  const FILE_SIZE_LIMIT = Math.pow(1024, 2);
  const FILE_TYPE = /^image\/.*/;
  const FILE_DATA_CHUNK_SIZE = 3;
  const PATH = $window.location.pathname;

  this.col = function() {
    let size = parseInt(12 / FILE_DATA_CHUNK_SIZE);
    return `col-md-${size} col-xs-${size}`;
  }

  this.message = "";
  this.pass = "";

  function xhrErrHandler(data, status, headers, config, callee) {
    if (status == 404) {
      console.error(`[${status}] ${callee}`);
      Flash.create('danger', `[${status}] ${callee}`, 0);
    } else {
      console.error(`[${status}] ${callee} : ${data}`);
      Flash.create('danger', `[${status}] ${callee} : ${data}`, 0);
    };
  };

  this.init = function() {
    Flash.clear();
    let url = PATH + '/list';
    $http.get(url, { timeout: 5000 })
      .success((data) => _this.files = _.chunk(data, FILE_DATA_CHUNK_SIZE))
      .error((d, s, h, c) => xhrErrHandler(d, s, h, c, 'init'));
      // .finally(() => console.warn('--------------------------------------------------'));
  };

  function validation(files) {
    let errMsgs = [];

    if (files.length == 0) {
      errMsgs.push('attached nothing');
      return errMsgs;
    }
    angular.forEach(files, function(file, k) {
      let temp = [];
      if (file.size > FILE_SIZE_LIMIT) temp.push(`<li>size over : ${file.size} / ${FILE_SIZE_LIMIT}`);
      if (!file.type.match(FILE_TYPE)) temp.push(`<li>not allow file type : ${file.type}`);
      if (temp.length > 0) errMsgs.push(`${file.name}<ul>${temp.join()}`);
    });
    return errMsgs;
  };

  function isValid(files) {
    Flash.clear();
    let result = validation(files)
    angular.forEach(result, function(msg) {
      console.warn(msg);
      Flash.create('warning', msg, 0);
    });
    return result.length == 0;
  };

  function postSuccess() {
    _this.message = "";
    _this.pass = "";
    $("#file").replaceWith($("#file").clone());
    _this.init();
  };

  this.upload = function(id) {
    let config = { timeout: 10000,
                   headers: { "Content-type": undefined },
                   transformRequest: null };
    let files = $("#file").prop("files");

    if (!isValid(files)) return;

    let formData = new FormData();
    formData.append('message', _this.message || "");
    formData.append('memo', _this.memo || "");
    formData.append('pass',    _this.pass);
    angular.forEach(files, (file) => formData.append('files[]', file));

    $http.post('img_upload', formData, config)
      .success(_data => postSuccess())
      .error((d, s, h, c) => xhrErrHandler(d, s, h, c, 'upload'));
      // .finally(() => console.warn('--------------------------------------------------'));
  };

  this.download = function(id) {
    let url = PATH + '/dl/' + id;
    $window.open(url, '_blank');
  };

  function deleteSuccess(data) {
    _this.init();
    Flash.create('success', `id [${data.id}] is deleted.`, 3000);
  };

  this.delete = function(id) {
    Flash.clear();
    if (!$window.confirm('ok?')) return;
    let url = PATH + '/' + id;
    $http.delete(url, { timeout: 5000 })
      .success(data => deleteSuccess(data))
      .error((d, s, h, c) => xhrErrHandler(d, s, h, c, 'delete'));
      // .finally(() => console.warn('--------------------------------------------------'));
  };

  // this.hide = function(id) {
  //   let temp =  _.find(_this.files, function(f) { return f.id == id; });
  //   temp_hide.push(temp);
  //   _.remove(_this.files, function(f) { return f.id == id; });
  //   console.table(temp_hide);
  // };
}]);
