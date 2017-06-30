{{--@extends('layouts.app')--}}

{{--@section('content')--}}
{{--<div class="container">--}}
{{--<div class="row">--}}
{{--<div class="col-md-8 col-md-offset-2">--}}
{{--<div class="panel panel-default">--}}
{{--<div class="panel-heading">Dashboard</div>--}}

{{--<div class="panel-body">--}}
{{--You are logged in!--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--@endsection--}}

<!doctype html>
<html class="no-js" lang="{{ config('app.locale') }}">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <title>{{ config('app.name', 'LLC') }}</title>

    <!-- Styles -->
    {{--<link href="{{ asset('css/app.css') }}" rel="stylesheet">--}}
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css" />


    <!-- build:css(.tmp) styles/main.css -->
    <link rel="stylesheet" href="backend/app/styles/main.css">
    <link rel="stylesheet" href="backend/app/styles/sb-admin-2.css">
    <link rel="stylesheet" href="backend/app/styles/timeline.css">
    <link rel="stylesheet" href="bower_components/metisMenu/dist/metisMenu.min.css">
    <link rel="stylesheet" href="bower_components/angular-loading-bar/build/loading-bar.min.css">
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css" type="text/css">
    <link rel="stylesheet" href="bower_components/angular-ui-notification/dist/angular-ui-notification.min.css" type="text/css">
    <!-- endbuild -->

    <!-- build:js(.) scripts/vendor.js -->
    <!-- bower:js -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/jquery.js"></script>
    <script src="bower_components/jquery.min.js"></script>
    {{--<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>--}}
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="bower_components/json3/lib/json3.min.js"></script>
    <script src="bower_components/oclazyload/dist/ocLazyLoad.min.js"></script>
    <script src="bower_components/angular-loading-bar/build/loading-bar.min.js"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src="bower_components/metisMenu/dist/metisMenu.min.js"></script>
    <script src="bower_components/Chart.js/Chart.min.js"></script>

    <script src="bower_components/angular-ui-notification/dist/angular-messages.js"></script>
    <script src="bower_components/angular-ui-notification/dist/angular-ui-notification.min.js"></script>
    <script src="bower_components/jquery.gritter/js/jquery.gritter.min.js"></script>

    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>

    <script src="backend/app/packages/dirPagination.js"></script>
    <script src="backend/app/services/myServices.js"></script>

    {{--<script src="bower_components/ng-file-upload-shim/ng-file-upload-shim.min.js"></script> <!-- for no html5 browsers support -->--}}
    {{--<script src="bower_components/ng-file-upload/ng-file-upload.min.js"></script>--}}

    <script src="bower_components/angular-file-upload/dist/angular-file-upload.min.js"></script>

    {{--<script src='bower_components/angular-file-model/angular-file-model.js'></script>--}}

    <!--thumbnails for images-->
    <script src="backend/app/scripts/directives/directives.js"></script>

    {{--<script src="{{ asset('/app/packages/dirPagination.js') }}"></script>--}}
    {{--<script src="{{ asset('/app/routes.js') }}"></script>--}}
    {{--<script src="{{ asset('/app/services/myServices.js') }}"></script>--}}
    {{--<script src="{{ asset('/app/helper/myHelper.js') }}"></script>--}}

    <!-- build:js({.tmp,app}) scripts/scripts.js -->
    <script src="backend/app/scripts/app.js"></script>
    <script src="backend/app/js/sb-admin-2.js"></script>
    <script src="backend/app/helper/myHelper.js"></script>
    <!-- endbuild -->

    {{--<script>--}}
    {{--(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){--}}
    {{--(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),--}}
    {{--m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)--}}
    {{--})(window,document,'script','//www.google-analytics.com/analytics.js','ga');--}}
    {{--ga('create', 'UA-XXXXX-X');--}}
    {{--ga('send', 'pageview');--}}
    {{--</script>--}}
    <!-- Custom CSS -->

    <!-- Custom Fonts -->

    <!-- Morris Charts CSS -->
    <!-- <link href="styles/morrisjs/morris.css" rel="stylesheet"> -->

</head>

<body>

<div ng-app="app">

    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">

            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/admin#/dashboard/home"><p style="color:#1f648b;">LLC-TECHNOLOGY</p></a>
        </div>
        <!-- /.navbar-header -->
        {{--<!--<header-notification></header-notification>-->--}}

        <ul class="nav navbar-top-links navbar-right">

            @if (Auth::guest())

                @yield('content')

                {{--<li><a href="{{ route('login') }}">Login</a></li>--}}
                {{--<li><a href="{{ route('register') }}">Register</a></li>--}}
            @else

            <li class="dropdown" style="cursor: pointer; cursor: hand;">
                <a class="dropdown-toggle" data-toggle="dropdown">
                    {{ Auth::user()->name }} <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">
                    <li><a class="nav-link" ui-sref="dashboard.profile"><i class="fa fa-user fa-fw"></i> User Profiles</a>
                    </li>
                    <li><a class="nav-link" ui-sref="dashboard.setting"><i class="fa fa-gear fa-fw"></i> Settings</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                             document.getElementById('logout-form').submit();">
                            <i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>

                </ul>

                <!-- /.dropdown-user -->
            </li>
                @endif
            <!-- /.dropdown -->
        </ul>

        {{--<sidebar></sidebar>--}}
    </nav>

    <div ui-view></div>

</div>

</body>

</html>
