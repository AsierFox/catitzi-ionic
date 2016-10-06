angular.module('controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('ChatsCtrl', function($scope, $http, xml2jsonService) {

    $scope.cats = [];
    $scope.getCats = getCats;

    $scope.$on("$ionicView.enter", function() {
        getCats();
    });

    function getCats() {
        $http
            .get(CATS_API)
            .then(function(res) {
                var xml = xml2jsonService.parseXML(res.data);
                var cats = JSON.parse(xml2jsonService.xml2json(xml, ''));

                $scope.cats = cats.response.data.images.image;
            });
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http) {

    $scope.quote = {};
    $scope.getQuote = getQuote;

    $scope.$on("$ionicView.enter", function() {
        getQuote();
    });

    function getQuote() {
        $http
            .get(QUOTES_API)
            .then(function(res) {
                $scope.quote = res.data;
            });
    }
});
