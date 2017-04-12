// libs
import 'angular';
import 'angular-flash-alert';
import 'angular-animate';
import 'angular-loading-bar';

// css
import './css/img_upload.css'

// script
import ImgUploadController from './js/img_upload_controller.js'

let myApp = angular.module(
  'myApp', ['angular-loading-bar', 'ngFlash', 'ngAnimate']);
myApp.controller('ImgUploadController', ImgUploadController);
