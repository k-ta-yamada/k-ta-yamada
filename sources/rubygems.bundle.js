// libs
import 'angular';
import 'angular-flash-alert';
import 'angular-animate';
import 'angular-loading-bar';

// css
import 'c3-css';
import './css/rubygems.css'

// script
import RubygemsController from './js/rubygems_controller.js'

let myApp = angular.module(
  'myApp', ['angular-loading-bar', 'ngFlash', 'ngAnimate']);
myApp.controller('RubygemsController', RubygemsController);
