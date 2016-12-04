'use strict';

app.controller('LoginController', function ($scope) {

});

app.controller('LogoutController', function ($scope, $location) {
    alert('logoutttttttt');
    localStorage.removeItem(userId);
    $location.path('/adminsite/login')
});