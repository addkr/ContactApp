angular.module('starter.controllers', [])

.controller('addCtrl', function($scope, $ionicPopup, $state, $timeout){
    
    $scope.accept = function() {
        
        var json; var indexTab = []; var x = 0; var id;        
        var ht = new XMLHttpRequest();
            ht.onreadystatechange = function(){
            if(ht.readyState == 4){
                var response = ht.responseText;
                json = JSON.parse(response);
                $scope.json = json;
                            
            }
        }
            $scope.json.forEach(function(Id){
                    x++;                    
                    indexTab[x-1] = $scope.json[x-1].Id;
                })
            for(var i = 0 ; i <= indexTab.length ; i++){
            if(i+1 == indexTab[i]){                
            }
            else{
                id = i+1;
                break;
            }
        }
        var contactNumber = document.getElementById('nr');
        var contactName = document.getElementById('name');
        var record = {Name:contactName.value, Number:contactNumber.value,Id:id};
        var newJSON = JSON.stringify(record);
        ht.open("POST","http://localhost:34500/api/Contacts",true);        
        ht.setRequestHeader("Content-Type", "application/json");
        ht.send(newJSON);  
        $timeout(callAtTimeout, 500);

        function callAtTimeout() {
            
                $state.go('app.main');
                
             
    }   
    }
   
})

 
.controller('myCtrl', function($scope, $ionicPopup, $state, $timeout, $rootScope){
    
      var refresh = function () {
             var ht = new XMLHttpRequest();
                    ht.onreadystatechange = function(){
                    if(ht.readyState == 4){
                    var response = ht.responseText;
                    var json = JSON.parse(response);
                    $scope.json = json;
                    
                    }
                    }
                    ht.open("GET","http://localhost:34500/api/Contacts");
                    ht.send();       
      }
        
                    var ht = new XMLHttpRequest();
                    ht.onreadystatechange = function(){
                    if(ht.readyState == 4){
                    var response = ht.responseText;
                    var json = JSON.parse(response);
                    $scope.json = json;
                    
                    }
                    }
                    ht.open("GET","http://localhost:34500/api/Contacts");
                    ht.send();
    
        //ikonki edycji i usuwania kontaktu
        $scope.onContacts = function () {
            $scope.onEdit = false;
            $scope.onDelete = false;
        }
    
        $scope.edit = function (onEdit) {
           $scope.onEdit = true;  $scope.onDelete = false;
           
        }
    
    
        $scope.delete = function(onDelete){
          $scope.onDelete = true;  $scope.onEdit = false;
          
        } 
        
        
    
        
        // popup DELETE
        $scope.clear = function () {
        var deletePopup = $ionicPopup.show({
            template: '<input type="text">',
            title: 'Are you sure to delete the contact?',
            scope: $scope,
            
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-assertive'
                } , {
                    text: '<b>Delete</b>',
                    type: 'button-balanced',
                    onTap: function(e) {
                    var ht = new XMLHttpRequest();                   
                    ht.open("DELETE","http://localhost:34500/api/Contacts/",true);
                    ht.setRequestHeader("Content-Type", "application/json");
                    ht.send(null);
                    
                }
        }      
                
                
                ]
        });
        deletePopup.then(function(res){
                                console.log('Tapped',res);
                                });
        
    }

        
})

.controller('contactsCtrl', function($scope, $state, $timeout, $ionicPopup , $rootScope){

    // usuwanie i edytowanie kontaktów
    
        $scope.onItem = function (item) {
            
            var ht = new XMLHttpRequest();
            if($scope.onDelete==true){
                var deletePopup = $ionicPopup.show({
            scope: $scope,
            
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-assertive'
                } , {
                    text: '<b>Delete</b>',
                    type: 'button-balanced',
                    onTap: function(e) {
                    var ht = new XMLHttpRequest();                   
                    ht.open("DELETE","http://localhost:34500/api/Contacts/"+item.Id+"",true);
                    ht.send();     
                    
                }
        }      
                
                
                ]
        });
        deletePopup.then(function(res){
                                console.log('Tapped',res);
                                });
        
    }
                
                
            
            else if($scope.onEdit==true){
                $rootScope.item = item;                
                $state.go('app.edit', item );
                
            }
        
        
        }
        
        $scope.sendEdit = function (item) {
                
                var ht = new XMLHttpRequest();
                var number = document.getElementById('editNumber');
                var name = document.getElementById('editName');
                var record = {Name:name.value, Number:number.value,Id:parseInt(item.Id)};
                var newJSON = JSON.stringify(record);
                    console.log(newJSON);
                    ht.open("PUT","http://localhost:34500/api/Contacts/"+item.Id,true);
                    ht.setRequestHeader("Content-Type", "application/json");
                    ht.send(newJSON);
        
        }
        
        
       
});