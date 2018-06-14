angular.module('todo-ui', ['ngResource'])
.factory('Todo', function($resource) {
    return $resource('http://todo-api/todos/:id', {id: '@id'},
    {get: {method: 'GET', isArray: true},
    create: {method: 'POST'},
    update: {method: 'PUT'},
    delete: {method: 'DELETE'}});
})
.controller('TodoController', function($scope, Todo) {
    $scope.todoList = [];
    $scope.newTodo = '';
    Todo.get().$promise.then(function(todos){
        $scope.todoList = todos;
    });

    $scope.createTodo = function(todoItem) {
        Todo.create({
            todo: todoItem,
            complete: false
        }).$promise.then(function(todo){
            $scope.todoList.push(todo);
            $scope.newTodo = '';
        });
    };
    $scope.updateComplete = function(todo) {
        Todo.update(todo.id, todo).$promise.then(function(todo){
            // update values into array
            for (var i = 0; i < $scope.todoList.length; i++) {
                if ($scope.todoList[i].id === todo.id) {
                    $scope.todoList[i] = todo;
                    break;
                }
            }
        });
    };
    $scope.deleteTodo = function(id) {
        Todo.delete({id: id}).$promise.then(
            function() {
                // remove from array
                for (var i = 0; i < $scope.todoList.length; i++) {
                    if ($scope.todoList[i].id === id) {
                        $scope.todoList.splice(i, 1);
                        break;
                    }
                }
            }
        );
    }
});
