{{--@extends('layouts.app')--}}

{{--@section('content')--}}
{{--<div class="container">--}}
    {{--<div class="row">--}}
        {{--<div class="col-md-8 col-md-offset-2">--}}
            {{--<div class="panel panel-default">--}}
                {{--<div class="panel-heading">Login</div>--}}
                {{--<div class="panel-body">--}}
                    {{--<form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">--}}
                        {{--{{ csrf_field() }}--}}

                        {{--<div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">--}}
                            {{--<label for="email" class="col-md-4 control-label">E-Mail Address</label>--}}

                            {{--<div class="col-md-6">--}}
                                {{--<input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>--}}

                                {{--@if ($errors->has('email'))--}}
                                    {{--<span class="help-block">--}}
                                        {{--<strong>{{ $errors->first('email') }}</strong>--}}
                                    {{--</span>--}}
                                {{--@endif--}}
                            {{--</div>--}}
                        {{--</div>--}}

                        {{--<div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">--}}
                            {{--<label for="password" class="col-md-4 control-label">Password</label>--}}

                            {{--<div class="col-md-6">--}}
                                {{--<input id="password" type="password" class="form-control" name="password" required>--}}

                                {{--@if ($errors->has('password'))--}}
                                    {{--<span class="help-block">--}}
                                        {{--<strong>{{ $errors->first('password') }}</strong>--}}
                                    {{--</span>--}}
                                {{--@endif--}}
                            {{--</div>--}}
                        {{--</div>--}}

                        {{--<div class="form-group">--}}
                            {{--<div class="col-md-6 col-md-offset-4">--}}
                                {{--<div class="checkbox">--}}
                                    {{--<label>--}}
                                        {{--<input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me--}}
                                    {{--</label>--}}
                                {{--</div>--}}
                            {{--</div>--}}
                        {{--</div>--}}

                        {{--<div class="form-group">--}}
                            {{--<div class="col-md-8 col-md-offset-4">--}}
                                {{--<button type="submit" class="btn btn-primary">--}}
                                    {{--Login--}}
                                {{--</button>--}}

                                {{--<a class="btn btn-link" href="{{ route('password.request') }}">--}}
                                    {{--Forgot Your Password?--}}
                                {{--</a>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</form>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}
{{--</div>--}}
{{--@endsection--}}

<link rel="stylesheet" href="backend/app/styles/css/style.css">

{{--<body>--}}
{{--<hgroup>--}}
    {{--<h1>LLC-TECHNOLOGY</h1>--}}
{{--</hgroup>--}}

{{--<form role="form" method="POST" action="{{ route('login') }}">--}}
    {{--{{ csrf_field() }}--}}

    {{--<div class="group">--}}
        {{--<input type="email" name="email" value="{{ old('email') }}" required autofocus>--}}
            {{--<span class="highlight"></span><span class="bar"></span>--}}
        {{--<label>Email</label>--}}

        {{--@if ($errors->has('email'))--}}
            {{--<span class="help-block">--}}
                    {{--<strong>{{ $errors->first('email') }}</strong>--}}
            {{--</span>--}}
        {{--@endif--}}
    {{--</div>--}}
    {{--<div class="group">--}}
        {{--<input type="password" name="password" required>--}}
        {{--<span class="highlight"></span><span class="bar"></span>--}}
        {{--<label>Password</label>--}}

        {{--@if ($errors->has('password'))--}}
            {{--<span class="help-block">--}}
                    {{--<strong>{{ $errors->first('password') }}</strong>--}}
                {{--</span>--}}
        {{--@endif--}}
    {{--</div>--}}
    {{--<button type="submit" class="button buttonBlue">Login--}}
        {{--<div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>--}}
    {{--</button>--}}
{{--</form>--}}


{{--</body>--}}



<body class="align">

<div class="grid">

    <form action="{{ route('login') }}" role="form" method="POST" class="form login">

        {{ csrf_field() }}
        <header class="login__header">
            <h3 class="login__title">Login</h3>
        </header>

        <div class="login__body">
            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                <div class="form__field">
                    <input type="email" placeholder="Email" name="email" value="{{ old('email') }}" required autofocus>
                    @if ($errors->has('email'))
                        <br /><br />
                        <span class="help-block">
                            <strong style="color: red;">{{ $errors->first('email') }}</strong><br /><br />
                        </span>
                    @endif
                </div>
            </div>
            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                <div class="form__field">
                    <input type="password" placeholder="Password" name="password" required>
                    <br />
                    @if ($errors->has('password'))
                        <span class="help-block">
                           <strong style="color: red;">{{ $errors->first('password') }}</strong><br /><br />
                        </span>
                    @endif
                </div>
            </div>
            <br />
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                </label>
            </div>
        </div>

        <footer class="login__footer">
            <input type="submit" value="Login">
            <p><span class="icon icon--info">?</span>
                <a class="btn btn-link" href="{{ route('password.request') }}">
                    Forgot Your Password?
                </a>
            </p>
        </footer>

    </form>

</div>

</body>