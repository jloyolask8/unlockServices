(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/js/themes/angular/main.js":[function(require,module,exports){
// Essentials
require('../../../vendor/ui/js/main');

// Layout
require('../../../vendor/layout/js/main');

// Sidebar
require('../../../vendor/sidebar/js/main');

// Owl Carousel
require('../../../vendor/media/js/carousel/main');

// Maps
window.initGoogleMaps = require('../../../vendor/maps/js/google/main');

// CORE
require('./theme-core');
},{"../../../vendor/layout/js/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/main.js","../../../vendor/maps/js/google/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/main.js","../../../vendor/media/js/carousel/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/main.js","../../../vendor/sidebar/js/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/main.js","../../../vendor/ui/js/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/main.js","./theme-core":"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/angular/theme-core.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/angular/angular/app.js":[function(require,module,exports){
(function(){
    'use strict';

    angular.module('app', [
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.utils',
        'ui.jq'
    ]);

    var app = angular.module('app')
        .config(
        [ '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$interpolateProvider',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide, $interpolateProvider) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;

                $interpolateProvider.startSymbol('::');
                $interpolateProvider.endSymbol('::');
            }
        ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/angular/angular/config.router.js":[function(require,module,exports){
(function(){
    'use strict';

    angular.module('app')
        .run([ '$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ])
        .config(
        [ '$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/discover/map-full');

                $stateProvider
                    .state('discover', {
                        abstract: true,
                        url: '/discover',
                        template: '<div ui-view class="ui-view-main" />'
                    })
                    .state('discover.map-full', {
                        url: '/map-full',
                        templateUrl: 'discover/map-full.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l1 sidebar-r1-xs';
                        }]
                    })
                    .state('discover.map-listing-list', {
                        url: '/map-listing-list',
                        templateUrl: 'discover/map-listing-list.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l1 sidebar-r1-xs sidebar-r-48pc-lg sidebar-r-40pc';
                        }]
                    })
                    .state('discover.map-listing-grid', {
                        url: '/map-listing-grid',
                        templateUrl: 'discover/map-listing-grid.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l1 sidebar-r1-xs sidebar-r-48pc-lg sidebar-r-40pc';
                        }]
                    })
                    .state('discover.listing', {
                        url: '/listing',
                        templateUrl: 'discover/listing.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l-sum-13';
                        }]
                    })
                    .state('discover.listing-grid', {
                        url: '/listing-grid',
                        templateUrl: 'discover/listing-grid.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l-sum-13';
                        }]
                    })
                    .state('discover.listing-map', {
                        url: '/listing-map',
                        templateUrl: 'discover/listing-map.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l-sum-13';
                        }]
                    });

                $stateProvider
                    .state('property', {
                        abstract: true,
                        url: '/property',
                        template: '<div ui-view class="ui-view-main" />'
                    })
                    .state('property.map', {
                        url: '/map',
                        templateUrl: 'property/map.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l1 sidebar-r1-xs sidebar-r-48pc-lg sidebar-r-40pc';
                        }]
                    })
                    .state('property.property', {
                        url: '/property',
                        templateUrl: 'property/property.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l1 sidebar-r1-xs sidebar-r-25pc-lg sidebar-r-30pc';
                        }]
                    })
                    .state('property.edit', {
                        url: '/edit',
                        templateUrl: 'property/edit.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l1 sidebar-r1-xs sidebar-r-48pc-lg sidebar-r-40pc';
                        }]
                    });

                $stateProvider
                    .state('map-features', {
                        abstract: true,
                        url: '/map-features',
                        template: '<div ui-view class="ui-view-main" />'
                    })
                    .state('map-features.themes', {
                        url: '/themes',
                        templateUrl: 'map-features/themes.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l1 sidebar-r1-xs';
                        }]
                    })
                    .state('map-features.filters', {
                        url: '/filters',
                        templateUrl: 'map-features/filters.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l1';
                        }]
                    })
                    .state('map-features.markers', {
                        url: '/markers',
                        templateUrl: 'map-features/markers.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2';
                        }]
                    });

                $stateProvider
                    .state('front', {
                        abstract: true,
                        url: '/front',
                        template: '<div ui-view class="ui-view-main" />'
                    })
                    .state('front.home-map', {
                        url: '/home-map',
                        templateUrl: 'front/home-map.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'hide-sidebar top-navbar ls-bottom-footer-fixed';
                        }]
                    })
                    .state('front.home-slider', {
                        url: '/home-slider',
                        templateUrl: 'front/home-slider.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'hide-sidebar ls-bottom-footer-fixed';
                        }]
                    })
                    .state('front.listing', {
                        url: '/listing',
                        templateUrl: 'front/listing.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'hide-sidebar top-navbar ls-bottom-footer-fixed';
                        }]
                    })
                    .state('front.listing-grid', {
                        url: '/listing-grid',
                        templateUrl: 'front/listing-grid.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'hide-sidebar top-navbar ls-bottom-footer-fixed';
                        }]
                    })
                    .state('front.property', {
                        url: '/property',
                        templateUrl: 'front/property.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = 'hide-sidebar top-navbar ls-bottom-footer-fixed';
                        }]
                    });
            }
        ]
    );

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/angular/angular/main.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('AppCtrl', [ '$scope', '$state',
            function ($scope, $state) {

                $scope.app = {
                    settings: {
                        htmlClass: ''
                    }
                };

                $scope.$state = $state;

            } ]);

})();

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/angular/theme-core.js":[function(require,module,exports){
// CUSTOM
require('../../../vendor/real-estate/js/_maps');

// Angular App
require('./angular/app.js');
require('./angular/config.router.js');
require('./angular/main.js');

// Directives
require('../../../vendor/ui/js/angular/main');
require('../../../vendor/layout/js/angular/main');
require('../../../vendor/sidebar/js/angular/main');
require('../../../vendor/maps/js/angular/_google-maps');
require('../../../vendor/media/js/angular/main');
},{"../../../vendor/layout/js/angular/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/main.js","../../../vendor/maps/js/angular/_google-maps":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/angular/_google-maps.js","../../../vendor/media/js/angular/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/angular/main.js","../../../vendor/real-estate/js/_maps":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/real-estate/js/_maps.js","../../../vendor/sidebar/js/angular/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/angular/main.js","../../../vendor/ui/js/angular/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/main.js","./angular/app.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/angular/angular/app.js","./angular/config.router.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/angular/angular/config.router.js","./angular/main.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/angular/angular/main.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_gridalicious.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkGridalicious = function () {

        if (! this.length) return;

        this.gridalicious({
            gutter: this.data('gutter') || 15,
            width: this.data('width') || 370,
            selector: '> div',
            animationOptions: {
                complete: function () {
                    $(window).trigger('resize');
                }
            }
        });

    };

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).tkGridalicious();
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_isotope.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkIsotope = function () {

        if (! this.length) return;

        this.isotope({
            layoutMode: this.data('layoutMode') || "packery",
            itemSelector: '.item'
        });

        this.isotope('on', 'layoutComplete', function(){
            $(window).trigger('resize');
        });

    };

    $(function(){

        setTimeout(function () {
            $('[data-toggle="isotope"]').each(function () {
                $(this).tkIsotope();
            });
        }, 300);

        $(document).on('domChanged', function(){
            $('[data-toggle="isotope"]').each(function(){
                $(this).isotope();
            });
        });

    });

})(jQuery);

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_scrollable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('./_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkScrollable = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            horizontal: false
        }, options);

        var nice = this.niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: settings.horizontal
        });

        if (! settings.horizontal) return;

        var _super = nice.getContentSize;

        nice.getContentSize = function () {
            var page = _super.call(nice);
            page.h = nice.win.height();
            return page;
        };

    };

    $('[data-scrollable], .st-content-inner').tkScrollable();

    $('[data-scrollable-h]').each(function () {

        $(this).tkScrollable({ horizontal: true });

    });

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            $('[data-scrollable], [data-scrollable-h], .st-content-inner').getNiceScroll().resize();
        }, 100);
    });

}(jQuery));
},{"./_skin":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_sidebar-pc.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkSidebarSizePcDemo = function(){

        var t, spc_demo = this;

        if (! spc_demo.length) return;

        $(document)
            .on('sidebar.show', function(){
                $('#pc-open').prop('disabled', true);
            })
            .on('sidebar.hidden', function(){
                $('#pc-open').prop('disabled', false);
            });

        spc_demo.on('submit', function (e) {
            e.preventDefault();
            var s = $('.sidebar'), ve = $('#pc-value'), v = ve.val();
            ve.blur();
            if (! v.length || v < 25) {
                v = 25;
                ve.val(v);
            }
            s[ 0 ].className = s[ 0 ].className.replace(/sidebar-size-([\d]+)pc/ig, 'sidebar-size-' + v + 'pc');
            sidebar.open('sidebar-menu');
            clearTimeout(t);
            t = setTimeout(function () {
                sidebar.close('sidebar-menu');
            }, 5000);
        });

    };

    $('[data-toggle="sidebar-size-pc-demo"]').tkSidebarSizePcDemo();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skins.js":[function(require,module,exports){
var asyncLoader = require('./_async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin"),
            file = $.cookie("skin-file");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + file + '.min.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        $.cookie("skin-file", $(this).data('file'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"./_async":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_async.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/_gridalicious.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'gridalicious') {
                        $timeout(function(){
                            el.tkGridalicious();
                        }, 100);
                    }
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/_isotope.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'isotope') {
                        $timeout(function(){
                            el.tkIsotope();
                        }, 100);
                    }
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/_scrollable.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('scrollable', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el) {
                    el.tkScrollable();
                }
            };
        } ])
        .directive('scrollableH', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el) {
                    el.tkScrollable({ horizontal: true });
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/_sidebar-pc.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'sidebar-size-pc-demo') {
                        el.tkSidebarSizePcDemo();
                    }
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/main.js":[function(require,module,exports){
require('./_scrollable');
require('./_isotope');
require('./_gridalicious');
require('./_sidebar-pc');
},{"./_gridalicious":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/_gridalicious.js","./_isotope":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/_isotope.js","./_scrollable":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/_scrollable.js","./_sidebar-pc":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/angular/_sidebar-pc.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_breakpoints.js","./_gridalicious.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_gridalicious.js","./_isotope":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_isotope.js","./_scrollable.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_scrollable.js","./_sidebar-pc":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_sidebar-pc.js","./_skins":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skins.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/angular/_google-maps.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle !== 'google-maps') return;

                    el.tkGoogleMap();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/_edit.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var find = function (mapData, location, marker, markerData) {

        var eventData = $.extend({}, {marker: marker}, markerData, mapData),
            state = '',
            country = '',
            address = '';

        mapData.container.gmap('search', {'location': location}, function (results, status) {

            if (status === 'OK') {
                address = results[ 0 ].formatted_address;
                $.each(results[ 0 ].address_components, function (i, v) {
                    if (v.types[ 0 ] == "administrative_area_level_1" || v.types[ 0 ] == "administrative_area_level_2") {
                        state = v.long_name;
                    } else if (v.types[ 0 ] == "country") {
                        country = v.long_name;
                    }
                });
                eventData = $.extend({}, eventData, {state: state, country: country, address: address});
            }

            $(document).trigger('map.marker.find', eventData);

        });

    };

    var bindFind = function(marker, markerData, data) {

        if (typeof markerData.open !== 'undefined' && markerData.open === true) {
            find(data, markerData.latLng, marker, markerData);
        }

        google.maps.event.addListener(marker, 'dragend', function (e) {
            find(data, e.latLng, this, markerData);
        });

        google.maps.event.addListener(marker, 'click', function (e) {
            find(data, e.latLng, this, markerData);
        });

    };

    $(document).on('map.init', function (event, data) {

        if (data.container.data('id') == 'map-edit') {

            var markers = data.container.gmap('get', 'markers'),
                markerOptions = {
                    "draggable": true
                },
                markerData = {
                    "open": true,
                    "template": "tpl-edit",
                    "icon": "building-01"
                };

            google.maps.event.addListener(data.map, 'click', function (event) {

                markerData = $.extend({}, markerData, {"latLng": event.latLng});

                var marker = data.addMarker(markers.length, markerData, markerOptions);

                bindFind(marker, markerData, data);

            });

            google.maps.event.addListener(data.iw.window, 'domready', function () {

                $('#map-delete-marker').on('click', function (e) {
                    e.stopPropagation();
                    var id = $(this).data('id');
                    data.iw.close(id);
                    markers[ id ].setMap(null);
                });

            });

            $.each(markers, function(i, marker){

                var markerData = marker.get('content');

                bindFind(marker, markerData, data);

            });

        }

    });

    $(document).on('map.marker.find', function (event, data) {

        data.marker.setTitle(data.address);

        if (data.iw.window.isOpen === false) return;

        data.iw.open(data.marker.get('id'), data);

    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/_filters.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    };

    var filter = function(data){

        data.iw.close();
        data.container.gmap('set', 'bounds', null);

        var filters = [];

        $('#radios :checked').each(function (i, checkbox) {
            filters.push($(checkbox).val());
        });

        if (filters.length) {
            data.container.gmap('find', 'markers', {
                'property': 'tags',
                'value': filters,
                'operator': 'OR'
            }, function (marker, found) {
                if (found) {
                    data.container.gmap('addBounds', marker.position);
                }
                marker.setVisible(found);
            });
        } else {
            $.each(data.container.gmap('get', 'markers'), function (i, marker) {
                data.container.gmap('addBounds', marker.position);
                marker.setVisible(false);
            });
        }

    };

    $(document).on('map.init', function (event, data) {

        if (data.container.data('filters') === true) {

            var map = data,
                markers = data.container.gmap('get', 'markers'),
                tags = [],
                templateId = data.container.data('filtersTemplate') || '#map-filters-template';

            $.each(markers, function(i, marker){
                $.each(marker.tags, function(i, tag){
                    tags.push(tag);
                });
            });

            tags = arrayUnique(tags);

            var source = $(templateId).html();
            var template = Handlebars.compile(source);
            var $el = $(template({ tags: tags }));

            $el.insertAfter(data.container);

            var skin = require('../../../layout/js/_skin')();

            $('[data-scrollable]', $el).niceScroll({
                cursorborder: 0,
                cursorcolor: config.skins[ skin ][ 'primary-color' ],
                horizrailenabled: false
            });

            setTimeout(function(){
                filter(data);
            }, 100);

            $('body').on('click', '#radios :checkbox', function(){
                filter(data);
            });

        }

    });

})(jQuery);
},{"../../../layout/js/_skin":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/_library.js":[function(require,module,exports){
module.exports = function () {

    var centerWindow = function (container, map, data) {

        if (data.lat && data.lng) {

            container.gmap('option', 'center', new google.maps.LatLng(data.lat, data.lng));

            map.panBy(0, -170);

            return true;

        }
        return false;
    };

    var centerMap = function (container, data) {

        if (data && data.length === 2) {

            container.gmap('option', 'center', new google.maps.LatLng(data[ 0 ], data[ 1 ]));

            return true;

        }
        return false;
    };

    var resize = function (container, map, windowData, mapData) {

        if (typeof google == 'undefined') return;

        google.maps.event.trigger(map, 'resize');

        if (! centerMap(container, mapData)) centerWindow(container, map, windowData);

    };

    return {
        centerWindow: centerWindow,
        centerMap: centerMap,
        resize: resize
    };

};
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/main.js":[function(require,module,exports){
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
    'callback=initGoogleMaps';
    document.body.appendChild(script);
}

window.onload = loadScript;

function initScripts() {
    var $scripts = [
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.extensions.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.services.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.microdata.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.microformat.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.overlays.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.rdfa.js",
        "js/plugins/maps_google/jquery-ui-map/addons/infobox_packed.js",
        "js/plugins/maps_google/jquery-ui-map/addons/markerclusterer.min.js"
    ];

    $.each($scripts, function (k, v) {
        if ($('[src="' + v + '"]').length) return true;
        var scriptNode = document.createElement('script');

        scriptNode.src = v;
        $('head').prepend($(scriptNode));
    });

    $.extend($.ui.gmap.prototype, {
        pagination: function (prop, mapData) {
            var source = $("#map-pagination").html();
            var template = Handlebars.compile(source);
            var $el = $(template());

            var self = this, i = 0;
            prop = prop || 'title';
            self.set('pagination', function (a, b) {
                if (a) {
                    i = i + b;
                    var m = self.get('markers')[ i ];
                    mapData.iw.open(i, m.get('content'));
                    $el.find('.display').text(m[ prop ]);
                    self.get('map').panTo(m.getPosition());
                }
            });
            self.get('pagination')(true, 0);
            $el.find('.back-btn').click(function (e) {
                e.preventDefault();
                self.get('pagination')((i > 0), - 1, this);
            });
            $el.find('.fwd-btn').click(function (e) {
                e.preventDefault();
                self.get('pagination')((i < self.get('markers').length - 1), 1, this);
            });
            self.addControl($el, google.maps.ControlPosition[ mapData.options.paginationPosition ]);
        }
    });
}

var library = require('./_library.js')();

// Holds google maps styles
var styles = {
    "light-grey": require('./styles/_light-grey.js'),
    "light-monochrome": require('./styles/_light-monochrome.js'),
    "cool-grey": require('./styles/_cool-grey.js'),
    "blue-gray": require('./styles/_blue-gray.js'),
    "paper": require('./styles/_paper.js'),
    "apple": require('./styles/_apple.js'),
    "light-green": require('./styles/_light-green.js'),
    "lemon-tree": require('./styles/_lemon-tree.js'),
    "clean-cut": require('./styles/_clean-cut.js'),
    "nature": require('./styles/_nature.js')
};

// Process the infoWindow content via Handlebars templates
var infoWindowContent = function (marker) {
    var source = $("#" + marker.template).html();
    var template = Handlebars.compile(source);
    return template(marker);
};

/**
 * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
 */
$.fn.tkGoogleMap = function () {

    if (! this.length) return;

    var container = this;

    if (typeof google == 'undefined' || typeof InfoBox == 'undefined') {
        setTimeout(function(){
            container.tkGoogleMap();
        }, 200);

        return;
    }

    var options = {
        mapZoomPosition: container.data('zoomPosition') || "TOP_LEFT",
        mapZoom: container.data('zoom') || 16,
        mapStyle: container.data('style') || "light-grey",
        mapType: container.data('type') || "ROADMAP",
        file: container.data('file'),
        center: container.data('center') ? container.data('center').split(",") : false,
        pagination: container.data('pagination') || false,
        paginationPosition: container.data('paginationPosition') || 'TOP_LEFT'
    };

    var mapData;

    // provide a default object for data collected from the currently opened infoWindow
    var infoWindowData = {
        lat: false,
        lng: false
    };

    var infoWindowOpen = function (i, marker) {

        var markerInst = container.gmap('get', 'markers')[ i ];

        infoWindow.setContent(infoWindowContent(marker));
        infoWindow.open(map, markerInst);
        infoWindow.isOpen = i;

        infoWindowData = {
            lat: marker.latitude,
            lng: marker.longitude
        };
    };

    var infoWindowClose = function (i) {
        if (typeof i == 'undefined') {
            infoWindow.close();
            infoWindow.isOpen = false;
            return true;
        }
        if (typeof infoWindow.isOpen != 'undefined' && infoWindow.isOpen === i) {
            infoWindow.close();
            infoWindow.isOpen = false;
            return true;
        }
        return false;
    };

    /* InfoBox */
    var infoWindow = new InfoBox({
        maxWidth: 240,
        alignBottom: true
    });

    var addMarker = function (i, marker, options) {
        var iconBase = 'images/markers/';
        var position = typeof marker.latLng !== 'undefined' ? marker.latLng : false;
        if (! position && typeof marker.latitude !== 'undefined' && typeof marker.longitude !== 'undefined') position = new google.maps.LatLng(marker.latitude, marker.longitude);
        if (! position) return false;

        var markerOptions = {
            "id": i,
            "position": position,
            "draggable": true,
            "icon": iconBase + marker.icon + ".png"
        };

        if (typeof options == 'object') markerOptions = $.extend({}, markerOptions, options);

        var open = typeof marker.open !== 'undefined' && marker.open === true;

        container.gmap('addMarker', markerOptions);

        var markerInst = container.gmap('get', 'markers')[ i ];

        markerInst.setTitle(marker.title);

        google.maps.event.addListener(markerInst, 'click', function () {
            if (! infoWindowClose(i)) {
                infoWindowOpen(i, marker);
                library.centerWindow(container, map, infoWindowData);
            }
        });

        google.maps.event.addListener(markerInst, 'dragend', function () {
            var lat = markerInst.getPosition().lat();
            var lng = markerInst.getPosition().lng();
            console.log('"latitude": ' + lat + ', "longitude": ' + lng);
        });

        var markerData = $.extend({}, marker, {
            "id": i,
            "latLng": new google.maps.LatLng(marker.latitude, marker.longitude)
        });

        markerInst.set('content', markerData);

        if (open) infoWindowOpen(i, marker);

        return markerInst;
    };

    container.gmap(
        {
            'zoomControl': true,
            'zoomControlOptions': {
                'style': google.maps.ZoomControlStyle.SMALL,
                'position': google.maps.ControlPosition[ options.mapZoomPosition ]
            },
            'panControl': false,
            'streetViewControl': false,
            'mapTypeControl': false,
            'overviewMapControl': false,
            'scrollwheel': false,
            'mapTypeId': google.maps.MapTypeId[ options.mapType ],
            'zoom': options.mapZoom,
            'styles': styles[ options.mapStyle ]
        })
        .bind('init', function () {

            mapData = {
                container: container,
                map: map,
                options: options,
                addMarker: addMarker,
                library: library,
                iw: {
                    data: infoWindowData,
                    window: infoWindow,
                    content: infoWindowContent,
                    open: infoWindowOpen,
                    close: infoWindowClose
                }
            };

            if (options.file) {

                $.getJSON(options.file, function (data) {

                    $.each(data.markers, function (i, marker) {
                        var o = typeof marker.options !== 'undefined' ? marker.options : {};
                        addMarker(i, marker, o);
                    });

                    google.maps.event.addListenerOnce(map, 'idle', function () {

                        library.resize(container, map, infoWindowData, options.center);

                        if (options.pagination) {
                            container.gmap('pagination', 'title', mapData);
                        }

                    });
                });

            }
            else {
                library.centerMap(container, options.center);
            }

            google.maps.event.addListenerOnce(map, 'idle', function () {

                $(document).trigger('map.init', mapData);

            });

            google.maps.event.addListener(infoWindow, 'domready', function () {
                var iw = $('.infoBox');
                infoWindow.setOptions({
                    pixelOffset: new google.maps.Size(- Math.abs(iw.width() / 2), - 45)
                });
                setTimeout(function(){

                    $('.cover', iw).each(function(){
                        $(this).tkCover();
                    });

                }, 200);
            });
        });

    var map = container.gmap('get', 'map');

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            library.resize(container, map, infoWindowData, options.center);
        }, 100);
    });

    // handle maps in collapsibles
    $('.collapse').on('shown.bs.collapse', function(){
        if ($(container, this).length) {
            library.resize(container, map, infoWindowData, options.center);
        }
    });

};

module.exports = function () {
    initScripts();

    /*
     * Clustering
     */
    if ($('#google-map-clustering').length) {
        // We need to bind the map with the "init" event otherwise bounds will be null
        $('#google-map-clustering').gmap({'zoom': 2, 'disableDefaultUI': true}).bind('init', function (evt, map) {
            var bounds = map.getBounds();
            var southWest = bounds.getSouthWest();
            var northEast = bounds.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();

            function openInfoWindow() {
                $('#google-map-clustering').gmap('openInfoWindow', {content: 'Hello world!'}, this);
            }

            for (var i = 0; i < 1000; i ++) {
                var lat = southWest.lat() + latSpan * Math.random();
                var lng = southWest.lng() + lngSpan * Math.random();
                $('#google-map-clustering').gmap('addMarker', {
                    'position': new google.maps.LatLng(lat, lng)
                }).click(openInfoWindow);
            }

            $('#google-map-clustering').gmap('set', 'MarkerClusterer', new MarkerClusterer(map, $(this).gmap('get', 'markers')));
        });
    }

};

(function($){
    "use strict";

    $(document).on('map.init', function (event, data) {

        var styleTpl = $('#map-style-switch'),
            toggleStyleWrapper = $('[data-toggle="map-style-switch"]');

        if (styleTpl.length && toggleStyleWrapper.length) {

            var target = $(toggleStyleWrapper.data('target'));

            if (! target) return;

            if (data.container.is(target)) {

                var s = styleTpl.html();
                var t = Handlebars.compile(s);

                toggleStyleWrapper.html(t({
                    styles: styles
                }));

                $('select', toggleStyleWrapper).val(data.options.mapStyle);

                if (typeof $.fn.selectpicker != 'undefined') {

                    $('.selectpicker', toggleStyleWrapper).each(function () {
                        $(this).selectpicker({
                            width: $(this).data('width') || '100%'
                        });
                    });

                }

                var skin = require('../../../layout/js/_skin')();

                $('[data-scrollable]', toggleStyleWrapper).niceScroll({
                    cursorborder: 0,
                    cursorcolor: config.skins[ skin ][ 'primary-color' ],
                    horizrailenabled: false
                });

                $('select', toggleStyleWrapper).on('change', function () {
                    var style = typeof styles[ $(this).val() ] ? styles[ $(this).val() ] : false;
                    if (! style) return;

                    target.gmap('option', 'styles', style);
                });

            }

        }

    });

    $('[data-toggle="google-maps"]').each(function () {

        $(this).tkGoogleMap();

    });

})(jQuery);

