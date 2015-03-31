var app = angular.module("OnlineUniversity", []);

app.controller("OnlineUniversityController", function ($scope, $http) {
    $scope.edited = { };

    $scope.newCourse = { };

    $http.get('/api/course')
        .success(function (response) {
            $scope.crses = response;
        });

    $scope.addDialog = function () {
        $("#createCourse").modal("show");
    };

    $scope.addCourse = function (newCourse) {
        var obj = {
            name: newCourse.name,
            category: newCourse.category,
            dateCreated: newCourse.dateCreated,
            description: newCourse.description
        };

        $http.post('/api/course', obj)
            .success(function (response) {
                $scope.crses = response;
            });

        $scope.newCourse = { };
    };

    $scope.confirmRemove = function (id) {
        angular.element('#confirm').modal('show')
            .one('click', '#confirmremove', function (e2) {
                $scope.removeCourse(id);
            });
    };

    $scope.removeCourse = function (id) {
        $http.delete('/api/course/' + id)
            .success(function (response) {
                $scope.crses = response;
            });
    };

    $scope.edit = function (id) {
        var currentCourse = $scope.crses[id];

        angular.copy(currentCourse, $scope.edited);

        angular.element('#editCourse').modal('show')
            .one('click', '#confirmedit', function (e2) {
                $http.put('/api/course/' + id, $scope.edited)
                    .success(function (response) {
                        $scope.crses = response;
                    });
            });
    }
});
