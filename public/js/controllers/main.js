angular.module('todoController', [])

	
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.editData = {};
		$scope.editId = undefined;
		$scope.isEditing = false;
		$scope.loading = true;

		// GET =====================================================================
		 
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		$scope.editToDo = function(id, todo) {
			$scope.editId = id;
			$scope.isEditing = true;
			$scope.formData = todo;
		};



		// CREATE ==================================================================
	
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.first != undefined && $scope.formData.address != undefined && $scope.formData.phone != undefined && $scope.formData.dob != undefined) {
				$scope.loading = true;
				$scope.isEditing = false;
				editId= undefined;
				 
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new user
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};  
						$scope.todos = data; 
					});
			}
		};


		// Edit ==================================================================
		 
		$scope.updateToDo = function() {
		 
			if ($scope.formData.first != undefined && $scope.formData.address != undefined && $scope.formData.phone != undefined && $scope.formData.dob != undefined) {
				$scope.loading = true;
				$scope.formData.id = $scope.editId;
				 
				Todos.update($scope.formData) 

					 
					.success(function(data) {
						$scope.loading = false;
						$scope.isEditing= false;
						$scope.formData = {}; 
						$scope.todos = data; 
					});
			}
		};

		// DELETE ==================================================================
		 
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				 
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; 
				});
		};
	}]);