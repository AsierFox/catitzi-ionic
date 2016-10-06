angular.module('controllers', [])

.controller('DashCtrl', function($scope, $http) {

    $scope.message = "";

    $scope.$on("$ionicView.enter", function() {
        getMessage();
    });

    function getMessage() {
        $http
            .get(DEVDREAM_MESSAGE)
            .then(function (res) {
                $scope.message = res.data.message;
            });
    }
})

.controller('ChatsCtrl', function($scope, $http, $ionicModal, xml2jsonService) {

    $scope.cats = [];
    $scope.loadMoreCats = loadMoreCats;

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function(cat) {
        $scope.selectedCat = cat;
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    function loadMoreCats(refresh) {
        $http
            .get(CATS_API)
            .then(function(res) {
                var xml = xml2jsonService.parseXML(res.data);
                var cats = JSON.parse(xml2jsonService.xml2json(xml, ''));

                if (refresh) {
                    $scope.cats = [];
                }
                $scope.cats = $scope.cats.concat(cats.response.data.images.image);

                $scope.$broadcast('scroll.infiniteScrollComplete');
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