require('./_edit');
require('./_filters');
},{"../../../layout/js/_skin":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js","./_edit":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/_edit.js","./_filters":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/_filters.js","./_library.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/_library.js","./styles/_apple.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_apple.js","./styles/_blue-gray.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_blue-gray.js","./styles/_clean-cut.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_clean-cut.js","./styles/_cool-grey.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_cool-grey.js","./styles/_lemon-tree.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_lemon-tree.js","./styles/_light-green.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_light-green.js","./styles/_light-grey.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_light-grey.js","./styles/_light-monochrome.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_light-monochrome.js","./styles/_nature.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_nature.js","./styles/_paper.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_paper.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_apple.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [ {"color": "#f7f1df"} ]
}, {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [ {"color": "#d0e3b4"} ]
}, {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi.business",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi.medical",
    "elementType": "geometry",
    "stylers": [ {"color": "#fbd3da"} ]
}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [ {"color": "#bde6ab"} ]}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffe15f"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#efd151"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffffff"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "black"} ]
}, {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#cfb2db"} ]
}, {"featureType": "water", "elementType": "geometry", "stylers": [ {"color": "#a2daf2"} ]} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_blue-gray.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "water",
    "stylers": [ {"visibility": "on"}, {"color": "#b5cbe4"} ]
}, {"featureType": "landscape", "stylers": [ {"color": "#efefef"} ]}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"color": "#83a5b0"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {"color": "#bdcdd3"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"} ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {"color": "#e3eed3"} ]
}, {
    "featureType": "administrative",
    "stylers": [ {"visibility": "on"}, {"lightness": 33} ]
}, {"featureType": "road"}, {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [ {"visibility": "on"}, {"lightness": 20} ]
}, {}, {"featureType": "road", "stylers": [ {"lightness": 20} ]} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_clean-cut.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [ {"lightness": 100}, {"visibility": "simplified"} ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"visibility": "on"}, {"color": "#C6E2FF"} ]
}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [ {"color": "#C5E3BF"} ]}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#D1D1B8"} ]
} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_cool-grey.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "transit", "elementType": "labels", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "water", "elementType": "labels", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [ {"visibility": "off"} ]
}, {"stylers": [ {"hue": "#00aaff"}, {"saturation": - 100}, {"gamma": 2.15}, {"lightness": 12} ]}, {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [ {"visibility": "on"}, {"lightness": 24} ]
}, {"featureType": "road", "elementType": "geometry", "stylers": [ {"lightness": 57} ]} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_lemon-tree.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "off"} ]
}, {
    "featureType": "landscape.natural",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "on"} ]
}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [ {"hue": "#ffe94f"}, {"saturation": 100}, {"lightness": 4}, {"visibility": "on"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"hue": "#ffe94f"}, {"saturation": 100}, {"lightness": 4}, {"visibility": "on"} ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"hue": "#333333"}, {"saturation": - 100}, {"lightness": - 74}, {"visibility": "off"} ]
} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_light-green.js":[function(require,module,exports){
module.exports = [ {"stylers": [ {"hue": "#baf4c4"}, {"saturation": 10} ]}, {
    "featureType": "water",
    "stylers": [ {"color": "#effefd"} ]
}, {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [ {"visibility": "on"} ]
}, {"featureType": "road", "elementType": "all", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_light-grey.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"color": "#e9e9e9"}, {"lightness": 17} ]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [ {"color": "#f5f5f5"}, {"lightness": 20} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 17} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 18} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 16} ]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [ {"color": "#f5f5f5"}, {"lightness": 21} ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {"color": "#dedede"}, {"lightness": 21} ]
}, {
    "elementType": "labels.text.stroke",
    "stylers": [ {"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16} ]
}, {
    "elementType": "labels.text.fill",
    "stylers": [ {"saturation": 36}, {"color": "#333333"}, {"lightness": 40} ]
}, {"elementType": "labels.icon", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [ {"color": "#f2f2f2"}, {"lightness": 19} ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#fefefe"}, {"lightness": 20} ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2} ]
} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_light-monochrome.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [ {"hue": "#2c2e33"}, {"saturation": 7}, {"lightness": 19}, {"visibility": "on"} ]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "simplified"} ]
}, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "off"} ]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": 31}, {"visibility": "simplified"} ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": 31}, {"visibility": "on"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": - 2}, {"visibility": "simplified"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": - 90}, {"lightness": - 8}, {"visibility": "simplified"} ]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": 10}, {"lightness": 69}, {"visibility": "on"} ]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": - 78}, {"lightness": 67}, {"visibility": "simplified"} ]
} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_nature.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape",
    "stylers": [ {"hue": "#FFA800"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1} ]
}, {
    "featureType": "road.highway",
    "stylers": [ {"hue": "#53FF00"}, {"saturation": - 73}, {"lightness": 40}, {"gamma": 1} ]
}, {
    "featureType": "road.arterial",
    "stylers": [ {"hue": "#FBFF00"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1} ]
}, {
    "featureType": "road.local",
    "stylers": [ {"hue": "#00FFFD"}, {"saturation": 0}, {"lightness": 30}, {"gamma": 1} ]
}, {
    "featureType": "water",
    "stylers": [ {"hue": "#00BFFF"}, {"saturation": 6}, {"lightness": 8}, {"gamma": 1} ]
}, {
    "featureType": "poi",
    "stylers": [ {"hue": "#679714"}, {"saturation": 33.4}, {"lightness": - 25.4}, {"gamma": 1} ]
} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/styles/_paper.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"}, {"hue": "#0066ff"}, {"saturation": 74}, {"lightness": 100} ]
}, {"featureType": "poi", "elementType": "all", "stylers": [ {"visibility": "simplified"} ]}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"} ]
}, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [ {"visibility": "off"}, {"weight": 0.6}, {"saturation": - 85}, {"lightness": 61} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"visibility": "on"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "road.local", "elementType": "all", "stylers": [ {"visibility": "on"} ]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"} ]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"}, {"color": "#5f94ff"}, {"lightness": 26}, {"gamma": 5.86} ]
} ];
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/angular/_owl.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('owlBasic', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function(){
                        el.tkOwlDefault();
                    }, 200);
                }
            };
        } ])
        .directive('owlMixed', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function(){
                        el.tkOwlMixed();
                    }, 200);
                }
            };
        } ])
        .directive('owlPreview', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function(){
                        el.tkOwlPreview();
                    }, 200);
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/angular/_slick.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('slickBasic', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function(){
                        el.tkSlickDefault();
                    }, 200);
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/angular/main.js":[function(require,module,exports){
require('./_owl');
require('./_slick');
},{"./_owl":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/angular/_owl.js","./_slick":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/angular/_slick.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/main.js":[function(require,module,exports){
require('./owl/main');
require('./slick/_default');
},{"./owl/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/owl/main.js","./slick/_default":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/slick/_default.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/owl/_default.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlDefault = function () {

        if (! this.length) return;

        var c = this;
        c.owlCarousel({
            dots: true,
            items: c.data('items') || 4,
            responsive: {
                1200: {
                    items: c.data('itemsLg') || 4
                },
                992: {
                    items: c.data('itemsMg') || 3
                },
                768: {
                    items: c.data('itemsSm') || 3
                },
                480: {
                    items: c.data('itemsXs') || 2
                },
                0: {
                    items: 1
                }
            },
            rtl: this.data('rtl'),
            afterUpdate: function () {
                $(window).trigger('resize');
            }
        });

    };

    $(".owl-basic").each(function () {
        $(this).tkOwlDefault();
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/owl/_mixed.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlMixed = function () {

        if (! this.length) return;

        this.owlCarousel({
            items: 2,
            nav: true,
            dots: false,
            rtl: this.data('rtl'),
            navText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ],
            responsive: {
                1200: {
                    items: 2
                },
                0: {
                    items: 1
                }
            }
        });

    };

    $(".owl-mixed").tkOwlMixed();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/owl/_preview.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var syncPosition = function (e, target) {
        if (e.namespace && e.property.name === 'items') {
            target.trigger('to.owl.carousel', [e.item.index, 300, true]);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlPreview = function () {

        if (! this.length) return;

        var target = $(this.data('sync')),
            preview = this,
            rtl = this.data('rtl');

        if (! target.length) return;

        this.owlCarousel({
            items: 1,
            slideSpeed: 1000,
            dots: false,
            responsiveRefreshRate: 200,
            rtl: rtl,
            nav: true,
            navigationText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ]
        });

        this.on('change.owl.carousel', function(e){
            syncPosition(e, target);
        });

        target.owlCarousel({
            items: 5,
            responsive: {
                1200: {
                    items: 7
                },
                768: {
                    items: 6
                },
                480: {
                    items: 3
                },
                0: {
                    items: 2
                }
            },
            dots: false,
            nav: true,
            responsiveRefreshRate: 100,
            rtl: rtl,
            afterInit: function (el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        target.on('change.owl.carousel', function(e){
            syncPosition(e, preview);
        });

        target.find('.owl-item').click(function (e) {
            e.preventDefault();
            var item = $(this).data("owl-item");
            preview.trigger("to.owl.carousel", [item.index, 300, true]);
        });

    };

    $(".owl-preview").tkOwlPreview();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/owl/main.js":[function(require,module,exports){
require('./_default');
require('./_mixed');
require('./_preview');
},{"./_default":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/owl/_default.js","./_mixed":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/owl/_mixed.js","./_preview":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/owl/_preview.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/slick/_default.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlickDefault = function () {

        if (! this.length) return;

        if (typeof $.fn.slick == 'undefined') return;

        var c = this;
        
        c.slick({
            dots: true,
            slidesToShow: c.data('items') || 3,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: c.data('itemsLg') || 4
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: c.data('itemsMd') || 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: c.data('itemsSm') || 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: c.data('itemsXs') || 2
                    }
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ],
            rtl: this.data('rtl'),
            onSetPosition: function () {
                $(window).trigger('resize');
            }
        });

        $(document).on('sidebar.shown', function(){
            c.slickSetOption('dots', true, true);
        });

    };

    $(".slick-basic").each(function () {
        $(this).tkSlickDefault();
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/real-estate/js/_maps.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(document).on('map.init', function(event, data) {

        if (data.container.is('#google-fs-realestate')) {

            var container = data.container,
                map = data.map,
                options = data.options,
                iw = data.iw.window;

            var library = require('../../../vendor/maps/js/google/_library.js')();

            $(document).on('sidebar.shown sidebar.hidden', function (event, data) {
                if (data.target == '#sidebar-map' || data.target == "#sidebar-edit") {
                    var position = iw.getPosition(),
                        infoWindowData = {
                            lat: position.lat(),
                            lng: position.lng()
                        };
                    library.resize(container, map, infoWindowData, options.center);
                }
            });

            $(document).on('sidebar.shown', function (event, data) {
                if (data.target == "#sidebar-edit") {
                    $('#toggle-sidebar-edit').addClass('active');
                }
            });

            $(document).on('sidebar.hidden', function (event, data) {
                if (data.target == "#sidebar-edit") {
                    $('#toggle-sidebar-edit').removeClass('active');
                }
            });

        }

    });

})(jQuery);

},{"../../../vendor/maps/js/google/_library.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/_library.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var restore = function () {
            $("html").addClass('show-sidebar');
            $('.sidebar.sidebar-visible-desktop').not(':visible').each(function () {
                var options = sidebar.options($(this));
                sidebar.open($(this).attr('id'), options);
            });
        },
        hide = function () {
            $("html").removeClass('show-sidebar');
            $('.sidebar:visible').each(function () {
                sidebar.close($(this).attr('id'));
            });
        };

    $(window).bind('enterBreakpoint768', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint1024', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar').length) return;
        hide();
    });

    if ($(window).width() <= 480) {
        if (! $('.sidebar').length) return;
        hide();
    }

})(jQuery);

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_collapsible.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarCollapse = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li.dropdown > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('click');
        sidebar.off('mouseleave');
        sidebar.find('.dropdown').off('mouseover');
        sidebar.find('.dropdown').off('mouseout');

        $('body').off('mouseout', '#dropdown-temp .dropdown');

        sidebar.find('ul.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hide.bs.collapse')
            .off('hidden.bs.collapse');

        sidebar.find('#dropdown-temp').remove();

        sidebar.find('.hasSubmenu').removeClass('dropdown')
            .find('> ul').addClass('collapse').removeClass('dropdown-menu submenu-hide submenu-show')
            .end()
            .find('> a').attr('data-toggle', 'collapse').on('click', function(e){
                e.preventDefault();
            });

        sidebar.find('.collapse').on('shown.bs.collapse', function () {
            sidebar.find('[data-scrollable]').getNiceScroll().resize();
        });

        // Collapse
        sidebar.find('.collapse').on('show.bs.collapse', function (e) {
            e.stopPropagation();
            var parents = $(this).parents('ul:first').find('> li.open [data-toggle="collapse"]');
            if (parents.length) {
                parents.trigger('click');
            }
            $(this).closest('.hasSubmenu').addClass("open");
        });

        sidebar.find('.collapse').on('hidden.bs.collapse', function (e) {
            e.stopPropagation();
            $(this).closest('.hasSubmenu').removeClass("open");
        });

        sidebar.find('.collapse').collapse({ toggle: false });

    };

    $('.sidebar[data-type="collapse"]').each(function(){
        $(this).tkSidebarCollapse();
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_dropdown.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarDropdown = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hidden.bs.collapse');

        var nice = sidebar.find('[data-scrollable]').getNiceScroll()[ 0 ];

        nice.scrollstart(function () {
            if (! sidebar.is('[data-type="dropdown"]')) return;
            sidebar.addClass('scrolling');
            sidebar.find('#dropdown-temp > ul > li').empty();
            sidebar.find('#dropdown-temp').hide();
            sidebar.find('.open').removeClass('open');
        });

        nice.scrollend(function () {
            if (! sidebar.is('[data-type="dropdown"]')) return;
            $.data(this, 'lastScrollTop', nice.getScrollTop());
            sidebar.removeClass('scrolling');
        });

        sidebar.find('.hasSubmenu').addClass('dropdown').removeClass('open')
            .find('> ul').addClass('dropdown-menu').removeClass('collapse in').removeAttr('style')
            .end()
            .find('> a').removeClass('collapsed')
            .removeAttr('data-toggle');

        sidebar.find('.sidebar-menu > li.dropdown > a').on('mouseenter', function () {

            var c = sidebar.find('#dropdown-temp');

            sidebar.find('.open').removeClass('open');
            c.hide();

            if (! $(this).parent('.dropdown').is('.open') && ! sidebar.is('.scrolling')) {
                var p = $(this).parent('.dropdown'),
                    t = p.find('> .dropdown-menu').clone().removeClass('submenu-hide');

                if (! c.length) {
                    c = $('<div/>').attr('id', 'dropdown-temp').appendTo(sidebar);
                    c.html('<ul><li></li></ul>');
                }

                c.show();
                c.find('.dropdown-menu').remove();
                c = c.find('> ul > li').css({overflow: 'visible'}).addClass('dropdown open');

                p.addClass('open');
                t.appendTo(c).css({
                    top: p.offset().top - c.offset().top,
                    left: '100%'
                }).show();

                if (sidebar.is('.right')) {
                    t.css({
                        left: 'auto',
                        right: '100%'
                    });
                }
            }
        });

        sidebar.find('.sidebar-menu > li > a').on('mouseenter', function () {

            if (! $(this).parent().is('.dropdown')) {
                var sidebar = $(this).closest('.sidebar');
                sidebar.find('.open').removeClass('open');
                sidebar.find('#dropdown-temp').hide();
            }

        });

        sidebar.find('.sidebar-menu > li > a').on('click', function (e) {
            if ($(this).parent().is('.dropdown')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        sidebar.on('mouseleave', function () {
            $(this).find('#dropdown-temp').hide();
            $(this).find('.open').removeClass('open');
        });

        sidebar.find('.dropdown').on('mouseover', function () {
            $(this).addClass('open').children('ul').removeClass('submenu-hide').addClass('submenu-show');
        }).on('mouseout', function () {
            $(this).children('ul').removeClass('.submenu-show').addClass('submenu-hide');
        });

        $('body').on('mouseout', '#dropdown-temp .dropdown', function () {
            $('.sidebar-menu .open', $(this).closest('.sidebar')).removeClass('.open');
        });

    };

    var transform_dd = function(){

        $('.sidebar[data-type="dropdown"]').each(function(){
            $(this).tkSidebarDropdown();
        });

    };

    var transform_collapse = function(){

        $('.sidebar[data-type="collapse"]').each(function(){
            $(this).tkSidebarCollapse();
        });

    };

    transform_dd();

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar[data-type="dropdown"]').length) return;
        $('.sidebar[data-type="dropdown"]').attr('data-type', 'collapse').attr('data-transformed', true);
        transform_collapse();
    });

    function make_dd() {
        if (! $('.sidebar[data-type="collapse"][data-transformed]').length) return;
        $('.sidebar[data-type="collapse"][data-transformed]').attr('data-type', 'dropdown').attr('data-transformed', true);
        transform_dd();
    }

    $(window).bind('enterBreakpoint768', make_dd);

    $(window).bind('enterBreakpoint1024', make_dd);

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_options.js":[function(require,module,exports){
module.exports = function (sidebar) {
    return {
        "transform-button": sidebar.data('transformButton') === true,
        "transform-button-icon": sidebar.data('transformButtonIcon') || 'fa-ellipsis-h'
    };
};
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_sidebar-menu.js":[function(require,module,exports){
(function ($) {

    var sidebars = $('.sidebar');

    sidebars.each(function () {

        var sidebar = $(this);
        var options = require('./_options')(sidebar);

        if (options[ 'transform-button' ]) {
            var button = $('<button type="button"></button>');

            button
                .attr('data-toggle', 'sidebar-transform')
                .addClass('btn btn-default')
                .html('<i class="fa ' + options[ 'transform-button-icon' ] + '"></i>');

            sidebar.find('.sidebar-menu').append(button);
        }
    });

}(jQuery));
},{"./_options":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_options.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_sidebar-toggle.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#subnav').collapse({'toggle': false});

    function mobilecheck() {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    (function () {

        var defaults = {
                effect: 'st-effect-1',
                duration: 550,
                overlay: false
            },

            containerSelector = '.st-container',

            eventtype = mobilecheck() ? 'touchstart' : 'click',

            getLayoutClasses = function (sidebar, direction) {

                var layoutClasses = sidebar.data('layoutClasses');

                if (! layoutClasses) {
                    var toggleLayout = sidebar.data('toggleLayout');
                    if (typeof toggleLayout == 'string') {
                        layoutClasses = toggleLayout.split(",").join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                        return layoutClasses;
                    }

                    var match = new RegExp('sidebar-' + direction + '(\\S+)', 'ig');
                    layoutClasses = $('html').get(0).className.match(match);
                    if (layoutClasses !== null && layoutClasses.length) {
                        layoutClasses = layoutClasses.join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                    }
                }

                return layoutClasses;

            },

            getSidebarDataOptions = function(sidebar){

                return {
                    effect: sidebar.data('effect'),
                    overlay: sidebar.data('overlay')
                };

            },

            animating = function () {

                if ($('body').hasClass('animating')) return true;
                $('body').addClass('animating');

                setTimeout(function () {
                    $('body').removeClass('animating');
                }, defaults.duration);

                return false;

            },

            reset = function (id, options) {

                var container = $(containerSelector);

                var target = typeof id !== 'undefined' ? '#' + id : container.data('stMenuTarget'),
                    sidebar = $(target);

                if (! sidebar.length) return false;
                if (! sidebar.is(':visible')) return false;
                if (sidebar.hasClass('sidebar-closed')) return false;

                var effect = typeof options !== 'undefined' && options.effect ? options.effect : container.data('stMenuEffect'),
                    direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.hide', eventData);

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .removeClass('active')
                    .closest('li')
                    .removeClass('active');

                $('html').addClass(htmlClass);
                sidebar.addClass(effect);
                container.addClass(effect);

                container.removeClass('st-menu-open st-pusher-overlay');

                setTimeout(function () {
                    $('html').removeClass(htmlClass);
                    if (toggleLayout) $('html').removeClass(layoutClasses);
                    sidebar.removeClass(effect);
                    container.get(0).className = 'st-container'; // clear
                    sidebar.addClass('sidebar-closed').hide();
                    $(document).trigger('sidebar.hidden', eventData);
                }, defaults.duration);

            },

            open = function (target, options) {

                var container = $(containerSelector);

                var sidebar = $(target);
                if (! sidebar.length) return false;

                // on mobile, allow only one sidebar to be open at the same time
                if ($(window).width() < 768 && container.hasClass('st-menu-open')) {
                    return reset();
                }

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .addClass('active')
                    .closest('li')
                    .addClass('active');

                var effect = options.effect,
                    overlay = options.overlay;

                var direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.show', eventData);

                $('html').addClass(htmlClass);
                sidebar.show().removeClass('sidebar-closed');

                container.data('stMenuEffect', effect);
                container.data('stMenuTarget', target);

                sidebar.addClass(effect);
                container.addClass(effect);
                if (overlay) container.addClass('st-pusher-overlay');

                setTimeout(function () {
                    container.addClass('st-menu-open');
                    sidebar.find('[data-scrollable]').getNiceScroll().resize();
                    $(window).trigger('resize');
                }, 25);

                setTimeout(function () {
                    if (toggleLayout) $('html').addClass(layoutClasses);
                    $(document).trigger('sidebar.shown', eventData);
                }, defaults.duration);

            },

            toggle = function (e) {

                e.stopPropagation();
                e.preventDefault();

                var a = animating();
                if (a) return false;

                var button = $(this),
                    target = button.attr('href'),
                    sidebar;

                if (target.length > 3) {
                    sidebar = $(target);
                    if (! sidebar.length) return false;
                }

                if (target.length < 3) {
                    var currentActiveElement = $('[data-toggle="sidebar-menu"]').not(this).closest('li').length ? $('[data-toggle="sidebar-menu"]').not(this).closest('li') : $('[data-toggle="sidebar-menu"]').not(this);
                    var activeElement = $(this).closest('li').length ? $(this).closest('li') : $(this);

                    currentActiveElement.removeClass('active');
                    activeElement.addClass('active');

                    if ($('html').hasClass('show-sidebar')) activeElement.removeClass('active');

                    $('html').removeClass('show-sidebar');

                    if (activeElement.hasClass('active')) $('html').addClass('show-sidebar');
                    return;
                }

                var dataOptions = getSidebarDataOptions(sidebar),
                    buttonOptions = {};

                if (button.data('effect')) buttonOptions.effect = button.data('effect');
                if (button.data('overlay')) buttonOptions.overlay = button.data('overlay');

                var options = $.extend({}, defaults, dataOptions, buttonOptions);

                if (! sidebar.hasClass('sidebar-closed') && sidebar.is(':visible')) {
                    reset(sidebar.attr('id'), options);
                    return;
                }

                open(target, options);

            };

        $('body').on(eventtype, '[data-toggle="sidebar-menu"]', toggle);

        $(document).on('keydown', null, 'esc', function () {

            var container = $(containerSelector);

            if (container.hasClass('st-menu-open')) {
                reset();
                return false;
            }

        });

        /**
         * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
         */
        $.fn.tkSidebarToggleBar = function () {

            if (! this.length) return;

            var sidebar = this;

            /* Sidebar Toggle Bar */
            if (sidebar.data('toggleBar')) {
                var bar = $('<a></a>');
                bar.attr('href', '#' + sidebar.attr('id'))
                    .attr('data-toggle', 'sidebar-menu')
                    .addClass('sidebar-toggle-bar');

                sidebar.append(bar);
            }

        };

        $('.sidebar').each(function(){
            $(this).tkSidebarToggleBar();
        });

        window.sidebar = {

            open: function (id, options) {

                var a = animating();
                if (a) return false;

                options = $.extend({}, defaults, options);

                return open('#' + id, options);

            },

            close: function (id, options) {

                options = $.extend({}, defaults, options);

                return reset(id, options);

            },

            options: getSidebarDataOptions

        };

    })();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/angular/_sidebar-collapse.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('type', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (! el.is('.sidebar')) return;
                    if (attrs.type !== 'collapse') return;

                    el.tkSidebarCollapse();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/angular/_sidebar-dropdown.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('type', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (! el.is('.sidebar')) return;
                    if (attrs.type !== 'dropdown') return;

                    el.tkSidebarDropdown();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/angular/_sidebar-toggle-bar.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggleBar', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggleBar) {
                        el.tkSidebarToggleBar();
                    }
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/angular/main.js":[function(require,module,exports){
require('./_sidebar-dropdown');
require('./_sidebar-collapse');
require('./_sidebar-toggle-bar');
},{"./_sidebar-collapse":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/angular/_sidebar-collapse.js","./_sidebar-dropdown":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/angular/_sidebar-dropdown.js","./_sidebar-toggle-bar":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/angular/_sidebar-toggle-bar.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_sidebar-menu');
require('./_collapsible');
require('./_dropdown');
require('./_sidebar-toggle');

(function($){
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebar = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            menuType: false,
            toggleBar: false
        }, options);

        var sidebar = this;

        if (settings.menuType == "collapse") {
            sidebar.tkSidebarCollapse();
        }

        if (settings.menuType == "dropdown") {
            sidebar.tkSidebarDropdown();
        }

        if (settings.toggleBar === true) {
            sidebar.tkSidebarToggleBar();
        }

    };

})(jQuery);
},{"./_breakpoints":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_breakpoints.js","./_collapsible":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_collapsible.js","./_dropdown":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_dropdown.js","./_sidebar-menu":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_sidebar-menu.js","./_sidebar-toggle":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/_sidebar-toggle.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-carousel.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCarousel = function () {

        if (! this.length) return;

        this.carousel();

        this.find('[data-slide]').click(function (e) {
            e.preventDefault();
        });

    };

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCollapse = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function(e){
            e.preventDefault();
        });

        $(target).collapse({toggle: false});

    };

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-modal.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkModal = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function (e) {
            e.preventDefault();
        });

        $(target).modal({show: false});

    };

    /**
     * Modal creator for the demo page.
     * Allows to explore different modal types.
     * For demo purposes only.
     */

    // Process the modal via Handlebars templates
    var modal = function (options) {
        var source = $("#" + options.template).html();
        var template = Handlebars.compile(source);
        return template(options);
    };

    var randomId = function () {
        /** @return String */
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    $.fn.tkModalDemo = function () {

        if (! this.length) return;

        var targetId = this.attr('href') || this.attr('target'),
            target = $(targetId);

        if (! targetId) {
            targetId = randomId();
            this.attr('data-target', '#' + targetId);
        }

        targetId.replace('#', '');

        if (! target.length) {
            target = $(modal({
                id: targetId,
                template: this.data('template') || 'tk-modal-demo',
                modalOptions: this.data('modalOptions') || '',
                dialogOptions: this.data('dialogOptions') || '',
                contentOptions: this.data('contentOptions') || ''
            }));
            $('body').append(target);
            target.modal({show: false});
        }

        this.click(function (e) {
            e.preventDefault();
            target.modal('toggle');
        });

    };

    $('[data-toggle="tk-modal-demo"]').each(function () {
        $(this).tkModalDemo();
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-switch.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('[data-toggle="switch-checkbox"]').each(function () {

        $(this).bootstrapSwitch({
            offColor: 'danger'
        });

    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_check-all.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCheckAll = function(){

        if (! this.length) return;

        this.on('click', function () {
            $($(this).data('target')).find(':checkbox').prop('checked', this.checked);
        });

    };

    // Check All Checkboxes
    $('[data-toggle="check-all"]').tkCheckAll();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_cover.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth Source area width
     * @param {Number} srcHeight Source area height
     * @param {Number} maxWidth Fittable area maximum available width
     * @param {Number} maxHeight Fittable area maximum available height
     * @return {Object} { width, heigth }
     */
    var aspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {

        var wRatio = maxWidth / srcWidth,
            hRatio = maxHeight / srcHeight,
            width = srcWidth,
            height = srcHeight;

        if (srcWidth / maxWidth < srcHeight / maxHeight) {
            width = maxWidth;
            height = srcHeight * wRatio;
        } else {
            width = srcWidth * hRatio;
            height = maxHeight;
        }

        return {width: width, height: height};
    };

    $.fn.tkCover = function(){

        if (! this.length) return;

        this.filter(':visible').not('[class*="height"]').each(function () {
            var t = $(this),
                i = t.find('img:first');

            if (i.length) {
                $.loadImage(i.attr('src')).done(function(img){
                    t.height(i.height());
                    $('.overlay-full', t).innerHeight(i.height());
                    $(document).trigger('domChanged');
                });
            }
        });

        this.filter(':visible').filter('[class*="height"]').each(function () {
            var t = $(this),
                img = t.find('img');

            img.each(function () {
                var i = $(this);
                $.loadImage(i.attr('src')).done(function(img){
                    $(i).removeAttr('style');
                    $(i).css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
                });
            });
        });

    };

    function height() {

        $('.cover.overlay').each(function(){
            $(this).tkCover();
        });

    }

    $(document).ready(height);
    $(window).on('load', height);

    var t;
    $(window).on("debouncedresize", function () {
        clearTimeout(t);
        t = setTimeout(height, 200);
    });

})(jQuery);

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_datepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDatePicker = function () {

        if (! this.length) return;

        if (typeof $.fn.datepicker != 'undefined') {

            this.datepicker();

        }

    };

    $('.datepicker').tkDatePicker();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_daterangepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#reportrange').daterangepicker(
        {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                'Last 7 Days': [moment().subtract('days', 6), moment()],
                'Last 30 Days': [moment().subtract('days', 29), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
            },
            startDate: moment().subtract('days', 29),
            endDate: moment()
        },
        function(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
    );

    $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_expandable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkExpandable = function () {

        if (! this.length) return;

        this.find('.expandable-content').append('<div class="expandable-indicator"><i></i></div>');

    };

    $('.expandable').each(function () {
        $(this).tkExpandable();
    });

    $('body').on('click', '.expandable-indicator', function(){
        $(this).closest('.expandable').toggleClass('expandable-open');
    });

    $('body').on('click', '.expandable-trigger:not(.expandable-open)', function(){
        $(this).addClass('expandable-open');
    });

}(jQuery));
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_iframe.js":[function(require,module,exports){
(function () {
    "use strict";

    // if we're inside an iframe, reload without iframe
    if (window.location != window.parent.location)
        top.location.href = document.location.href;

})();

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_minicolors.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkMiniColors = function () {

        if (! this.length) return;

        if (typeof $.fn.minicolors != 'undefined') {

            this.minicolors({
                control: this.attr('data-control') || 'hue',
                defaultValue: this.attr('data-defaultValue') || '',
                inline: this.attr('data-inline') === 'true',
                letterCase: this.attr('data-letterCase') || 'lowercase',
                opacity: this.attr('data-opacity'),
                position: this.attr('data-position') || 'bottom left',
                change: function (hex, opacity) {
                    if (! hex) return;
                    if (opacity) hex += ', ' + opacity;
                    if (typeof console === 'object') {
                        console.log(hex);
                    }
                },
                theme: 'bootstrap'
            });

        }

    };

    $('.minicolors').each(function () {

        $(this).tkMiniColors();

    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_nestable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkNestable = function () {

        if (! this.length) return;

        if (typeof $.fn.nestable != 'undefined') {

            this.nestable({
                rootClass: 'nestable',
                listNodeName: 'ul',
                listClass: 'nestable-list',
                itemClass: 'nestable-item',
                dragClass: 'nestable-drag',
                handleClass: 'nestable-handle',
                collapsedClass: 'nestable-collapsed',
                placeClass: 'nestable-placeholder',
                emptyClass: 'nestable-empty'
            });

        }

    };

    $('.nestable').tkNestable();

})(jQuery);

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_panel-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var randomId = function() {
        /** @return String */
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkPanelCollapse = function () {

        if (! this.length) return;

        var body = $('.panel-body', this),
            id = body.attr('id') || randomId(),
            collapse = $('<div/>');

        collapse
            .attr('id', id)
            .addClass('collapse' + (this.data('open') ? ' in' : ''))
            .append(body.clone());

        body.remove();

        $(this).append(collapse);

        $('.panel-collapse-trigger', this)
            .attr('data-toggle', 'collapse' )
            .attr('data-target', '#' + id)
            .collapse({ trigger: false });

    };

    $('[data-toggle="panel-collapse"]').each(function(){
        $(this).tkPanelCollapse();
    });

})(jQuery);

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_progress-bars.js":[function(require,module,exports){
(function ($) {

    // Progress Bar Animation
    $('.progress-bar').each(function () {
        $(this).width($(this).attr('aria-valuenow') + '%');
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_select2.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2 = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            var t = this,
                options = {
                    allowClear: t.data('allowClear')
                };

            if (t.is('button')) return true;
            if (t.is('input[type="button"]')) return true;

            if (t.is('[data-toggle="select2-tags"]')) {
                options.tags = t.data('tags').split(',');
            }

            t.select2(options);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Enable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $($(this).data('target')).select2("enable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Disable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $(this.data('target')).select2("disable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Flags = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            // templating
            var format = function (state) {
                if (! state.id) return state.text;
                return "<img class='flag' src='http://select2.github.io/select2/images/flags/" + state.id.toLowerCase() + ".png'/>" + state.text;
            };

            this.select2({
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });

        }

    };

    $('[data-toggle*="select2"]').each(function() {

        $(this).tkSelect2();

    });

    $('[data-toggle="select2-enable"]').tkSelect2Enable();

    $('[data-toggle="select2-disable"]').tkSelect2Disable();

    $("#select2_7").tkSelect2Flags();

})(jQuery);

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_selectpicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelectPicker = function () {

        if (! this.length) return;

        if (typeof $.fn.selectpicker != 'undefined') {

            this.selectpicker({
                width: this.data('width') || '100%'
            });

        }

    };

    $(function () {

        $('.selectpicker').each(function () {
           $(this).tkSelectPicker();
        });

    });

})(jQuery);

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_show-hover.js":[function(require,module,exports){
(function ($) {

    var showHover = function () {
        $('[data-show-hover]').hide().each(function () {
            var self = $(this),
                parent = $(this).data('showHover');

            self.closest(parent).on('mouseover', function (e) {
                e.stopPropagation();
                self.show();
            }).on('mouseout', function () {
                self.hide();
            });
        });
    };

    showHover();

    window.showHover = showHover;

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_skin.js":[function(require,module,exports){
module.exports=require("/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js")
},{"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_slider.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var bars = function(el){
        $('.slider-handle', el).html('<i class="fa fa-bars fa-rotate-90"></i>');
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlider = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider();

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderFormatter = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider({
                formatter: function (value) {
                    return 'Current value: ' + value;
                }
            });

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderUpdate = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.on("slide", function (slideEvt) {
                $(this.attr('data-on-slide')).text(slideEvt.value);
            });

            bars(this);

        }

    };

    $('[data-slider="default"]').tkSlider();

    $('[data-slider="formatter"]').tkSliderFormatter();

    $('[data-on-slide]').tkSliderUpdate();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tables.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDataTable = function(){

        if (! this.length) return;

        if (typeof $.fn.dataTable != 'undefined') {

            this.dataTable();

        }

    };

    $('[data-toggle="data-table"]').tkDataTable();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tabs.js":[function(require,module,exports){
