'use strict';

angular
  .module('app', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngMessages',
    'ui-notification',
    'angularUtils.directives.dirPagination',
    'angularFileUpload',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider' ,'$locationProvider', 'NotificationProvider',
      function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$locationProvider, NotificationProvider) {

      NotificationProvider.setOptions({
          delay: 2000,
          startTop: 20,
          startRight: 10,
          verticalSpacing: 20,
          horizontalSpacing: 20,
          positionX: 'right',
          positionY: 'bottom'
      });

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("");
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'backend/app/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'app',
                    files:[
                    'backend/app/scripts/directives/header/header.js',
                    //'backend/app/scripts/directives/header/header-notification/header-notification.js',
                    'backend/app/scripts/directives/sidebar/sidebar.js',
                    'backend/app/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })

      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'backend/app/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'app',
              files:[
              'backend/app/scripts/controllers/main.js',
              'backend/app/scripts/directives/timeline/timeline.js',
              'backend/app/scripts/directives/notifications/notifications.js',
              'backend/app/scripts/directives/chat/chat.js',
              'backend/app/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })


    .state('dashboard.productCategory',{
        url:'/category',
        controller: 'ProductCategoryCtrl',
        templateUrl:'backend/app/views/categories/index.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/categories/category.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.productCategory-view',{
        url:'/category/view/:id',
        controller: 'ProductCategoryDetailCtrl',
        templateUrl:'backend/app/views/categories/detail.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/categories/category-detail.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.brand',{
        url:'/brand',
        controller: 'BrandCtrl',
        templateUrl:'backend/app/views/brands/brand.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/brands/brand.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.brand-view',{
        url:'/brand/view/:id',
        controller: 'BrandDetailCtrl',
        templateUrl:'backend/app/views/brands/brand-detail.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/brands/brand-detail.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.product',{
        url:'/product',
        controller: 'ProductCtrl',
        templateUrl:'backend/app/views/products/product.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/products/product.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.product-create',{
        url:'/product/create',
        controller: 'ProductCreateCtrl',
        templateUrl:'backend/app/views/products/create.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/products/create.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.product-upload',{
        url:'/product/upload',
        controller: 'ProductUploadCtrl',
        templateUrl:'backend/app/views/products/upload-photo.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/products/upload.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.product-view',{
        url:'/product/view/:id',
        controller: 'ProductDetailCtrl',
        templateUrl:'backend/app/views/products/detail.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/products/detail.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.profile',{
        url:'/profile',
        controller: 'ProfileCtrl',
        //templateUrl:'backend/app/views/profiles/register.blade.php',
        templateUrl:'backend/app/views/profiles/profile.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/profiles/profile.js'
                    ]
                })
            }
        }
    })

    .state('dashboard.setting',{
        url:'/setting',
        controller: 'SettingCtrl',
        templateUrl:'backend/app/views/profiles/setting.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'app',
                    files:[
                        'backend/app/scripts/controllers/profiles/setting.js'
                    ]
                })
            }
        }
    })

      .state('dashboard.form',{
        templateUrl:'backend/app/views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'backend/app/views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'backend/app/views/pages/login.html',
        url:'/login'
    })
    //  .state('dashboard.chart',{
    //    templateUrl:'backend/app/views/chart.html',
    //    url:'/chart',
    //    controller:'ChartCtrl',
    //    resolve: {
    //      loadMyFile:function($ocLazyLoad) {
    //        return $ocLazyLoad.load({
    //          name:'chart.js',
    //          files:[
    //            'bower_components/angular-chart.js/dist/angular-chart.min.js',
    //            'bower_components/angular-chart.js/dist/angular-chart.css'
    //          ]
    //        }),
    //        $ocLazyLoad.load({
    //            name:'sbAdminApp',
    //            files:['backend/app/scripts/controllers/chartContoller.js']
    //        })
    //      }
    //    }
    //})
      .state('dashboard.table',{
        templateUrl:'backend/app/views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'backend/app/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'backend/app/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'backend/app/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'backend/app/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'backend/app/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'backend/app/views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    