(function ($) {

    var skin = require('./_skin')();

    $('.tabbable .nav-tabs').each(function(){
        var tabs = $(this).niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: true,
            oneaxismousemode: true
        });

        var _super = tabs.getContentSize;
        tabs.getContentSize = function() {
            var page = _super.call(tabs);
            page.h = tabs.win.height();
            return page;
        };
    });

    $('[data-scrollable]').getNiceScroll().resize();

    $('.tabbable .nav-tabs a').on('shown.bs.tab', function(e){
        var tab = $(this).closest('.tabbable');
        var target = $(e.target),
            targetPane = target.attr('href') || target.data('target');

        // refresh tabs with horizontal scroll
        tab.find('.nav-tabs').getNiceScroll().resize();

        // refresh [data-scrollable] within the activated tab pane
        $(targetPane).find('[data-scrollable]').getNiceScroll().resize();
    });

}(jQuery));
},{"./_skin":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_skin.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tooltip.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Tooltip
    $("body").tooltip({selector: '[data-toggle="tooltip"]', container: "body"});

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_touchspin.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkTouchSpin = function () {

        if (! this.length) return;

        if (typeof $.fn.TouchSpin != 'undefined') {

            this.TouchSpin();

        }

    };

    $('[data-toggle="touch-spin"]').tkTouchSpin();

}(jQuery));
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tree.js":[function(require,module,exports){
(function ($) {

    var tree_glyph_options = {
        map: {
            checkbox: "fa fa-square-o",
            checkboxSelected: "fa fa-check-square",
            checkboxUnknown: "fa fa-check-square fa-muted",
            error: "fa fa-exclamation-triangle",
            expanderClosed: "fa fa-caret-right",
            expanderLazy: "fa fa-angle-right",
            expanderOpen: "fa fa-caret-down",
            doc: "fa fa-file-o",
            noExpander: "",
            docOpen: "fa fa-file",
            loading: "fa fa-refresh fa-spin",
            folder: "fa fa-folder",
            folderOpen: "fa fa-folder-open"
        }
    },
    tree_dnd_options = {
        autoExpandMS: 400,
            focusOnClick: true,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
            dragStart: function(node, data) {
            /** This function MUST be defined to enable dragging for the tree.
             *  Return false to cancel dragging of node.
             */
            return true;
        },
        dragEnter: function(node, data) {
            /** data.otherNode may be null for non-fancytree droppables.
             *  Return false to disallow dropping on node. In this case
             *  dragOver and dragLeave are not called.
             *  Return 'over', 'before, or 'after' to force a hitMode.
             *  Return ['before', 'after'] to restrict available hitModes.
             *  Any other return value will calc the hitMode from the cursor position.
             */
            // Prevent dropping a parent below another parent (only sort
            // nodes under the same parent)
            /*
            if(node.parent !== data.otherNode.parent){
                return false;
            }
            // Don't allow dropping *over* a node (would create a child)
            return ["before", "after"];
            */
            return true;
        },
        dragDrop: function(node, data) {
            /** This function MUST be defined to enable dropping of items on
             *  the tree.
             */
            data.otherNode.moveTo(node, data.hitMode);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFancyTree = function(){

        if (! this.length) return;

        if (typeof $.fn.fancytree == 'undefined') return;

        var extensions = [ "glyph" ];
        if (typeof this.attr('data-tree-dnd') !== "undefined") {
            extensions.push( "dnd" );
        }
        this.fancytree({
            extensions: extensions,
            glyph: tree_glyph_options,
            dnd: tree_dnd_options,
            clickFolderMode: 3,
            checkbox: typeof this.attr('data-tree-checkbox') !== "undefined" || false,
            selectMode: typeof this.attr('data-tree-select') !== "undefined" ? parseInt(this.attr('data-tree-select')) : 2
        });

    };

    // using default options
    $('[data-toggle="tree"]').each(function () {
        $(this).tkFancyTree();
    });

}(jQuery));
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_wizard.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkWizard = function () {

        if (! this.length) return;

        if (typeof $.fn.slick == 'undefined') return;

        var t = this,
            container = t.closest('.wizard-container');

        t.slick({
            dots: false,
            arrows: false,
            slidesToShow: 1,
            rtl: this.data('rtl'),
            slide: 'fieldset',
            onAfterChange: function (wiz, index) {
                $(document).trigger('after.wizard.step', {
                    wiz: wiz,
                    target: index,
                    container: container,
                    element: t
                });
            }
        });

        container.find('.wiz-next').click(function (e) {
            e.preventDefault();
            t.slickNext();
        });

        container.find('.wiz-prev').click(function (e) {
            e.preventDefault();
            t.slickPrev();
        });

        container.find('.wiz-step').click(function (e) {
            e.preventDefault();
            t.slickGoTo($(this).data('target'));
        });

    };

    $('[data-toggle="wizard"]').each(function () {
        $(this).tkWizard();
    });

    /**
     * By leveraging events we can hook into the wizard to add functionality.
     * This example updates the progress bar after the wizard step changes.
     */
    $(document).on('after.wizard.step', function (event, data) {

        if (data.container.is('#wizard-demo-1')) {

            var target = data.container.find('.wiz-progress li:eq(' + data.target + ')');

            data.container.find('.wiz-progress li').removeClass('active complete');

            target.addClass('active');

            target.prevAll().addClass('complete');

        }

    });

}(jQuery));
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_carousel.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('carousel', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkCarousel();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_check-all.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'check-all') {
                        el.tkCheckAll();
                    }

                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_collapse.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'collapse') {
                        el.tkCollapse();
                    }
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_cover.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('cover', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function () {
                        el.tkCover();
                    }, 200);
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_datepicker.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('datepicker', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkDatePicker();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_expandable.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('expandable', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkExpandable();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_minicolors.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('minicolors', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkMiniColors();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_modal.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'modal') {
                        el.tkModal();
                    }
                    if (attrs.toggle == 'tk-modal-demo') {
                        el.tkModalDemo();
                    }

                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_nestable.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('nestable', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkNestable();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_panel-collapse.js":[function(require,module,exports){
(function () {
    "use strict";

    var randomId = function () {
        /** @return String */
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    angular.module('app')
        .directive('toggle', [ '$compile', function ($compile) {
            return {
                restrict: 'A',
                priority: 100,
                compile: function (el, attrs) {

                    if (attrs.toggle !== 'panel-collapse') return;

                    var body = angular.element('.panel-body', el),
                        id = body.attr('id') || randomId(),
                        collapse = angular.element('<div/>');

                    collapse
                        .attr('id', id)
                        .addClass('collapse' + (el.data('open') ? ' in' : ''))
                        .append(body.clone());

                    body.remove();

                    el.append(collapse);

                    $('.panel-collapse-trigger', el)
                        .attr('data-toggle', 'collapse')
                        .attr('data-target', '#' + id)
                        .collapse({trigger: false})
                        .removeAttr('style');

                    return function (scope, el, attrs) {
                    };

                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_select2.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'select2' || attrs.toggle == 'select2-tags') {
                        el.tkSelect2();
                    }
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_selectpicker.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('selectpicker', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkSelectPicker();
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_slider.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('slider', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.slider == 'default') {
                        el.tkSlider();
                    }

                    if (attrs.slider == 'formatter') {
                        el.tkSliderFormatter();
                    }

                }
            };
        } ]);

    angular.module('app')
        .directive('onSlide', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    el.tkSliderUpdate();

                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_tables.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'data-table') {
                        el.tkDataTable();
                    }

                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_tabs.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'tab') {
                        el.click(function(e){
                            e.preventDefault();
                        });
                    }

                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_touchspin.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'touch-spin') {
                        el.tkTouchSpin();
                    }

                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_tree.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'tree') {
                        el.tkFancyTree();
                    }

                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_wizard.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'wizard') {
                        el.tkWizard();
                    }
                }
            };
        } ]);

})();
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/main.js":[function(require,module,exports){
require('./_panel-collapse');
require('./_carousel');
require('./_check-all');
require('./_collapse');
require('./_cover');
require('./_datepicker');
require('./_expandable');
require('./_minicolors');
require('./_modal');
require('./_nestable');
require('./_select2');
require('./_selectpicker');
require('./_slider');
require('./_touchspin');
require('./_tables');
require('./_tabs');
require('./_tree');
require('./_wizard');
},{"./_carousel":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_carousel.js","./_check-all":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_check-all.js","./_collapse":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_collapse.js","./_cover":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_cover.js","./_datepicker":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_datepicker.js","./_expandable":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_expandable.js","./_minicolors":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_minicolors.js","./_modal":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_modal.js","./_nestable":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_nestable.js","./_panel-collapse":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_panel-collapse.js","./_select2":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_select2.js","./_selectpicker":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_selectpicker.js","./_slider":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_slider.js","./_tables":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_tables.js","./_tabs":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_tabs.js","./_touchspin":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_touchspin.js","./_tree":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_tree.js","./_wizard":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/angular/_wizard.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/main.js":[function(require,module,exports){
require('./_tabs');
require('./_tree');
require('./_show-hover');
require('./_daterangepicker');
require('./_expandable');
require('./_nestable');
require('./_cover');
require('./_tooltip');
require('./_tables');
require('./_check-all');
require('./_progress-bars');
require('./_iframe');
require('./_bootstrap-collapse');
require('./_bootstrap-carousel');
require('./_bootstrap-modal');
require('./_panel-collapse');

// Forms
require('./_touchspin');
require('./_select2');
require('./_slider');
require('./_selectpicker');
require('./_datepicker');
require('./_minicolors');
require('./_bootstrap-switch');
require('./_wizard');
},{"./_bootstrap-carousel":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-carousel.js","./_bootstrap-collapse":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-collapse.js","./_bootstrap-modal":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-modal.js","./_bootstrap-switch":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-switch.js","./_check-all":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_check-all.js","./_cover":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_cover.js","./_datepicker":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_datepicker.js","./_daterangepicker":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_daterangepicker.js","./_expandable":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_expandable.js","./_iframe":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_iframe.js","./_minicolors":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_minicolors.js","./_nestable":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_nestable.js","./_panel-collapse":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_panel-collapse.js","./_progress-bars":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_progress-bars.js","./_select2":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_select2.js","./_selectpicker":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_selectpicker.js","./_show-hover":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_show-hover.js","./_slider":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_slider.js","./_tables":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tables.js","./_tabs":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tabs.js","./_tooltip":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tooltip.js","./_touchspin":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_touchspin.js","./_tree":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tree.js","./_wizard":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_wizard.js"}]},{},["./app/js/themes/angular/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvdGhlbWVzL2FuZ3VsYXIvbWFpbi5qcyIsImFwcC9qcy90aGVtZXMvYW5ndWxhci9hbmd1bGFyL2FwcC5qcyIsImFwcC9qcy90aGVtZXMvYW5ndWxhci9hbmd1bGFyL2NvbmZpZy5yb3V0ZXIuanMiLCJhcHAvanMvdGhlbWVzL2FuZ3VsYXIvYW5ndWxhci9tYWluLmpzIiwiYXBwL2pzL3RoZW1lcy9hbmd1bGFyL3RoZW1lLWNvcmUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fYXN5bmMuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fYnJlYWtwb2ludHMuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fZ3JpZGFsaWNpb3VzLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2lzb3RvcGUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fc2Nyb2xsYWJsZS5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19zaWRlYmFyLXBjLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3NraW4uanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fc2tpbnMuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9hbmd1bGFyL19ncmlkYWxpY2lvdXMuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9hbmd1bGFyL19pc290b3BlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvYW5ndWxhci9fc2Nyb2xsYWJsZS5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL2FuZ3VsYXIvX3NpZGViYXItcGMuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9hbmd1bGFyL21haW4uanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2FuZ3VsYXIvX2dvb2dsZS1tYXBzLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9fZWRpdC5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvX2ZpbHRlcnMuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL19saWJyYXJ5LmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9tYWluLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX2FwcGxlLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX2JsdWUtZ3JheS5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19jbGVhbi1jdXQuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fY29vbC1ncmV5LmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX2xlbW9uLXRyZWUuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fbGlnaHQtZ3JlZW4uanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fbGlnaHQtZ3JleS5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19saWdodC1tb25vY2hyb21lLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX25hdHVyZS5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19wYXBlci5qcyIsImFwcC92ZW5kb3IvbWVkaWEvanMvYW5ndWxhci9fb3dsLmpzIiwiYXBwL3ZlbmRvci9tZWRpYS9qcy9hbmd1bGFyL19zbGljay5qcyIsImFwcC92ZW5kb3IvbWVkaWEvanMvYW5ndWxhci9tYWluLmpzIiwiYXBwL3ZlbmRvci9tZWRpYS9qcy9jYXJvdXNlbC9tYWluLmpzIiwiYXBwL3ZlbmRvci9tZWRpYS9qcy9jYXJvdXNlbC9vd2wvX2RlZmF1bHQuanMiLCJhcHAvdmVuZG9yL21lZGlhL2pzL2Nhcm91c2VsL293bC9fbWl4ZWQuanMiLCJhcHAvdmVuZG9yL21lZGlhL2pzL2Nhcm91c2VsL293bC9fcHJldmlldy5qcyIsImFwcC92ZW5kb3IvbWVkaWEvanMvY2Fyb3VzZWwvb3dsL21haW4uanMiLCJhcHAvdmVuZG9yL21lZGlhL2pzL2Nhcm91c2VsL3NsaWNrL19kZWZhdWx0LmpzIiwiYXBwL3ZlbmRvci9yZWFsLWVzdGF0ZS9qcy9fbWFwcy5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9fYnJlYWtwb2ludHMuanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvX2NvbGxhcHNpYmxlLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19kcm9wZG93bi5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9fb3B0aW9ucy5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9fc2lkZWJhci1tZW51LmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19zaWRlYmFyLXRvZ2dsZS5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9hbmd1bGFyL19zaWRlYmFyLWNvbGxhcHNlLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL2FuZ3VsYXIvX3NpZGViYXItZHJvcGRvd24uanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvYW5ndWxhci9fc2lkZWJhci10b2dnbGUtYmFyLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL2FuZ3VsYXIvbWFpbi5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fYm9vdHN0cmFwLWNhcm91c2VsLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fYm9vdHN0cmFwLWNvbGxhcHNlLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fYm9vdHN0cmFwLW1vZGFsLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fYm9vdHN0cmFwLXN3aXRjaC5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2NoZWNrLWFsbC5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2NvdmVyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fZGF0ZXBpY2tlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2RhdGVyYW5nZXBpY2tlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2V4cGFuZGFibGUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19pZnJhbWUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19taW5pY29sb3JzLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fbmVzdGFibGUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19wYW5lbC1jb2xsYXBzZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3Byb2dyZXNzLWJhcnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19zZWxlY3QyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2VsZWN0cGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2hvdy1ob3Zlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3NsaWRlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYmxlcy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL190b29sdGlwLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdG91Y2hzcGluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdHJlZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3dpemFyZC5qcyIsImFwcC92ZW5kb3IvdWkvanMvYW5ndWxhci9fY2Fyb3VzZWwuanMiLCJhcHAvdmVuZG9yL3VpL2pzL2FuZ3VsYXIvX2NoZWNrLWFsbC5qcyIsImFwcC92ZW5kb3IvdWkvanMvYW5ndWxhci9fY29sbGFwc2UuanMiLCJhcHAvdmVuZG9yL3VpL2pzL2FuZ3VsYXIvX2NvdmVyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9hbmd1bGFyL19kYXRlcGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9hbmd1bGFyL19leHBhbmRhYmxlLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9hbmd1bGFyL19taW5pY29sb3JzLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9hbmd1bGFyL19tb2RhbC5qcyIsImFwcC92ZW5kb3IvdWkvanMvYW5ndWxhci9fbmVzdGFibGUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL2FuZ3VsYXIvX3BhbmVsLWNvbGxhcHNlLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9hbmd1bGFyL19zZWxlY3QyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9hbmd1bGFyL19zZWxlY3RwaWNrZXIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL2FuZ3VsYXIvX3NsaWRlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvYW5ndWxhci9fdGFibGVzLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9hbmd1bGFyL190YWJzLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9hbmd1bGFyL190b3VjaHNwaW4uanMiLCJhcHAvdmVuZG9yL3VpL2pzL2FuZ3VsYXIvX3RyZWUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL2FuZ3VsYXIvX3dpemFyZC5qcyIsImFwcC92ZW5kb3IvdWkvanMvYW5ndWxhci9tYWluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9ZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBFc3NlbnRpYWxzXG5yZXF1aXJlKCcuLi8uLi8uLi92ZW5kb3IvdWkvanMvbWFpbicpO1xuXG4vLyBMYXlvdXRcbnJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci9sYXlvdXQvanMvbWFpbicpO1xuXG4vLyBTaWRlYmFyXG5yZXF1aXJlKCcuLi8uLi8uLi92ZW5kb3Ivc2lkZWJhci9qcy9tYWluJyk7XG5cbi8vIE93bCBDYXJvdXNlbFxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL21lZGlhL2pzL2Nhcm91c2VsL21haW4nKTtcblxuLy8gTWFwc1xud2luZG93LmluaXRHb29nbGVNYXBzID0gcmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL21hcHMvanMvZ29vZ2xlL21haW4nKTtcblxuLy8gQ09SRVxucmVxdWlyZSgnLi90aGVtZS1jb3JlJyk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAgICAgJ25nUmVzb3VyY2UnLFxuICAgICAgICAnbmdTYW5pdGl6ZScsXG4gICAgICAgICduZ1RvdWNoJyxcbiAgICAgICAgJ3VpLnJvdXRlcicsXG4gICAgICAgICd1aS51dGlscycsXG4gICAgICAgICd1aS5qcSdcbiAgICBdKTtcblxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAgICAgLmNvbmZpZyhcbiAgICAgICAgWyAnJGNvbnRyb2xsZXJQcm92aWRlcicsICckY29tcGlsZVByb3ZpZGVyJywgJyRmaWx0ZXJQcm92aWRlcicsICckcHJvdmlkZScsICckaW50ZXJwb2xhdGVQcm92aWRlcicsXG4gICAgICAgICAgICBmdW5jdGlvbiAoJGNvbnRyb2xsZXJQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlciwgJGZpbHRlclByb3ZpZGVyLCAkcHJvdmlkZSwgJGludGVycG9sYXRlUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICBhcHAuY29udHJvbGxlciA9ICRjb250cm9sbGVyUHJvdmlkZXIucmVnaXN0ZXI7XG4gICAgICAgICAgICAgICAgYXBwLmRpcmVjdGl2ZSA9ICRjb21waWxlUHJvdmlkZXIuZGlyZWN0aXZlO1xuICAgICAgICAgICAgICAgIGFwcC5maWx0ZXIgPSAkZmlsdGVyUHJvdmlkZXIucmVnaXN0ZXI7XG4gICAgICAgICAgICAgICAgYXBwLmZhY3RvcnkgPSAkcHJvdmlkZS5mYWN0b3J5O1xuICAgICAgICAgICAgICAgIGFwcC5zZXJ2aWNlID0gJHByb3ZpZGUuc2VydmljZTtcbiAgICAgICAgICAgICAgICBhcHAuY29uc3RhbnQgPSAkcHJvdmlkZS5jb25zdGFudDtcbiAgICAgICAgICAgICAgICBhcHAudmFsdWUgPSAkcHJvdmlkZS52YWx1ZTtcblxuICAgICAgICAgICAgICAgICRpbnRlcnBvbGF0ZVByb3ZpZGVyLnN0YXJ0U3ltYm9sKCc6OicpO1xuICAgICAgICAgICAgICAgICRpbnRlcnBvbGF0ZVByb3ZpZGVyLmVuZFN5bWJvbCgnOjonKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5ydW4oWyAnJHJvb3RTY29wZScsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcykge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICBdKVxuICAgICAgICAuY29uZmlnKFxuICAgICAgICBbICckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlclxuICAgICAgICAgICAgICAgICAgICAub3RoZXJ3aXNlKCcvZGlzY292ZXIvbWFwLWZ1bGwnKTtcblxuICAgICAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgnZGlzY292ZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9kaXNjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgdWktdmlldyBjbGFzcz1cInVpLXZpZXctbWFpblwiIC8+J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhdGUoJ2Rpc2NvdmVyLm1hcC1mdWxsJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL21hcC1mdWxsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzY292ZXIvbWFwLWZ1bGwuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFwcC5zZXR0aW5ncy5odG1sQ2xhc3MgPSAnc3QtbGF5b3V0IGxzLXRvcC1uYXZiYXIgbHMtYm90dG9tLWZvb3RlciBzaG93LXNpZGViYXIgc2lkZWJhci1sMSBzaWRlYmFyLXIxLXhzJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgnZGlzY292ZXIubWFwLWxpc3RpbmctbGlzdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9tYXAtbGlzdGluZy1saXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzY292ZXIvbWFwLWxpc3RpbmctbGlzdC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXBwLnNldHRpbmdzLmh0bWxDbGFzcyA9ICdzdC1sYXlvdXQgbHMtdG9wLW5hdmJhciBscy1ib3R0b20tZm9vdGVyIHNob3ctc2lkZWJhciBzaWRlYmFyLWwxIHNpZGViYXItcjEteHMgc2lkZWJhci1yLTQ4cGMtbGcgc2lkZWJhci1yLTQwcGMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnN0YXRlKCdkaXNjb3Zlci5tYXAtbGlzdGluZy1ncmlkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL21hcC1saXN0aW5nLWdyaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXNjb3Zlci9tYXAtbGlzdGluZy1ncmlkLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hcHAuc2V0dGluZ3MuaHRtbENsYXNzID0gJ3N0LWxheW91dCBscy10b3AtbmF2YmFyIGxzLWJvdHRvbS1mb290ZXIgc2hvdy1zaWRlYmFyIHNpZGViYXItbDEgc2lkZWJhci1yMS14cyBzaWRlYmFyLXItNDhwYy1sZyBzaWRlYmFyLXItNDBwYyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhdGUoJ2Rpc2NvdmVyLmxpc3RpbmcnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvbGlzdGluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc2NvdmVyL2xpc3RpbmcuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFwcC5zZXR0aW5ncy5odG1sQ2xhc3MgPSAnc3QtbGF5b3V0IGxzLXRvcC1uYXZiYXIgbHMtYm90dG9tLWZvb3RlciBzaG93LXNpZGViYXIgc2lkZWJhci1sLXN1bS0xMyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhdGUoJ2Rpc2NvdmVyLmxpc3RpbmctZ3JpZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9saXN0aW5nLWdyaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXNjb3Zlci9saXN0aW5nLWdyaWQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFwcC5zZXR0aW5ncy5odG1sQ2xhc3MgPSAnc3QtbGF5b3V0IGxzLXRvcC1uYXZiYXIgbHMtYm90dG9tLWZvb3RlciBzaG93LXNpZGViYXIgc2lkZWJhci1sLXN1bS0xMyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhdGUoJ2Rpc2NvdmVyLmxpc3RpbmctbWFwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2xpc3RpbmctbWFwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzY292ZXIvbGlzdGluZy1tYXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFwcC5zZXR0aW5ncy5odG1sQ2xhc3MgPSAnc3QtbGF5b3V0IGxzLXRvcC1uYXZiYXIgbHMtYm90dG9tLWZvb3RlciBzaG93LXNpZGViYXIgc2lkZWJhci1sLXN1bS0xMyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgncHJvcGVydHknLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgdWktdmlldyBjbGFzcz1cInVpLXZpZXctbWFpblwiIC8+J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhdGUoJ3Byb3BlcnR5Lm1hcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9tYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9wZXJ0eS9tYXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFwcC5zZXR0aW5ncy5odG1sQ2xhc3MgPSAnc3QtbGF5b3V0IGxzLXRvcC1uYXZiYXIgbHMtYm90dG9tLWZvb3RlciBzaG93LXNpZGViYXIgc2lkZWJhci1sMSBzaWRlYmFyLXIxLXhzIHNpZGViYXItci00OHBjLWxnIHNpZGViYXItci00MHBjJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgncHJvcGVydHkucHJvcGVydHknLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvcGVydHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9wZXJ0eS9wcm9wZXJ0eS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXBwLnNldHRpbmdzLmh0bWxDbGFzcyA9ICdzdC1sYXlvdXQgbHMtdG9wLW5hdmJhciBscy1ib3R0b20tZm9vdGVyIHNob3ctc2lkZWJhciBzaWRlYmFyLWwxIHNpZGViYXItcjEteHMgc2lkZWJhci1yLTI1cGMtbGcgc2lkZWJhci1yLTMwcGMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnN0YXRlKCdwcm9wZXJ0eS5lZGl0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2VkaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9wZXJ0eS9lZGl0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hcHAuc2V0dGluZ3MuaHRtbENsYXNzID0gJ3N0LWxheW91dCBscy10b3AtbmF2YmFyIGxzLWJvdHRvbS1mb290ZXIgc2hvdy1zaWRlYmFyIHNpZGViYXItbDEgc2lkZWJhci1yMS14cyBzaWRlYmFyLXItNDhwYy1sZyBzaWRlYmFyLXItNDBwYyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgnbWFwLWZlYXR1cmVzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvbWFwLWZlYXR1cmVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnPGRpdiB1aS12aWV3IGNsYXNzPVwidWktdmlldy1tYWluXCIgLz4nXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgnbWFwLWZlYXR1cmVzLnRoZW1lcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy90aGVtZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdtYXAtZmVhdHVyZXMvdGhlbWVzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hcHAuc2V0dGluZ3MuaHRtbENsYXNzID0gJ3N0LWxheW91dCBscy10b3AtbmF2YmFyIGxzLWJvdHRvbS1mb290ZXIgc2hvdy1zaWRlYmFyIHNpZGViYXItbDEgc2lkZWJhci1yMS14cyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhdGUoJ21hcC1mZWF0dXJlcy5maWx0ZXJzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2ZpbHRlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdtYXAtZmVhdHVyZXMvZmlsdGVycy5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXBwLnNldHRpbmdzLmh0bWxDbGFzcyA9ICdzdC1sYXlvdXQgbHMtdG9wLW5hdmJhciBscy1ib3R0b20tZm9vdGVyIHNob3ctc2lkZWJhciBzaWRlYmFyLWwxJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgnbWFwLWZlYXR1cmVzLm1hcmtlcnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvbWFya2VycycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ21hcC1mZWF0dXJlcy9tYXJrZXJzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hcHAuc2V0dGluZ3MuaHRtbENsYXNzID0gJ3N0LWxheW91dCBscy10b3AtbmF2YmFyIGxzLWJvdHRvbS1mb290ZXIgc2hvdy1zaWRlYmFyIHNpZGViYXItbDInO1xuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgICAgICAgICAuc3RhdGUoJ2Zyb250Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZnJvbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IHVpLXZpZXcgY2xhc3M9XCJ1aS12aWV3LW1haW5cIiAvPidcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnN0YXRlKCdmcm9udC5ob21lLW1hcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9ob21lLW1hcCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Zyb250L2hvbWUtbWFwLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hcHAuc2V0dGluZ3MuaHRtbENsYXNzID0gJ2hpZGUtc2lkZWJhciB0b3AtbmF2YmFyIGxzLWJvdHRvbS1mb290ZXItZml4ZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnN0YXRlKCdmcm9udC5ob21lLXNsaWRlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9ob21lLXNsaWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Zyb250L2hvbWUtc2xpZGVyLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hcHAuc2V0dGluZ3MuaHRtbENsYXNzID0gJ2hpZGUtc2lkZWJhciBscy1ib3R0b20tZm9vdGVyLWZpeGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgnZnJvbnQubGlzdGluZycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9saXN0aW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZnJvbnQvbGlzdGluZy5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXBwLnNldHRpbmdzLmh0bWxDbGFzcyA9ICdoaWRlLXNpZGViYXIgdG9wLW5hdmJhciBscy1ib3R0b20tZm9vdGVyLWZpeGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgnZnJvbnQubGlzdGluZy1ncmlkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2xpc3RpbmctZ3JpZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Zyb250L2xpc3RpbmctZ3JpZC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXBwLnNldHRpbmdzLmh0bWxDbGFzcyA9ICdoaWRlLXNpZGViYXIgdG9wLW5hdmJhciBscy1ib3R0b20tZm9vdGVyLWZpeGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0ZSgnZnJvbnQucHJvcGVydHknLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvcGVydHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdmcm9udC9wcm9wZXJ0eS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXBwLnNldHRpbmdzLmh0bWxDbGFzcyA9ICdoaWRlLXNpZGViYXIgdG9wLW5hdmJhciBscy1ib3R0b20tZm9vdGVyLWZpeGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgKTtcblxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdBcHBDdHJsJywgWyAnJHNjb3BlJywgJyRzdGF0ZScsXG4gICAgICAgICAgICBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUpIHtcblxuICAgICAgICAgICAgICAgICRzY29wZS5hcHAgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sQ2xhc3M6ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcblxuICAgICAgICAgICAgfSBdKTtcblxufSkoKTtcbiIsIi8vIENVU1RPTVxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3JlYWwtZXN0YXRlL2pzL19tYXBzJyk7XG5cbi8vIEFuZ3VsYXIgQXBwXG5yZXF1aXJlKCcuL2FuZ3VsYXIvYXBwLmpzJyk7XG5yZXF1aXJlKCcuL2FuZ3VsYXIvY29uZmlnLnJvdXRlci5qcycpO1xucmVxdWlyZSgnLi9hbmd1bGFyL21haW4uanMnKTtcblxuLy8gRGlyZWN0aXZlc1xucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3VpL2pzL2FuZ3VsYXIvbWFpbicpO1xucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL2xheW91dC9qcy9hbmd1bGFyL21haW4nKTtcbnJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci9zaWRlYmFyL2pzL2FuZ3VsYXIvbWFpbicpO1xucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL21hcHMvanMvYW5ndWxhci9fZ29vZ2xlLW1hcHMnKTtcbnJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci9tZWRpYS9qcy9hbmd1bGFyL21haW4nKTsiLCJmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblxuICAgIHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG5cbiAgICAgICAgZG9jID0gd2luLmRvY3VtZW50LFxuICAgICAgICByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgbW9kZXJuID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIsXG5cbiAgICAgICAgYWRkID0gbW9kZXJuID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICAgICAgcmVtID0gbW9kZXJuID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50JyxcbiAgICAgICAgcHJlID0gbW9kZXJuID8gJycgOiAnb24nLFxuXG4gICAgICAgIGluaXQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuICAgICAgICAgICAgKGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpWyByZW0gXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghIGRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChwb2xsLCA1MCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5pdCgncG9sbCcpO1xuICAgICAgICB9O1xuXG4gICAgaWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuICAgIGVsc2Uge1xuICAgICAgICBpZiAoISBtb2Rlcm4gJiYgcm9vdC5kb1Njcm9sbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0b3AgPSAhIHdpbi5mcmFtZUVsZW1lbnQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9wKSBwb2xsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jWyBhZGQgXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgZG9jWyBhZGQgXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgd2luWyBhZGQgXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXJscywgY2FsbGJhY2spIHtcblxuICAgIHZhciBhc3luY0xvYWRlciA9IGZ1bmN0aW9uICh1cmxzLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHVybHMuZm9yZWFjaChmdW5jdGlvbiAoaSwgZmlsZSkge1xuICAgICAgICAgICAgbG9hZENzcyhmaWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2tpbmcgZm9yIGEgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjYWxsaW5nIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgY29udGVudExvYWRlZCh3aW5kb3csIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbG9hZENzcyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbIDAgXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9O1xuXG4gICAgLy8gc2ltcGxlIGZvcmVhY2ggaW1wbGVtZW50YXRpb25cbiAgICBBcnJheS5wcm90b3R5cGUuZm9yZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICsrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpLCB0aGlzWyBpIF0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jTG9hZGVyKHVybHMsIGNhbGxiYWNrKTtcblxufTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgICQod2luZG93KS5zZXRCcmVha3BvaW50cyh7XG4gICAgICAgIGRpc3RpbmN0OiB0cnVlLFxuICAgICAgICBicmVha3BvaW50czogWyAzMjAsIDQ4MCwgNzY4LCAxMDI0IF1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtHcmlkYWxpY2lvdXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmdyaWRhbGljaW91cyh7XG4gICAgICAgICAgICBndXR0ZXI6IHRoaXMuZGF0YSgnZ3V0dGVyJykgfHwgMTUsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5kYXRhKCd3aWR0aCcpIHx8IDM3MCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnPiBkaXYnLFxuICAgICAgICAgICAgYW5pbWF0aW9uT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZSo9XCJncmlkYWxpY2lvdXNcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50a0dyaWRhbGljaW91cygpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0lzb3RvcGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmlzb3RvcGUoe1xuICAgICAgICAgICAgbGF5b3V0TW9kZTogdGhpcy5kYXRhKCdsYXlvdXRNb2RlJykgfHwgXCJwYWNrZXJ5XCIsXG4gICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcuaXRlbSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pc290b3BlKCdvbicsICdsYXlvdXRDb21wbGV0ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoZnVuY3Rpb24oKXtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cImlzb3RvcGVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRrSXNvdG9wZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDMwMCk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RvbUNoYW5nZWQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwiaXNvdG9wZVwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmlzb3RvcGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4vX3NraW4nKSgpO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1Njcm9sbGFibGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgaG9yaXpvbnRhbDogZmFsc2VcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIG5pY2UgPSB0aGlzLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAwLFxuICAgICAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IHNldHRpbmdzLmhvcml6b250YWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCEgc2V0dGluZ3MuaG9yaXpvbnRhbCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBfc3VwZXIgPSBuaWNlLmdldENvbnRlbnRTaXplO1xuXG4gICAgICAgIG5pY2UuZ2V0Q29udGVudFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGFnZSA9IF9zdXBlci5jYWxsKG5pY2UpO1xuICAgICAgICAgICAgcGFnZS5oID0gbmljZS53aW4uaGVpZ2h0KCk7XG4gICAgICAgICAgICByZXR1cm4gcGFnZTtcbiAgICAgICAgfTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXSwgLnN0LWNvbnRlbnQtaW5uZXInKS50a1Njcm9sbGFibGUoKTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGUtaF0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKHRoaXMpLnRrU2Nyb2xsYWJsZSh7IGhvcml6b250YWw6IHRydWUgfSk7XG5cbiAgICB9KTtcblxuICAgIHZhciB0O1xuICAgICQod2luZG93KS5vbignZGVib3VuY2VkcmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgIHQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdLCBbZGF0YS1zY3JvbGxhYmxlLWhdLCAuc3QtY29udGVudC1pbm5lcicpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQuZm4udGtTaWRlYmFyU2l6ZVBjRGVtbyA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgdmFyIHQsIHNwY19kZW1vID0gdGhpcztcblxuICAgICAgICBpZiAoISBzcGNfZGVtby5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAkKGRvY3VtZW50KVxuICAgICAgICAgICAgLm9uKCdzaWRlYmFyLnNob3cnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJyNwYy1vcGVuJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NpZGViYXIuaGlkZGVuJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcjcGMtb3BlbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc3BjX2RlbW8ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgcyA9ICQoJy5zaWRlYmFyJyksIHZlID0gJCgnI3BjLXZhbHVlJyksIHYgPSB2ZS52YWwoKTtcbiAgICAgICAgICAgIHZlLmJsdXIoKTtcbiAgICAgICAgICAgIGlmICghIHYubGVuZ3RoIHx8IHYgPCAyNSkge1xuICAgICAgICAgICAgICAgIHYgPSAyNTtcbiAgICAgICAgICAgICAgICB2ZS52YWwodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzWyAwIF0uY2xhc3NOYW1lID0gc1sgMCBdLmNsYXNzTmFtZS5yZXBsYWNlKC9zaWRlYmFyLXNpemUtKFtcXGRdKylwYy9pZywgJ3NpZGViYXItc2l6ZS0nICsgdiArICdwYycpO1xuICAgICAgICAgICAgc2lkZWJhci5vcGVuKCdzaWRlYmFyLW1lbnUnKTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgICAgIHQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmNsb3NlKCdzaWRlYmFyLW1lbnUnKTtcbiAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLXNpemUtcGMtZGVtb1wiXScpLnRrU2lkZWJhclNpemVQY0RlbW8oKTtcblxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNraW4gPSAkLmNvb2tpZSgnc2tpbicpO1xuXG4gICAgaWYgKHR5cGVvZiBza2luID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNraW4gPSAnZGVmYXVsdCc7XG4gICAgfVxuICAgIHJldHVybiBza2luO1xufSk7IiwidmFyIGFzeW5jTG9hZGVyID0gcmVxdWlyZSgnLi9fYXN5bmMnKTtcblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgY2hhbmdlU2tpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNraW4gPSAkLmNvb2tpZShcInNraW5cIiksXG4gICAgICAgICAgICBmaWxlID0gJC5jb29raWUoXCJza2luLWZpbGVcIik7XG4gICAgICAgIGlmICh0eXBlb2Ygc2tpbiAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYXN5bmNMb2FkZXIoWyAnY3NzLycgKyBmaWxlICsgJy5taW4uY3NzJyBdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5yZW1vdmVQcm9wKCdkaXNhYmxlZCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkKCdbZGF0YS1za2luXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcpKSByZXR1cm47XG5cbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAkLmNvb2tpZShcInNraW5cIiwgJCh0aGlzKS5kYXRhKCdza2luJykpO1xuXG4gICAgICAgICQuY29va2llKFwic2tpbi1maWxlXCIsICQodGhpcykuZGF0YSgnZmlsZScpKTtcblxuICAgICAgICBjaGFuZ2VTa2luKCk7XG5cbiAgICB9KTtcblxuICAgIHZhciBza2luID0gJC5jb29raWUoXCJza2luXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBza2luICE9ICd1bmRlZmluZWQnICYmIHNraW4gIT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIGNoYW5nZVNraW4oKTtcbiAgICB9XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3RvZ2dsZScsIFsgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cnMudG9nZ2xlID09ICdncmlkYWxpY2lvdXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC50a0dyaWRhbGljaW91cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgndG9nZ2xlJywgWyAnJHRpbWVvdXQnLCBmdW5jdGlvbiAoJHRpbWVvdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRycy50b2dnbGUgPT0gJ2lzb3RvcGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC50a0lzb3RvcGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3Njcm9sbGFibGUnLCBbIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwudGtTY3JvbGxhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3Njcm9sbGFibGVIJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnRrU2Nyb2xsYWJsZSh7IGhvcml6b250YWw6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3RvZ2dsZScsIFsgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnRvZ2dsZSA9PSAnc2lkZWJhci1zaXplLXBjLWRlbW8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnRrU2lkZWJhclNpemVQY0RlbW8oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwicmVxdWlyZSgnLi9fc2Nyb2xsYWJsZScpO1xucmVxdWlyZSgnLi9faXNvdG9wZScpO1xucmVxdWlyZSgnLi9fZ3JpZGFsaWNpb3VzJyk7XG5yZXF1aXJlKCcuL19zaWRlYmFyLXBjJyk7IiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMuanMnKTtcbnJlcXVpcmUoJy4vX2dyaWRhbGljaW91cy5qcycpO1xucmVxdWlyZSgnLi9fc2Nyb2xsYWJsZS5qcycpO1xucmVxdWlyZSgnLi9fc2tpbnMnKTtcbnJlcXVpcmUoJy4vX2lzb3RvcGUnKTtcblxuLy8gU2lkZWJhciBQZXJjZW50YWdlIFNpemVzIERlbW9cbnJlcXVpcmUoJy4vX3NpZGViYXItcGMnKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgndG9nZ2xlJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnRvZ2dsZSAhPT0gJ2dvb2dsZS1tYXBzJykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC50a0dvb2dsZU1hcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGZpbmQgPSBmdW5jdGlvbiAobWFwRGF0YSwgbG9jYXRpb24sIG1hcmtlciwgbWFya2VyRGF0YSkge1xuXG4gICAgICAgIHZhciBldmVudERhdGEgPSAkLmV4dGVuZCh7fSwge21hcmtlcjogbWFya2VyfSwgbWFya2VyRGF0YSwgbWFwRGF0YSksXG4gICAgICAgICAgICBzdGF0ZSA9ICcnLFxuICAgICAgICAgICAgY291bnRyeSA9ICcnLFxuICAgICAgICAgICAgYWRkcmVzcyA9ICcnO1xuXG4gICAgICAgIG1hcERhdGEuY29udGFpbmVyLmdtYXAoJ3NlYXJjaCcsIHsnbG9jYXRpb24nOiBsb2NhdGlvbn0sIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcblxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ09LJykge1xuICAgICAgICAgICAgICAgIGFkZHJlc3MgPSByZXN1bHRzWyAwIF0uZm9ybWF0dGVkX2FkZHJlc3M7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHNbIDAgXS5hZGRyZXNzX2NvbXBvbmVudHMsIGZ1bmN0aW9uIChpLCB2KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2LnR5cGVzWyAwIF0gPT0gXCJhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFcIiB8fCB2LnR5cGVzWyAwIF0gPT0gXCJhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSB2LmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2LnR5cGVzWyAwIF0gPT0gXCJjb3VudHJ5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgPSB2LmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCBldmVudERhdGEsIHtzdGF0ZTogc3RhdGUsIGNvdW50cnk6IGNvdW50cnksIGFkZHJlc3M6IGFkZHJlc3N9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignbWFwLm1hcmtlci5maW5kJywgZXZlbnREYXRhKTtcblxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICB2YXIgYmluZEZpbmQgPSBmdW5jdGlvbihtYXJrZXIsIG1hcmtlckRhdGEsIGRhdGEpIHtcblxuICAgICAgICBpZiAodHlwZW9mIG1hcmtlckRhdGEub3BlbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbWFya2VyRGF0YS5vcGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBmaW5kKGRhdGEsIG1hcmtlckRhdGEubGF0TG5nLCBtYXJrZXIsIG1hcmtlckRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnZHJhZ2VuZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBmaW5kKGRhdGEsIGUubGF0TG5nLCB0aGlzLCBtYXJrZXJEYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZmluZChkYXRhLCBlLmxhdExuZywgdGhpcywgbWFya2VyRGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtYXAuaW5pdCcsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgIGlmIChkYXRhLmNvbnRhaW5lci5kYXRhKCdpZCcpID09ICdtYXAtZWRpdCcpIHtcblxuICAgICAgICAgICAgdmFyIG1hcmtlcnMgPSBkYXRhLmNvbnRhaW5lci5nbWFwKCdnZXQnLCAnbWFya2VycycpLFxuICAgICAgICAgICAgICAgIG1hcmtlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiZHJhZ2dhYmxlXCI6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1hcmtlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwib3BlblwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcInRlbXBsYXRlXCI6IFwidHBsLWVkaXRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpY29uXCI6IFwiYnVpbGRpbmctMDFcIlxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGRhdGEubWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgIG1hcmtlckRhdGEgPSAkLmV4dGVuZCh7fSwgbWFya2VyRGF0YSwge1wibGF0TG5nXCI6IGV2ZW50LmxhdExuZ30pO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1hcmtlciA9IGRhdGEuYWRkTWFya2VyKG1hcmtlcnMubGVuZ3RoLCBtYXJrZXJEYXRhLCBtYXJrZXJPcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIGJpbmRGaW5kKG1hcmtlciwgbWFya2VyRGF0YSwgZGF0YSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihkYXRhLml3LndpbmRvdywgJ2RvbXJlYWR5JywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgJCgnI21hcC1kZWxldGUtbWFya2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLml3LmNsb3NlKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1sgaWQgXS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkLmVhY2gobWFya2VycywgZnVuY3Rpb24oaSwgbWFya2VyKXtcblxuICAgICAgICAgICAgICAgIHZhciBtYXJrZXJEYXRhID0gbWFya2VyLmdldCgnY29udGVudCcpO1xuXG4gICAgICAgICAgICAgICAgYmluZEZpbmQobWFya2VyLCBtYXJrZXJEYXRhLCBkYXRhKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignbWFwLm1hcmtlci5maW5kJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgZGF0YS5tYXJrZXIuc2V0VGl0bGUoZGF0YS5hZGRyZXNzKTtcblxuICAgICAgICBpZiAoZGF0YS5pdy53aW5kb3cuaXNPcGVuID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIGRhdGEuaXcub3BlbihkYXRhLm1hcmtlci5nZXQoJ2lkJyksIGRhdGEpO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXJyYXlVbmlxdWUgPSBmdW5jdGlvbihhKSB7XG4gICAgICAgIHJldHVybiBhLnJlZHVjZShmdW5jdGlvbihwLCBjKSB7XG4gICAgICAgICAgICBpZiAocC5pbmRleE9mKGMpIDwgMCkgcC5wdXNoKGMpO1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9O1xuXG4gICAgdmFyIGZpbHRlciA9IGZ1bmN0aW9uKGRhdGEpe1xuXG4gICAgICAgIGRhdGEuaXcuY2xvc2UoKTtcbiAgICAgICAgZGF0YS5jb250YWluZXIuZ21hcCgnc2V0JywgJ2JvdW5kcycsIG51bGwpO1xuXG4gICAgICAgIHZhciBmaWx0ZXJzID0gW107XG5cbiAgICAgICAgJCgnI3JhZGlvcyA6Y2hlY2tlZCcpLmVhY2goZnVuY3Rpb24gKGksIGNoZWNrYm94KSB7XG4gICAgICAgICAgICBmaWx0ZXJzLnB1c2goJChjaGVja2JveCkudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGEuY29udGFpbmVyLmdtYXAoJ2ZpbmQnLCAnbWFya2VycycsIHtcbiAgICAgICAgICAgICAgICAncHJvcGVydHknOiAndGFncycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogZmlsdGVycyxcbiAgICAgICAgICAgICAgICAnb3BlcmF0b3InOiAnT1InXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAobWFya2VyLCBmb3VuZCkge1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRhaW5lci5nbWFwKCdhZGRCb3VuZHMnLCBtYXJrZXIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZShmb3VuZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQuZWFjaChkYXRhLmNvbnRhaW5lci5nbWFwKCdnZXQnLCAnbWFya2VycycpLCBmdW5jdGlvbiAoaSwgbWFya2VyKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jb250YWluZXIuZ21hcCgnYWRkQm91bmRzJywgbWFya2VyLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtYXAuaW5pdCcsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgIGlmIChkYXRhLmNvbnRhaW5lci5kYXRhKCdmaWx0ZXJzJykgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgdmFyIG1hcCA9IGRhdGEsXG4gICAgICAgICAgICAgICAgbWFya2VycyA9IGRhdGEuY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJyksXG4gICAgICAgICAgICAgICAgdGFncyA9IFtdLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlSWQgPSBkYXRhLmNvbnRhaW5lci5kYXRhKCdmaWx0ZXJzVGVtcGxhdGUnKSB8fCAnI21hcC1maWx0ZXJzLXRlbXBsYXRlJztcblxuICAgICAgICAgICAgJC5lYWNoKG1hcmtlcnMsIGZ1bmN0aW9uKGksIG1hcmtlcil7XG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hcmtlci50YWdzLCBmdW5jdGlvbihpLCB0YWcpe1xuICAgICAgICAgICAgICAgICAgICB0YWdzLnB1c2godGFnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0YWdzID0gYXJyYXlVbmlxdWUodGFncyk7XG5cbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSAkKHRlbXBsYXRlSWQpLmh0bWwoKTtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShzb3VyY2UpO1xuICAgICAgICAgICAgdmFyICRlbCA9ICQodGVtcGxhdGUoeyB0YWdzOiB0YWdzIH0pKTtcblxuICAgICAgICAgICAgJGVsLmluc2VydEFmdGVyKGRhdGEuY29udGFpbmVyKTtcblxuICAgICAgICAgICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi8uLi8uLi9sYXlvdXQvanMvX3NraW4nKSgpO1xuXG4gICAgICAgICAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXScsICRlbCkubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAwLFxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgZmlsdGVyKGRhdGEpO1xuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICcjcmFkaW9zIDpjaGVja2JveCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgZmlsdGVyKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgY2VudGVyV2luZG93ID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgbWFwLCBkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEubGF0ICYmIGRhdGEubG5nKSB7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5nbWFwKCdvcHRpb24nLCAnY2VudGVyJywgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhkYXRhLmxhdCwgZGF0YS5sbmcpKTtcblxuICAgICAgICAgICAgbWFwLnBhbkJ5KDAsIC0xNzApO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdmFyIGNlbnRlck1hcCA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRhdGEpIHtcblxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA9PT0gMikge1xuXG4gICAgICAgICAgICBjb250YWluZXIuZ21hcCgnb3B0aW9uJywgJ2NlbnRlcicsIG5ldyBnb29nbGUubWFwcy5MYXRMbmcoZGF0YVsgMCBdLCBkYXRhWyAxIF0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHZhciByZXNpemUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBtYXAsIHdpbmRvd0RhdGEsIG1hcERhdGEpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGdvb2dsZSA9PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCAncmVzaXplJyk7XG5cbiAgICAgICAgaWYgKCEgY2VudGVyTWFwKGNvbnRhaW5lciwgbWFwRGF0YSkpIGNlbnRlcldpbmRvdyhjb250YWluZXIsIG1hcCwgd2luZG93RGF0YSk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2VudGVyV2luZG93OiBjZW50ZXJXaW5kb3csXG4gICAgICAgIGNlbnRlck1hcDogY2VudGVyTWFwLFxuICAgICAgICByZXNpemU6IHJlc2l6ZVxuICAgIH07XG5cbn07IiwiZnVuY3Rpb24gbG9hZFNjcmlwdCgpIHtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcz92PTMuZXhwJicgK1xuICAgICdjYWxsYmFjaz1pbml0R29vZ2xlTWFwcyc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xufVxuXG53aW5kb3cub25sb2FkID0gbG9hZFNjcmlwdDtcblxuZnVuY3Rpb24gaW5pdFNjcmlwdHMoKSB7XG4gICAgdmFyICRzY3JpcHRzID0gW1xuICAgICAgICBcImpzL3BsdWdpbnMvbWFwc19nb29nbGUvanF1ZXJ5LXVpLW1hcC91aS9qcXVlcnkudWkubWFwLmpzXCIsXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAuZXh0ZW5zaW9ucy5qc1wiLFxuICAgICAgICBcImpzL3BsdWdpbnMvbWFwc19nb29nbGUvanF1ZXJ5LXVpLW1hcC91aS9qcXVlcnkudWkubWFwLnNlcnZpY2VzLmpzXCIsXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAubWljcm9kYXRhLmpzXCIsXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAubWljcm9mb3JtYXQuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvdWkvanF1ZXJ5LnVpLm1hcC5vdmVybGF5cy5qc1wiLFxuICAgICAgICBcImpzL3BsdWdpbnMvbWFwc19nb29nbGUvanF1ZXJ5LXVpLW1hcC91aS9qcXVlcnkudWkubWFwLnJkZmEuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvYWRkb25zL2luZm9ib3hfcGFja2VkLmpzXCIsXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL2FkZG9ucy9tYXJrZXJjbHVzdGVyZXIubWluLmpzXCJcbiAgICBdO1xuXG4gICAgJC5lYWNoKCRzY3JpcHRzLCBmdW5jdGlvbiAoaywgdikge1xuICAgICAgICBpZiAoJCgnW3NyYz1cIicgKyB2ICsgJ1wiXScpLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgICAgIHZhciBzY3JpcHROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgc2NyaXB0Tm9kZS5zcmMgPSB2O1xuICAgICAgICAkKCdoZWFkJykucHJlcGVuZCgkKHNjcmlwdE5vZGUpKTtcbiAgICB9KTtcblxuICAgICQuZXh0ZW5kKCQudWkuZ21hcC5wcm90b3R5cGUsIHtcbiAgICAgICAgcGFnaW5hdGlvbjogZnVuY3Rpb24gKHByb3AsIG1hcERhdGEpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSAkKFwiI21hcC1wYWdpbmF0aW9uXCIpLmh0bWwoKTtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShzb3VyY2UpO1xuICAgICAgICAgICAgdmFyICRlbCA9ICQodGVtcGxhdGUoKSk7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcywgaSA9IDA7XG4gICAgICAgICAgICBwcm9wID0gcHJvcCB8fCAndGl0bGUnO1xuICAgICAgICAgICAgc2VsZi5zZXQoJ3BhZ2luYXRpb24nLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIGlmIChhKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBpICsgYjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSBzZWxmLmdldCgnbWFya2VycycpWyBpIF07XG4gICAgICAgICAgICAgICAgICAgIG1hcERhdGEuaXcub3BlbihpLCBtLmdldCgnY29udGVudCcpKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5kaXNwbGF5JykudGV4dChtWyBwcm9wIF0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldCgnbWFwJykucGFuVG8obS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZ2V0KCdwYWdpbmF0aW9uJykodHJ1ZSwgMCk7XG4gICAgICAgICAgICAkZWwuZmluZCgnLmJhY2stYnRuJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5nZXQoJ3BhZ2luYXRpb24nKSgoaSA+IDApLCAtIDEsIHRoaXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkZWwuZmluZCgnLmZ3ZC1idG4nKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLmdldCgncGFnaW5hdGlvbicpKChpIDwgc2VsZi5nZXQoJ21hcmtlcnMnKS5sZW5ndGggLSAxKSwgMSwgdGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuYWRkQ29udHJvbCgkZWwsIGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvblsgbWFwRGF0YS5vcHRpb25zLnBhZ2luYXRpb25Qb3NpdGlvbiBdKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG52YXIgbGlicmFyeSA9IHJlcXVpcmUoJy4vX2xpYnJhcnkuanMnKSgpO1xuXG4vLyBIb2xkcyBnb29nbGUgbWFwcyBzdHlsZXNcbnZhciBzdHlsZXMgPSB7XG4gICAgXCJsaWdodC1ncmV5XCI6IHJlcXVpcmUoJy4vc3R5bGVzL19saWdodC1ncmV5LmpzJyksXG4gICAgXCJsaWdodC1tb25vY2hyb21lXCI6IHJlcXVpcmUoJy4vc3R5bGVzL19saWdodC1tb25vY2hyb21lLmpzJyksXG4gICAgXCJjb29sLWdyZXlcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2Nvb2wtZ3JleS5qcycpLFxuICAgIFwiYmx1ZS1ncmF5XCI6IHJlcXVpcmUoJy4vc3R5bGVzL19ibHVlLWdyYXkuanMnKSxcbiAgICBcInBhcGVyXCI6IHJlcXVpcmUoJy4vc3R5bGVzL19wYXBlci5qcycpLFxuICAgIFwiYXBwbGVcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2FwcGxlLmpzJyksXG4gICAgXCJsaWdodC1ncmVlblwiOiByZXF1aXJlKCcuL3N0eWxlcy9fbGlnaHQtZ3JlZW4uanMnKSxcbiAgICBcImxlbW9uLXRyZWVcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2xlbW9uLXRyZWUuanMnKSxcbiAgICBcImNsZWFuLWN1dFwiOiByZXF1aXJlKCcuL3N0eWxlcy9fY2xlYW4tY3V0LmpzJyksXG4gICAgXCJuYXR1cmVcIjogcmVxdWlyZSgnLi9zdHlsZXMvX25hdHVyZS5qcycpXG59O1xuXG4vLyBQcm9jZXNzIHRoZSBpbmZvV2luZG93IGNvbnRlbnQgdmlhIEhhbmRsZWJhcnMgdGVtcGxhdGVzXG52YXIgaW5mb1dpbmRvd0NvbnRlbnQgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgdmFyIHNvdXJjZSA9ICQoXCIjXCIgKyBtYXJrZXIudGVtcGxhdGUpLmh0bWwoKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoc291cmNlKTtcbiAgICByZXR1cm4gdGVtcGxhdGUobWFya2VyKTtcbn07XG5cbi8qKlxuICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gKi9cbiQuZm4udGtHb29nbGVNYXAgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgdmFyIGNvbnRhaW5lciA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIGdvb2dsZSA9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgSW5mb0JveCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb250YWluZXIudGtHb29nbGVNYXAoKTtcbiAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIG1hcFpvb21Qb3NpdGlvbjogY29udGFpbmVyLmRhdGEoJ3pvb21Qb3NpdGlvbicpIHx8IFwiVE9QX0xFRlRcIixcbiAgICAgICAgbWFwWm9vbTogY29udGFpbmVyLmRhdGEoJ3pvb20nKSB8fCAxNixcbiAgICAgICAgbWFwU3R5bGU6IGNvbnRhaW5lci5kYXRhKCdzdHlsZScpIHx8IFwibGlnaHQtZ3JleVwiLFxuICAgICAgICBtYXBUeXBlOiBjb250YWluZXIuZGF0YSgndHlwZScpIHx8IFwiUk9BRE1BUFwiLFxuICAgICAgICBmaWxlOiBjb250YWluZXIuZGF0YSgnZmlsZScpLFxuICAgICAgICBjZW50ZXI6IGNvbnRhaW5lci5kYXRhKCdjZW50ZXInKSA/IGNvbnRhaW5lci5kYXRhKCdjZW50ZXInKS5zcGxpdChcIixcIikgOiBmYWxzZSxcbiAgICAgICAgcGFnaW5hdGlvbjogY29udGFpbmVyLmRhdGEoJ3BhZ2luYXRpb24nKSB8fCBmYWxzZSxcbiAgICAgICAgcGFnaW5hdGlvblBvc2l0aW9uOiBjb250YWluZXIuZGF0YSgncGFnaW5hdGlvblBvc2l0aW9uJykgfHwgJ1RPUF9MRUZUJ1xuICAgIH07XG5cbiAgICB2YXIgbWFwRGF0YTtcblxuICAgIC8vIHByb3ZpZGUgYSBkZWZhdWx0IG9iamVjdCBmb3IgZGF0YSBjb2xsZWN0ZWQgZnJvbSB0aGUgY3VycmVudGx5IG9wZW5lZCBpbmZvV2luZG93XG4gICAgdmFyIGluZm9XaW5kb3dEYXRhID0ge1xuICAgICAgICBsYXQ6IGZhbHNlLFxuICAgICAgICBsbmc6IGZhbHNlXG4gICAgfTtcblxuICAgIHZhciBpbmZvV2luZG93T3BlbiA9IGZ1bmN0aW9uIChpLCBtYXJrZXIpIHtcblxuICAgICAgICB2YXIgbWFya2VySW5zdCA9IGNvbnRhaW5lci5nbWFwKCdnZXQnLCAnbWFya2VycycpWyBpIF07XG5cbiAgICAgICAgaW5mb1dpbmRvdy5zZXRDb250ZW50KGluZm9XaW5kb3dDb250ZW50KG1hcmtlcikpO1xuICAgICAgICBpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXJJbnN0KTtcbiAgICAgICAgaW5mb1dpbmRvdy5pc09wZW4gPSBpO1xuXG4gICAgICAgIGluZm9XaW5kb3dEYXRhID0ge1xuICAgICAgICAgICAgbGF0OiBtYXJrZXIubGF0aXR1ZGUsXG4gICAgICAgICAgICBsbmc6IG1hcmtlci5sb25naXR1ZGVcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGluZm9XaW5kb3dDbG9zZSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgaW5mb1dpbmRvdy5pc09wZW4gIT0gJ3VuZGVmaW5lZCcgJiYgaW5mb1dpbmRvdy5pc09wZW4gPT09IGkpIHtcbiAgICAgICAgICAgIGluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIGluZm9XaW5kb3cuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qIEluZm9Cb3ggKi9cbiAgICB2YXIgaW5mb1dpbmRvdyA9IG5ldyBJbmZvQm94KHtcbiAgICAgICAgbWF4V2lkdGg6IDI0MCxcbiAgICAgICAgYWxpZ25Cb3R0b206IHRydWVcbiAgICB9KTtcblxuICAgIHZhciBhZGRNYXJrZXIgPSBmdW5jdGlvbiAoaSwgbWFya2VyLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBpY29uQmFzZSA9ICdpbWFnZXMvbWFya2Vycy8nO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSB0eXBlb2YgbWFya2VyLmxhdExuZyAhPT0gJ3VuZGVmaW5lZCcgPyBtYXJrZXIubGF0TG5nIDogZmFsc2U7XG4gICAgICAgIGlmICghIHBvc2l0aW9uICYmIHR5cGVvZiBtYXJrZXIubGF0aXR1ZGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtYXJrZXIubG9uZ2l0dWRlICE9PSAndW5kZWZpbmVkJykgcG9zaXRpb24gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG1hcmtlci5sYXRpdHVkZSwgbWFya2VyLmxvbmdpdHVkZSk7XG4gICAgICAgIGlmICghIHBvc2l0aW9uKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIG1hcmtlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcImlkXCI6IGksXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHBvc2l0aW9uLFxuICAgICAgICAgICAgXCJkcmFnZ2FibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaWNvblwiOiBpY29uQmFzZSArIG1hcmtlci5pY29uICsgXCIucG5nXCJcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcpIG1hcmtlck9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgbWFya2VyT3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIG9wZW4gPSB0eXBlb2YgbWFya2VyLm9wZW4gIT09ICd1bmRlZmluZWQnICYmIG1hcmtlci5vcGVuID09PSB0cnVlO1xuXG4gICAgICAgIGNvbnRhaW5lci5nbWFwKCdhZGRNYXJrZXInLCBtYXJrZXJPcHRpb25zKTtcblxuICAgICAgICB2YXIgbWFya2VySW5zdCA9IGNvbnRhaW5lci5nbWFwKCdnZXQnLCAnbWFya2VycycpWyBpIF07XG5cbiAgICAgICAgbWFya2VySW5zdC5zZXRUaXRsZShtYXJrZXIudGl0bGUpO1xuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlckluc3QsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghIGluZm9XaW5kb3dDbG9zZShpKSkge1xuICAgICAgICAgICAgICAgIGluZm9XaW5kb3dPcGVuKGksIG1hcmtlcik7XG4gICAgICAgICAgICAgICAgbGlicmFyeS5jZW50ZXJXaW5kb3coY29udGFpbmVyLCBtYXAsIGluZm9XaW5kb3dEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VySW5zdCwgJ2RyYWdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGF0ID0gbWFya2VySW5zdC5nZXRQb3NpdGlvbigpLmxhdCgpO1xuICAgICAgICAgICAgdmFyIGxuZyA9IG1hcmtlckluc3QuZ2V0UG9zaXRpb24oKS5sbmcoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcImxhdGl0dWRlXCI6ICcgKyBsYXQgKyAnLCBcImxvbmdpdHVkZVwiOiAnICsgbG5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1hcmtlckRhdGEgPSAkLmV4dGVuZCh7fSwgbWFya2VyLCB7XG4gICAgICAgICAgICBcImlkXCI6IGksXG4gICAgICAgICAgICBcImxhdExuZ1wiOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG1hcmtlci5sYXRpdHVkZSwgbWFya2VyLmxvbmdpdHVkZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFya2VySW5zdC5zZXQoJ2NvbnRlbnQnLCBtYXJrZXJEYXRhKTtcblxuICAgICAgICBpZiAob3BlbikgaW5mb1dpbmRvd09wZW4oaSwgbWFya2VyKTtcblxuICAgICAgICByZXR1cm4gbWFya2VySW5zdDtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyLmdtYXAoXG4gICAgICAgIHtcbiAgICAgICAgICAgICd6b29tQ29udHJvbCc6IHRydWUsXG4gICAgICAgICAgICAnem9vbUNvbnRyb2xPcHRpb25zJzoge1xuICAgICAgICAgICAgICAgICdzdHlsZSc6IGdvb2dsZS5tYXBzLlpvb21Db250cm9sU3R5bGUuU01BTEwsXG4gICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uWyBvcHRpb25zLm1hcFpvb21Qb3NpdGlvbiBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3BhbkNvbnRyb2wnOiBmYWxzZSxcbiAgICAgICAgICAgICdzdHJlZXRWaWV3Q29udHJvbCc6IGZhbHNlLFxuICAgICAgICAgICAgJ21hcFR5cGVDb250cm9sJzogZmFsc2UsXG4gICAgICAgICAgICAnb3ZlcnZpZXdNYXBDb250cm9sJzogZmFsc2UsXG4gICAgICAgICAgICAnc2Nyb2xsd2hlZWwnOiBmYWxzZSxcbiAgICAgICAgICAgICdtYXBUeXBlSWQnOiBnb29nbGUubWFwcy5NYXBUeXBlSWRbIG9wdGlvbnMubWFwVHlwZSBdLFxuICAgICAgICAgICAgJ3pvb20nOiBvcHRpb25zLm1hcFpvb20sXG4gICAgICAgICAgICAnc3R5bGVzJzogc3R5bGVzWyBvcHRpb25zLm1hcFN0eWxlIF1cbiAgICAgICAgfSlcbiAgICAgICAgLmJpbmQoJ2luaXQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIG1hcERhdGEgPSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgICAgICBhZGRNYXJrZXI6IGFkZE1hcmtlcixcbiAgICAgICAgICAgICAgICBsaWJyYXJ5OiBsaWJyYXJ5LFxuICAgICAgICAgICAgICAgIGl3OiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGluZm9XaW5kb3dEYXRhLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3c6IGluZm9XaW5kb3csXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGluZm9XaW5kb3dDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBvcGVuOiBpbmZvV2luZG93T3BlbixcbiAgICAgICAgICAgICAgICAgICAgY2xvc2U6IGluZm9XaW5kb3dDbG9zZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmZpbGUpIHtcblxuICAgICAgICAgICAgICAgICQuZ2V0SlNPTihvcHRpb25zLmZpbGUsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEubWFya2VycywgZnVuY3Rpb24gKGksIG1hcmtlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSB0eXBlb2YgbWFya2VyLm9wdGlvbnMgIT09ICd1bmRlZmluZWQnID8gbWFya2VyLm9wdGlvbnMgOiB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE1hcmtlcihpLCBtYXJrZXIsIG8pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2UobWFwLCAnaWRsZScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGlicmFyeS5yZXNpemUoY29udGFpbmVyLCBtYXAsIGluZm9XaW5kb3dEYXRhLCBvcHRpb25zLmNlbnRlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuZ21hcCgncGFnaW5hdGlvbicsICd0aXRsZScsIG1hcERhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmNlbnRlck1hcChjb250YWluZXIsIG9wdGlvbnMuY2VudGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXJPbmNlKG1hcCwgJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdtYXAuaW5pdCcsIG1hcERhdGEpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoaW5mb1dpbmRvdywgJ2RvbXJlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpdyA9ICQoJy5pbmZvQm94Jyk7XG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxPZmZzZXQ6IG5ldyBnb29nbGUubWFwcy5TaXplKC0gTWF0aC5hYnMoaXcud2lkdGgoKSAvIDIpLCAtIDQ1KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICAgICAkKCcuY292ZXInLCBpdykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50a0NvdmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIHZhciBtYXAgPSBjb250YWluZXIuZ21hcCgnZ2V0JywgJ21hcCcpO1xuXG4gICAgdmFyIHQ7XG4gICAgJCh3aW5kb3cpLm9uKCdkZWJvdW5jZWRyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGlicmFyeS5yZXNpemUoY29udGFpbmVyLCBtYXAsIGluZm9XaW5kb3dEYXRhLCBvcHRpb25zLmNlbnRlcik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBoYW5kbGUgbWFwcyBpbiBjb2xsYXBzaWJsZXNcbiAgICAkKCcuY29sbGFwc2UnKS5vbignc2hvd24uYnMuY29sbGFwc2UnLCBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoJChjb250YWluZXIsIHRoaXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgbGlicmFyeS5yZXNpemUoY29udGFpbmVyLCBtYXAsIGluZm9XaW5kb3dEYXRhLCBvcHRpb25zLmNlbnRlcik7XG4gICAgICAgIH1cbiAgICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaW5pdFNjcmlwdHMoKTtcblxuICAgIC8qXG4gICAgICogQ2x1c3RlcmluZ1xuICAgICAqL1xuICAgIGlmICgkKCcjZ29vZ2xlLW1hcC1jbHVzdGVyaW5nJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gYmluZCB0aGUgbWFwIHdpdGggdGhlIFwiaW5pdFwiIGV2ZW50IG90aGVyd2lzZSBib3VuZHMgd2lsbCBiZSBudWxsXG4gICAgICAgICQoJyNnb29nbGUtbWFwLWNsdXN0ZXJpbmcnKS5nbWFwKHsnem9vbSc6IDIsICdkaXNhYmxlRGVmYXVsdFVJJzogdHJ1ZX0pLmJpbmQoJ2luaXQnLCBmdW5jdGlvbiAoZXZ0LCBtYXApIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgICB2YXIgc291dGhXZXN0ID0gYm91bmRzLmdldFNvdXRoV2VzdCgpO1xuICAgICAgICAgICAgdmFyIG5vcnRoRWFzdCA9IGJvdW5kcy5nZXROb3J0aEVhc3QoKTtcbiAgICAgICAgICAgIHZhciBsbmdTcGFuID0gbm9ydGhFYXN0LmxuZygpIC0gc291dGhXZXN0LmxuZygpO1xuICAgICAgICAgICAgdmFyIGxhdFNwYW4gPSBub3J0aEVhc3QubGF0KCkgLSBzb3V0aFdlc3QubGF0KCk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9wZW5JbmZvV2luZG93KCkge1xuICAgICAgICAgICAgICAgICQoJyNnb29nbGUtbWFwLWNsdXN0ZXJpbmcnKS5nbWFwKCdvcGVuSW5mb1dpbmRvdycsIHtjb250ZW50OiAnSGVsbG8gd29ybGQhJ30sIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDA7IGkgKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF0ID0gc291dGhXZXN0LmxhdCgpICsgbGF0U3BhbiAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICAgICAgdmFyIGxuZyA9IHNvdXRoV2VzdC5sbmcoKSArIGxuZ1NwYW4gKiBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgICAgICQoJyNnb29nbGUtbWFwLWNsdXN0ZXJpbmcnKS5nbWFwKCdhZGRNYXJrZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpXG4gICAgICAgICAgICAgICAgfSkuY2xpY2sob3BlbkluZm9XaW5kb3cpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcjZ29vZ2xlLW1hcC1jbHVzdGVyaW5nJykuZ21hcCgnc2V0JywgJ01hcmtlckNsdXN0ZXJlcicsIG5ldyBNYXJrZXJDbHVzdGVyZXIobWFwLCAkKHRoaXMpLmdtYXAoJ2dldCcsICdtYXJrZXJzJykpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59O1xuXG4oZnVuY3Rpb24oJCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKGRvY3VtZW50KS5vbignbWFwLmluaXQnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICB2YXIgc3R5bGVUcGwgPSAkKCcjbWFwLXN0eWxlLXN3aXRjaCcpLFxuICAgICAgICAgICAgdG9nZ2xlU3R5bGVXcmFwcGVyID0gJCgnW2RhdGEtdG9nZ2xlPVwibWFwLXN0eWxlLXN3aXRjaFwiXScpO1xuXG4gICAgICAgIGlmIChzdHlsZVRwbC5sZW5ndGggJiYgdG9nZ2xlU3R5bGVXcmFwcGVyLmxlbmd0aCkge1xuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0b2dnbGVTdHlsZVdyYXBwZXIuZGF0YSgndGFyZ2V0JykpO1xuXG4gICAgICAgICAgICBpZiAoISB0YXJnZXQpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKGRhdGEuY29udGFpbmVyLmlzKHRhcmdldCkpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzID0gc3R5bGVUcGwuaHRtbCgpO1xuICAgICAgICAgICAgICAgIHZhciB0ID0gSGFuZGxlYmFycy5jb21waWxlKHMpO1xuXG4gICAgICAgICAgICAgICAgdG9nZ2xlU3R5bGVXcmFwcGVyLmh0bWwodCh7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlczogc3R5bGVzXG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgJCgnc2VsZWN0JywgdG9nZ2xlU3R5bGVXcmFwcGVyKS52YWwoZGF0YS5vcHRpb25zLm1hcFN0eWxlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3RwaWNrZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAkKCcuc2VsZWN0cGlja2VyJywgdG9nZ2xlU3R5bGVXcmFwcGVyKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0cGlja2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJCh0aGlzKS5kYXRhKCd3aWR0aCcpIHx8ICcxMDAlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi8uLi8uLi9sYXlvdXQvanMvX3NraW4nKSgpO1xuXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0nLCB0b2dnbGVTdHlsZVdyYXBwZXIpLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKCdzZWxlY3QnLCB0b2dnbGVTdHlsZVdyYXBwZXIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IHR5cGVvZiBzdHlsZXNbICQodGhpcykudmFsKCkgXSA/IHN0eWxlc1sgJCh0aGlzKS52YWwoKSBdIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIHN0eWxlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmdtYXAoJ29wdGlvbicsICdzdHlsZXMnLCBzdHlsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImdvb2dsZS1tYXBzXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCh0aGlzKS50a0dvb2dsZU1hcCgpO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG5cbnJlcXVpcmUoJy4vX2VkaXQnKTtcbnJlcXVpcmUoJy4vX2ZpbHRlcnMnKTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmN2YxZGZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2QwZTNiNFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsLnRlcnJhaW5cIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuYnVzaW5lc3NcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5tZWRpY2FsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmJkM2RhXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIiwgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2JkZTZhYlwifSBdfSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZTE1ZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNlZmQxNTFcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmZmZmZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcImJsYWNrXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5zdGF0aW9uLmFpcnBvcnRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2NmYjJkYlwifSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLCBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNhMmRhZjJcIn0gXX0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSwge1wiY29sb3JcIjogXCIjYjVjYmU0XCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2VmZWZlZlwifSBdfSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiM4M2E1YjBcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjYmRjZGQzXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZTNlZWQzXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0sIHtcImxpZ2h0bmVzc1wiOiAzM30gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCJ9LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSwge1wibGlnaHRuZXNzXCI6IDIwfSBdXG59LCB7fSwge1wiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsIFwic3R5bGVyc1wiOiBbIHtcImxpZ2h0bmVzc1wiOiAyMH0gXX0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wibGlnaHRuZXNzXCI6IDEwMH0sIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0sIHtcImNvbG9yXCI6IFwiI0M2RTJGRlwifSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLCBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLCBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNDNUUzQkZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjRDFEMUI4XCJ9IF1cbn0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIiwgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLCBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLCBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjMDBhYWZmXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IC0gMTAwfSwge1wiZ2FtbWFcIjogMi4xNX0sIHtcImxpZ2h0bmVzc1wiOiAxMn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9LCB7XCJsaWdodG5lc3NcIjogMjR9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLCBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIiwgXCJzdHlsZXJzXCI6IFsge1wibGlnaHRuZXNzXCI6IDU3fSBdfSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjZmZmZmZmXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IC0gMTAwfSwge1wibGlnaHRuZXNzXCI6IDEwMH0sIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjZmZmZmZmXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IC0gMTAwfSwge1wibGlnaHRuZXNzXCI6IDEwMH0sIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2ZmZTk0ZlwifSwge1wic2F0dXJhdGlvblwiOiAxMDB9LCB7XCJsaWdodG5lc3NcIjogNH0sIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNmZmU5NGZcIn0sIHtcInNhdHVyYXRpb25cIjogMTAwfSwge1wibGlnaHRuZXNzXCI6IDR9LCB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiMzMzMzMzNcIn0sIHtcInNhdHVyYXRpb25cIjogLSAxMDB9LCB7XCJsaWdodG5lc3NcIjogLSA3NH0sIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2JhZjRjNFwifSwge1wic2F0dXJhdGlvblwiOiAxMH0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNlZmZlZmRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIiwgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLCBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNlOWU5ZTlcIn0sIHtcImxpZ2h0bmVzc1wiOiAxN30gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmNWY1ZjVcIn0sIHtcImxpZ2h0bmVzc1wiOiAyMH0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSwge1wibGlnaHRuZXNzXCI6IDE3fSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmZmZmZmZcIn0sIHtcImxpZ2h0bmVzc1wiOiAyOX0sIHtcIndlaWdodFwiOiAwLjJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSwge1wibGlnaHRuZXNzXCI6IDE4fSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmZmZmZmZcIn0sIHtcImxpZ2h0bmVzc1wiOiAxNn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmNWY1ZjVcIn0sIHtcImxpZ2h0bmVzc1wiOiAyMX0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2RlZGVkZVwifSwge1wibGlnaHRuZXNzXCI6IDIxfSBdXG59LCB7XG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LnN0cm9rZVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSwge1wiY29sb3JcIjogXCIjZmZmZmZmXCJ9LCB7XCJsaWdodG5lc3NcIjogMTZ9IF1cbn0sIHtcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInNhdHVyYXRpb25cIjogMzZ9LCB7XCJjb2xvclwiOiBcIiMzMzMzMzNcIn0sIHtcImxpZ2h0bmVzc1wiOiA0MH0gXVxufSwge1wiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLCBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmMmYyZjJcIn0sIHtcImxpZ2h0bmVzc1wiOiAxOX0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmVmZWZlXCJ9LCB7XCJsaWdodG5lc3NcIjogMjB9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmVmZWZlXCJ9LCB7XCJsaWdodG5lc3NcIjogMTd9LCB7XCJ3ZWlnaHRcIjogMS4yfSBdXG59IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUubG9jYWxpdHlcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiIzJjMmUzM1wifSwge1wic2F0dXJhdGlvblwiOiA3fSwge1wibGlnaHRuZXNzXCI6IDE5fSwge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNmZmZmZmZcIn0sIHtcInNhdHVyYXRpb25cIjogLSAxMDB9LCB7XCJsaWdodG5lc3NcIjogMTAwfSwge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2ZmZmZmZlwifSwge1wic2F0dXJhdGlvblwiOiAtIDEwMH0sIHtcImxpZ2h0bmVzc1wiOiAxMDB9LCB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNiYmMwYzRcIn0sIHtcInNhdHVyYXRpb25cIjogLSA5M30sIHtcImxpZ2h0bmVzc1wiOiAzMX0sIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjYmJjMGM0XCJ9LCB7XCJzYXR1cmF0aW9uXCI6IC0gOTN9LCB7XCJsaWdodG5lc3NcIjogMzF9LCB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNiYmMwYzRcIn0sIHtcInNhdHVyYXRpb25cIjogLSA5M30sIHtcImxpZ2h0bmVzc1wiOiAtIDJ9LCB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjZTllYmVkXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IC0gOTB9LCB7XCJsaWdodG5lc3NcIjogLSA4fSwge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNlOWViZWRcIn0sIHtcInNhdHVyYXRpb25cIjogMTB9LCB7XCJsaWdodG5lc3NcIjogNjl9LCB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjZTllYmVkXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IC0gNzh9LCB7XCJsaWdodG5lc3NcIjogNjd9LCB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI0ZGQTgwMFwifSwge1wic2F0dXJhdGlvblwiOiAwfSwge1wibGlnaHRuZXNzXCI6IDB9LCB7XCJnYW1tYVwiOiAxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiM1M0ZGMDBcIn0sIHtcInNhdHVyYXRpb25cIjogLSA3M30sIHtcImxpZ2h0bmVzc1wiOiA0MH0sIHtcImdhbW1hXCI6IDF9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNGQkZGMDBcIn0sIHtcInNhdHVyYXRpb25cIjogMH0sIHtcImxpZ2h0bmVzc1wiOiAwfSwge1wiZ2FtbWFcIjogMX0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiIzAwRkZGRFwifSwge1wic2F0dXJhdGlvblwiOiAwfSwge1wibGlnaHRuZXNzXCI6IDMwfSwge1wiZ2FtbWFcIjogMX0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiMwMEJGRkZcIn0sIHtcInNhdHVyYXRpb25cIjogNn0sIHtcImxpZ2h0bmVzc1wiOiA4fSwge1wiZ2FtbWFcIjogMX0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjNjc5NzE0XCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDMzLjR9LCB7XCJsaWdodG5lc3NcIjogLSAyNS40fSwge1wiZ2FtbWFcIjogMX0gXVxufSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0sIHtcImh1ZVwiOiBcIiMwMDY2ZmZcIn0sIHtcInNhdHVyYXRpb25cIjogNzR9LCB7XCJsaWdodG5lc3NcIjogMTAwfSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLCBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSwge1wid2VpZ2h0XCI6IDAuNn0sIHtcInNhdHVyYXRpb25cIjogLSA4NX0sIHtcImxpZ2h0bmVzc1wiOiA2MX0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIiwgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSwge1wiY29sb3JcIjogXCIjNWY5NGZmXCJ9LCB7XCJsaWdodG5lc3NcIjogMjZ9LCB7XCJnYW1tYVwiOiA1Ljg2fSBdXG59IF07IiwiKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgICAgICAuZGlyZWN0aXZlKCdvd2xCYXNpYycsIFsgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQycsXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwudGtPd2xEZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBdKVxuICAgICAgICAuZGlyZWN0aXZlKCdvd2xNaXhlZCcsIFsgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQycsXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwudGtPd2xNaXhlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gXSlcbiAgICAgICAgLmRpcmVjdGl2ZSgnb3dsUHJldmlldycsIFsgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQycsXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwudGtPd2xQcmV2aWV3KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3NsaWNrQmFzaWMnLCBbICckdGltZW91dCcsIGZ1bmN0aW9uICgkdGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0MnLFxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnRrU2xpY2tEZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBdKTtcblxufSkoKTsiLCJyZXF1aXJlKCcuL19vd2wnKTtcbnJlcXVpcmUoJy4vX3NsaWNrJyk7IiwicmVxdWlyZSgnLi9vd2wvbWFpbicpO1xucmVxdWlyZSgnLi9zbGljay9fZGVmYXVsdCcpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a093bERlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgYyA9IHRoaXM7XG4gICAgICAgIGMub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBjLmRhdGEoJ2l0ZW1zJykgfHwgNCxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBjLmRhdGEoJ2l0ZW1zTGcnKSB8fCA0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGMuZGF0YSgnaXRlbXNNZycpIHx8IDNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogYy5kYXRhKCdpdGVtc1NtJykgfHwgM1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNDgwOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBjLmRhdGEoJ2l0ZW1zWHMnKSB8fCAyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAwOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ0bDogdGhpcy5kYXRhKCdydGwnKSxcbiAgICAgICAgICAgIGFmdGVyVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKFwiLm93bC1iYXNpY1wiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50a093bERlZmF1bHQoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtPd2xNaXhlZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgaXRlbXM6IDIsXG4gICAgICAgICAgICBuYXY6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIHJ0bDogdGhpcy5kYXRhKCdydGwnKSxcbiAgICAgICAgICAgIG5hdlRleHQ6IFsgJzxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1sZWZ0XCI+PC9pPicsICc8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+JyBdLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZToge1xuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoXCIub3dsLW1peGVkXCIpLnRrT3dsTWl4ZWQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBzeW5jUG9zaXRpb24gPSBmdW5jdGlvbiAoZSwgdGFyZ2V0KSB7XG4gICAgICAgIGlmIChlLm5hbWVzcGFjZSAmJiBlLnByb3BlcnR5Lm5hbWUgPT09ICdpdGVtcycpIHtcbiAgICAgICAgICAgIHRhcmdldC50cmlnZ2VyKCd0by5vd2wuY2Fyb3VzZWwnLCBbZS5pdGVtLmluZGV4LCAzMDAsIHRydWVdKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrT3dsUHJldmlldyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuZGF0YSgnc3luYycpKSxcbiAgICAgICAgICAgIHByZXZpZXcgPSB0aGlzLFxuICAgICAgICAgICAgcnRsID0gdGhpcy5kYXRhKCdydGwnKTtcblxuICAgICAgICBpZiAoISB0YXJnZXQubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vd2xDYXJvdXNlbCh7XG4gICAgICAgICAgICBpdGVtczogMSxcbiAgICAgICAgICAgIHNsaWRlU3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZTogMjAwLFxuICAgICAgICAgICAgcnRsOiBydGwsXG4gICAgICAgICAgICBuYXY6IHRydWUsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uVGV4dDogWyAnPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+JywgJzxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4nIF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignY2hhbmdlLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgc3luY1Bvc2l0aW9uKGUsIHRhcmdldCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRhcmdldC5vd2xDYXJvdXNlbCh7XG4gICAgICAgICAgICBpdGVtczogNSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiA3XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDQ4MDoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogM1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMDoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIG5hdjogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZTogMTAwLFxuICAgICAgICAgICAgcnRsOiBydGwsXG4gICAgICAgICAgICBhZnRlckluaXQ6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIGVsLmZpbmQoXCIub3dsLWl0ZW1cIikuZXEoMCkuYWRkQ2xhc3MoXCJzeW5jZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRhcmdldC5vbignY2hhbmdlLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgc3luY1Bvc2l0aW9uKGUsIHByZXZpZXcpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0YXJnZXQuZmluZCgnLm93bC1pdGVtJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5kYXRhKFwib3dsLWl0ZW1cIik7XG4gICAgICAgICAgICBwcmV2aWV3LnRyaWdnZXIoXCJ0by5vd2wuY2Fyb3VzZWxcIiwgW2l0ZW0uaW5kZXgsIDMwMCwgdHJ1ZV0pO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKFwiLm93bC1wcmV2aWV3XCIpLnRrT3dsUHJldmlldygpO1xuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2RlZmF1bHQnKTtcbnJlcXVpcmUoJy4vX21peGVkJyk7XG5yZXF1aXJlKCcuL19wcmV2aWV3Jyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2xpY2tEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNsaWNrID09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGMgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgYy5zbGljayh7XG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBjLmRhdGEoJ2l0ZW1zJykgfHwgMyxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDAsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IGMuZGF0YSgnaXRlbXNMZycpIHx8IDRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTIsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IGMuZGF0YSgnaXRlbXNNZCcpIHx8IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IGMuZGF0YSgnaXRlbXNTbScpIHx8IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IGMuZGF0YSgnaXRlbXNYcycpIHx8IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAwLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcnRsOiB0aGlzLmRhdGEoJ3J0bCcpLFxuICAgICAgICAgICAgb25TZXRQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ3NpZGViYXIuc2hvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgYy5zbGlja1NldE9wdGlvbignZG90cycsIHRydWUsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKFwiLnNsaWNrLWJhc2ljXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrU2xpY2tEZWZhdWx0KCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKGRvY3VtZW50KS5vbignbWFwLmluaXQnLCBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuXG4gICAgICAgIGlmIChkYXRhLmNvbnRhaW5lci5pcygnI2dvb2dsZS1mcy1yZWFsZXN0YXRlJykpIHtcblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRhdGEuY29udGFpbmVyLFxuICAgICAgICAgICAgICAgIG1hcCA9IGRhdGEubWFwLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBkYXRhLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgaXcgPSBkYXRhLml3LndpbmRvdztcblxuICAgICAgICAgICAgdmFyIGxpYnJhcnkgPSByZXF1aXJlKCcuLi8uLi8uLi92ZW5kb3IvbWFwcy9qcy9nb29nbGUvX2xpYnJhcnkuanMnKSgpO1xuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignc2lkZWJhci5zaG93biBzaWRlYmFyLmhpZGRlbicsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnRhcmdldCA9PSAnI3NpZGViYXItbWFwJyB8fCBkYXRhLnRhcmdldCA9PSBcIiNzaWRlYmFyLWVkaXRcIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBpdy5nZXRQb3NpdGlvbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvd0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBwb3NpdGlvbi5sYXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsbmc6IHBvc2l0aW9uLmxuZygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5LnJlc2l6ZShjb250YWluZXIsIG1hcCwgaW5mb1dpbmRvd0RhdGEsIG9wdGlvbnMuY2VudGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ3NpZGViYXIuc2hvd24nLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50YXJnZXQgPT0gXCIjc2lkZWJhci1lZGl0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3RvZ2dsZS1zaWRlYmFyLWVkaXQnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdzaWRlYmFyLmhpZGRlbicsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnRhcmdldCA9PSBcIiNzaWRlYmFyLWVkaXRcIikge1xuICAgICAgICAgICAgICAgICAgICAkKCcjdG9nZ2xlLXNpZGViYXItZWRpdCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIHJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKFwiaHRtbFwiKS5hZGRDbGFzcygnc2hvdy1zaWRlYmFyJyk7XG4gICAgICAgICAgICAkKCcuc2lkZWJhci5zaWRlYmFyLXZpc2libGUtZGVza3RvcCcpLm5vdCgnOnZpc2libGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHNpZGViYXIub3B0aW9ucygkKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLm9wZW4oJCh0aGlzKS5hdHRyKCdpZCcpLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBoaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgICAgICAgJCgnLnNpZGViYXI6dmlzaWJsZScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNpZGViYXIuY2xvc2UoJCh0aGlzKS5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDc2OCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEgJCgnLnNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgaWYgKCQoJy5oaWRlLXNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgcmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDEwMjQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGlmICgkKCcuaGlkZS1zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIHJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ0ODAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGhpZGUoKTtcbiAgICB9KTtcblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgaWYgKCEgJCgnLnNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgaGlkZSgpO1xuICAgIH1cblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NpZGViYXJDb2xsYXBzZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzaWRlYmFyID0gdGhpcztcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vZmYoJ21vdXNlZW50ZXInKTtcbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkuZHJvcGRvd24gPiBhJykub2ZmKCdtb3VzZWVudGVyJyk7XG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpID4gYScpLm9mZignbW91c2VlbnRlcicpO1xuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHNpZGViYXIub2ZmKCdtb3VzZWxlYXZlJyk7XG4gICAgICAgIHNpZGViYXIuZmluZCgnLmRyb3Bkb3duJykub2ZmKCdtb3VzZW92ZXInKTtcbiAgICAgICAgc2lkZWJhci5maW5kKCcuZHJvcGRvd24nKS5vZmYoJ21vdXNlb3V0Jyk7XG5cbiAgICAgICAgJCgnYm9keScpLm9mZignbW91c2VvdXQnLCAnI2Ryb3Bkb3duLXRlbXAgLmRyb3Bkb3duJyk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCd1bC5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdzaG93bi5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdzaG93LmJzLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ2hpZGUuYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignaGlkZGVuLmJzLmNvbGxhcHNlJyk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcjZHJvcGRvd24tdGVtcCcpLnJlbW92ZSgpO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmhhc1N1Ym1lbnUnKS5yZW1vdmVDbGFzcygnZHJvcGRvd24nKVxuICAgICAgICAgICAgLmZpbmQoJz4gdWwnKS5hZGRDbGFzcygnY29sbGFwc2UnKS5yZW1vdmVDbGFzcygnZHJvcGRvd24tbWVudSBzdWJtZW51LWhpZGUgc3VibWVudS1zaG93JylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLmZpbmQoJz4gYScpLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ2NvbGxhcHNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKS5vbignc2hvd24uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzaWRlYmFyLmZpbmQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDb2xsYXBzZVxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5jb2xsYXBzZScpLm9uKCdzaG93LmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgcGFyZW50cyA9ICQodGhpcykucGFyZW50cygndWw6Zmlyc3QnKS5maW5kKCc+IGxpLm9wZW4gW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl0nKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBhcmVudHMudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmhhc1N1Ym1lbnUnKS5hZGRDbGFzcyhcIm9wZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmNvbGxhcHNlJykub24oJ2hpZGRlbi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuaGFzU3VibWVudScpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKS5jb2xsYXBzZSh7IHRvZ2dsZTogZmFsc2UgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiY29sbGFwc2VcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudGtTaWRlYmFyQ29sbGFwc2UoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTaWRlYmFyRHJvcGRvd24gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgc2lkZWJhciA9IHRoaXM7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvd24uYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvdy5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdoaWRkZW4uYnMuY29sbGFwc2UnKTtcblxuICAgICAgICB2YXIgbmljZSA9IHNpZGViYXIuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKClbIDAgXTtcblxuICAgICAgICBuaWNlLnNjcm9sbHN0YXJ0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghIHNpZGViYXIuaXMoJ1tkYXRhLXR5cGU9XCJkcm9wZG93blwiXScpKSByZXR1cm47XG4gICAgICAgICAgICBzaWRlYmFyLmFkZENsYXNzKCdzY3JvbGxpbmcnKTtcbiAgICAgICAgICAgIHNpZGViYXIuZmluZCgnI2Ryb3Bkb3duLXRlbXAgPiB1bCA+IGxpJykuZW1wdHkoKTtcbiAgICAgICAgICAgIHNpZGViYXIuZmluZCgnI2Ryb3Bkb3duLXRlbXAnKS5oaWRlKCk7XG4gICAgICAgICAgICBzaWRlYmFyLmZpbmQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmljZS5zY3JvbGxlbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5pcygnW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykpIHJldHVybjtcbiAgICAgICAgICAgICQuZGF0YSh0aGlzLCAnbGFzdFNjcm9sbFRvcCcsIG5pY2UuZ2V0U2Nyb2xsVG9wKCkpO1xuICAgICAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcygnc2Nyb2xsaW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmhhc1N1Ym1lbnUnKS5hZGRDbGFzcygnZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnb3BlbicpXG4gICAgICAgICAgICAuZmluZCgnPiB1bCcpLmFkZENsYXNzKCdkcm9wZG93bi1tZW51JykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlIGluJykucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAuZmluZCgnPiBhJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS10b2dnbGUnKTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaS5kcm9wZG93biA+IGEnKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIGMgPSBzaWRlYmFyLmZpbmQoJyNkcm9wZG93bi10ZW1wJyk7XG5cbiAgICAgICAgICAgIHNpZGViYXIuZmluZCgnLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgYy5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmICghICQodGhpcykucGFyZW50KCcuZHJvcGRvd24nKS5pcygnLm9wZW4nKSAmJiAhIHNpZGViYXIuaXMoJy5zY3JvbGxpbmcnKSkge1xuICAgICAgICAgICAgICAgIHZhciBwID0gJCh0aGlzKS5wYXJlbnQoJy5kcm9wZG93bicpLFxuICAgICAgICAgICAgICAgICAgICB0ID0gcC5maW5kKCc+IC5kcm9wZG93bi1tZW51JykuY2xvbmUoKS5yZW1vdmVDbGFzcygnc3VibWVudS1oaWRlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISBjLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gJCgnPGRpdi8+JykuYXR0cignaWQnLCAnZHJvcGRvd24tdGVtcCcpLmFwcGVuZFRvKHNpZGViYXIpO1xuICAgICAgICAgICAgICAgICAgICBjLmh0bWwoJzx1bD48bGk+PC9saT48L3VsPicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGMuc2hvdygpO1xuICAgICAgICAgICAgICAgIGMuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjID0gYy5maW5kKCc+IHVsID4gbGknKS5jc3Moe292ZXJmbG93OiAndmlzaWJsZSd9KS5hZGRDbGFzcygnZHJvcGRvd24gb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgcC5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIHQuYXBwZW5kVG8oYykuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBwLm9mZnNldCgpLnRvcCAtIGMub2Zmc2V0KCkudG9wLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMTAwJSdcbiAgICAgICAgICAgICAgICB9KS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2lkZWJhci5pcygnLnJpZ2h0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcxMDAlJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpID4gYScpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoISAkKHRoaXMpLnBhcmVudCgpLmlzKCcuZHJvcGRvd24nKSkge1xuICAgICAgICAgICAgICAgIHZhciBzaWRlYmFyID0gJCh0aGlzKS5jbG9zZXN0KCcuc2lkZWJhcicpO1xuICAgICAgICAgICAgICAgIHNpZGViYXIuZmluZCgnLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIHNpZGViYXIuZmluZCgnI2Ryb3Bkb3duLXRlbXAnKS5oaWRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLmlzKCcuZHJvcGRvd24nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcjZHJvcGRvd24tdGVtcCcpLmhpZGUoKTtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5kcm9wZG93bicpLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvcGVuJykuY2hpbGRyZW4oJ3VsJykucmVtb3ZlQ2xhc3MoJ3N1Ym1lbnUtaGlkZScpLmFkZENsYXNzKCdzdWJtZW51LXNob3cnKTtcbiAgICAgICAgfSkub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigndWwnKS5yZW1vdmVDbGFzcygnLnN1Ym1lbnUtc2hvdycpLmFkZENsYXNzKCdzdWJtZW51LWhpZGUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdtb3VzZW91dCcsICcjZHJvcGRvd24tdGVtcCAuZHJvcGRvd24nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcuc2lkZWJhci1tZW51IC5vcGVuJywgJCh0aGlzKS5jbG9zZXN0KCcuc2lkZWJhcicpKS5yZW1vdmVDbGFzcygnLm9wZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgdmFyIHRyYW5zZm9ybV9kZCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiZHJvcGRvd25cIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnRrU2lkZWJhckRyb3Bkb3duKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHZhciB0cmFuc2Zvcm1fY29sbGFwc2UgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImNvbGxhcHNlXCJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS50a1NpZGViYXJDb2xsYXBzZSgpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICB0cmFuc2Zvcm1fZGQoKTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ0ODAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykuYXR0cignZGF0YS10eXBlJywgJ2NvbGxhcHNlJykuYXR0cignZGF0YS10cmFuc2Zvcm1lZCcsIHRydWUpO1xuICAgICAgICB0cmFuc2Zvcm1fY29sbGFwc2UoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG1ha2VfZGQoKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImNvbGxhcHNlXCJdW2RhdGEtdHJhbnNmb3JtZWRdJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImNvbGxhcHNlXCJdW2RhdGEtdHJhbnNmb3JtZWRdJykuYXR0cignZGF0YS10eXBlJywgJ2Ryb3Bkb3duJykuYXR0cignZGF0YS10cmFuc2Zvcm1lZCcsIHRydWUpO1xuICAgICAgICB0cmFuc2Zvcm1fZGQoKTtcbiAgICB9XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NzY4JywgbWFrZV9kZCk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50MTAyNCcsIG1ha2VfZGQpO1xuXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNpZGViYXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBcInRyYW5zZm9ybS1idXR0b25cIjogc2lkZWJhci5kYXRhKCd0cmFuc2Zvcm1CdXR0b24nKSA9PT0gdHJ1ZSxcbiAgICAgICAgXCJ0cmFuc2Zvcm0tYnV0dG9uLWljb25cIjogc2lkZWJhci5kYXRhKCd0cmFuc2Zvcm1CdXR0b25JY29uJykgfHwgJ2ZhLWVsbGlwc2lzLWgnXG4gICAgfTtcbn07IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2lkZWJhcnMgPSAkKCcuc2lkZWJhcicpO1xuXG4gICAgc2lkZWJhcnMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIHNpZGViYXIgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHJlcXVpcmUoJy4vX29wdGlvbnMnKShzaWRlYmFyKTtcblxuICAgICAgICBpZiAob3B0aW9uc1sgJ3RyYW5zZm9ybS1idXR0b24nIF0pIHtcbiAgICAgICAgICAgIHZhciBidXR0b24gPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj4nKTtcblxuICAgICAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ3NpZGViYXItdHJhbnNmb3JtJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0biBidG4tZGVmYXVsdCcpXG4gICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgJyArIG9wdGlvbnNbICd0cmFuc2Zvcm0tYnV0dG9uLWljb24nIF0gKyAnXCI+PC9pPicpO1xuXG4gICAgICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUnKS5hcHBlbmQoYnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJCgnI3N1Ym5hdicpLmNvbGxhcHNlKHsndG9nZ2xlJzogZmFsc2V9KTtcblxuICAgIGZ1bmN0aW9uIG1vYmlsZWNoZWNrKCkge1xuICAgICAgICB2YXIgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICBpZiAoLyhhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsa3xiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIChjZXxwaG9uZSl8eGRhfHhpaW5vL2kudGVzdChhKSB8fCAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsIDQpKSlcbiAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XG4gICAgICAgIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuXG4gICAgKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgZWZmZWN0OiAnc3QtZWZmZWN0LTEnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1NTAsXG4gICAgICAgICAgICAgICAgb3ZlcmxheTogZmFsc2VcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yID0gJy5zdC1jb250YWluZXInLFxuXG4gICAgICAgICAgICBldmVudHR5cGUgPSBtb2JpbGVjaGVjaygpID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJyxcblxuICAgICAgICAgICAgZ2V0TGF5b3V0Q2xhc3NlcyA9IGZ1bmN0aW9uIChzaWRlYmFyLCBkaXJlY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgIHZhciBsYXlvdXRDbGFzc2VzID0gc2lkZWJhci5kYXRhKCdsYXlvdXRDbGFzc2VzJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISBsYXlvdXRDbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2dnbGVMYXlvdXQgPSBzaWRlYmFyLmRhdGEoJ3RvZ2dsZUxheW91dCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRvZ2dsZUxheW91dCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyA9IHRvZ2dsZUxheW91dC5zcGxpdChcIixcIikuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyLmRhdGEoJ2xheW91dENsYXNzZXMnLCBsYXlvdXRDbGFzc2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsYXlvdXRDbGFzc2VzO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gbmV3IFJlZ0V4cCgnc2lkZWJhci0nICsgZGlyZWN0aW9uICsgJyhcXFxcUyspJywgJ2lnJyk7XG4gICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzZXMgPSAkKCdodG1sJykuZ2V0KDApLmNsYXNzTmFtZS5tYXRjaChtYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXlvdXRDbGFzc2VzICE9PSBudWxsICYmIGxheW91dENsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gbGF5b3V0Q2xhc3Nlcy5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXIuZGF0YSgnbGF5b3V0Q2xhc3NlcycsIGxheW91dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxheW91dENsYXNzZXM7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFNpZGViYXJEYXRhT3B0aW9ucyA9IGZ1bmN0aW9uKHNpZGViYXIpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0OiBzaWRlYmFyLmRhdGEoJ2VmZmVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBzaWRlYmFyLmRhdGEoJ292ZXJsYXknKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFuaW1hdGluZyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2FuaW1hdGluZycpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgICAgICAgICAgICAgfSwgZGVmYXVsdHMuZHVyYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXNldCA9IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoY29udGFpbmVyU2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHR5cGVvZiBpZCAhPT0gJ3VuZGVmaW5lZCcgPyAnIycgKyBpZCA6IGNvbnRhaW5lci5kYXRhKCdzdE1lbnVUYXJnZXQnKSxcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhciA9ICQodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICghIHNpZGViYXIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5pcygnOnZpc2libGUnKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzaWRlYmFyLmhhc0NsYXNzKCdzaWRlYmFyLWNsb3NlZCcpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWZmZWN0ID0gdHlwZW9mIG9wdGlvbnMgIT09ICd1bmRlZmluZWQnICYmIG9wdGlvbnMuZWZmZWN0ID8gb3B0aW9ucy5lZmZlY3QgOiBjb250YWluZXIuZGF0YSgnc3RNZW51RWZmZWN0JyksXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IHNpZGViYXIuaXMoJy5sZWZ0JykgPyAnbCcgOiAncicsXG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBzaWRlYmFyLmdldCgwKS5jbGFzc05hbWUubWF0Y2goL3NpZGViYXItc2l6ZS0oXFxTKykvKS5wb3AoKSxcbiAgICAgICAgICAgICAgICAgICAgaHRtbENsYXNzID0gJ3N0LWVmZmVjdC0nICsgZGlyZWN0aW9uICsgc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlTGF5b3V0ID0gc2lkZWJhci5kYXRhKCd0b2dnbGVMYXlvdXQnKSxcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyA9IGdldExheW91dENsYXNzZXMoc2lkZWJhciwgZGlyZWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhcjogc2lkZWJhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzaWRlYmFyLmhpZGUnLCBldmVudERhdGEpO1xuXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdW2hyZWY9XCInICsgdGFyZ2V0ICsgJ1wiXScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJ2xpJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcyhodG1sQ2xhc3MpO1xuICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoZWZmZWN0KTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZWZmZWN0KTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnc3QtbWVudS1vcGVuIHN0LXB1c2hlci1vdmVybGF5Jyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKGh0bWxDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2dnbGVMYXlvdXQpICQoJ2h0bWwnKS5yZW1vdmVDbGFzcyhsYXlvdXRDbGFzc2VzKTtcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcyhlZmZlY3QpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuZ2V0KDApLmNsYXNzTmFtZSA9ICdzdC1jb250YWluZXInOyAvLyBjbGVhclxuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyLmFkZENsYXNzKCdzaWRlYmFyLWNsb3NlZCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignc2lkZWJhci5oaWRkZW4nLCBldmVudERhdGEpO1xuICAgICAgICAgICAgICAgIH0sIGRlZmF1bHRzLmR1cmF0aW9uKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb3BlbiA9IGZ1bmN0aW9uICh0YXJnZXQsIG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKGNvbnRhaW5lclNlbGVjdG9yKTtcblxuICAgICAgICAgICAgICAgIHZhciBzaWRlYmFyID0gJCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICghIHNpZGViYXIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBvbiBtb2JpbGUsIGFsbG93IG9ubHkgb25lIHNpZGViYXIgdG8gYmUgb3BlbiBhdCB0aGUgc2FtZSB0aW1lXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4ICYmIGNvbnRhaW5lci5oYXNDbGFzcygnc3QtbWVudS1vcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdW2hyZWY9XCInICsgdGFyZ2V0ICsgJ1wiXScpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJ2xpJylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIHZhciBlZmZlY3QgPSBvcHRpb25zLmVmZmVjdCxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheSA9IG9wdGlvbnMub3ZlcmxheTtcblxuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBzaWRlYmFyLmlzKCcubGVmdCcpID8gJ2wnIDogJ3InLFxuICAgICAgICAgICAgICAgICAgICBzaXplID0gc2lkZWJhci5nZXQoMCkuY2xhc3NOYW1lLm1hdGNoKC9zaWRlYmFyLXNpemUtKFxcUyspLykucG9wKCksXG4gICAgICAgICAgICAgICAgICAgIGh0bWxDbGFzcyA9ICdzdC1lZmZlY3QtJyArIGRpcmVjdGlvbiArIHNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUxheW91dCA9IHNpZGViYXIuZGF0YSgndG9nZ2xlTGF5b3V0JyksXG4gICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzZXMgPSBnZXRMYXlvdXRDbGFzc2VzKHNpZGViYXIsIGRpcmVjdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXI6IHNpZGViYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignc2lkZWJhci5zaG93JywgZXZlbnREYXRhKTtcblxuICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcyhodG1sQ2xhc3MpO1xuICAgICAgICAgICAgICAgIHNpZGViYXIuc2hvdygpLnJlbW92ZUNsYXNzKCdzaWRlYmFyLWNsb3NlZCcpO1xuXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmRhdGEoJ3N0TWVudUVmZmVjdCcsIGVmZmVjdCk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmRhdGEoJ3N0TWVudVRhcmdldCcsIHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFkZENsYXNzKGVmZmVjdCk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGVmZmVjdCk7XG4gICAgICAgICAgICAgICAgaWYgKG92ZXJsYXkpIGNvbnRhaW5lci5hZGRDbGFzcygnc3QtcHVzaGVyLW92ZXJsYXknKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ3N0LW1lbnUtb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyLmZpbmQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgICAgICAgICAgfSwgMjUpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2dnbGVMYXlvdXQpICQoJ2h0bWwnKS5hZGRDbGFzcyhsYXlvdXRDbGFzc2VzKTtcbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignc2lkZWJhci5zaG93bicsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICAgICAgfSwgZGVmYXVsdHMuZHVyYXRpb24pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGUgPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYSA9IGFuaW1hdGluZygpO1xuICAgICAgICAgICAgICAgIGlmIChhKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9uID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gYnV0dG9uLmF0dHIoJ2hyZWYnKSxcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhcjtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyID0gJCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEFjdGl2ZUVsZW1lbnQgPSAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl0nKS5ub3QodGhpcykuY2xvc2VzdCgnbGknKS5sZW5ndGggPyAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl0nKS5ub3QodGhpcykuY2xvc2VzdCgnbGknKSA6ICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXScpLm5vdCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykubGVuZ3RoID8gJCh0aGlzKS5jbG9zZXN0KCdsaScpIDogJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QWN0aXZlRWxlbWVudC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKCdodG1sJykuaGFzQ2xhc3MoJ3Nob3ctc2lkZWJhcicpKSBhY3RpdmVFbGVtZW50LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVFbGVtZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSkgJCgnaHRtbCcpLmFkZENsYXNzKCdzaG93LXNpZGViYXInKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBkYXRhT3B0aW9ucyA9IGdldFNpZGViYXJEYXRhT3B0aW9ucyhzaWRlYmFyKSxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uT3B0aW9ucyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5kYXRhKCdlZmZlY3QnKSkgYnV0dG9uT3B0aW9ucy5lZmZlY3QgPSBidXR0b24uZGF0YSgnZWZmZWN0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5kYXRhKCdvdmVybGF5JykpIGJ1dHRvbk9wdGlvbnMub3ZlcmxheSA9IGJ1dHRvbi5kYXRhKCdvdmVybGF5Jyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgZGF0YU9wdGlvbnMsIGJ1dHRvbk9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5oYXNDbGFzcygnc2lkZWJhci1jbG9zZWQnKSAmJiBzaWRlYmFyLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0KHNpZGViYXIuYXR0cignaWQnKSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvcGVuKHRhcmdldCwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgJCgnYm9keScpLm9uKGV2ZW50dHlwZSwgJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXScsIHRvZ2dsZSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2tleWRvd24nLCBudWxsLCAnZXNjJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChjb250YWluZXJTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChjb250YWluZXIuaGFzQ2xhc3MoJ3N0LW1lbnUtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAgICAgKi9cbiAgICAgICAgJC5mbi50a1NpZGViYXJUb2dnbGVCYXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBzaWRlYmFyID0gdGhpcztcblxuICAgICAgICAgICAgLyogU2lkZWJhciBUb2dnbGUgQmFyICovXG4gICAgICAgICAgICBpZiAoc2lkZWJhci5kYXRhKCd0b2dnbGVCYXInKSkge1xuICAgICAgICAgICAgICAgIHZhciBiYXIgPSAkKCc8YT48L2E+Jyk7XG4gICAgICAgICAgICAgICAgYmFyLmF0dHIoJ2hyZWYnLCAnIycgKyBzaWRlYmFyLmF0dHIoJ2lkJykpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRvZ2dsZScsICdzaWRlYmFyLW1lbnUnKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NpZGViYXItdG9nZ2xlLWJhcicpO1xuXG4gICAgICAgICAgICAgICAgc2lkZWJhci5hcHBlbmQoYmFyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgICQoJy5zaWRlYmFyJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS50a1NpZGViYXJUb2dnbGVCYXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LnNpZGViYXIgPSB7XG5cbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBhbmltYXRpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoYSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3BlbignIycgKyBpZCwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc2V0KGlkLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb3B0aW9uczogZ2V0U2lkZWJhckRhdGFPcHRpb25zXG5cbiAgICAgICAgfTtcblxuICAgIH0pKCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3R5cGUnLCBbIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISBlbC5pcygnLnNpZGViYXInKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRycy50eXBlICE9PSAnY29sbGFwc2UnKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnRrU2lkZWJhckNvbGxhcHNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3R5cGUnLCBbIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISBlbC5pcygnLnNpZGViYXInKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRycy50eXBlICE9PSAnZHJvcGRvd24nKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnRrU2lkZWJhckRyb3Bkb3duKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3RvZ2dsZUJhcicsIFsgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnRvZ2dsZUJhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC50a1NpZGViYXJUb2dnbGVCYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwicmVxdWlyZSgnLi9fc2lkZWJhci1kcm9wZG93bicpO1xucmVxdWlyZSgnLi9fc2lkZWJhci1jb2xsYXBzZScpO1xucmVxdWlyZSgnLi9fc2lkZWJhci10b2dnbGUtYmFyJyk7IiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMnKTtcbnJlcXVpcmUoJy4vX3NpZGViYXItbWVudScpO1xucmVxdWlyZSgnLi9fY29sbGFwc2libGUnKTtcbnJlcXVpcmUoJy4vX2Ryb3Bkb3duJyk7XG5yZXF1aXJlKCcuL19zaWRlYmFyLXRvZ2dsZScpO1xuXG4oZnVuY3Rpb24oJCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2lkZWJhciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICBtZW51VHlwZTogZmFsc2UsXG4gICAgICAgICAgICB0b2dnbGVCYXI6IGZhbHNlXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBzaWRlYmFyID0gdGhpcztcblxuICAgICAgICBpZiAoc2V0dGluZ3MubWVudVR5cGUgPT0gXCJjb2xsYXBzZVwiKSB7XG4gICAgICAgICAgICBzaWRlYmFyLnRrU2lkZWJhckNvbGxhcHNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2V0dGluZ3MubWVudVR5cGUgPT0gXCJkcm9wZG93blwiKSB7XG4gICAgICAgICAgICBzaWRlYmFyLnRrU2lkZWJhckRyb3Bkb3duKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2V0dGluZ3MudG9nZ2xlQmFyID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzaWRlYmFyLnRrU2lkZWJhclRvZ2dsZUJhcigpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0Nhcm91c2VsID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jYXJvdXNlbCgpO1xuXG4gICAgICAgIHRoaXMuZmluZCgnW2RhdGEtc2xpZGVdJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0NvbGxhcHNlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuYXR0cignaHJlZicpIHx8IHRoaXMuYXR0cigndGFyZ2V0Jyk7XG4gICAgICAgIGlmICghIHRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGFyZ2V0KS5jb2xsYXBzZSh7dG9nZ2xlOiBmYWxzZX0pO1xuXG4gICAgfTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLmF0dHIoJ2hyZWYnKSB8fCB0aGlzLmF0dHIoJ3RhcmdldCcpO1xuICAgICAgICBpZiAoISB0YXJnZXQpIHJldHVybjtcblxuICAgICAgICB0aGlzLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGFyZ2V0KS5tb2RhbCh7c2hvdzogZmFsc2V9KTtcblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb2RhbCBjcmVhdG9yIGZvciB0aGUgZGVtbyBwYWdlLlxuICAgICAqIEFsbG93cyB0byBleHBsb3JlIGRpZmZlcmVudCBtb2RhbCB0eXBlcy5cbiAgICAgKiBGb3IgZGVtbyBwdXJwb3NlcyBvbmx5LlxuICAgICAqL1xuXG4gICAgLy8gUHJvY2VzcyB0aGUgbW9kYWwgdmlhIEhhbmRsZWJhcnMgdGVtcGxhdGVzXG4gICAgdmFyIG1vZGFsID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9ICQoXCIjXCIgKyBvcHRpb25zLnRlbXBsYXRlKS5odG1sKCk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShzb3VyY2UpO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGUob3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHZhciByYW5kb21JZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqIEByZXR1cm4gU3RyaW5nICovXG4gICAgICAgIHZhciBTNCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKSB8IDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoUzQoKSArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBTNCgpICsgUzQoKSk7XG4gICAgfTtcblxuICAgICQuZm4udGtNb2RhbERlbW8gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgdGFyZ2V0SWQgPSB0aGlzLmF0dHIoJ2hyZWYnKSB8fCB0aGlzLmF0dHIoJ3RhcmdldCcpLFxuICAgICAgICAgICAgdGFyZ2V0ID0gJCh0YXJnZXRJZCk7XG5cbiAgICAgICAgaWYgKCEgdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIHRhcmdldElkID0gcmFuZG9tSWQoKTtcbiAgICAgICAgICAgIHRoaXMuYXR0cignZGF0YS10YXJnZXQnLCAnIycgKyB0YXJnZXRJZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRJZC5yZXBsYWNlKCcjJywgJycpO1xuXG4gICAgICAgIGlmICghIHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRhcmdldCA9ICQobW9kYWwoe1xuICAgICAgICAgICAgICAgIGlkOiB0YXJnZXRJZCxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy5kYXRhKCd0ZW1wbGF0ZScpIHx8ICd0ay1tb2RhbC1kZW1vJyxcbiAgICAgICAgICAgICAgICBtb2RhbE9wdGlvbnM6IHRoaXMuZGF0YSgnbW9kYWxPcHRpb25zJykgfHwgJycsXG4gICAgICAgICAgICAgICAgZGlhbG9nT3B0aW9uczogdGhpcy5kYXRhKCdkaWFsb2dPcHRpb25zJykgfHwgJycsXG4gICAgICAgICAgICAgICAgY29udGVudE9wdGlvbnM6IHRoaXMuZGF0YSgnY29udGVudE9wdGlvbnMnKSB8fCAnJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCh0YXJnZXQpO1xuICAgICAgICAgICAgdGFyZ2V0Lm1vZGFsKHtzaG93OiBmYWxzZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGFyZ2V0Lm1vZGFsKCd0b2dnbGUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidGstbW9kYWwtZGVtb1wiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrTW9kYWxEZW1vKCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJzd2l0Y2gtY2hlY2tib3hcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKHRoaXMpLmJvb3RzdHJhcFN3aXRjaCh7XG4gICAgICAgICAgICBvZmZDb2xvcjogJ2RhbmdlcidcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtDaGVja0FsbCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkuZmluZCgnOmNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRoaXMuY2hlY2tlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIC8vIENoZWNrIEFsbCBDaGVja2JveGVzXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiY2hlY2stYWxsXCJdJykudGtDaGVja0FsbCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ29uc2VydmUgYXNwZWN0IHJhdGlvIG9mIHRoZSBvcmlnbmFsIHJlZ2lvbi4gVXNlZnVsIHdoZW4gc2hyaW5raW5nL2VubGFyZ2luZ1xuICAgICAqIGltYWdlcyB0byBmaXQgaW50byBhIGNlcnRhaW4gYXJlYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcmNXaWR0aCBTb3VyY2UgYXJlYSB3aWR0aFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcmNIZWlnaHQgU291cmNlIGFyZWEgaGVpZ2h0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFdpZHRoIEZpdHRhYmxlIGFyZWEgbWF4aW11bSBhdmFpbGFibGUgd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4SGVpZ2h0IEZpdHRhYmxlIGFyZWEgbWF4aW11bSBhdmFpbGFibGUgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSB7IHdpZHRoLCBoZWlndGggfVxuICAgICAqL1xuICAgIHZhciBhc3BlY3RSYXRpb0ZpdCA9IGZ1bmN0aW9uIChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSB7XG5cbiAgICAgICAgdmFyIHdSYXRpbyA9IG1heFdpZHRoIC8gc3JjV2lkdGgsXG4gICAgICAgICAgICBoUmF0aW8gPSBtYXhIZWlnaHQgLyBzcmNIZWlnaHQsXG4gICAgICAgICAgICB3aWR0aCA9IHNyY1dpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gc3JjSGVpZ2h0O1xuXG4gICAgICAgIGlmIChzcmNXaWR0aCAvIG1heFdpZHRoIDwgc3JjSGVpZ2h0IC8gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICB3aWR0aCA9IG1heFdpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gc3JjSGVpZ2h0ICogd1JhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggPSBzcmNXaWR0aCAqIGhSYXRpbztcbiAgICAgICAgICAgIGhlaWdodCA9IG1heEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7d2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH07XG4gICAgfTtcblxuICAgICQuZm4udGtDb3ZlciA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmZpbHRlcignOnZpc2libGUnKS5ub3QoJ1tjbGFzcyo9XCJoZWlnaHRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBpID0gdC5maW5kKCdpbWc6Zmlyc3QnKTtcblxuICAgICAgICAgICAgaWYgKGkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJC5sb2FkSW1hZ2UoaS5hdHRyKCdzcmMnKSkuZG9uZShmdW5jdGlvbihpbWcpe1xuICAgICAgICAgICAgICAgICAgICB0LmhlaWdodChpLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLm92ZXJsYXktZnVsbCcsIHQpLmlubmVySGVpZ2h0KGkuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdkb21DaGFuZ2VkJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyKCc6dmlzaWJsZScpLmZpbHRlcignW2NsYXNzKj1cImhlaWdodFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGltZyA9IHQuZmluZCgnaW1nJyk7XG5cbiAgICAgICAgICAgIGltZy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgJC5sb2FkSW1hZ2UoaS5hdHRyKCdzcmMnKSkuZG9uZShmdW5jdGlvbihpbWcpe1xuICAgICAgICAgICAgICAgICAgICAkKGkpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICQoaSkuY3NzKGFzcGVjdFJhdGlvRml0KGkud2lkdGgoKSwgaS5oZWlnaHQoKSwgdC53aWR0aCgpLCB0LmhlaWdodCgpKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGVpZ2h0KCkge1xuXG4gICAgICAgICQoJy5jb3Zlci5vdmVybGF5JykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS50a0NvdmVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgJChkb2N1bWVudCkucmVhZHkoaGVpZ2h0KTtcbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBoZWlnaHQpO1xuXG4gICAgdmFyIHQ7XG4gICAgJCh3aW5kb3cpLm9uKFwiZGVib3VuY2VkcmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHQpO1xuICAgICAgICB0ID0gc2V0VGltZW91dChoZWlnaHQsIDIwMCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtEYXRlUGlja2VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLmRhdGVwaWNrZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJy5kYXRlcGlja2VyJykudGtEYXRlUGlja2VyKCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCcjcmVwb3J0cmFuZ2UnKS5kYXRlcmFuZ2VwaWNrZXIoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJhbmdlczoge1xuICAgICAgICAgICAgICAgICdUb2RheSc6IFttb21lbnQoKSwgbW9tZW50KCldLFxuICAgICAgICAgICAgICAgICdZZXN0ZXJkYXknOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAxKSwgbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAxKV0sXG4gICAgICAgICAgICAgICAgJ0xhc3QgNyBEYXlzJzogW21vbWVudCgpLnN1YnRyYWN0KCdkYXlzJywgNiksIG1vbWVudCgpXSxcbiAgICAgICAgICAgICAgICAnTGFzdCAzMCBEYXlzJzogW21vbWVudCgpLnN1YnRyYWN0KCdkYXlzJywgMjkpLCBtb21lbnQoKV0sXG4gICAgICAgICAgICAgICAgJ1RoaXMgTW9udGgnOiBbbW9tZW50KCkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuZW5kT2YoJ21vbnRoJyldLFxuICAgICAgICAgICAgICAgICdMYXN0IE1vbnRoJzogW21vbWVudCgpLnN1YnRyYWN0KCdtb250aCcsIDEpLnN0YXJ0T2YoJ21vbnRoJyksIG1vbWVudCgpLnN1YnRyYWN0KCdtb250aCcsIDEpLmVuZE9mKCdtb250aCcpXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAyOSksXG4gICAgICAgICAgICBlbmREYXRlOiBtb21lbnQoKVxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAkKCcjcmVwb3J0cmFuZ2Ugc3BhbicpLmh0bWwoc3RhcnQuZm9ybWF0KCdNTU1NIEQsIFlZWVknKSArICcgLSAnICsgZW5kLmZvcm1hdCgnTU1NTSBELCBZWVlZJykpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgICQoJyNyZXNlcnZhdGlvbnRpbWUnKS5kYXRlcmFuZ2VwaWNrZXIoeyB0aW1lUGlja2VyOiB0cnVlLCB0aW1lUGlja2VySW5jcmVtZW50OiAzMCwgZm9ybWF0OiAnTU0vREQvWVlZWSBoOm1tIEEnIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICogQHRvZG86IEFuZ3VsYXIgZGlyZWN0aXZlLlxuICAgICAqL1xuICAgICQuZm4udGtFeHBhbmRhYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5maW5kKCcuZXhwYW5kYWJsZS1jb250ZW50JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZXhwYW5kYWJsZS1pbmRpY2F0b3JcIj48aT48L2k+PC9kaXY+Jyk7XG5cbiAgICB9O1xuXG4gICAgJCgnLmV4cGFuZGFibGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50a0V4cGFuZGFibGUoKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmV4cGFuZGFibGUtaW5kaWNhdG9yJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZXhwYW5kYWJsZScpLnRvZ2dsZUNsYXNzKCdleHBhbmRhYmxlLW9wZW4nKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmV4cGFuZGFibGUtdHJpZ2dlcjpub3QoLmV4cGFuZGFibGUtb3BlbiknLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRhYmxlLW9wZW4nKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gaWYgd2UncmUgaW5zaWRlIGFuIGlmcmFtZSwgcmVsb2FkIHdpdGhvdXQgaWZyYW1lXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbiAhPSB3aW5kb3cucGFyZW50LmxvY2F0aW9uKVxuICAgICAgICB0b3AubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqIEB0b2RvOiBBbmd1bGFyIGRpcmVjdGl2ZS5cbiAgICAgKi9cbiAgICAkLmZuLnRrTWluaUNvbG9ycyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5taW5pY29sb3JzICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMubWluaWNvbG9ycyh7XG4gICAgICAgICAgICAgICAgY29udHJvbDogdGhpcy5hdHRyKCdkYXRhLWNvbnRyb2wnKSB8fCAnaHVlJyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMuYXR0cignZGF0YS1kZWZhdWx0VmFsdWUnKSB8fCAnJyxcbiAgICAgICAgICAgICAgICBpbmxpbmU6IHRoaXMuYXR0cignZGF0YS1pbmxpbmUnKSA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgICAgIGxldHRlckNhc2U6IHRoaXMuYXR0cignZGF0YS1sZXR0ZXJDYXNlJykgfHwgJ2xvd2VyY2FzZScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogdGhpcy5hdHRyKCdkYXRhLW9wYWNpdHknKSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5hdHRyKCdkYXRhLXBvc2l0aW9uJykgfHwgJ2JvdHRvbSBsZWZ0JyxcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChoZXgsIG9wYWNpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgaGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGFjaXR5KSBoZXggKz0gJywgJyArIG9wYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGhleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJy5taW5pY29sb3JzJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCh0aGlzKS50a01pbmlDb2xvcnMoKTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICogQHRvZG86IEFuZ3VsYXIgZGlyZWN0aXZlLlxuICAgICAqL1xuICAgICQuZm4udGtOZXN0YWJsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5uZXN0YWJsZSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLm5lc3RhYmxlKHtcbiAgICAgICAgICAgICAgICByb290Q2xhc3M6ICduZXN0YWJsZScsXG4gICAgICAgICAgICAgICAgbGlzdE5vZGVOYW1lOiAndWwnLFxuICAgICAgICAgICAgICAgIGxpc3RDbGFzczogJ25lc3RhYmxlLWxpc3QnLFxuICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogJ25lc3RhYmxlLWl0ZW0nLFxuICAgICAgICAgICAgICAgIGRyYWdDbGFzczogJ25lc3RhYmxlLWRyYWcnLFxuICAgICAgICAgICAgICAgIGhhbmRsZUNsYXNzOiAnbmVzdGFibGUtaGFuZGxlJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWRDbGFzczogJ25lc3RhYmxlLWNvbGxhcHNlZCcsXG4gICAgICAgICAgICAgICAgcGxhY2VDbGFzczogJ25lc3RhYmxlLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgICAgICBlbXB0eUNsYXNzOiAnbmVzdGFibGUtZW1wdHknXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnLm5lc3RhYmxlJykudGtOZXN0YWJsZSgpO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgcmFuZG9tSWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLyoqIEByZXR1cm4gU3RyaW5nICovXG4gICAgICAgIHZhciBTNCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICgoKDErTWF0aC5yYW5kb20oKSkqMHgxMDAwMCl8MCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChTNCgpK1M0KCkrXCItXCIrUzQoKStcIi1cIitTNCgpK1wiLVwiK1M0KCkrXCItXCIrUzQoKStTNCgpK1M0KCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrUGFuZWxDb2xsYXBzZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBib2R5ID0gJCgnLnBhbmVsLWJvZHknLCB0aGlzKSxcbiAgICAgICAgICAgIGlkID0gYm9keS5hdHRyKCdpZCcpIHx8IHJhbmRvbUlkKCksXG4gICAgICAgICAgICBjb2xsYXBzZSA9ICQoJzxkaXYvPicpO1xuXG4gICAgICAgIGNvbGxhcHNlXG4gICAgICAgICAgICAuYXR0cignaWQnLCBpZClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY29sbGFwc2UnICsgKHRoaXMuZGF0YSgnb3BlbicpID8gJyBpbicgOiAnJykpXG4gICAgICAgICAgICAuYXBwZW5kKGJvZHkuY2xvbmUoKSk7XG5cbiAgICAgICAgYm9keS5yZW1vdmUoKTtcblxuICAgICAgICAkKHRoaXMpLmFwcGVuZChjb2xsYXBzZSk7XG5cbiAgICAgICAgJCgnLnBhbmVsLWNvbGxhcHNlLXRyaWdnZXInLCB0aGlzKVxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ2NvbGxhcHNlJyApXG4gICAgICAgICAgICAuYXR0cignZGF0YS10YXJnZXQnLCAnIycgKyBpZClcbiAgICAgICAgICAgIC5jb2xsYXBzZSh7IHRyaWdnZXI6IGZhbHNlIH0pO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInBhbmVsLWNvbGxhcHNlXCJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRrUGFuZWxDb2xsYXBzZSgpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAvLyBQcm9ncmVzcyBCYXIgQW5pbWF0aW9uXG4gICAgJCgnLnByb2dyZXNzLWJhcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLndpZHRoKCQodGhpcykuYXR0cignYXJpYS12YWx1ZW5vdycpICsgJyUnKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTZWxlY3QyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdmFyIHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93Q2xlYXI6IHQuZGF0YSgnYWxsb3dDbGVhcicpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHQuaXMoJ2J1dHRvbicpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0LmlzKCdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJykpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodC5pcygnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi10YWdzXCJdJykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRhZ3MgPSB0LmRhdGEoJ3RhZ3MnKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0LnNlbGVjdDIob3B0aW9ucyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTZWxlY3QyRW5hYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKS5zZWxlY3QyKFwiZW5hYmxlXCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTZWxlY3QyRGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3QyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcy5kYXRhKCd0YXJnZXQnKSkuc2VsZWN0MihcImRpc2FibGVcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdDJGbGFncyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3QyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIC8vIHRlbXBsYXRpbmdcbiAgICAgICAgICAgIHZhciBmb3JtYXQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoISBzdGF0ZS5pZCkgcmV0dXJuIHN0YXRlLnRleHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiPGltZyBjbGFzcz0nZmxhZycgc3JjPSdodHRwOi8vc2VsZWN0Mi5naXRodWIuaW8vc2VsZWN0Mi9pbWFnZXMvZmxhZ3MvXCIgKyBzdGF0ZS5pZC50b0xvd2VyQ2FzZSgpICsgXCIucG5nJy8+XCIgKyBzdGF0ZS50ZXh0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3QyKHtcbiAgICAgICAgICAgICAgICBmb3JtYXRSZXN1bHQ6IGZvcm1hdCxcbiAgICAgICAgICAgICAgICBmb3JtYXRTZWxlY3Rpb246IGZvcm1hdCxcbiAgICAgICAgICAgICAgICBlc2NhcGVNYXJrdXA6IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGUqPVwic2VsZWN0MlwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgJCh0aGlzKS50a1NlbGVjdDIoKTtcblxuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi1lbmFibGVcIl0nKS50a1NlbGVjdDJFbmFibGUoKTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNlbGVjdDItZGlzYWJsZVwiXScpLnRrU2VsZWN0MkRpc2FibGUoKTtcblxuICAgICQoXCIjc2VsZWN0Ml83XCIpLnRrU2VsZWN0MkZsYWdzKCk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTZWxlY3RQaWNrZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0cGlja2VyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0cGlja2VyKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5kYXRhKCd3aWR0aCcpIHx8ICcxMDAlJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJy5zZWxlY3RwaWNrZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgJCh0aGlzKS50a1NlbGVjdFBpY2tlcigpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2hvd0hvdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS1zaG93LWhvdmVyXScpLmhpZGUoKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSAkKHRoaXMpLmRhdGEoJ3Nob3dIb3ZlcicpO1xuXG4gICAgICAgICAgICBzZWxmLmNsb3Nlc3QocGFyZW50KS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzaG93SG92ZXIoKTtcblxuICAgIHdpbmRvdy5zaG93SG92ZXIgPSBzaG93SG92ZXI7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYmFycyA9IGZ1bmN0aW9uKGVsKXtcbiAgICAgICAgJCgnLnNsaWRlci1oYW5kbGUnLCBlbCkuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1iYXJzIGZhLXJvdGF0ZS05MFwiPjwvaT4nKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NsaWRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zbGlkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5zbGlkZXIoKTtcblxuICAgICAgICAgICAgYmFycyh0aGlzKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NsaWRlckZvcm1hdHRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zbGlkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5zbGlkZXIoe1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnQ3VycmVudCB2YWx1ZTogJyArIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBiYXJzKHRoaXMpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2xpZGVyVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNsaWRlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLm9uKFwic2xpZGVcIiwgZnVuY3Rpb24gKHNsaWRlRXZ0KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmF0dHIoJ2RhdGEtb24tc2xpZGUnKSkudGV4dChzbGlkZUV2dC52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYmFycyh0aGlzKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtc2xpZGVyPVwiZGVmYXVsdFwiXScpLnRrU2xpZGVyKCk7XG5cbiAgICAkKCdbZGF0YS1zbGlkZXI9XCJmb3JtYXR0ZXJcIl0nKS50a1NsaWRlckZvcm1hdHRlcigpO1xuXG4gICAgJCgnW2RhdGEtb24tc2xpZGVdJykudGtTbGlkZXJVcGRhdGUoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtEYXRhVGFibGUgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLmRhdGFUYWJsZSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFUYWJsZSgpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJkYXRhLXRhYmxlXCJdJykudGtEYXRhVGFibGUoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi9fc2tpbicpKCk7XG5cbiAgICAkKCcudGFiYmFibGUgLm5hdi10YWJzJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdGFicyA9ICQodGhpcykubmljZVNjcm9sbCh7XG4gICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIG9uZWF4aXNtb3VzZW1vZGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIF9zdXBlciA9IHRhYnMuZ2V0Q29udGVudFNpemU7XG4gICAgICAgIHRhYnMuZ2V0Q29udGVudFNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gX3N1cGVyLmNhbGwodGFicyk7XG4gICAgICAgICAgICBwYWdlLmggPSB0YWJzLndpbi5oZWlnaHQoKTtcbiAgICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG5cbiAgICAkKCcudGFiYmFibGUgLm5hdi10YWJzIGEnKS5vbignc2hvd24uYnMudGFiJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB0YWIgPSAkKHRoaXMpLmNsb3Nlc3QoJy50YWJiYWJsZScpO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXG4gICAgICAgICAgICB0YXJnZXRQYW5lID0gdGFyZ2V0LmF0dHIoJ2hyZWYnKSB8fCB0YXJnZXQuZGF0YSgndGFyZ2V0Jyk7XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0YWJzIHdpdGggaG9yaXpvbnRhbCBzY3JvbGxcbiAgICAgICAgdGFiLmZpbmQoJy5uYXYtdGFicycpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcblxuICAgICAgICAvLyByZWZyZXNoIFtkYXRhLXNjcm9sbGFibGVdIHdpdGhpbiB0aGUgYWN0aXZhdGVkIHRhYiBwYW5lXG4gICAgICAgICQodGFyZ2V0UGFuZSkuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBUb29sdGlwXG4gICAgJChcImJvZHlcIikudG9vbHRpcCh7c2VsZWN0b3I6ICdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJywgY29udGFpbmVyOiBcImJvZHlcIn0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1RvdWNoU3BpbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5Ub3VjaFNwaW4gIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5Ub3VjaFNwaW4oKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG91Y2gtc3BpblwiXScpLnRrVG91Y2hTcGluKCk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgdHJlZV9nbHlwaF9vcHRpb25zID0ge1xuICAgICAgICBtYXA6IHtcbiAgICAgICAgICAgIGNoZWNrYm94OiBcImZhIGZhLXNxdWFyZS1vXCIsXG4gICAgICAgICAgICBjaGVja2JveFNlbGVjdGVkOiBcImZhIGZhLWNoZWNrLXNxdWFyZVwiLFxuICAgICAgICAgICAgY2hlY2tib3hVbmtub3duOiBcImZhIGZhLWNoZWNrLXNxdWFyZSBmYS1tdXRlZFwiLFxuICAgICAgICAgICAgZXJyb3I6IFwiZmEgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGVcIixcbiAgICAgICAgICAgIGV4cGFuZGVyQ2xvc2VkOiBcImZhIGZhLWNhcmV0LXJpZ2h0XCIsXG4gICAgICAgICAgICBleHBhbmRlckxhenk6IFwiZmEgZmEtYW5nbGUtcmlnaHRcIixcbiAgICAgICAgICAgIGV4cGFuZGVyT3BlbjogXCJmYSBmYS1jYXJldC1kb3duXCIsXG4gICAgICAgICAgICBkb2M6IFwiZmEgZmEtZmlsZS1vXCIsXG4gICAgICAgICAgICBub0V4cGFuZGVyOiBcIlwiLFxuICAgICAgICAgICAgZG9jT3BlbjogXCJmYSBmYS1maWxlXCIsXG4gICAgICAgICAgICBsb2FkaW5nOiBcImZhIGZhLXJlZnJlc2ggZmEtc3BpblwiLFxuICAgICAgICAgICAgZm9sZGVyOiBcImZhIGZhLWZvbGRlclwiLFxuICAgICAgICAgICAgZm9sZGVyT3BlbjogXCJmYSBmYS1mb2xkZXItb3BlblwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRyZWVfZG5kX29wdGlvbnMgPSB7XG4gICAgICAgIGF1dG9FeHBhbmRNUzogNDAwLFxuICAgICAgICAgICAgZm9jdXNPbkNsaWNrOiB0cnVlLFxuICAgICAgICAgICAgcHJldmVudFZvaWRNb3ZlczogdHJ1ZSwgLy8gUHJldmVudCBkcm9wcGluZyBub2RlcyAnYmVmb3JlIHNlbGYnLCBldGMuXG4gICAgICAgICAgICBwcmV2ZW50UmVjdXJzaXZlTW92ZXM6IHRydWUsIC8vIFByZXZlbnQgZHJvcHBpbmcgbm9kZXMgb24gb3duIGRlc2NlbmRhbnRzXG4gICAgICAgICAgICBkcmFnU3RhcnQ6IGZ1bmN0aW9uKG5vZGUsIGRhdGEpIHtcbiAgICAgICAgICAgIC8qKiBUaGlzIGZ1bmN0aW9uIE1VU1QgYmUgZGVmaW5lZCB0byBlbmFibGUgZHJhZ2dpbmcgZm9yIHRoZSB0cmVlLlxuICAgICAgICAgICAgICogIFJldHVybiBmYWxzZSB0byBjYW5jZWwgZHJhZ2dpbmcgb2Ygbm9kZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRyYWdFbnRlcjogZnVuY3Rpb24obm9kZSwgZGF0YSkge1xuICAgICAgICAgICAgLyoqIGRhdGEub3RoZXJOb2RlIG1heSBiZSBudWxsIGZvciBub24tZmFuY3l0cmVlIGRyb3BwYWJsZXMuXG4gICAgICAgICAgICAgKiAgUmV0dXJuIGZhbHNlIHRvIGRpc2FsbG93IGRyb3BwaW5nIG9uIG5vZGUuIEluIHRoaXMgY2FzZVxuICAgICAgICAgICAgICogIGRyYWdPdmVyIGFuZCBkcmFnTGVhdmUgYXJlIG5vdCBjYWxsZWQuXG4gICAgICAgICAgICAgKiAgUmV0dXJuICdvdmVyJywgJ2JlZm9yZSwgb3IgJ2FmdGVyJyB0byBmb3JjZSBhIGhpdE1vZGUuXG4gICAgICAgICAgICAgKiAgUmV0dXJuIFsnYmVmb3JlJywgJ2FmdGVyJ10gdG8gcmVzdHJpY3QgYXZhaWxhYmxlIGhpdE1vZGVzLlxuICAgICAgICAgICAgICogIEFueSBvdGhlciByZXR1cm4gdmFsdWUgd2lsbCBjYWxjIHRoZSBoaXRNb2RlIGZyb20gdGhlIGN1cnNvciBwb3NpdGlvbi5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgLy8gUHJldmVudCBkcm9wcGluZyBhIHBhcmVudCBiZWxvdyBhbm90aGVyIHBhcmVudCAob25seSBzb3J0XG4gICAgICAgICAgICAvLyBub2RlcyB1bmRlciB0aGUgc2FtZSBwYXJlbnQpXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgaWYobm9kZS5wYXJlbnQgIT09IGRhdGEub3RoZXJOb2RlLnBhcmVudCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG9uJ3QgYWxsb3cgZHJvcHBpbmcgKm92ZXIqIGEgbm9kZSAod291bGQgY3JlYXRlIGEgY2hpbGQpXG4gICAgICAgICAgICByZXR1cm4gW1wiYmVmb3JlXCIsIFwiYWZ0ZXJcIl07XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRyYWdEcm9wOiBmdW5jdGlvbihub2RlLCBkYXRhKSB7XG4gICAgICAgICAgICAvKiogVGhpcyBmdW5jdGlvbiBNVVNUIGJlIGRlZmluZWQgdG8gZW5hYmxlIGRyb3BwaW5nIG9mIGl0ZW1zIG9uXG4gICAgICAgICAgICAgKiAgdGhlIHRyZWUuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGRhdGEub3RoZXJOb2RlLm1vdmVUbyhub2RlLCBkYXRhLmhpdE1vZGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtGYW5jeVRyZWUgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLmZhbmN5dHJlZSA9PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgIHZhciBleHRlbnNpb25zID0gWyBcImdseXBoXCIgXTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF0dHIoJ2RhdGEtdHJlZS1kbmQnKSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZXh0ZW5zaW9ucy5wdXNoKCBcImRuZFwiICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mYW5jeXRyZWUoe1xuICAgICAgICAgICAgZXh0ZW5zaW9uczogZXh0ZW5zaW9ucyxcbiAgICAgICAgICAgIGdseXBoOiB0cmVlX2dseXBoX29wdGlvbnMsXG4gICAgICAgICAgICBkbmQ6IHRyZWVfZG5kX29wdGlvbnMsXG4gICAgICAgICAgICBjbGlja0ZvbGRlck1vZGU6IDMsXG4gICAgICAgICAgICBjaGVja2JveDogdHlwZW9mIHRoaXMuYXR0cignZGF0YS10cmVlLWNoZWNrYm94JykgIT09IFwidW5kZWZpbmVkXCIgfHwgZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RNb2RlOiB0eXBlb2YgdGhpcy5hdHRyKCdkYXRhLXRyZWUtc2VsZWN0JykgIT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZUludCh0aGlzLmF0dHIoJ2RhdGEtdHJlZS1zZWxlY3QnKSkgOiAyXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIC8vIHVzaW5nIGRlZmF1bHQgb3B0aW9uc1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRyZWVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50a0ZhbmN5VHJlZSgpO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1dpemFyZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zbGljayA9PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0ID0gdGhpcyxcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHQuY2xvc2VzdCgnLndpemFyZC1jb250YWluZXInKTtcblxuICAgICAgICB0LnNsaWNrKHtcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHJ0bDogdGhpcy5kYXRhKCdydGwnKSxcbiAgICAgICAgICAgIHNsaWRlOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgb25BZnRlckNoYW5nZTogZnVuY3Rpb24gKHdpeiwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdhZnRlci53aXphcmQuc3RlcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgd2l6OiB3aXosXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiB0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcud2l6LW5leHQnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdC5zbGlja05leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy53aXotcHJldicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0LnNsaWNrUHJldigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb250YWluZXIuZmluZCgnLndpei1zdGVwJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHQuc2xpY2tHb1RvKCQodGhpcykuZGF0YSgndGFyZ2V0JykpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ3aXphcmRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50a1dpemFyZCgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQnkgbGV2ZXJhZ2luZyBldmVudHMgd2UgY2FuIGhvb2sgaW50byB0aGUgd2l6YXJkIHRvIGFkZCBmdW5jdGlvbmFsaXR5LlxuICAgICAqIFRoaXMgZXhhbXBsZSB1cGRhdGVzIHRoZSBwcm9ncmVzcyBiYXIgYWZ0ZXIgdGhlIHdpemFyZCBzdGVwIGNoYW5nZXMuXG4gICAgICovXG4gICAgJChkb2N1bWVudCkub24oJ2FmdGVyLndpemFyZC5zdGVwJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGFpbmVyLmlzKCcjd2l6YXJkLWRlbW8tMScpKSB7XG5cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBkYXRhLmNvbnRhaW5lci5maW5kKCcud2l6LXByb2dyZXNzIGxpOmVxKCcgKyBkYXRhLnRhcmdldCArICcpJyk7XG5cbiAgICAgICAgICAgIGRhdGEuY29udGFpbmVyLmZpbmQoJy53aXotcHJvZ3Jlc3MgbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlIGNvbXBsZXRlJyk7XG5cbiAgICAgICAgICAgIHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIHRhcmdldC5wcmV2QWxsKCkuYWRkQ2xhc3MoJ2NvbXBsZXRlJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2Nhcm91c2VsJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0MnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnRrQ2Fyb3VzZWwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgndG9nZ2xlJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnRvZ2dsZSA9PSAnY2hlY2stYWxsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC50a0NoZWNrQWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgndG9nZ2xlJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cnMudG9nZ2xlID09ICdjb2xsYXBzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwudGtDb2xsYXBzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnY292ZXInLCBbICckdGltZW91dCcsIGZ1bmN0aW9uICgkdGltZW91dCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdDJyxcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnRrQ292ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdkYXRlcGlja2VyJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0MnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnRrRGF0ZVBpY2tlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdleHBhbmRhYmxlJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0MnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnRrRXhwYW5kYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdtaW5pY29sb3JzJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0MnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnRrTWluaUNvbG9ycygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZGlyZWN0aXZlKCd0b2dnbGUnLCBbIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cnMudG9nZ2xlID09ICdtb2RhbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwudGtNb2RhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cnMudG9nZ2xlID09ICd0ay1tb2RhbC1kZW1vJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC50a01vZGFsRGVtbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ25lc3RhYmxlJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0MnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnRrTmVzdGFibGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIHJhbmRvbUlkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8qKiBAcmV0dXJuIFN0cmluZyAqL1xyXG4gICAgICAgIHZhciBTNCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiAoUzQoKSArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBTNCgpICsgUzQoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3RvZ2dsZScsIFsgJyRjb21waWxlJywgZnVuY3Rpb24gKCRjb21waWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IDEwMCxcclxuICAgICAgICAgICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIChlbCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnRvZ2dsZSAhPT0gJ3BhbmVsLWNvbGxhcHNlJykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnLnBhbmVsLWJvZHknLCBlbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gYm9keS5hdHRyKCdpZCcpIHx8IHJhbmRvbUlkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2Lz4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnY29sbGFwc2UnICsgKGVsLmRhdGEoJ29wZW4nKSA/ICcgaW4nIDogJycpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGJvZHkuY2xvbmUoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLmFwcGVuZChjb2xsYXBzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wYW5lbC1jb2xsYXBzZS10cmlnZ2VyJywgZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRvZ2dsZScsICdjb2xsYXBzZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRhcmdldCcsICcjJyArIGlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29sbGFwc2Uoe3RyaWdnZXI6IGZhbHNlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZGlyZWN0aXZlKCd0b2dnbGUnLCBbIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRycy50b2dnbGUgPT0gJ3NlbGVjdDInIHx8IGF0dHJzLnRvZ2dsZSA9PSAnc2VsZWN0Mi10YWdzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC50a1NlbGVjdDIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3NlbGVjdHBpY2tlcicsIFsgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdDJyxcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC50a1NlbGVjdFBpY2tlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdzbGlkZXInLCBbIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cnMuc2xpZGVyID09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC50a1NsaWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnNsaWRlciA9PSAnZm9ybWF0dGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC50a1NsaWRlckZvcm1hdHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdvblNsaWRlJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWwudGtTbGlkZXJVcGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3RvZ2dsZScsIFsgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwsIGF0dHJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRycy50b2dnbGUgPT0gJ2RhdGEtdGFibGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnRrRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgndG9nZ2xlJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnRvZ2dsZSA9PSAndGFiJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgndG9nZ2xlJywgWyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnRvZ2dsZSA9PSAndG91Y2gtc3BpbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwudGtUb3VjaFNwaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZGlyZWN0aXZlKCd0b2dnbGUnLCBbIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cnMudG9nZ2xlID09ICd0cmVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC50a0ZhbmN5VHJlZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3RvZ2dsZScsIFsgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJzLnRvZ2dsZSA9PSAnd2l6YXJkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC50a1dpemFyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IF0pO1xyXG5cclxufSkoKTsiLCJyZXF1aXJlKCcuL19wYW5lbC1jb2xsYXBzZScpO1xucmVxdWlyZSgnLi9fY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vX2NoZWNrLWFsbCcpO1xucmVxdWlyZSgnLi9fY29sbGFwc2UnKTtcbnJlcXVpcmUoJy4vX2NvdmVyJyk7XG5yZXF1aXJlKCcuL19kYXRlcGlja2VyJyk7XG5yZXF1aXJlKCcuL19leHBhbmRhYmxlJyk7XG5yZXF1aXJlKCcuL19taW5pY29sb3JzJyk7XG5yZXF1aXJlKCcuL19tb2RhbCcpO1xucmVxdWlyZSgnLi9fbmVzdGFibGUnKTtcbnJlcXVpcmUoJy4vX3NlbGVjdDInKTtcbnJlcXVpcmUoJy4vX3NlbGVjdHBpY2tlcicpO1xucmVxdWlyZSgnLi9fc2xpZGVyJyk7XG5yZXF1aXJlKCcuL190b3VjaHNwaW4nKTtcbnJlcXVpcmUoJy4vX3RhYmxlcycpO1xucmVxdWlyZSgnLi9fdGFicycpO1xucmVxdWlyZSgnLi9fdHJlZScpO1xucmVxdWlyZSgnLi9fd2l6YXJkJyk7IiwicmVxdWlyZSgnLi9fdGFicycpO1xucmVxdWlyZSgnLi9fdHJlZScpO1xucmVxdWlyZSgnLi9fc2hvdy1ob3ZlcicpO1xucmVxdWlyZSgnLi9fZGF0ZXJhbmdlcGlja2VyJyk7XG5yZXF1aXJlKCcuL19leHBhbmRhYmxlJyk7XG5yZXF1aXJlKCcuL19uZXN0YWJsZScpO1xucmVxdWlyZSgnLi9fY292ZXInKTtcbnJlcXVpcmUoJy4vX3Rvb2x0aXAnKTtcbnJlcXVpcmUoJy4vX3RhYmxlcycpO1xucmVxdWlyZSgnLi9fY2hlY2stYWxsJyk7XG5yZXF1aXJlKCcuL19wcm9ncmVzcy1iYXJzJyk7XG5yZXF1aXJlKCcuL19pZnJhbWUnKTtcbnJlcXVpcmUoJy4vX2Jvb3RzdHJhcC1jb2xsYXBzZScpO1xucmVxdWlyZSgnLi9fYm9vdHN0cmFwLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL19ib290c3RyYXAtbW9kYWwnKTtcbnJlcXVpcmUoJy4vX3BhbmVsLWNvbGxhcHNlJyk7XG5cbi8vIEZvcm1zXG5yZXF1aXJlKCcuL190b3VjaHNwaW4nKTtcbnJlcXVpcmUoJy4vX3NlbGVjdDInKTtcbnJlcXVpcmUoJy4vX3NsaWRlcicpO1xucmVxdWlyZSgnLi9fc2VsZWN0cGlja2VyJyk7XG5yZXF1aXJlKCcuL19kYXRlcGlja2VyJyk7XG5yZXF1aXJlKCcuL19taW5pY29sb3JzJyk7XG5yZXF1aXJlKCcuL19ib290c3RyYXAtc3dpdGNoJyk7XG5yZXF1aXJlKCcuL193aXphcmQnKTsiXX0=
