(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/js/themes/html/main.js":[function(require,module,exports){
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
},{"../../../vendor/layout/js/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/main.js","../../../vendor/maps/js/google/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/main.js","../../../vendor/media/js/carousel/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/main.js","../../../vendor/sidebar/js/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/main.js","../../../vendor/ui/js/main":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/main.js","./theme-core":"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/html/theme-core.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/js/themes/html/theme-core.js":[function(require,module,exports){
// CUSTOM
require('../../../vendor/real-estate/js/_maps');
},{"../../../vendor/real-estate/js/_maps":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/real-estate/js/_maps.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_async.js":[function(require,module,exports){
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
},{"./_async":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_async.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_breakpoints.js","./_gridalicious.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_gridalicious.js","./_isotope":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_isotope.js","./_scrollable.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_scrollable.js","./_sidebar-pc":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_sidebar-pc.js","./_skins":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skins.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/maps/js/google/_edit.js":[function(require,module,exports){
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
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/media/js/carousel/main.js":[function(require,module,exports){
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
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/sidebar/js/main.js":[function(require,module,exports){
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
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/main.js":[function(require,module,exports){
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
},{"./_bootstrap-carousel":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-carousel.js","./_bootstrap-collapse":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-collapse.js","./_bootstrap-modal":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-modal.js","./_bootstrap-switch":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_bootstrap-switch.js","./_check-all":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_check-all.js","./_cover":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_cover.js","./_datepicker":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_datepicker.js","./_daterangepicker":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_daterangepicker.js","./_expandable":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_expandable.js","./_iframe":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_iframe.js","./_minicolors":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_minicolors.js","./_nestable":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_nestable.js","./_panel-collapse":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_panel-collapse.js","./_progress-bars":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_progress-bars.js","./_select2":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_select2.js","./_selectpicker":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_selectpicker.js","./_show-hover":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_show-hover.js","./_slider":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_slider.js","./_tables":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tables.js","./_tabs":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tabs.js","./_tooltip":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tooltip.js","./_touchspin":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_touchspin.js","./_tree":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_tree.js","./_wizard":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/ui/js/_wizard.js"}]},{},["./app/js/themes/html/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvdGhlbWVzL2h0bWwvbWFpbi5qcyIsImFwcC9qcy90aGVtZXMvaHRtbC90aGVtZS1jb3JlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2FzeW5jLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2JyZWFrcG9pbnRzLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2dyaWRhbGljaW91cy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19pc290b3BlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3Njcm9sbGFibGUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fc2lkZWJhci1wYy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19za2luLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3NraW5zLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvbWFpbi5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvX2VkaXQuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL19maWx0ZXJzLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9fbGlicmFyeS5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvbWFpbi5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19hcHBsZS5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19ibHVlLWdyYXkuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fY2xlYW4tY3V0LmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX2Nvb2wtZ3JleS5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19sZW1vbi10cmVlLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX2xpZ2h0LWdyZWVuLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX2xpZ2h0LWdyZXkuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fbGlnaHQtbW9ub2Nocm9tZS5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19uYXR1cmUuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fcGFwZXIuanMiLCJhcHAvdmVuZG9yL21lZGlhL2pzL2Nhcm91c2VsL21haW4uanMiLCJhcHAvdmVuZG9yL21lZGlhL2pzL2Nhcm91c2VsL293bC9fZGVmYXVsdC5qcyIsImFwcC92ZW5kb3IvbWVkaWEvanMvY2Fyb3VzZWwvb3dsL19taXhlZC5qcyIsImFwcC92ZW5kb3IvbWVkaWEvanMvY2Fyb3VzZWwvb3dsL19wcmV2aWV3LmpzIiwiYXBwL3ZlbmRvci9tZWRpYS9qcy9jYXJvdXNlbC9vd2wvbWFpbi5qcyIsImFwcC92ZW5kb3IvbWVkaWEvanMvY2Fyb3VzZWwvc2xpY2svX2RlZmF1bHQuanMiLCJhcHAvdmVuZG9yL3JlYWwtZXN0YXRlL2pzL19tYXBzLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19icmVha3BvaW50cy5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9fY29sbGFwc2libGUuanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvX2Ryb3Bkb3duLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19vcHRpb25zLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19zaWRlYmFyLW1lbnUuanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvX3NpZGViYXItdG9nZ2xlLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL21haW4uanMiLCJhcHAvdmVuZG9yL3VpL2pzL19ib290c3RyYXAtY2Fyb3VzZWwuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19ib290c3RyYXAtY29sbGFwc2UuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19ib290c3RyYXAtbW9kYWwuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19ib290c3RyYXAtc3dpdGNoLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fY2hlY2stYWxsLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fY292ZXIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19kYXRlcGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fZGF0ZXJhbmdlcGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fZXhwYW5kYWJsZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2lmcmFtZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX21pbmljb2xvcnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19uZXN0YWJsZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3BhbmVsLWNvbGxhcHNlLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fcHJvZ3Jlc3MtYmFycy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3NlbGVjdDIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19zZWxlY3RwaWNrZXIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19zaG93LWhvdmVyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2xpZGVyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdGFibGVzLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdGFicy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3Rvb2x0aXAuanMiLCJhcHAvdmVuZG9yL3VpL2pzL190b3VjaHNwaW4uanMiLCJhcHAvdmVuZG9yL3VpL2pzL190cmVlLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fd2l6YXJkLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9SQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gRXNzZW50aWFsc1xucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3VpL2pzL21haW4nKTtcblxuLy8gTGF5b3V0XG5yZXF1aXJlKCcuLi8uLi8uLi92ZW5kb3IvbGF5b3V0L2pzL21haW4nKTtcblxuLy8gU2lkZWJhclxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3NpZGViYXIvanMvbWFpbicpO1xuXG4vLyBPd2wgQ2Fyb3VzZWxcbnJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci9tZWRpYS9qcy9jYXJvdXNlbC9tYWluJyk7XG5cbi8vIE1hcHNcbndpbmRvdy5pbml0R29vZ2xlTWFwcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9tYWluJyk7XG5cbi8vIENPUkVcbnJlcXVpcmUoJy4vdGhlbWUtY29yZScpOyIsIi8vIENVU1RPTVxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3JlYWwtZXN0YXRlL2pzL19tYXBzJyk7IiwiZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XG5cbiAgICB2YXIgZG9uZSA9IGZhbHNlLCB0b3AgPSB0cnVlLFxuXG4gICAgICAgIGRvYyA9IHdpbi5kb2N1bWVudCxcbiAgICAgICAgcm9vdCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIG1vZGVybiA9IGRvYy5hZGRFdmVudExpc3RlbmVyLFxuXG4gICAgICAgIGFkZCA9IG1vZGVybiA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG4gICAgICAgIHJlbSA9IG1vZGVybiA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4gICAgICAgIHByZSA9IG1vZGVybiA/ICcnIDogJ29uJyxcblxuICAgICAgICBpbml0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcbiAgICAgICAgICAgIChlLnR5cGUgPT0gJ2xvYWQnID8gd2luIDogZG9jKVsgcmVtIF0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoISBkb25lICYmIChkb25lID0gdHJ1ZSkpIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcm9vdC5kb1Njcm9sbCgnbGVmdCcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocG9sbCwgNTApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXQoJ3BvbGwnKTtcbiAgICAgICAgfTtcblxuICAgIGlmIChkb2MucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBmbi5jYWxsKHdpbiwgJ2xhenknKTtcbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKCEgbW9kZXJuICYmIHJvb3QuZG9TY3JvbGwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdG9wID0gISB3aW4uZnJhbWVFbGVtZW50O1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRvcCkgcG9sbCgpO1xuICAgICAgICB9XG4gICAgICAgIGRvY1sgYWRkIF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XG4gICAgICAgIGRvY1sgYWRkIF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG4gICAgICAgIHdpblsgYWRkIF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybHMsIGNhbGxiYWNrKSB7XG5cbiAgICB2YXIgYXN5bmNMb2FkZXIgPSBmdW5jdGlvbiAodXJscywgY2FsbGJhY2spIHtcblxuICAgICAgICB1cmxzLmZvcmVhY2goZnVuY3Rpb24gKGksIGZpbGUpIHtcbiAgICAgICAgICAgIGxvYWRDc3MoZmlsZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNraW5nIGZvciBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY2FsbGluZyB0aGUgY2FsbGJhY2tcbiAgICAgICAgICAgIGNvbnRlbnRMb2FkZWQod2luZG93LCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGxvYWRDc3MgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWyAwIF0uYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfTtcblxuICAgIC8vIHNpbXBsZSBmb3JlYWNoIGltcGxlbWVudGF0aW9uXG4gICAgQXJyYXkucHJvdG90eXBlLmZvcmVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArKykge1xuICAgICAgICAgICAgY2FsbGJhY2soaSwgdGhpc1sgaSBdKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luY0xvYWRlcih1cmxzLCBjYWxsYmFjayk7XG5cbn07IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAkKHdpbmRvdykuc2V0QnJlYWtwb2ludHMoe1xuICAgICAgICBkaXN0aW5jdDogdHJ1ZSxcbiAgICAgICAgYnJlYWtwb2ludHM6IFsgMzIwLCA0ODAsIDc2OCwgMTAyNCBdXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrR3JpZGFsaWNpb3VzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5ncmlkYWxpY2lvdXMoe1xuICAgICAgICAgICAgZ3V0dGVyOiB0aGlzLmRhdGEoJ2d1dHRlcicpIHx8IDE1LFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZGF0YSgnd2lkdGgnKSB8fCAzNzAsXG4gICAgICAgICAgICBzZWxlY3RvcjogJz4gZGl2JyxcbiAgICAgICAgICAgIGFuaW1hdGlvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGUqPVwiZ3JpZGFsaWNpb3VzXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudGtHcmlkYWxpY2lvdXMoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtJc290b3BlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pc290b3BlKHtcbiAgICAgICAgICAgIGxheW91dE1vZGU6IHRoaXMuZGF0YSgnbGF5b3V0TW9kZScpIHx8IFwicGFja2VyeVwiLFxuICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLml0ZW0nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXNvdG9wZSgnb24nLCAnbGF5b3V0Q29tcGxldGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJpc290b3BlXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS50a0lzb3RvcGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAzMDApO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkb21DaGFuZ2VkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cImlzb3RvcGVcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5pc290b3BlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuL19za2luJykoKTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTY3JvbGxhYmxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgIGhvcml6b250YWw6IGZhbHNlXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBuaWNlID0gdGhpcy5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgICAgIGN1cnNvcmNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBzZXR0aW5ncy5ob3Jpem9udGFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghIHNldHRpbmdzLmhvcml6b250YWwpIHJldHVybjtcblxuICAgICAgICB2YXIgX3N1cGVyID0gbmljZS5nZXRDb250ZW50U2l6ZTtcblxuICAgICAgICBuaWNlLmdldENvbnRlbnRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbChuaWNlKTtcbiAgICAgICAgICAgIHBhZ2UuaCA9IG5pY2Uud2luLmhlaWdodCgpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH07XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0sIC5zdC1jb250ZW50LWlubmVyJykudGtTY3JvbGxhYmxlKCk7XG5cbiAgICAkKCdbZGF0YS1zY3JvbGxhYmxlLWhdJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCh0aGlzKS50a1Njcm9sbGFibGUoeyBob3Jpem9udGFsOiB0cnVlIH0pO1xuXG4gICAgfSk7XG5cbiAgICB2YXIgdDtcbiAgICAkKHdpbmRvdykub24oJ2RlYm91bmNlZHJlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHQpO1xuICAgICAgICB0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXSwgW2RhdGEtc2Nyb2xsYWJsZS1oXSwgLnN0LWNvbnRlbnQtaW5uZXInKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkLmZuLnRrU2lkZWJhclNpemVQY0RlbW8gPSBmdW5jdGlvbigpe1xuXG4gICAgICAgIHZhciB0LCBzcGNfZGVtbyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEgc3BjX2RlbW8ubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgICAgIC5vbignc2lkZWJhci5zaG93JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcjcGMtb3BlbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzaWRlYmFyLmhpZGRlbicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnI3BjLW9wZW4nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNwY19kZW1vLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHMgPSAkKCcuc2lkZWJhcicpLCB2ZSA9ICQoJyNwYy12YWx1ZScpLCB2ID0gdmUudmFsKCk7XG4gICAgICAgICAgICB2ZS5ibHVyKCk7XG4gICAgICAgICAgICBpZiAoISB2Lmxlbmd0aCB8fCB2IDwgMjUpIHtcbiAgICAgICAgICAgICAgICB2ID0gMjU7XG4gICAgICAgICAgICAgICAgdmUudmFsKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc1sgMCBdLmNsYXNzTmFtZSA9IHNbIDAgXS5jbGFzc05hbWUucmVwbGFjZSgvc2lkZWJhci1zaXplLShbXFxkXSspcGMvaWcsICdzaWRlYmFyLXNpemUtJyArIHYgKyAncGMnKTtcbiAgICAgICAgICAgIHNpZGViYXIub3Blbignc2lkZWJhci1tZW51Jyk7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgICAgICB0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5jbG9zZSgnc2lkZWJhci1tZW51Jyk7XG4gICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1zaXplLXBjLWRlbW9cIl0nKS50a1NpZGViYXJTaXplUGNEZW1vKCk7XG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBza2luID0gJC5jb29raWUoJ3NraW4nKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBza2luID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICByZXR1cm4gc2tpbjtcbn0pOyIsInZhciBhc3luY0xvYWRlciA9IHJlcXVpcmUoJy4vX2FzeW5jJyk7XG5cbihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYW5nZVNraW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBza2luID0gJC5jb29raWUoXCJza2luXCIpLFxuICAgICAgICAgICAgZmlsZSA9ICQuY29va2llKFwic2tpbi1maWxlXCIpO1xuICAgICAgICBpZiAodHlwZW9mIHNraW4gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFzeW5jTG9hZGVyKFsgJ2Nzcy8nICsgZmlsZSArICcubWluLmNzcycgXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXNraW5dJykucmVtb3ZlUHJvcCgnZGlzYWJsZWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnZGlzYWJsZWQnKSkgcmV0dXJuO1xuXG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgJC5jb29raWUoXCJza2luXCIsICQodGhpcykuZGF0YSgnc2tpbicpKTtcblxuICAgICAgICAkLmNvb2tpZShcInNraW4tZmlsZVwiLCAkKHRoaXMpLmRhdGEoJ2ZpbGUnKSk7XG5cbiAgICAgICAgY2hhbmdlU2tpbigpO1xuXG4gICAgfSk7XG5cbiAgICB2YXIgc2tpbiA9ICQuY29va2llKFwic2tpblwiKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiAhPSAndW5kZWZpbmVkJyAmJiBza2luICE9ICdkZWZhdWx0Jykge1xuICAgICAgICBjaGFuZ2VTa2luKCk7XG4gICAgfVxuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2JyZWFrcG9pbnRzLmpzJyk7XG5yZXF1aXJlKCcuL19ncmlkYWxpY2lvdXMuanMnKTtcbnJlcXVpcmUoJy4vX3Njcm9sbGFibGUuanMnKTtcbnJlcXVpcmUoJy4vX3NraW5zJyk7XG5yZXF1aXJlKCcuL19pc290b3BlJyk7XG5cbi8vIFNpZGViYXIgUGVyY2VudGFnZSBTaXplcyBEZW1vXG5yZXF1aXJlKCcuL19zaWRlYmFyLXBjJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgZmluZCA9IGZ1bmN0aW9uIChtYXBEYXRhLCBsb2NhdGlvbiwgbWFya2VyLCBtYXJrZXJEYXRhKSB7XG5cbiAgICAgICAgdmFyIGV2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCB7bWFya2VyOiBtYXJrZXJ9LCBtYXJrZXJEYXRhLCBtYXBEYXRhKSxcbiAgICAgICAgICAgIHN0YXRlID0gJycsXG4gICAgICAgICAgICBjb3VudHJ5ID0gJycsXG4gICAgICAgICAgICBhZGRyZXNzID0gJyc7XG5cbiAgICAgICAgbWFwRGF0YS5jb250YWluZXIuZ21hcCgnc2VhcmNoJywgeydsb2NhdGlvbic6IGxvY2F0aW9ufSwgZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cykge1xuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XG4gICAgICAgICAgICAgICAgYWRkcmVzcyA9IHJlc3VsdHNbIDAgXS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICAgICAgICAgICAgICAkLmVhY2gocmVzdWx0c1sgMCBdLmFkZHJlc3NfY29tcG9uZW50cywgZnVuY3Rpb24gKGksIHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYudHlwZXNbIDAgXSA9PSBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMVwiIHx8IHYudHlwZXNbIDAgXSA9PSBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHYubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHYudHlwZXNbIDAgXSA9PSBcImNvdW50cnlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IHYubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXZlbnREYXRhID0gJC5leHRlbmQoe30sIGV2ZW50RGF0YSwge3N0YXRlOiBzdGF0ZSwgY291bnRyeTogY291bnRyeSwgYWRkcmVzczogYWRkcmVzc30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdtYXAubWFya2VyLmZpbmQnLCBldmVudERhdGEpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHZhciBiaW5kRmluZCA9IGZ1bmN0aW9uKG1hcmtlciwgbWFya2VyRGF0YSwgZGF0YSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWFya2VyRGF0YS5vcGVuICE9PSAndW5kZWZpbmVkJyAmJiBtYXJrZXJEYXRhLm9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZpbmQoZGF0YSwgbWFya2VyRGF0YS5sYXRMbmcsIG1hcmtlciwgbWFya2VyRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdkcmFnZW5kJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGZpbmQoZGF0YSwgZS5sYXRMbmcsIHRoaXMsIG1hcmtlckRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBmaW5kKGRhdGEsIGUubGF0TG5nLCB0aGlzLCBtYXJrZXJEYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJChkb2N1bWVudCkub24oJ21hcC5pbml0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGFpbmVyLmRhdGEoJ2lkJykgPT0gJ21hcC1lZGl0Jykge1xuXG4gICAgICAgICAgICB2YXIgbWFya2VycyA9IGRhdGEuY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJyksXG4gICAgICAgICAgICAgICAgbWFya2VyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJkcmFnZ2FibGVcIjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWFya2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJvcGVuXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFwidGVtcGxhdGVcIjogXCJ0cGwtZWRpdFwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25cIjogXCJidWlsZGluZy0wMVwiXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoZGF0YS5tYXAsICdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgbWFya2VyRGF0YSA9ICQuZXh0ZW5kKHt9LCBtYXJrZXJEYXRhLCB7XCJsYXRMbmdcIjogZXZlbnQubGF0TG5nfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbWFya2VyID0gZGF0YS5hZGRNYXJrZXIobWFya2Vycy5sZW5ndGgsIG1hcmtlckRhdGEsIG1hcmtlck9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgYmluZEZpbmQobWFya2VyLCBtYXJrZXJEYXRhLCBkYXRhKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGRhdGEuaXcud2luZG93LCAnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAkKCcjbWFwLWRlbGV0ZS1tYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaXcuY2xvc2UoaWQpO1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzWyBpZCBdLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQuZWFjaChtYXJrZXJzLCBmdW5jdGlvbihpLCBtYXJrZXIpe1xuXG4gICAgICAgICAgICAgICAgdmFyIG1hcmtlckRhdGEgPSBtYXJrZXIuZ2V0KCdjb250ZW50Jyk7XG5cbiAgICAgICAgICAgICAgICBiaW5kRmluZChtYXJrZXIsIG1hcmtlckRhdGEsIGRhdGEpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtYXAubWFya2VyLmZpbmQnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICBkYXRhLm1hcmtlci5zZXRUaXRsZShkYXRhLmFkZHJlc3MpO1xuXG4gICAgICAgIGlmIChkYXRhLml3LndpbmRvdy5pc09wZW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgZGF0YS5pdy5vcGVuKGRhdGEubWFya2VyLmdldCgnaWQnKSwgZGF0YSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhcnJheVVuaXF1ZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgcmV0dXJuIGEucmVkdWNlKGZ1bmN0aW9uKHAsIGMpIHtcbiAgICAgICAgICAgIGlmIChwLmluZGV4T2YoYykgPCAwKSBwLnB1c2goYyk7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSwgW10pO1xuICAgIH07XG5cbiAgICB2YXIgZmlsdGVyID0gZnVuY3Rpb24oZGF0YSl7XG5cbiAgICAgICAgZGF0YS5pdy5jbG9zZSgpO1xuICAgICAgICBkYXRhLmNvbnRhaW5lci5nbWFwKCdzZXQnLCAnYm91bmRzJywgbnVsbCk7XG5cbiAgICAgICAgdmFyIGZpbHRlcnMgPSBbXTtcblxuICAgICAgICAkKCcjcmFkaW9zIDpjaGVja2VkJykuZWFjaChmdW5jdGlvbiAoaSwgY2hlY2tib3gpIHtcbiAgICAgICAgICAgIGZpbHRlcnMucHVzaCgkKGNoZWNrYm94KS52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YS5jb250YWluZXIuZ21hcCgnZmluZCcsICdtYXJrZXJzJywge1xuICAgICAgICAgICAgICAgICdwcm9wZXJ0eSc6ICd0YWdzJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiBmaWx0ZXJzLFxuICAgICAgICAgICAgICAgICdvcGVyYXRvcic6ICdPUidcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChtYXJrZXIsIGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGFpbmVyLmdtYXAoJ2FkZEJvdW5kcycsIG1hcmtlci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKGZvdW5kKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJC5lYWNoKGRhdGEuY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJyksIGZ1bmN0aW9uIChpLCBtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNvbnRhaW5lci5nbWFwKCdhZGRCb3VuZHMnLCBtYXJrZXIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJChkb2N1bWVudCkub24oJ21hcC5pbml0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGFpbmVyLmRhdGEoJ2ZpbHRlcnMnKSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICB2YXIgbWFwID0gZGF0YSxcbiAgICAgICAgICAgICAgICBtYXJrZXJzID0gZGF0YS5jb250YWluZXIuZ21hcCgnZ2V0JywgJ21hcmtlcnMnKSxcbiAgICAgICAgICAgICAgICB0YWdzID0gW10sXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVJZCA9IGRhdGEuY29udGFpbmVyLmRhdGEoJ2ZpbHRlcnNUZW1wbGF0ZScpIHx8ICcjbWFwLWZpbHRlcnMtdGVtcGxhdGUnO1xuXG4gICAgICAgICAgICAkLmVhY2gobWFya2VycywgZnVuY3Rpb24oaSwgbWFya2VyKXtcbiAgICAgICAgICAgICAgICAkLmVhY2gobWFya2VyLnRhZ3MsIGZ1bmN0aW9uKGksIHRhZyl7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRhZ3MgPSBhcnJheVVuaXF1ZSh0YWdzKTtcblxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9ICQodGVtcGxhdGVJZCkuaHRtbCgpO1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHNvdXJjZSk7XG4gICAgICAgICAgICB2YXIgJGVsID0gJCh0ZW1wbGF0ZSh7IHRhZ3M6IHRhZ3MgfSkpO1xuXG4gICAgICAgICAgICAkZWwuaW5zZXJ0QWZ0ZXIoZGF0YS5jb250YWluZXIpO1xuXG4gICAgICAgICAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2xheW91dC9qcy9fc2tpbicpKCk7XG5cbiAgICAgICAgICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdJywgJGVsKS5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZGF0YSk7XG4gICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJyNyYWRpb3MgOmNoZWNrYm94JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBjZW50ZXJXaW5kb3cgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBtYXAsIGRhdGEpIHtcblxuICAgICAgICBpZiAoZGF0YS5sYXQgJiYgZGF0YS5sbmcpIHtcblxuICAgICAgICAgICAgY29udGFpbmVyLmdtYXAoJ29wdGlvbicsICdjZW50ZXInLCBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGRhdGEubGF0LCBkYXRhLmxuZykpO1xuXG4gICAgICAgICAgICBtYXAucGFuQnkoMCwgLTE3MCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB2YXIgY2VudGVyTWFwID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGF0YSkge1xuXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID09PSAyKSB7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5nbWFwKCdvcHRpb24nLCAnY2VudGVyJywgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhkYXRhWyAwIF0sIGRhdGFbIDEgXSkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdmFyIHJlc2l6ZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIG1hcCwgd2luZG93RGF0YSwgbWFwRGF0YSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZ29vZ2xlID09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcblxuICAgICAgICBpZiAoISBjZW50ZXJNYXAoY29udGFpbmVyLCBtYXBEYXRhKSkgY2VudGVyV2luZG93KGNvbnRhaW5lciwgbWFwLCB3aW5kb3dEYXRhKTtcblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjZW50ZXJXaW5kb3c6IGNlbnRlcldpbmRvdyxcbiAgICAgICAgY2VudGVyTWFwOiBjZW50ZXJNYXAsXG4gICAgICAgIHJlc2l6ZTogcmVzaXplXG4gICAgfTtcblxufTsiLCJmdW5jdGlvbiBsb2FkU2NyaXB0KCkge1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP3Y9My5leHAmJyArXG4gICAgJ2NhbGxiYWNrPWluaXRHb29nbGVNYXBzJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBsb2FkU2NyaXB0O1xuXG5mdW5jdGlvbiBpbml0U2NyaXB0cygpIHtcbiAgICB2YXIgJHNjcmlwdHMgPSBbXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvdWkvanF1ZXJ5LnVpLm1hcC5leHRlbnNpb25zLmpzXCIsXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAuc2VydmljZXMuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvdWkvanF1ZXJ5LnVpLm1hcC5taWNyb2RhdGEuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvdWkvanF1ZXJ5LnVpLm1hcC5taWNyb2Zvcm1hdC5qc1wiLFxuICAgICAgICBcImpzL3BsdWdpbnMvbWFwc19nb29nbGUvanF1ZXJ5LXVpLW1hcC91aS9qcXVlcnkudWkubWFwLm92ZXJsYXlzLmpzXCIsXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAucmRmYS5qc1wiLFxuICAgICAgICBcImpzL3BsdWdpbnMvbWFwc19nb29nbGUvanF1ZXJ5LXVpLW1hcC9hZGRvbnMvaW5mb2JveF9wYWNrZWQuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvYWRkb25zL21hcmtlcmNsdXN0ZXJlci5taW4uanNcIlxuICAgIF07XG5cbiAgICAkLmVhY2goJHNjcmlwdHMsIGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgIGlmICgkKCdbc3JjPVwiJyArIHYgKyAnXCJdJykubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIHNjcmlwdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICBzY3JpcHROb2RlLnNyYyA9IHY7XG4gICAgICAgICQoJ2hlYWQnKS5wcmVwZW5kKCQoc2NyaXB0Tm9kZSkpO1xuICAgIH0pO1xuXG4gICAgJC5leHRlbmQoJC51aS5nbWFwLnByb3RvdHlwZSwge1xuICAgICAgICBwYWdpbmF0aW9uOiBmdW5jdGlvbiAocHJvcCwgbWFwRGF0YSkge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9ICQoXCIjbWFwLXBhZ2luYXRpb25cIikuaHRtbCgpO1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHNvdXJjZSk7XG4gICAgICAgICAgICB2YXIgJGVsID0gJCh0ZW1wbGF0ZSgpKTtcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBpID0gMDtcbiAgICAgICAgICAgIHByb3AgPSBwcm9wIHx8ICd0aXRsZSc7XG4gICAgICAgICAgICBzZWxmLnNldCgncGFnaW5hdGlvbicsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyBiO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IHNlbGYuZ2V0KCdtYXJrZXJzJylbIGkgXTtcbiAgICAgICAgICAgICAgICAgICAgbWFwRGF0YS5pdy5vcGVuKGksIG0uZ2V0KCdjb250ZW50JykpO1xuICAgICAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmRpc3BsYXknKS50ZXh0KG1bIHByb3AgXSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0KCdtYXAnKS5wYW5UbyhtLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5nZXQoJ3BhZ2luYXRpb24nKSh0cnVlLCAwKTtcbiAgICAgICAgICAgICRlbC5maW5kKCcuYmFjay1idG4nKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLmdldCgncGFnaW5hdGlvbicpKChpID4gMCksIC0gMSwgdGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRlbC5maW5kKCcuZndkLWJ0bicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuZ2V0KCdwYWdpbmF0aW9uJykoKGkgPCBzZWxmLmdldCgnbWFya2VycycpLmxlbmd0aCAtIDEpLCAxLCB0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5hZGRDb250cm9sKCRlbCwgZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uWyBtYXBEYXRhLm9wdGlvbnMucGFnaW5hdGlvblBvc2l0aW9uIF0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbnZhciBsaWJyYXJ5ID0gcmVxdWlyZSgnLi9fbGlicmFyeS5qcycpKCk7XG5cbi8vIEhvbGRzIGdvb2dsZSBtYXBzIHN0eWxlc1xudmFyIHN0eWxlcyA9IHtcbiAgICBcImxpZ2h0LWdyZXlcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2xpZ2h0LWdyZXkuanMnKSxcbiAgICBcImxpZ2h0LW1vbm9jaHJvbWVcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2xpZ2h0LW1vbm9jaHJvbWUuanMnKSxcbiAgICBcImNvb2wtZ3JleVwiOiByZXF1aXJlKCcuL3N0eWxlcy9fY29vbC1ncmV5LmpzJyksXG4gICAgXCJibHVlLWdyYXlcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2JsdWUtZ3JheS5qcycpLFxuICAgIFwicGFwZXJcIjogcmVxdWlyZSgnLi9zdHlsZXMvX3BhcGVyLmpzJyksXG4gICAgXCJhcHBsZVwiOiByZXF1aXJlKCcuL3N0eWxlcy9fYXBwbGUuanMnKSxcbiAgICBcImxpZ2h0LWdyZWVuXCI6IHJlcXVpcmUoJy4vc3R5bGVzL19saWdodC1ncmVlbi5qcycpLFxuICAgIFwibGVtb24tdHJlZVwiOiByZXF1aXJlKCcuL3N0eWxlcy9fbGVtb24tdHJlZS5qcycpLFxuICAgIFwiY2xlYW4tY3V0XCI6IHJlcXVpcmUoJy4vc3R5bGVzL19jbGVhbi1jdXQuanMnKSxcbiAgICBcIm5hdHVyZVwiOiByZXF1aXJlKCcuL3N0eWxlcy9fbmF0dXJlLmpzJylcbn07XG5cbi8vIFByb2Nlc3MgdGhlIGluZm9XaW5kb3cgY29udGVudCB2aWEgSGFuZGxlYmFycyB0ZW1wbGF0ZXNcbnZhciBpbmZvV2luZG93Q29udGVudCA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICB2YXIgc291cmNlID0gJChcIiNcIiArIG1hcmtlci50ZW1wbGF0ZSkuaHRtbCgpO1xuICAgIHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShzb3VyY2UpO1xuICAgIHJldHVybiB0ZW1wbGF0ZShtYXJrZXIpO1xufTtcblxuLyoqXG4gKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAqL1xuJC5mbi50a0dvb2dsZU1hcCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICB2YXIgY29udGFpbmVyID0gdGhpcztcblxuICAgIGlmICh0eXBlb2YgZ29vZ2xlID09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBJbmZvQm94ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnRhaW5lci50a0dvb2dsZU1hcCgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgbWFwWm9vbVBvc2l0aW9uOiBjb250YWluZXIuZGF0YSgnem9vbVBvc2l0aW9uJykgfHwgXCJUT1BfTEVGVFwiLFxuICAgICAgICBtYXBab29tOiBjb250YWluZXIuZGF0YSgnem9vbScpIHx8IDE2LFxuICAgICAgICBtYXBTdHlsZTogY29udGFpbmVyLmRhdGEoJ3N0eWxlJykgfHwgXCJsaWdodC1ncmV5XCIsXG4gICAgICAgIG1hcFR5cGU6IGNvbnRhaW5lci5kYXRhKCd0eXBlJykgfHwgXCJST0FETUFQXCIsXG4gICAgICAgIGZpbGU6IGNvbnRhaW5lci5kYXRhKCdmaWxlJyksXG4gICAgICAgIGNlbnRlcjogY29udGFpbmVyLmRhdGEoJ2NlbnRlcicpID8gY29udGFpbmVyLmRhdGEoJ2NlbnRlcicpLnNwbGl0KFwiLFwiKSA6IGZhbHNlLFxuICAgICAgICBwYWdpbmF0aW9uOiBjb250YWluZXIuZGF0YSgncGFnaW5hdGlvbicpIHx8IGZhbHNlLFxuICAgICAgICBwYWdpbmF0aW9uUG9zaXRpb246IGNvbnRhaW5lci5kYXRhKCdwYWdpbmF0aW9uUG9zaXRpb24nKSB8fCAnVE9QX0xFRlQnXG4gICAgfTtcblxuICAgIHZhciBtYXBEYXRhO1xuXG4gICAgLy8gcHJvdmlkZSBhIGRlZmF1bHQgb2JqZWN0IGZvciBkYXRhIGNvbGxlY3RlZCBmcm9tIHRoZSBjdXJyZW50bHkgb3BlbmVkIGluZm9XaW5kb3dcbiAgICB2YXIgaW5mb1dpbmRvd0RhdGEgPSB7XG4gICAgICAgIGxhdDogZmFsc2UsXG4gICAgICAgIGxuZzogZmFsc2VcbiAgICB9O1xuXG4gICAgdmFyIGluZm9XaW5kb3dPcGVuID0gZnVuY3Rpb24gKGksIG1hcmtlcikge1xuXG4gICAgICAgIHZhciBtYXJrZXJJbnN0ID0gY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJylbIGkgXTtcblxuICAgICAgICBpbmZvV2luZG93LnNldENvbnRlbnQoaW5mb1dpbmRvd0NvbnRlbnQobWFya2VyKSk7XG4gICAgICAgIGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlckluc3QpO1xuICAgICAgICBpbmZvV2luZG93LmlzT3BlbiA9IGk7XG5cbiAgICAgICAgaW5mb1dpbmRvd0RhdGEgPSB7XG4gICAgICAgICAgICBsYXQ6IG1hcmtlci5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxuZzogbWFya2VyLmxvbmdpdHVkZVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgaW5mb1dpbmRvd0Nsb3NlID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICBpbmZvV2luZG93LmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBpbmZvV2luZG93LmlzT3BlbiAhPSAndW5kZWZpbmVkJyAmJiBpbmZvV2luZG93LmlzT3BlbiA9PT0gaSkge1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyogSW5mb0JveCAqL1xuICAgIHZhciBpbmZvV2luZG93ID0gbmV3IEluZm9Cb3goe1xuICAgICAgICBtYXhXaWR0aDogMjQwLFxuICAgICAgICBhbGlnbkJvdHRvbTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdmFyIGFkZE1hcmtlciA9IGZ1bmN0aW9uIChpLCBtYXJrZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGljb25CYXNlID0gJ2ltYWdlcy9tYXJrZXJzLyc7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHR5cGVvZiBtYXJrZXIubGF0TG5nICE9PSAndW5kZWZpbmVkJyA/IG1hcmtlci5sYXRMbmcgOiBmYWxzZTtcbiAgICAgICAgaWYgKCEgcG9zaXRpb24gJiYgdHlwZW9mIG1hcmtlci5sYXRpdHVkZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1hcmtlci5sb25naXR1ZGUgIT09ICd1bmRlZmluZWQnKSBwb3NpdGlvbiA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFya2VyLmxhdGl0dWRlLCBtYXJrZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgaWYgKCEgcG9zaXRpb24pIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXIgbWFya2VyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRcIjogaSxcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogcG9zaXRpb24sXG4gICAgICAgICAgICBcImRyYWdnYWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJpY29uXCI6IGljb25CYXNlICsgbWFya2VyLmljb24gKyBcIi5wbmdcIlxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0JykgbWFya2VyT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBtYXJrZXJPcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgb3BlbiA9IHR5cGVvZiBtYXJrZXIub3BlbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbWFya2VyLm9wZW4gPT09IHRydWU7XG5cbiAgICAgICAgY29udGFpbmVyLmdtYXAoJ2FkZE1hcmtlcicsIG1hcmtlck9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBtYXJrZXJJbnN0ID0gY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJylbIGkgXTtcblxuICAgICAgICBtYXJrZXJJbnN0LnNldFRpdGxlKG1hcmtlci50aXRsZSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VySW5zdCwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEgaW5mb1dpbmRvd0Nsb3NlKGkpKSB7XG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvd09wZW4oaSwgbWFya2VyKTtcbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmNlbnRlcldpbmRvdyhjb250YWluZXIsIG1hcCwgaW5mb1dpbmRvd0RhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXJJbnN0LCAnZHJhZ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsYXQgPSBtYXJrZXJJbnN0LmdldFBvc2l0aW9uKCkubGF0KCk7XG4gICAgICAgICAgICB2YXIgbG5nID0gbWFya2VySW5zdC5nZXRQb3NpdGlvbigpLmxuZygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1wibGF0aXR1ZGVcIjogJyArIGxhdCArICcsIFwibG9uZ2l0dWRlXCI6ICcgKyBsbmcpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbWFya2VyRGF0YSA9ICQuZXh0ZW5kKHt9LCBtYXJrZXIsIHtcbiAgICAgICAgICAgIFwiaWRcIjogaSxcbiAgICAgICAgICAgIFwibGF0TG5nXCI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFya2VyLmxhdGl0dWRlLCBtYXJrZXIubG9uZ2l0dWRlKVxuICAgICAgICB9KTtcblxuICAgICAgICBtYXJrZXJJbnN0LnNldCgnY29udGVudCcsIG1hcmtlckRhdGEpO1xuXG4gICAgICAgIGlmIChvcGVuKSBpbmZvV2luZG93T3BlbihpLCBtYXJrZXIpO1xuXG4gICAgICAgIHJldHVybiBtYXJrZXJJbnN0O1xuICAgIH07XG5cbiAgICBjb250YWluZXIuZ21hcChcbiAgICAgICAge1xuICAgICAgICAgICAgJ3pvb21Db250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICd6b29tQ29udHJvbE9wdGlvbnMnOiB7XG4gICAgICAgICAgICAgICAgJ3N0eWxlJzogZ29vZ2xlLm1hcHMuWm9vbUNvbnRyb2xTdHlsZS5TTUFMTCxcbiAgICAgICAgICAgICAgICAncG9zaXRpb24nOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bIG9wdGlvbnMubWFwWm9vbVBvc2l0aW9uIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncGFuQ29udHJvbCc6IGZhbHNlLFxuICAgICAgICAgICAgJ3N0cmVldFZpZXdDb250cm9sJzogZmFsc2UsXG4gICAgICAgICAgICAnbWFwVHlwZUNvbnRyb2wnOiBmYWxzZSxcbiAgICAgICAgICAgICdvdmVydmlld01hcENvbnRyb2wnOiBmYWxzZSxcbiAgICAgICAgICAgICdzY3JvbGx3aGVlbCc6IGZhbHNlLFxuICAgICAgICAgICAgJ21hcFR5cGVJZCc6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZFsgb3B0aW9ucy5tYXBUeXBlIF0sXG4gICAgICAgICAgICAnem9vbSc6IG9wdGlvbnMubWFwWm9vbSxcbiAgICAgICAgICAgICdzdHlsZXMnOiBzdHlsZXNbIG9wdGlvbnMubWFwU3R5bGUgXVxuICAgICAgICB9KVxuICAgICAgICAuYmluZCgnaW5pdCcsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgbWFwRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgIGFkZE1hcmtlcjogYWRkTWFya2VyLFxuICAgICAgICAgICAgICAgIGxpYnJhcnk6IGxpYnJhcnksXG4gICAgICAgICAgICAgICAgaXc6IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5mb1dpbmRvd0RhdGEsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdzogaW5mb1dpbmRvdyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogaW5mb1dpbmRvd0NvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9wZW46IGluZm9XaW5kb3dPcGVuLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogaW5mb1dpbmRvd0Nsb3NlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgJC5nZXRKU09OKG9wdGlvbnMuZmlsZSwgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS5tYXJrZXJzLCBmdW5jdGlvbiAoaSwgbWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbyA9IHR5cGVvZiBtYXJrZXIub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgPyBtYXJrZXIub3B0aW9ucyA6IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTWFya2VyKGksIG1hcmtlciwgbyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZShtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5LnJlc2l6ZShjb250YWluZXIsIG1hcCwgaW5mb1dpbmRvd0RhdGEsIG9wdGlvbnMuY2VudGVyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5nbWFwKCdwYWdpbmF0aW9uJywgJ3RpdGxlJywgbWFwRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpYnJhcnkuY2VudGVyTWFwKGNvbnRhaW5lciwgb3B0aW9ucy5jZW50ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2UobWFwLCAnaWRsZScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ21hcC5pbml0JywgbWFwRGF0YSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihpbmZvV2luZG93LCAnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl3ID0gJCgnLmluZm9Cb3gnKTtcbiAgICAgICAgICAgICAgICBpbmZvV2luZG93LnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoLSBNYXRoLmFicyhpdy53aWR0aCgpIC8gMiksIC0gNDUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb3ZlcicsIGl3KS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRrQ292ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgdmFyIG1hcCA9IGNvbnRhaW5lci5nbWFwKCdnZXQnLCAnbWFwJyk7XG5cbiAgICB2YXIgdDtcbiAgICAkKHdpbmRvdykub24oJ2RlYm91bmNlZHJlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHQpO1xuICAgICAgICB0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsaWJyYXJ5LnJlc2l6ZShjb250YWluZXIsIG1hcCwgaW5mb1dpbmRvd0RhdGEsIG9wdGlvbnMuY2VudGVyKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KTtcblxuICAgIC8vIGhhbmRsZSBtYXBzIGluIGNvbGxhcHNpYmxlc1xuICAgICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmICgkKGNvbnRhaW5lciwgdGhpcykubGVuZ3RoKSB7XG4gICAgICAgICAgICBsaWJyYXJ5LnJlc2l6ZShjb250YWluZXIsIG1hcCwgaW5mb1dpbmRvd0RhdGEsIG9wdGlvbnMuY2VudGVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpbml0U2NyaXB0cygpO1xuXG4gICAgLypcbiAgICAgKiBDbHVzdGVyaW5nXG4gICAgICovXG4gICAgaWYgKCQoJyNnb29nbGUtbWFwLWNsdXN0ZXJpbmcnKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBiaW5kIHRoZSBtYXAgd2l0aCB0aGUgXCJpbml0XCIgZXZlbnQgb3RoZXJ3aXNlIGJvdW5kcyB3aWxsIGJlIG51bGxcbiAgICAgICAgJCgnI2dvb2dsZS1tYXAtY2x1c3RlcmluZycpLmdtYXAoeyd6b29tJzogMiwgJ2Rpc2FibGVEZWZhdWx0VUknOiB0cnVlfSkuYmluZCgnaW5pdCcsIGZ1bmN0aW9uIChldnQsIG1hcCkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcbiAgICAgICAgICAgIHZhciBzb3V0aFdlc3QgPSBib3VuZHMuZ2V0U291dGhXZXN0KCk7XG4gICAgICAgICAgICB2YXIgbm9ydGhFYXN0ID0gYm91bmRzLmdldE5vcnRoRWFzdCgpO1xuICAgICAgICAgICAgdmFyIGxuZ1NwYW4gPSBub3J0aEVhc3QubG5nKCkgLSBzb3V0aFdlc3QubG5nKCk7XG4gICAgICAgICAgICB2YXIgbGF0U3BhbiA9IG5vcnRoRWFzdC5sYXQoKSAtIHNvdXRoV2VzdC5sYXQoKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb3BlbkluZm9XaW5kb3coKSB7XG4gICAgICAgICAgICAgICAgJCgnI2dvb2dsZS1tYXAtY2x1c3RlcmluZycpLmdtYXAoJ29wZW5JbmZvV2luZG93Jywge2NvbnRlbnQ6ICdIZWxsbyB3b3JsZCEnfSwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwMDsgaSArKykge1xuICAgICAgICAgICAgICAgIHZhciBsYXQgPSBzb3V0aFdlc3QubGF0KCkgKyBsYXRTcGFuICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICB2YXIgbG5nID0gc291dGhXZXN0LmxuZygpICsgbG5nU3BhbiAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICAgICAgJCgnI2dvb2dsZS1tYXAtY2x1c3RlcmluZycpLmdtYXAoJ2FkZE1hcmtlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZylcbiAgICAgICAgICAgICAgICB9KS5jbGljayhvcGVuSW5mb1dpbmRvdyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJyNnb29nbGUtbWFwLWNsdXN0ZXJpbmcnKS5nbWFwKCdzZXQnLCAnTWFya2VyQ2x1c3RlcmVyJywgbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsICQodGhpcykuZ21hcCgnZ2V0JywgJ21hcmtlcnMnKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn07XG5cbihmdW5jdGlvbigkKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtYXAuaW5pdCcsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgIHZhciBzdHlsZVRwbCA9ICQoJyNtYXAtc3R5bGUtc3dpdGNoJyksXG4gICAgICAgICAgICB0b2dnbGVTdHlsZVdyYXBwZXIgPSAkKCdbZGF0YS10b2dnbGU9XCJtYXAtc3R5bGUtc3dpdGNoXCJdJyk7XG5cbiAgICAgICAgaWYgKHN0eWxlVHBsLmxlbmd0aCAmJiB0b2dnbGVTdHlsZVdyYXBwZXIubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRvZ2dsZVN0eWxlV3JhcHBlci5kYXRhKCd0YXJnZXQnKSk7XG5cbiAgICAgICAgICAgIGlmICghIHRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5jb250YWluZXIuaXModGFyZ2V0KSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBzdHlsZVRwbC5odG1sKCk7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBIYW5kbGViYXJzLmNvbXBpbGUocyk7XG5cbiAgICAgICAgICAgICAgICB0b2dnbGVTdHlsZVdyYXBwZXIuaHRtbCh0KHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBzdHlsZXNcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAkKCdzZWxlY3QnLCB0b2dnbGVTdHlsZVdyYXBwZXIpLnZhbChkYXRhLm9wdGlvbnMubWFwU3R5bGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdHBpY2tlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICQoJy5zZWxlY3RwaWNrZXInLCB0b2dnbGVTdHlsZVdyYXBwZXIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3RwaWNrZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAkKHRoaXMpLmRhdGEoJ3dpZHRoJykgfHwgJzEwMCUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2xheW91dC9qcy9fc2tpbicpKCk7XG5cbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXScsIHRvZ2dsZVN0eWxlV3JhcHBlcikubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoJ3NlbGVjdCcsIHRvZ2dsZVN0eWxlV3JhcHBlcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gdHlwZW9mIHN0eWxlc1sgJCh0aGlzKS52YWwoKSBdID8gc3R5bGVzWyAkKHRoaXMpLnZhbCgpIF0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgc3R5bGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZ21hcCgnb3B0aW9uJywgJ3N0eWxlcycsIHN0eWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiZ29vZ2xlLW1hcHNcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKHRoaXMpLnRrR29vZ2xlTWFwKCk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcblxucmVxdWlyZSgnLi9fZWRpdCcpO1xucmVxdWlyZSgnLi9fZmlsdGVycycpOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2Y3ZjFkZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZDBlM2I0XCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWwudGVycmFpblwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5idXNpbmVzc1wiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLm1lZGljYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmYmQzZGFcIn0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLCBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIiwgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjYmRlNmFiXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmZlMTVmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2VmZDE1MVwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiYmxhY2tcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LnN0YXRpb24uYWlycG9ydFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjY2ZiMmRiXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2EyZGFmMlwifSBdfSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9LCB7XCJjb2xvclwiOiBcIiNiNWNiZTRcIn0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIiwgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZWZlZmVmXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiIzgzYTViMFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNiZGNkZDNcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmZmZmZmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNlM2VlZDNcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSwge1wibGlnaHRuZXNzXCI6IDMzfSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9LCB7XCJsaWdodG5lc3NcIjogMjB9IF1cbn0sIHt9LCB7XCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIiwgXCJzdHlsZXJzXCI6IFsge1wibGlnaHRuZXNzXCI6IDIwfSBdfSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJsaWdodG5lc3NcIjogMTAwfSwge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSwge1wiY29sb3JcIjogXCIjQzZFMkZGXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI0M1RTNCRlwifSBdfSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNEMUQxQjhcIn0gXVxufSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLCBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLCBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1wic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiMwMGFhZmZcIn0sIHtcInNhdHVyYXRpb25cIjogLSAxMDB9LCB7XCJnYW1tYVwiOiAyLjE1fSwge1wibGlnaHRuZXNzXCI6IDEyfSBdfSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0sIHtcImxpZ2h0bmVzc1wiOiAyNH0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLCBcInN0eWxlcnNcIjogWyB7XCJsaWdodG5lc3NcIjogNTd9IF19IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNmZmZmZmZcIn0sIHtcInNhdHVyYXRpb25cIjogLSAxMDB9LCB7XCJsaWdodG5lc3NcIjogMTAwfSwge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNmZmZmZmZcIn0sIHtcInNhdHVyYXRpb25cIjogLSAxMDB9LCB7XCJsaWdodG5lc3NcIjogMTAwfSwge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjZmZlOTRmXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDEwMH0sIHtcImxpZ2h0bmVzc1wiOiA0fSwge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2ZmZTk0ZlwifSwge1wic2F0dXJhdGlvblwiOiAxMDB9LCB7XCJsaWdodG5lc3NcIjogNH0sIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiIzMzMzMzM1wifSwge1wic2F0dXJhdGlvblwiOiAtIDEwMH0sIHtcImxpZ2h0bmVzc1wiOiAtIDc0fSwge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjYmFmNGM0XCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDEwfSBdfSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2VmZmVmZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLCBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2U5ZTllOVwifSwge1wibGlnaHRuZXNzXCI6IDE3fSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2Y1ZjVmNVwifSwge1wibGlnaHRuZXNzXCI6IDIwfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmZmZmZmXCJ9LCB7XCJsaWdodG5lc3NcIjogMTd9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSwge1wibGlnaHRuZXNzXCI6IDI5fSwge1wid2VpZ2h0XCI6IDAuMn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmZmZmZmXCJ9LCB7XCJsaWdodG5lc3NcIjogMTh9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSwge1wibGlnaHRuZXNzXCI6IDE2fSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2Y1ZjVmNVwifSwge1wibGlnaHRuZXNzXCI6IDIxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZGVkZWRlXCJ9LCB7XCJsaWdodG5lc3NcIjogMjF9IF1cbn0sIHtcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9LCB7XCJjb2xvclwiOiBcIiNmZmZmZmZcIn0sIHtcImxpZ2h0bmVzc1wiOiAxNn0gXVxufSwge1xuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wic2F0dXJhdGlvblwiOiAzNn0sIHtcImNvbG9yXCI6IFwiIzMzMzMzM1wifSwge1wibGlnaHRuZXNzXCI6IDQwfSBdXG59LCB7XCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2YyZjJmMlwifSwge1wibGlnaHRuZXNzXCI6IDE5fSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmZWZlZmVcIn0sIHtcImxpZ2h0bmVzc1wiOiAyMH0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmZWZlZmVcIn0sIHtcImxpZ2h0bmVzc1wiOiAxN30sIHtcIndlaWdodFwiOiAxLjJ9IF1cbn0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5sb2NhbGl0eVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjMmMyZTMzXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDd9LCB7XCJsaWdodG5lc3NcIjogMTl9LCB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2ZmZmZmZlwifSwge1wic2F0dXJhdGlvblwiOiAtIDEwMH0sIHtcImxpZ2h0bmVzc1wiOiAxMDB9LCB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjZmZmZmZmXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IC0gMTAwfSwge1wibGlnaHRuZXNzXCI6IDEwMH0sIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2JiYzBjNFwifSwge1wic2F0dXJhdGlvblwiOiAtIDkzfSwge1wibGlnaHRuZXNzXCI6IDMxfSwge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNiYmMwYzRcIn0sIHtcInNhdHVyYXRpb25cIjogLSA5M30sIHtcImxpZ2h0bmVzc1wiOiAzMX0sIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2JiYzBjNFwifSwge1wic2F0dXJhdGlvblwiOiAtIDkzfSwge1wibGlnaHRuZXNzXCI6IC0gMn0sIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNlOWViZWRcIn0sIHtcInNhdHVyYXRpb25cIjogLSA5MH0sIHtcImxpZ2h0bmVzc1wiOiAtIDh9LCB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2U5ZWJlZFwifSwge1wic2F0dXJhdGlvblwiOiAxMH0sIHtcImxpZ2h0bmVzc1wiOiA2OX0sIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNlOWViZWRcIn0sIHtcInNhdHVyYXRpb25cIjogLSA3OH0sIHtcImxpZ2h0bmVzc1wiOiA2N30sIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9IF1cbn0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjRkZBODAwXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDB9LCB7XCJsaWdodG5lc3NcIjogMH0sIHtcImdhbW1hXCI6IDF9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiIzUzRkYwMFwifSwge1wic2F0dXJhdGlvblwiOiAtIDczfSwge1wibGlnaHRuZXNzXCI6IDQwfSwge1wiZ2FtbWFcIjogMX0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI0ZCRkYwMFwifSwge1wic2F0dXJhdGlvblwiOiAwfSwge1wibGlnaHRuZXNzXCI6IDB9LCB7XCJnYW1tYVwiOiAxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjMDBGRkZEXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDB9LCB7XCJsaWdodG5lc3NcIjogMzB9LCB7XCJnYW1tYVwiOiAxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiIzAwQkZGRlwifSwge1wic2F0dXJhdGlvblwiOiA2fSwge1wibGlnaHRuZXNzXCI6IDh9LCB7XCJnYW1tYVwiOiAxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiM2Nzk3MTRcIn0sIHtcInNhdHVyYXRpb25cIjogMzMuNH0sIHtcImxpZ2h0bmVzc1wiOiAtIDI1LjR9LCB7XCJnYW1tYVwiOiAxfSBdXG59IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSwge1wiaHVlXCI6IFwiIzAwNjZmZlwifSwge1wic2F0dXJhdGlvblwiOiA3NH0sIHtcImxpZ2h0bmVzc1wiOiAxMDB9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIiwgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9LCB7XCJ3ZWlnaHRcIjogMC42fSwge1wic2F0dXJhdGlvblwiOiAtIDg1fSwge1wibGlnaHRuZXNzXCI6IDYxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIiwgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLCBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9LCB7XCJjb2xvclwiOiBcIiM1Zjk0ZmZcIn0sIHtcImxpZ2h0bmVzc1wiOiAyNn0sIHtcImdhbW1hXCI6IDUuODZ9IF1cbn0gXTsiLCJyZXF1aXJlKCcuL293bC9tYWluJyk7XG5yZXF1aXJlKCcuL3NsaWNrL19kZWZhdWx0Jyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrT3dsRGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBjID0gdGhpcztcbiAgICAgICAgYy5vd2xDYXJvdXNlbCh7XG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgaXRlbXM6IGMuZGF0YSgnaXRlbXMnKSB8fCA0LFxuICAgICAgICAgICAgcmVzcG9uc2l2ZToge1xuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGMuZGF0YSgnaXRlbXNMZycpIHx8IDRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogYy5kYXRhKCdpdGVtc01nJykgfHwgM1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBjLmRhdGEoJ2l0ZW1zU20nKSB8fCAzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA0ODA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGMuZGF0YSgnaXRlbXNYcycpIHx8IDJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnRsOiB0aGlzLmRhdGEoJ3J0bCcpLFxuICAgICAgICAgICAgYWZ0ZXJVcGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoXCIub3dsLWJhc2ljXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrT3dsRGVmYXVsdCgpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a093bE1peGVkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vd2xDYXJvdXNlbCh7XG4gICAgICAgICAgICBpdGVtczogMixcbiAgICAgICAgICAgIG5hdjogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgcnRsOiB0aGlzLmRhdGEoJ3J0bCcpLFxuICAgICAgICAgICAgbmF2VGV4dDogWyAnPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+JywgJzxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4nIF0sXG4gICAgICAgICAgICByZXNwb25zaXZlOiB7XG4gICAgICAgICAgICAgICAgMTIwMDoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogMlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMDoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJChcIi5vd2wtbWl4ZWRcIikudGtPd2xNaXhlZCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIHN5bmNQb3NpdGlvbiA9IGZ1bmN0aW9uIChlLCB0YXJnZXQpIHtcbiAgICAgICAgaWYgKGUubmFtZXNwYWNlICYmIGUucHJvcGVydHkubmFtZSA9PT0gJ2l0ZW1zJykge1xuICAgICAgICAgICAgdGFyZ2V0LnRyaWdnZXIoJ3RvLm93bC5jYXJvdXNlbCcsIFtlLml0ZW0uaW5kZXgsIDMwMCwgdHJ1ZV0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtPd2xQcmV2aWV3ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5kYXRhKCdzeW5jJykpLFxuICAgICAgICAgICAgcHJldmlldyA9IHRoaXMsXG4gICAgICAgICAgICBydGwgPSB0aGlzLmRhdGEoJ3J0bCcpO1xuXG4gICAgICAgIGlmICghIHRhcmdldC5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLm93bENhcm91c2VsKHtcbiAgICAgICAgICAgIGl0ZW1zOiAxLFxuICAgICAgICAgICAgc2xpZGVTcGVlZDogMTAwMCxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlOiAyMDAsXG4gICAgICAgICAgICBydGw6IHJ0bCxcbiAgICAgICAgICAgIG5hdjogdHJ1ZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb25UZXh0OiBbICc8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT4nLCAnPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPicgXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9uKCdjaGFuZ2Uub3dsLmNhcm91c2VsJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBzeW5jUG9zaXRpb24oZSwgdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFyZ2V0Lm93bENhcm91c2VsKHtcbiAgICAgICAgICAgIGl0ZW1zOiA1LFxuICAgICAgICAgICAgcmVzcG9uc2l2ZToge1xuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogNlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNDgwOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAwOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgbmF2OiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlOiAxMDAsXG4gICAgICAgICAgICBydGw6IHJ0bCxcbiAgICAgICAgICAgIGFmdGVySW5pdDogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuZmluZChcIi5vd2wtaXRlbVwiKS5lcSgwKS5hZGRDbGFzcyhcInN5bmNlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFyZ2V0Lm9uKCdjaGFuZ2Uub3dsLmNhcm91c2VsJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBzeW5jUG9zaXRpb24oZSwgcHJldmlldyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRhcmdldC5maW5kKCcub3dsLWl0ZW0nKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmRhdGEoXCJvd2wtaXRlbVwiKTtcbiAgICAgICAgICAgIHByZXZpZXcudHJpZ2dlcihcInRvLm93bC5jYXJvdXNlbFwiLCBbaXRlbS5pbmRleCwgMzAwLCB0cnVlXSk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoXCIub3dsLXByZXZpZXdcIikudGtPd2xQcmV2aWV3KCk7XG5cbn0pKGpRdWVyeSk7IiwicmVxdWlyZSgnLi9fZGVmYXVsdCcpO1xucmVxdWlyZSgnLi9fbWl4ZWQnKTtcbnJlcXVpcmUoJy4vX3ByZXZpZXcnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTbGlja0RlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2xpY2sgPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICB2YXIgYyA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBjLnNsaWNrKHtcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IGMuZGF0YSgnaXRlbXMnKSB8fCAzLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogYy5kYXRhKCdpdGVtc0xnJykgfHwgNFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogYy5kYXRhKCdpdGVtc01kJykgfHwgM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogYy5kYXRhKCdpdGVtc1NtJykgfHwgM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogYy5kYXRhKCdpdGVtc1hzJykgfHwgMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBydGw6IHRoaXMuZGF0YSgncnRsJyksXG4gICAgICAgICAgICBvblNldFBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignc2lkZWJhci5zaG93bicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjLnNsaWNrU2V0T3B0aW9uKCdkb3RzJywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoXCIuc2xpY2stYmFzaWNcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudGtTbGlja0RlZmF1bHQoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtYXAuaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGFpbmVyLmlzKCcjZ29vZ2xlLWZzLXJlYWxlc3RhdGUnKSkge1xuXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gZGF0YS5jb250YWluZXIsXG4gICAgICAgICAgICAgICAgbWFwID0gZGF0YS5tYXAsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IGRhdGEub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBpdyA9IGRhdGEuaXcud2luZG93O1xuXG4gICAgICAgICAgICB2YXIgbGlicmFyeSA9IHJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9fbGlicmFyeS5qcycpKCk7XG5cbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdzaWRlYmFyLnNob3duIHNpZGViYXIuaGlkZGVuJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudGFyZ2V0ID09ICcjc2lkZWJhci1tYXAnIHx8IGRhdGEudGFyZ2V0ID09IFwiI3NpZGViYXItZWRpdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGl3LmdldFBvc2l0aW9uKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IHBvc2l0aW9uLmxhdCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogcG9zaXRpb24ubG5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxpYnJhcnkucmVzaXplKGNvbnRhaW5lciwgbWFwLCBpbmZvV2luZG93RGF0YSwgb3B0aW9ucy5jZW50ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignc2lkZWJhci5zaG93bicsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnRhcmdldCA9PSBcIiNzaWRlYmFyLWVkaXRcIikge1xuICAgICAgICAgICAgICAgICAgICAkKCcjdG9nZ2xlLXNpZGViYXItZWRpdCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ3NpZGViYXIuaGlkZGVuJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudGFyZ2V0ID09IFwiI3NpZGViYXItZWRpdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyN0b2dnbGUtc2lkZWJhci1lZGl0JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgcmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoXCJodG1sXCIpLmFkZENsYXNzKCdzaG93LXNpZGViYXInKTtcbiAgICAgICAgICAgICQoJy5zaWRlYmFyLnNpZGViYXItdmlzaWJsZS1kZXNrdG9wJykubm90KCc6dmlzaWJsZScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gc2lkZWJhci5vcHRpb25zKCQodGhpcykpO1xuICAgICAgICAgICAgICAgIHNpZGViYXIub3BlbigkKHRoaXMpLmF0dHIoJ2lkJyksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKFwiaHRtbFwiKS5yZW1vdmVDbGFzcygnc2hvdy1zaWRlYmFyJyk7XG4gICAgICAgICAgICAkKCcuc2lkZWJhcjp2aXNpYmxlJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5jbG9zZSgkKHRoaXMpLmF0dHIoJ2lkJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NzY4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBpZiAoJCgnLmhpZGUtc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICByZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50MTAyNCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEgJCgnLnNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgaWYgKCQoJy5oaWRlLXNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgcmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDQ4MCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEgJCgnLnNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgaGlkZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBoaWRlKCk7XG4gICAgfVxuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2lkZWJhckNvbGxhcHNlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNpZGViYXIgPSB0aGlzO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpID4gYScpLm9mZignbW91c2VlbnRlcicpO1xuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaS5kcm9wZG93biA+IGEnKS5vZmYoJ21vdXNlZW50ZXInKTtcbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub2ZmKCdtb3VzZWVudGVyJyk7XG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpID4gYScpLm9mZignY2xpY2snKTtcbiAgICAgICAgc2lkZWJhci5vZmYoJ21vdXNlbGVhdmUnKTtcbiAgICAgICAgc2lkZWJhci5maW5kKCcuZHJvcGRvd24nKS5vZmYoJ21vdXNlb3ZlcicpO1xuICAgICAgICBzaWRlYmFyLmZpbmQoJy5kcm9wZG93bicpLm9mZignbW91c2VvdXQnKTtcblxuICAgICAgICAkKCdib2R5Jykub2ZmKCdtb3VzZW91dCcsICcjZHJvcGRvd24tdGVtcCAuZHJvcGRvd24nKTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJ3VsLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ3Nob3duLmJzLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ3Nob3cuYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignaGlkZS5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdoaWRkZW4uYnMuY29sbGFwc2UnKTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJyNkcm9wZG93bi10ZW1wJykucmVtb3ZlKCk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuaGFzU3VibWVudScpLnJlbW92ZUNsYXNzKCdkcm9wZG93bicpXG4gICAgICAgICAgICAuZmluZCgnPiB1bCcpLmFkZENsYXNzKCdjb2xsYXBzZScpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi1tZW51IHN1Ym1lbnUtaGlkZSBzdWJtZW51LXNob3cnKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAuZmluZCgnPiBhJykuYXR0cignZGF0YS10b2dnbGUnLCAnY29sbGFwc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNpZGViYXIuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbGxhcHNlXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmNvbGxhcHNlJykub24oJ3Nob3cuYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnRzID0gJCh0aGlzKS5wYXJlbnRzKCd1bDpmaXJzdCcpLmZpbmQoJz4gbGkub3BlbiBbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXScpO1xuICAgICAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50cy50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuaGFzU3VibWVudScpLmFkZENsYXNzKFwib3BlblwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKS5vbignaGlkZGVuLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5oYXNTdWJtZW51JykucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5jb2xsYXBzZScpLmNvbGxhcHNlKHsgdG9nZ2xlOiBmYWxzZSB9KTtcblxuICAgIH07XG5cbiAgICAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJjb2xsYXBzZVwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS50a1NpZGViYXJDb2xsYXBzZSgpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NpZGViYXJEcm9wZG93biA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzaWRlYmFyID0gdGhpcztcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdzaG93bi5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdzaG93LmJzLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ2hpZGRlbi5icy5jb2xsYXBzZScpO1xuXG4gICAgICAgIHZhciBuaWNlID0gc2lkZWJhci5maW5kKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKVsgMCBdO1xuXG4gICAgICAgIG5pY2Uuc2Nyb2xsc3RhcnQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5pcygnW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykpIHJldHVybjtcbiAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ3Njcm9sbGluZycpO1xuICAgICAgICAgICAgc2lkZWJhci5maW5kKCcjZHJvcGRvd24tdGVtcCA+IHVsID4gbGknKS5lbXB0eSgpO1xuICAgICAgICAgICAgc2lkZWJhci5maW5kKCcjZHJvcGRvd24tdGVtcCcpLmhpZGUoKTtcbiAgICAgICAgICAgIHNpZGViYXIuZmluZCgnLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBuaWNlLnNjcm9sbGVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISBzaWRlYmFyLmlzKCdbZGF0YS10eXBlPVwiZHJvcGRvd25cIl0nKSkgcmV0dXJuO1xuICAgICAgICAgICAgJC5kYXRhKHRoaXMsICdsYXN0U2Nyb2xsVG9wJywgbmljZS5nZXRTY3JvbGxUb3AoKSk7XG4gICAgICAgICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKCdzY3JvbGxpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuaGFzU3VibWVudScpLmFkZENsYXNzKCdkcm9wZG93bicpLnJlbW92ZUNsYXNzKCdvcGVuJylcbiAgICAgICAgICAgIC5maW5kKCc+IHVsJykuYWRkQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UgaW4nKS5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC5maW5kKCc+IGEnKS5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXRvZ2dsZScpO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpLmRyb3Bkb3duID4gYScpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgYyA9IHNpZGViYXIuZmluZCgnI2Ryb3Bkb3duLXRlbXAnKTtcblxuICAgICAgICAgICAgc2lkZWJhci5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICBjLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKCEgJCh0aGlzKS5wYXJlbnQoJy5kcm9wZG93bicpLmlzKCcub3BlbicpICYmICEgc2lkZWJhci5pcygnLnNjcm9sbGluZycpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSAkKHRoaXMpLnBhcmVudCgnLmRyb3Bkb3duJyksXG4gICAgICAgICAgICAgICAgICAgIHQgPSBwLmZpbmQoJz4gLmRyb3Bkb3duLW1lbnUnKS5jbG9uZSgpLnJlbW92ZUNsYXNzKCdzdWJtZW51LWhpZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICghIGMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSAkKCc8ZGl2Lz4nKS5hdHRyKCdpZCcsICdkcm9wZG93bi10ZW1wJykuYXBwZW5kVG8oc2lkZWJhcik7XG4gICAgICAgICAgICAgICAgICAgIGMuaHRtbCgnPHVsPjxsaT48L2xpPjwvdWw+Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYy5zaG93KCk7XG4gICAgICAgICAgICAgICAgYy5maW5kKCcuZHJvcGRvd24tbWVudScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGMgPSBjLmZpbmQoJz4gdWwgPiBsaScpLmNzcyh7b3ZlcmZsb3c6ICd2aXNpYmxlJ30pLmFkZENsYXNzKCdkcm9wZG93biBvcGVuJyk7XG5cbiAgICAgICAgICAgICAgICBwLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgdC5hcHBlbmRUbyhjKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHAub2Zmc2V0KCkudG9wIC0gYy5vZmZzZXQoKS50b3AsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcxMDAlJ1xuICAgICAgICAgICAgICAgIH0pLnNob3coKTtcblxuICAgICAgICAgICAgICAgIGlmIChzaWRlYmFyLmlzKCcucmlnaHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0LmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJzEwMCUnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICghICQodGhpcykucGFyZW50KCkuaXMoJy5kcm9wZG93bicpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNpZGViYXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zaWRlYmFyJyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5maW5kKCcjZHJvcGRvd24tdGVtcCcpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkuaXMoJy5kcm9wZG93bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJyNkcm9wZG93bi10ZW1wJykuaGlkZSgpO1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmRyb3Bkb3duJykub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29wZW4nKS5jaGlsZHJlbigndWwnKS5yZW1vdmVDbGFzcygnc3VibWVudS1oaWRlJykuYWRkQ2xhc3MoJ3N1Ym1lbnUtc2hvdycpO1xuICAgICAgICB9KS5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCd1bCcpLnJlbW92ZUNsYXNzKCcuc3VibWVudS1zaG93JykuYWRkQ2xhc3MoJ3N1Ym1lbnUtaGlkZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ21vdXNlb3V0JywgJyNkcm9wZG93bi10ZW1wIC5kcm9wZG93bicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy5zaWRlYmFyLW1lbnUgLm9wZW4nLCAkKHRoaXMpLmNsb3Nlc3QoJy5zaWRlYmFyJykpLnJlbW92ZUNsYXNzKCcub3BlbicpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICB2YXIgdHJhbnNmb3JtX2RkID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJkcm9wZG93blwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykudGtTaWRlYmFyRHJvcGRvd24oKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgdmFyIHRyYW5zZm9ybV9jb2xsYXBzZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiY29sbGFwc2VcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnRrU2lkZWJhckNvbGxhcHNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHRyYW5zZm9ybV9kZCgpO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDQ4MCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiZHJvcGRvd25cIl0nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiZHJvcGRvd25cIl0nKS5hdHRyKCdkYXRhLXR5cGUnLCAnY29sbGFwc2UnKS5hdHRyKCdkYXRhLXRyYW5zZm9ybWVkJywgdHJ1ZSk7XG4gICAgICAgIHRyYW5zZm9ybV9jb2xsYXBzZSgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbWFrZV9kZCgpIHtcbiAgICAgICAgaWYgKCEgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiY29sbGFwc2VcIl1bZGF0YS10cmFuc2Zvcm1lZF0nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiY29sbGFwc2VcIl1bZGF0YS10cmFuc2Zvcm1lZF0nKS5hdHRyKCdkYXRhLXR5cGUnLCAnZHJvcGRvd24nKS5hdHRyKCdkYXRhLXRyYW5zZm9ybWVkJywgdHJ1ZSk7XG4gICAgICAgIHRyYW5zZm9ybV9kZCgpO1xuICAgIH1cblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ3NjgnLCBtYWtlX2RkKTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQxMDI0JywgbWFrZV9kZCk7XG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2lkZWJhcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIFwidHJhbnNmb3JtLWJ1dHRvblwiOiBzaWRlYmFyLmRhdGEoJ3RyYW5zZm9ybUJ1dHRvbicpID09PSB0cnVlLFxuICAgICAgICBcInRyYW5zZm9ybS1idXR0b24taWNvblwiOiBzaWRlYmFyLmRhdGEoJ3RyYW5zZm9ybUJ1dHRvbkljb24nKSB8fCAnZmEtZWxsaXBzaXMtaCdcbiAgICB9O1xufTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBzaWRlYmFycyA9ICQoJy5zaWRlYmFyJyk7XG5cbiAgICBzaWRlYmFycy5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgc2lkZWJhciA9ICQodGhpcyk7XG4gICAgICAgIHZhciBvcHRpb25zID0gcmVxdWlyZSgnLi9fb3B0aW9ucycpKHNpZGViYXIpO1xuXG4gICAgICAgIGlmIChvcHRpb25zWyAndHJhbnNmb3JtLWJ1dHRvbicgXSkge1xuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9ICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPicpO1xuXG4gICAgICAgICAgICBidXR0b25cbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS10b2dnbGUnLCAnc2lkZWJhci10cmFuc2Zvcm0nKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnRuIGJ0bi1kZWZhdWx0JylcbiAgICAgICAgICAgICAgICAuaHRtbCgnPGkgY2xhc3M9XCJmYSAnICsgb3B0aW9uc1sgJ3RyYW5zZm9ybS1idXR0b24taWNvbicgXSArICdcIj48L2k+Jyk7XG5cbiAgICAgICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudScpLmFwcGVuZChidXR0b24pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCcjc3VibmF2JykuY29sbGFwc2Uoeyd0b2dnbGUnOiBmYWxzZX0pO1xuXG4gICAgZnVuY3Rpb24gbW9iaWxlY2hlY2soKSB7XG4gICAgICAgIHZhciBjaGVjayA9IGZhbHNlO1xuICAgICAgICAoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgIGlmICgvKGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgKGNlfHBob25lKXx4ZGF8eGlpbm8vaS50ZXN0KGEpIHx8IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCwgNCkpKVxuICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XG4gICAgICAgIHJldHVybiBjaGVjaztcbiAgICB9XG5cbiAgICAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICBlZmZlY3Q6ICdzdC1lZmZlY3QtMScsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDU1MCxcbiAgICAgICAgICAgICAgICBvdmVybGF5OiBmYWxzZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3IgPSAnLnN0LWNvbnRhaW5lcicsXG5cbiAgICAgICAgICAgIGV2ZW50dHlwZSA9IG1vYmlsZWNoZWNrKCkgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLFxuXG4gICAgICAgICAgICBnZXRMYXlvdXRDbGFzc2VzID0gZnVuY3Rpb24gKHNpZGViYXIsIGRpcmVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxheW91dENsYXNzZXMgPSBzaWRlYmFyLmRhdGEoJ2xheW91dENsYXNzZXMnKTtcblxuICAgICAgICAgICAgICAgIGlmICghIGxheW91dENsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvZ2dsZUxheW91dCA9IHNpZGViYXIuZGF0YSgndG9nZ2xlTGF5b3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9nZ2xlTGF5b3V0ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gdG9nZ2xlTGF5b3V0LnNwbGl0KFwiLFwiKS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXIuZGF0YSgnbGF5b3V0Q2xhc3NlcycsIGxheW91dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxheW91dENsYXNzZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBuZXcgUmVnRXhwKCdzaWRlYmFyLScgKyBkaXJlY3Rpb24gKyAnKFxcXFxTKyknLCAnaWcnKTtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyA9ICQoJ2h0bWwnKS5nZXQoMCkuY2xhc3NOYW1lLm1hdGNoKG1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxheW91dENsYXNzZXMgIT09IG51bGwgJiYgbGF5b3V0Q2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzZXMgPSBsYXlvdXRDbGFzc2VzLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5kYXRhKCdsYXlvdXRDbGFzc2VzJywgbGF5b3V0Q2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbGF5b3V0Q2xhc3NlcztcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0U2lkZWJhckRhdGFPcHRpb25zID0gZnVuY3Rpb24oc2lkZWJhcil7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3Q6IHNpZGViYXIuZGF0YSgnZWZmZWN0JyksXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHNpZGViYXIuZGF0YSgnb3ZlcmxheScpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYW5pbWF0aW5nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnYW5pbWF0aW5nJykpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAgICAgICAgICAgICB9LCBkZWZhdWx0cy5kdXJhdGlvbik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc2V0ID0gZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChjb250YWluZXJTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdHlwZW9mIGlkICE9PSAndW5kZWZpbmVkJyA/ICcjJyArIGlkIDogY29udGFpbmVyLmRhdGEoJ3N0TWVudVRhcmdldCcpLFxuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyID0gJCh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmlzKCc6dmlzaWJsZScpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHNpZGViYXIuaGFzQ2xhc3MoJ3NpZGViYXItY2xvc2VkJykpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciBlZmZlY3QgPSB0eXBlb2Ygb3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0aW9ucy5lZmZlY3QgPyBvcHRpb25zLmVmZmVjdCA6IGNvbnRhaW5lci5kYXRhKCdzdE1lbnVFZmZlY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gc2lkZWJhci5pcygnLmxlZnQnKSA/ICdsJyA6ICdyJyxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHNpZGViYXIuZ2V0KDApLmNsYXNzTmFtZS5tYXRjaCgvc2lkZWJhci1zaXplLShcXFMrKS8pLnBvcCgpLFxuICAgICAgICAgICAgICAgICAgICBodG1sQ2xhc3MgPSAnc3QtZWZmZWN0LScgKyBkaXJlY3Rpb24gKyBzaXplLFxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVMYXlvdXQgPSBzaWRlYmFyLmRhdGEoJ3RvZ2dsZUxheW91dCcpLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gZ2V0TGF5b3V0Q2xhc3NlcyhzaWRlYmFyLCBkaXJlY3Rpb24pLFxuICAgICAgICAgICAgICAgICAgICBldmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyOiBzaWRlYmFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NpZGViYXIuaGlkZScsIGV2ZW50RGF0YSk7XG5cbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl1baHJlZj1cIicgKyB0YXJnZXQgKyAnXCJdJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnbGknKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKGh0bWxDbGFzcyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcyhlZmZlY3QpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhlZmZlY3QpO1xuXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdzdC1tZW51LW9wZW4gc3QtcHVzaGVyLW92ZXJsYXknKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoaHRtbENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZUxheW91dCkgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKGxheW91dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKGVmZmVjdCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5nZXQoMCkuY2xhc3NOYW1lID0gJ3N0LWNvbnRhaW5lcic7IC8vIGNsZWFyXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ3NpZGViYXItY2xvc2VkJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzaWRlYmFyLmhpZGRlbicsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICAgICAgfSwgZGVmYXVsdHMuZHVyYXRpb24pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvcGVuID0gZnVuY3Rpb24gKHRhcmdldCwgb3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoY29udGFpbmVyU2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNpZGViYXIgPSAkKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIG9uIG1vYmlsZSwgYWxsb3cgb25seSBvbmUgc2lkZWJhciB0byBiZSBvcGVuIGF0IHRoZSBzYW1lIHRpbWVcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjggJiYgY29udGFpbmVyLmhhc0NsYXNzKCdzdC1tZW51LW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl1baHJlZj1cIicgKyB0YXJnZXQgKyAnXCJdJylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnbGknKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVmZmVjdCA9IG9wdGlvbnMuZWZmZWN0LFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5ID0gb3B0aW9ucy5vdmVybGF5O1xuXG4gICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHNpZGViYXIuaXMoJy5sZWZ0JykgPyAnbCcgOiAncicsXG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBzaWRlYmFyLmdldCgwKS5jbGFzc05hbWUubWF0Y2goL3NpZGViYXItc2l6ZS0oXFxTKykvKS5wb3AoKSxcbiAgICAgICAgICAgICAgICAgICAgaHRtbENsYXNzID0gJ3N0LWVmZmVjdC0nICsgZGlyZWN0aW9uICsgc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlTGF5b3V0ID0gc2lkZWJhci5kYXRhKCd0b2dnbGVMYXlvdXQnKSxcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyA9IGdldExheW91dENsYXNzZXMoc2lkZWJhciwgZGlyZWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhcjogc2lkZWJhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzaWRlYmFyLnNob3cnLCBldmVudERhdGEpO1xuXG4gICAgICAgICAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKGh0bWxDbGFzcyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5zaG93KCkucmVtb3ZlQ2xhc3MoJ3NpZGViYXItY2xvc2VkJyk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIuZGF0YSgnc3RNZW51RWZmZWN0JywgZWZmZWN0KTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZGF0YSgnc3RNZW51VGFyZ2V0JywgdGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoZWZmZWN0KTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZWZmZWN0KTtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxheSkgY29udGFpbmVyLmFkZENsYXNzKCdzdC1wdXNoZXItb3ZlcmxheScpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnc3QtbWVudS1vcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9LCAyNSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZUxheW91dCkgJCgnaHRtbCcpLmFkZENsYXNzKGxheW91dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzaWRlYmFyLnNob3duJywgZXZlbnREYXRhKTtcbiAgICAgICAgICAgICAgICB9LCBkZWZhdWx0cy5kdXJhdGlvbik7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHZhciBhID0gYW5pbWF0aW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKGEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBidXR0b24uYXR0cignaHJlZicpLFxuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIgPSAkKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIHNpZGViYXIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50QWN0aXZlRWxlbWVudCA9ICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXScpLm5vdCh0aGlzKS5jbG9zZXN0KCdsaScpLmxlbmd0aCA/ICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXScpLm5vdCh0aGlzKS5jbG9zZXN0KCdsaScpIDogJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJykubm90KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlRWxlbWVudCA9ICQodGhpcykuY2xvc2VzdCgnbGknKS5sZW5ndGggPyAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykgOiAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBY3RpdmVFbGVtZW50LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRWxlbWVudC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoJ2h0bWwnKS5oYXNDbGFzcygnc2hvdy1zaWRlYmFyJykpIGFjdGl2ZUVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnc2hvdy1zaWRlYmFyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSAkKCdodG1sJykuYWRkQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRhdGFPcHRpb25zID0gZ2V0U2lkZWJhckRhdGFPcHRpb25zKHNpZGViYXIpLFxuICAgICAgICAgICAgICAgICAgICBidXR0b25PcHRpb25zID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmRhdGEoJ2VmZmVjdCcpKSBidXR0b25PcHRpb25zLmVmZmVjdCA9IGJ1dHRvbi5kYXRhKCdlZmZlY3QnKTtcbiAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmRhdGEoJ292ZXJsYXknKSkgYnV0dG9uT3B0aW9ucy5vdmVybGF5ID0gYnV0dG9uLmRhdGEoJ292ZXJsYXknKTtcblxuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBkYXRhT3B0aW9ucywgYnV0dG9uT3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmhhc0NsYXNzKCdzaWRlYmFyLWNsb3NlZCcpICYmIHNpZGViYXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQoc2lkZWJhci5hdHRyKCdpZCcpLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG9wZW4odGFyZ2V0LCBvcHRpb25zKTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAkKCdib2R5Jykub24oZXZlbnR0eXBlLCAnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJywgdG9nZ2xlKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIG51bGwsICdlc2MnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKGNvbnRhaW5lclNlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5oYXNDbGFzcygnc3QtbWVudS1vcGVuJykpIHtcbiAgICAgICAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICAgICAqL1xuICAgICAgICAkLmZuLnRrU2lkZWJhclRvZ2dsZUJhciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIHNpZGViYXIgPSB0aGlzO1xuXG4gICAgICAgICAgICAvKiBTaWRlYmFyIFRvZ2dsZSBCYXIgKi9cbiAgICAgICAgICAgIGlmIChzaWRlYmFyLmRhdGEoJ3RvZ2dsZUJhcicpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJhciA9ICQoJzxhPjwvYT4nKTtcbiAgICAgICAgICAgICAgICBiYXIuYXR0cignaHJlZicsICcjJyArIHNpZGViYXIuYXR0cignaWQnKSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ3NpZGViYXItbWVudScpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2lkZWJhci10b2dnbGUtYmFyJyk7XG5cbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFwcGVuZChiYXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgJCgnLnNpZGViYXInKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnRrU2lkZWJhclRvZ2dsZUJhcigpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cuc2lkZWJhciA9IHtcblxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYSA9IGFuaW1hdGluZygpO1xuICAgICAgICAgICAgICAgIGlmIChhKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBvcGVuKCcjJyArIGlkLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzZXQoaWQsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvcHRpb25zOiBnZXRTaWRlYmFyRGF0YU9wdGlvbnNcblxuICAgICAgICB9O1xuXG4gICAgfSkoKTtcblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19icmVha3BvaW50cycpO1xucmVxdWlyZSgnLi9fc2lkZWJhci1tZW51Jyk7XG5yZXF1aXJlKCcuL19jb2xsYXBzaWJsZScpO1xucmVxdWlyZSgnLi9fZHJvcGRvd24nKTtcbnJlcXVpcmUoJy4vX3NpZGViYXItdG9nZ2xlJyk7XG5cbihmdW5jdGlvbigkKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTaWRlYmFyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgIG1lbnVUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvZ2dsZUJhcjogZmFsc2VcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIHNpZGViYXIgPSB0aGlzO1xuXG4gICAgICAgIGlmIChzZXR0aW5ncy5tZW51VHlwZSA9PSBcImNvbGxhcHNlXCIpIHtcbiAgICAgICAgICAgIHNpZGViYXIudGtTaWRlYmFyQ29sbGFwc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXR0aW5ncy5tZW51VHlwZSA9PSBcImRyb3Bkb3duXCIpIHtcbiAgICAgICAgICAgIHNpZGViYXIudGtTaWRlYmFyRHJvcGRvd24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXR0aW5ncy50b2dnbGVCYXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNpZGViYXIudGtTaWRlYmFyVG9nZ2xlQmFyKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrQ2Fyb3VzZWwgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmNhcm91c2VsKCk7XG5cbiAgICAgICAgdGhpcy5maW5kKCdbZGF0YS1zbGlkZV0nKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrQ29sbGFwc2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5hdHRyKCdocmVmJykgfHwgdGhpcy5hdHRyKCd0YXJnZXQnKTtcbiAgICAgICAgaWYgKCEgdGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCh0YXJnZXQpLmNvbGxhcHNlKHt0b2dnbGU6IGZhbHNlfSk7XG5cbiAgICB9O1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a01vZGFsID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuYXR0cignaHJlZicpIHx8IHRoaXMuYXR0cigndGFyZ2V0Jyk7XG4gICAgICAgIGlmICghIHRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCh0YXJnZXQpLm1vZGFsKHtzaG93OiBmYWxzZX0pO1xuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1vZGFsIGNyZWF0b3IgZm9yIHRoZSBkZW1vIHBhZ2UuXG4gICAgICogQWxsb3dzIHRvIGV4cGxvcmUgZGlmZmVyZW50IG1vZGFsIHR5cGVzLlxuICAgICAqIEZvciBkZW1vIHB1cnBvc2VzIG9ubHkuXG4gICAgICovXG5cbiAgICAvLyBQcm9jZXNzIHRoZSBtb2RhbCB2aWEgSGFuZGxlYmFycyB0ZW1wbGF0ZXNcbiAgICB2YXIgbW9kYWwgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgc291cmNlID0gJChcIiNcIiArIG9wdGlvbnMudGVtcGxhdGUpLmh0bWwoKTtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHNvdXJjZSk7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZShvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgdmFyIHJhbmRvbUlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvKiogQHJldHVybiBTdHJpbmcgKi9cbiAgICAgICAgdmFyIFM0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChTNCgpICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFM0KCkgKyBTNCgpKTtcbiAgICB9O1xuXG4gICAgJC5mbi50a01vZGFsRGVtbyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0YXJnZXRJZCA9IHRoaXMuYXR0cignaHJlZicpIHx8IHRoaXMuYXR0cigndGFyZ2V0JyksXG4gICAgICAgICAgICB0YXJnZXQgPSAkKHRhcmdldElkKTtcblxuICAgICAgICBpZiAoISB0YXJnZXRJZCkge1xuICAgICAgICAgICAgdGFyZ2V0SWQgPSByYW5kb21JZCgpO1xuICAgICAgICAgICAgdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcsICcjJyArIHRhcmdldElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldElkLnJlcGxhY2UoJyMnLCAnJyk7XG5cbiAgICAgICAgaWYgKCEgdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gJChtb2RhbCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRhcmdldElkLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0aGlzLmRhdGEoJ3RlbXBsYXRlJykgfHwgJ3RrLW1vZGFsLWRlbW8nLFxuICAgICAgICAgICAgICAgIG1vZGFsT3B0aW9uczogdGhpcy5kYXRhKCdtb2RhbE9wdGlvbnMnKSB8fCAnJyxcbiAgICAgICAgICAgICAgICBkaWFsb2dPcHRpb25zOiB0aGlzLmRhdGEoJ2RpYWxvZ09wdGlvbnMnKSB8fCAnJyxcbiAgICAgICAgICAgICAgICBjb250ZW50T3B0aW9uczogdGhpcy5kYXRhKCdjb250ZW50T3B0aW9ucycpIHx8ICcnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKHRhcmdldCk7XG4gICAgICAgICAgICB0YXJnZXQubW9kYWwoe3Nob3c6IGZhbHNlfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0YXJnZXQubW9kYWwoJ3RvZ2dsZScpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0ay1tb2RhbC1kZW1vXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudGtNb2RhbERlbW8oKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInN3aXRjaC1jaGVja2JveFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQodGhpcykuYm9vdHN0cmFwU3dpdGNoKHtcbiAgICAgICAgICAgIG9mZkNvbG9yOiAnZGFuZ2VyJ1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0NoZWNrQWxsID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKS5maW5kKCc6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdGhpcy5jaGVja2VkKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgLy8gQ2hlY2sgQWxsIENoZWNrYm94ZXNcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJjaGVjay1hbGxcIl0nKS50a0NoZWNrQWxsKCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBDb25zZXJ2ZSBhc3BlY3QgcmF0aW8gb2YgdGhlIG9yaWduYWwgcmVnaW9uLiBVc2VmdWwgd2hlbiBzaHJpbmtpbmcvZW5sYXJnaW5nXG4gICAgICogaW1hZ2VzIHRvIGZpdCBpbnRvIGEgY2VydGFpbiBhcmVhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNyY1dpZHRoIFNvdXJjZSBhcmVhIHdpZHRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNyY0hlaWdodCBTb3VyY2UgYXJlYSBoZWlnaHRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4V2lkdGggRml0dGFibGUgYXJlYSBtYXhpbXVtIGF2YWlsYWJsZSB3aWR0aFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhIZWlnaHQgRml0dGFibGUgYXJlYSBtYXhpbXVtIGF2YWlsYWJsZSBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHsgd2lkdGgsIGhlaWd0aCB9XG4gICAgICovXG4gICAgdmFyIGFzcGVjdFJhdGlvRml0ID0gZnVuY3Rpb24gKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcblxuICAgICAgICB2YXIgd1JhdGlvID0gbWF4V2lkdGggLyBzcmNXaWR0aCxcbiAgICAgICAgICAgIGhSYXRpbyA9IG1heEhlaWdodCAvIHNyY0hlaWdodCxcbiAgICAgICAgICAgIHdpZHRoID0gc3JjV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQgPSBzcmNIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHNyY1dpZHRoIC8gbWF4V2lkdGggPCBzcmNIZWlnaHQgLyBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIHdpZHRoID0gbWF4V2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSBzcmNIZWlnaHQgKiB3UmF0aW87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWR0aCA9IHNyY1dpZHRoICogaFJhdGlvO1xuICAgICAgICAgICAgaGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fTtcbiAgICB9O1xuXG4gICAgJC5mbi50a0NvdmVyID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyKCc6dmlzaWJsZScpLm5vdCgnW2NsYXNzKj1cImhlaWdodFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGkgPSB0LmZpbmQoJ2ltZzpmaXJzdCcpO1xuXG4gICAgICAgICAgICBpZiAoaS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkLmxvYWRJbWFnZShpLmF0dHIoJ3NyYycpKS5kb25lKGZ1bmN0aW9uKGltZyl7XG4gICAgICAgICAgICAgICAgICAgIHQuaGVpZ2h0KGkuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAkKCcub3ZlcmxheS1mdWxsJywgdCkuaW5uZXJIZWlnaHQoaS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2RvbUNoYW5nZWQnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIoJzp2aXNpYmxlJykuZmlsdGVyKCdbY2xhc3MqPVwiaGVpZ2h0XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgaW1nID0gdC5maW5kKCdpbWcnKTtcblxuICAgICAgICAgICAgaW1nLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAkLmxvYWRJbWFnZShpLmF0dHIoJ3NyYycpKS5kb25lKGZ1bmN0aW9uKGltZyl7XG4gICAgICAgICAgICAgICAgICAgICQoaSkucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgJChpKS5jc3MoYXNwZWN0UmF0aW9GaXQoaS53aWR0aCgpLCBpLmhlaWdodCgpLCB0LndpZHRoKCksIHQuaGVpZ2h0KCkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoZWlnaHQoKSB7XG5cbiAgICAgICAgJCgnLmNvdmVyLm92ZXJsYXknKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnRrQ292ZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShoZWlnaHQpO1xuICAgICQod2luZG93KS5vbignbG9hZCcsIGhlaWdodCk7XG5cbiAgICB2YXIgdDtcbiAgICAkKHdpbmRvdykub24oXCJkZWJvdW5jZWRyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgIHQgPSBzZXRUaW1lb3V0KGhlaWdodCwgMjAwKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0RhdGVQaWNrZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uZGF0ZXBpY2tlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnLmRhdGVwaWNrZXInKS50a0RhdGVQaWNrZXIoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyNyZXBvcnRyYW5nZScpLmRhdGVyYW5nZXBpY2tlcihcbiAgICAgICAge1xuICAgICAgICAgICAgcmFuZ2VzOiB7XG4gICAgICAgICAgICAgICAgJ1RvZGF5JzogW21vbWVudCgpLCBtb21lbnQoKV0sXG4gICAgICAgICAgICAgICAgJ1llc3RlcmRheSc6IFttb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDEpLCBtb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDEpXSxcbiAgICAgICAgICAgICAgICAnTGFzdCA3IERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCA2KSwgbW9tZW50KCldLFxuICAgICAgICAgICAgICAgICdMYXN0IDMwIERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAyOSksIG1vbWVudCgpXSxcbiAgICAgICAgICAgICAgICAnVGhpcyBNb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5lbmRPZignbW9udGgnKV0sXG4gICAgICAgICAgICAgICAgJ0xhc3QgTW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoJ21vbnRoJywgMSkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoJ21vbnRoJywgMSkuZW5kT2YoJ21vbnRoJyldXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhcnREYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDI5KSxcbiAgICAgICAgICAgIGVuZERhdGU6IG1vbWVudCgpXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgICQoJyNyZXBvcnRyYW5nZSBzcGFuJykuaHRtbChzdGFydC5mb3JtYXQoJ01NTU0gRCwgWVlZWScpICsgJyAtICcgKyBlbmQuZm9ybWF0KCdNTU1NIEQsIFlZWVknKSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgJCgnI3Jlc2VydmF0aW9udGltZScpLmRhdGVyYW5nZXBpY2tlcih7IHRpbWVQaWNrZXI6IHRydWUsIHRpbWVQaWNrZXJJbmNyZW1lbnQ6IDMwLCBmb3JtYXQ6ICdNTS9ERC9ZWVlZIGg6bW0gQScgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKiBAdG9kbzogQW5ndWxhciBkaXJlY3RpdmUuXG4gICAgICovXG4gICAgJC5mbi50a0V4cGFuZGFibGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmZpbmQoJy5leHBhbmRhYmxlLWNvbnRlbnQnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJleHBhbmRhYmxlLWluZGljYXRvclwiPjxpPjwvaT48L2Rpdj4nKTtcblxuICAgIH07XG5cbiAgICAkKCcuZXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrRXhwYW5kYWJsZSgpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZXhwYW5kYWJsZS1pbmRpY2F0b3InLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5leHBhbmRhYmxlJykudG9nZ2xlQ2xhc3MoJ2V4cGFuZGFibGUtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZXhwYW5kYWJsZS10cmlnZ2VyOm5vdCguZXhwYW5kYWJsZS1vcGVuKScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGFibGUtb3BlbicpO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBpZiB3ZSdyZSBpbnNpZGUgYW4gaWZyYW1lLCByZWxvYWQgd2l0aG91dCBpZnJhbWVcbiAgICBpZiAod2luZG93LmxvY2F0aW9uICE9IHdpbmRvdy5wYXJlbnQubG9jYXRpb24pXG4gICAgICAgIHRvcC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICogQHRvZG86IEFuZ3VsYXIgZGlyZWN0aXZlLlxuICAgICAqL1xuICAgICQuZm4udGtNaW5pQ29sb3JzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLm1pbmljb2xvcnMgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5taW5pY29sb3JzKHtcbiAgICAgICAgICAgICAgICBjb250cm9sOiB0aGlzLmF0dHIoJ2RhdGEtY29udHJvbCcpIHx8ICdodWUnLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5hdHRyKCdkYXRhLWRlZmF1bHRWYWx1ZScpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGlubGluZTogdGhpcy5hdHRyKCdkYXRhLWlubGluZScpID09PSAndHJ1ZScsXG4gICAgICAgICAgICAgICAgbGV0dGVyQ2FzZTogdGhpcy5hdHRyKCdkYXRhLWxldHRlckNhc2UnKSB8fCAnbG93ZXJjYXNlJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiB0aGlzLmF0dHIoJ2RhdGEtb3BhY2l0eScpLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmF0dHIoJ2RhdGEtcG9zaXRpb24nKSB8fCAnYm90dG9tIGxlZnQnLFxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGhleCwgb3BhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISBoZXgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wYWNpdHkpIGhleCArPSAnLCAnICsgb3BhY2l0eTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXAnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnLm1pbmljb2xvcnMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKHRoaXMpLnRrTWluaUNvbG9ycygpO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKiBAdG9kbzogQW5ndWxhciBkaXJlY3RpdmUuXG4gICAgICovXG4gICAgJC5mbi50a05lc3RhYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLm5lc3RhYmxlICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMubmVzdGFibGUoe1xuICAgICAgICAgICAgICAgIHJvb3RDbGFzczogJ25lc3RhYmxlJyxcbiAgICAgICAgICAgICAgICBsaXN0Tm9kZU5hbWU6ICd1bCcsXG4gICAgICAgICAgICAgICAgbGlzdENsYXNzOiAnbmVzdGFibGUtbGlzdCcsXG4gICAgICAgICAgICAgICAgaXRlbUNsYXNzOiAnbmVzdGFibGUtaXRlbScsXG4gICAgICAgICAgICAgICAgZHJhZ0NsYXNzOiAnbmVzdGFibGUtZHJhZycsXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2xhc3M6ICduZXN0YWJsZS1oYW5kbGUnLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZENsYXNzOiAnbmVzdGFibGUtY29sbGFwc2VkJyxcbiAgICAgICAgICAgICAgICBwbGFjZUNsYXNzOiAnbmVzdGFibGUtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgICAgIGVtcHR5Q2xhc3M6ICduZXN0YWJsZS1lbXB0eSdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCcubmVzdGFibGUnKS50a05lc3RhYmxlKCk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciByYW5kb21JZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKiogQHJldHVybiBTdHJpbmcgKi9cbiAgICAgICAgdmFyIFM0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKCgoMStNYXRoLnJhbmRvbSgpKSoweDEwMDAwKXwwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFM0KCkrUzQoKStcIi1cIitTNCgpK1wiLVwiK1M0KCkrXCItXCIrUzQoKStcIi1cIitTNCgpK1M0KCkrUzQoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtQYW5lbENvbGxhcHNlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGJvZHkgPSAkKCcucGFuZWwtYm9keScsIHRoaXMpLFxuICAgICAgICAgICAgaWQgPSBib2R5LmF0dHIoJ2lkJykgfHwgcmFuZG9tSWQoKSxcbiAgICAgICAgICAgIGNvbGxhcHNlID0gJCgnPGRpdi8+Jyk7XG5cbiAgICAgICAgY29sbGFwc2VcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGlkKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjb2xsYXBzZScgKyAodGhpcy5kYXRhKCdvcGVuJykgPyAnIGluJyA6ICcnKSlcbiAgICAgICAgICAgIC5hcHBlbmQoYm9keS5jbG9uZSgpKTtcblxuICAgICAgICBib2R5LnJlbW92ZSgpO1xuXG4gICAgICAgICQodGhpcykuYXBwZW5kKGNvbGxhcHNlKTtcblxuICAgICAgICAkKCcucGFuZWwtY29sbGFwc2UtdHJpZ2dlcicsIHRoaXMpXG4gICAgICAgICAgICAuYXR0cignZGF0YS10b2dnbGUnLCAnY29sbGFwc2UnIClcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRhcmdldCcsICcjJyArIGlkKVxuICAgICAgICAgICAgLmNvbGxhcHNlKHsgdHJpZ2dlcjogZmFsc2UgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwicGFuZWwtY29sbGFwc2VcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudGtQYW5lbENvbGxhcHNlKCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8vIFByb2dyZXNzIEJhciBBbmltYXRpb25cbiAgICAkKCcucHJvZ3Jlc3MtYmFyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykud2lkdGgoJCh0aGlzKS5hdHRyKCdhcmlhLXZhbHVlbm93JykgKyAnJScpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdDIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0MiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB2YXIgdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdC5kYXRhKCdhbGxvd0NsZWFyJylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodC5pcygnYnV0dG9uJykpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKHQuaXMoJ2lucHV0W3R5cGU9XCJidXR0b25cIl0nKSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0LmlzKCdbZGF0YS10b2dnbGU9XCJzZWxlY3QyLXRhZ3NcIl0nKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGFncyA9IHQuZGF0YSgndGFncycpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHQuc2VsZWN0MihvcHRpb25zKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdDJFbmFibGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0MiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpLnNlbGVjdDIoXCJlbmFibGVcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdDJEaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmRhdGEoJ3RhcmdldCcpKS5zZWxlY3QyKFwiZGlzYWJsZVwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2VsZWN0MkZsYWdzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgLy8gdGVtcGxhdGluZ1xuICAgICAgICAgICAgdmFyIGZvcm1hdCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICghIHN0YXRlLmlkKSByZXR1cm4gc3RhdGUudGV4dDtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCI8aW1nIGNsYXNzPSdmbGFnJyBzcmM9J2h0dHA6Ly9zZWxlY3QyLmdpdGh1Yi5pby9zZWxlY3QyL2ltYWdlcy9mbGFncy9cIiArIHN0YXRlLmlkLnRvTG93ZXJDYXNlKCkgKyBcIi5wbmcnLz5cIiArIHN0YXRlLnRleHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdDIoe1xuICAgICAgICAgICAgICAgIGZvcm1hdFJlc3VsdDogZm9ybWF0LFxuICAgICAgICAgICAgICAgIGZvcm1hdFNlbGVjdGlvbjogZm9ybWF0LFxuICAgICAgICAgICAgICAgIGVzY2FwZU1hcmt1cDogZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZSo9XCJzZWxlY3QyXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAkKHRoaXMpLnRrU2VsZWN0MigpO1xuXG4gICAgfSk7XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJzZWxlY3QyLWVuYWJsZVwiXScpLnRrU2VsZWN0MkVuYWJsZSgpO1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi1kaXNhYmxlXCJdJykudGtTZWxlY3QyRGlzYWJsZSgpO1xuXG4gICAgJChcIiNzZWxlY3QyXzdcIikudGtTZWxlY3QyRmxhZ3MoKTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdFBpY2tlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3RwaWNrZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RwaWNrZXIoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmRhdGEoJ3dpZHRoJykgfHwgJzEwMCUnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnLnNlbGVjdHBpY2tlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAkKHRoaXMpLnRrU2VsZWN0UGlja2VyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBzaG93SG92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ1tkYXRhLXNob3ctaG92ZXJdJykuaGlkZSgpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIHBhcmVudCA9ICQodGhpcykuZGF0YSgnc2hvd0hvdmVyJyk7XG5cbiAgICAgICAgICAgIHNlbGYuY2xvc2VzdChwYXJlbnQpLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgICAgICB9KS5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNob3dIb3ZlcigpO1xuXG4gICAgd2luZG93LnNob3dIb3ZlciA9IHNob3dIb3ZlcjtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBiYXJzID0gZnVuY3Rpb24oZWwpe1xuICAgICAgICAkKCcuc2xpZGVyLWhhbmRsZScsIGVsKS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWJhcnMgZmEtcm90YXRlLTkwXCI+PC9pPicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2xpZGVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNsaWRlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLnNsaWRlcigpO1xuXG4gICAgICAgICAgICBiYXJzKHRoaXMpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2xpZGVyRm9ybWF0dGVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNsaWRlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLnNsaWRlcih7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdDdXJyZW50IHZhbHVlOiAnICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJhcnModGhpcyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTbGlkZXJVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2xpZGVyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMub24oXCJzbGlkZVwiLCBmdW5jdGlvbiAoc2xpZGVFdnQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMuYXR0cignZGF0YS1vbi1zbGlkZScpKS50ZXh0KHNsaWRlRXZ0LnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBiYXJzKHRoaXMpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS1zbGlkZXI9XCJkZWZhdWx0XCJdJykudGtTbGlkZXIoKTtcblxuICAgICQoJ1tkYXRhLXNsaWRlcj1cImZvcm1hdHRlclwiXScpLnRrU2xpZGVyRm9ybWF0dGVyKCk7XG5cbiAgICAkKCdbZGF0YS1vbi1zbGlkZV0nKS50a1NsaWRlclVwZGF0ZSgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0RhdGFUYWJsZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uZGF0YVRhYmxlICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YVRhYmxlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImRhdGEtdGFibGVcIl0nKS50a0RhdGFUYWJsZSgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuL19za2luJykoKTtcblxuICAgICQoJy50YWJiYWJsZSAubmF2LXRhYnMnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB0YWJzID0gJCh0aGlzKS5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgICAgIGN1cnNvcmNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgb25lYXhpc21vdXNlbW9kZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgX3N1cGVyID0gdGFicy5nZXRDb250ZW50U2l6ZTtcbiAgICAgICAgdGFicy5nZXRDb250ZW50U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbCh0YWJzKTtcbiAgICAgICAgICAgIHBhZ2UuaCA9IHRhYnMud2luLmhlaWdodCgpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcblxuICAgICQoJy50YWJiYWJsZSAubmF2LXRhYnMgYScpLm9uKCdzaG93bi5icy50YWInLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHRhYiA9ICQodGhpcykuY2xvc2VzdCgnLnRhYmJhYmxlJyk7XG4gICAgICAgIHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcbiAgICAgICAgICAgIHRhcmdldFBhbmUgPSB0YXJnZXQuYXR0cignaHJlZicpIHx8IHRhcmdldC5kYXRhKCd0YXJnZXQnKTtcblxuICAgICAgICAvLyByZWZyZXNoIHRhYnMgd2l0aCBob3Jpem9udGFsIHNjcm9sbFxuICAgICAgICB0YWIuZmluZCgnLm5hdi10YWJzJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuXG4gICAgICAgIC8vIHJlZnJlc2ggW2RhdGEtc2Nyb2xsYWJsZV0gd2l0aGluIHRoZSBhY3RpdmF0ZWQgdGFiIHBhbmVcbiAgICAgICAgJCh0YXJnZXRQYW5lKS5maW5kKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIFRvb2x0aXBcbiAgICAkKFwiYm9keVwiKS50b29sdGlwKHtzZWxlY3RvcjogJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nLCBjb250YWluZXI6IFwiYm9keVwifSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrVG91Y2hTcGluID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLlRvdWNoU3BpbiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLlRvdWNoU3BpbigpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b3VjaC1zcGluXCJdJykudGtUb3VjaFNwaW4oKTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciB0cmVlX2dseXBoX29wdGlvbnMgPSB7XG4gICAgICAgIG1hcDoge1xuICAgICAgICAgICAgY2hlY2tib3g6IFwiZmEgZmEtc3F1YXJlLW9cIixcbiAgICAgICAgICAgIGNoZWNrYm94U2VsZWN0ZWQ6IFwiZmEgZmEtY2hlY2stc3F1YXJlXCIsXG4gICAgICAgICAgICBjaGVja2JveFVua25vd246IFwiZmEgZmEtY2hlY2stc3F1YXJlIGZhLW11dGVkXCIsXG4gICAgICAgICAgICBlcnJvcjogXCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiLFxuICAgICAgICAgICAgZXhwYW5kZXJDbG9zZWQ6IFwiZmEgZmEtY2FyZXQtcmlnaHRcIixcbiAgICAgICAgICAgIGV4cGFuZGVyTGF6eTogXCJmYSBmYS1hbmdsZS1yaWdodFwiLFxuICAgICAgICAgICAgZXhwYW5kZXJPcGVuOiBcImZhIGZhLWNhcmV0LWRvd25cIixcbiAgICAgICAgICAgIGRvYzogXCJmYSBmYS1maWxlLW9cIixcbiAgICAgICAgICAgIG5vRXhwYW5kZXI6IFwiXCIsXG4gICAgICAgICAgICBkb2NPcGVuOiBcImZhIGZhLWZpbGVcIixcbiAgICAgICAgICAgIGxvYWRpbmc6IFwiZmEgZmEtcmVmcmVzaCBmYS1zcGluXCIsXG4gICAgICAgICAgICBmb2xkZXI6IFwiZmEgZmEtZm9sZGVyXCIsXG4gICAgICAgICAgICBmb2xkZXJPcGVuOiBcImZhIGZhLWZvbGRlci1vcGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdHJlZV9kbmRfb3B0aW9ucyA9IHtcbiAgICAgICAgYXV0b0V4cGFuZE1TOiA0MDAsXG4gICAgICAgICAgICBmb2N1c09uQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICBwcmV2ZW50Vm9pZE1vdmVzOiB0cnVlLCAvLyBQcmV2ZW50IGRyb3BwaW5nIG5vZGVzICdiZWZvcmUgc2VsZicsIGV0Yy5cbiAgICAgICAgICAgIHByZXZlbnRSZWN1cnNpdmVNb3ZlczogdHJ1ZSwgLy8gUHJldmVudCBkcm9wcGluZyBub2RlcyBvbiBvd24gZGVzY2VuZGFudHNcbiAgICAgICAgICAgIGRyYWdTdGFydDogZnVuY3Rpb24obm9kZSwgZGF0YSkge1xuICAgICAgICAgICAgLyoqIFRoaXMgZnVuY3Rpb24gTVVTVCBiZSBkZWZpbmVkIHRvIGVuYWJsZSBkcmFnZ2luZyBmb3IgdGhlIHRyZWUuXG4gICAgICAgICAgICAgKiAgUmV0dXJuIGZhbHNlIHRvIGNhbmNlbCBkcmFnZ2luZyBvZiBub2RlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ0VudGVyOiBmdW5jdGlvbihub2RlLCBkYXRhKSB7XG4gICAgICAgICAgICAvKiogZGF0YS5vdGhlck5vZGUgbWF5IGJlIG51bGwgZm9yIG5vbi1mYW5jeXRyZWUgZHJvcHBhYmxlcy5cbiAgICAgICAgICAgICAqICBSZXR1cm4gZmFsc2UgdG8gZGlzYWxsb3cgZHJvcHBpbmcgb24gbm9kZS4gSW4gdGhpcyBjYXNlXG4gICAgICAgICAgICAgKiAgZHJhZ092ZXIgYW5kIGRyYWdMZWF2ZSBhcmUgbm90IGNhbGxlZC5cbiAgICAgICAgICAgICAqICBSZXR1cm4gJ292ZXInLCAnYmVmb3JlLCBvciAnYWZ0ZXInIHRvIGZvcmNlIGEgaGl0TW9kZS5cbiAgICAgICAgICAgICAqICBSZXR1cm4gWydiZWZvcmUnLCAnYWZ0ZXInXSB0byByZXN0cmljdCBhdmFpbGFibGUgaGl0TW9kZXMuXG4gICAgICAgICAgICAgKiAgQW55IG90aGVyIHJldHVybiB2YWx1ZSB3aWxsIGNhbGMgdGhlIGhpdE1vZGUgZnJvbSB0aGUgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGRyb3BwaW5nIGEgcGFyZW50IGJlbG93IGFub3RoZXIgcGFyZW50IChvbmx5IHNvcnRcbiAgICAgICAgICAgIC8vIG5vZGVzIHVuZGVyIHRoZSBzYW1lIHBhcmVudClcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBpZihub2RlLnBhcmVudCAhPT0gZGF0YS5vdGhlck5vZGUucGFyZW50KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBkcm9wcGluZyAqb3ZlciogYSBub2RlICh3b3VsZCBjcmVhdGUgYSBjaGlsZClcbiAgICAgICAgICAgIHJldHVybiBbXCJiZWZvcmVcIiwgXCJhZnRlclwiXTtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ0Ryb3A6IGZ1bmN0aW9uKG5vZGUsIGRhdGEpIHtcbiAgICAgICAgICAgIC8qKiBUaGlzIGZ1bmN0aW9uIE1VU1QgYmUgZGVmaW5lZCB0byBlbmFibGUgZHJvcHBpbmcgb2YgaXRlbXMgb25cbiAgICAgICAgICAgICAqICB0aGUgdHJlZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZGF0YS5vdGhlck5vZGUubW92ZVRvKG5vZGUsIGRhdGEuaGl0TW9kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0ZhbmN5VHJlZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uZmFuY3l0cmVlID09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGV4dGVuc2lvbnMgPSBbIFwiZ2x5cGhcIiBdO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXR0cignZGF0YS10cmVlLWRuZCcpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBleHRlbnNpb25zLnB1c2goIFwiZG5kXCIgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZhbmN5dHJlZSh7XG4gICAgICAgICAgICBleHRlbnNpb25zOiBleHRlbnNpb25zLFxuICAgICAgICAgICAgZ2x5cGg6IHRyZWVfZ2x5cGhfb3B0aW9ucyxcbiAgICAgICAgICAgIGRuZDogdHJlZV9kbmRfb3B0aW9ucyxcbiAgICAgICAgICAgIGNsaWNrRm9sZGVyTW9kZTogMyxcbiAgICAgICAgICAgIGNoZWNrYm94OiB0eXBlb2YgdGhpcy5hdHRyKCdkYXRhLXRyZWUtY2hlY2tib3gnKSAhPT0gXCJ1bmRlZmluZWRcIiB8fCBmYWxzZSxcbiAgICAgICAgICAgIHNlbGVjdE1vZGU6IHR5cGVvZiB0aGlzLmF0dHIoJ2RhdGEtdHJlZS1zZWxlY3QnKSAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcnNlSW50KHRoaXMuYXR0cignZGF0YS10cmVlLXNlbGVjdCcpKSA6IDJcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgLy8gdXNpbmcgZGVmYXVsdCBvcHRpb25zXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidHJlZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrRmFuY3lUcmVlKCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrV2l6YXJkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNsaWNrID09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHQgPSB0aGlzLFxuICAgICAgICAgICAgY29udGFpbmVyID0gdC5jbG9zZXN0KCcud2l6YXJkLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHQuc2xpY2soe1xuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgcnRsOiB0aGlzLmRhdGEoJ3J0bCcpLFxuICAgICAgICAgICAgc2xpZGU6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICBvbkFmdGVyQ2hhbmdlOiBmdW5jdGlvbiAod2l6LCBpbmRleCkge1xuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2FmdGVyLndpemFyZC5zdGVwJywge1xuICAgICAgICAgICAgICAgICAgICB3aXo6IHdpeixcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy53aXotbmV4dCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0LnNsaWNrTmV4dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb250YWluZXIuZmluZCgnLndpei1wcmV2JykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHQuc2xpY2tQcmV2KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcud2l6LXN0ZXAnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdC5zbGlja0dvVG8oJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cIndpemFyZFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrV2l6YXJkKCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBCeSBsZXZlcmFnaW5nIGV2ZW50cyB3ZSBjYW4gaG9vayBpbnRvIHRoZSB3aXphcmQgdG8gYWRkIGZ1bmN0aW9uYWxpdHkuXG4gICAgICogVGhpcyBleGFtcGxlIHVwZGF0ZXMgdGhlIHByb2dyZXNzIGJhciBhZnRlciB0aGUgd2l6YXJkIHN0ZXAgY2hhbmdlcy5cbiAgICAgKi9cbiAgICAkKGRvY3VtZW50KS5vbignYWZ0ZXIud2l6YXJkLnN0ZXAnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICBpZiAoZGF0YS5jb250YWluZXIuaXMoJyN3aXphcmQtZGVtby0xJykpIHtcblxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGRhdGEuY29udGFpbmVyLmZpbmQoJy53aXotcHJvZ3Jlc3MgbGk6ZXEoJyArIGRhdGEudGFyZ2V0ICsgJyknKTtcblxuICAgICAgICAgICAgZGF0YS5jb250YWluZXIuZmluZCgnLndpei1wcm9ncmVzcyBsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUgY29tcGxldGUnKTtcblxuICAgICAgICAgICAgdGFyZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgdGFyZ2V0LnByZXZBbGwoKS5hZGRDbGFzcygnY29tcGxldGUnKTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCJyZXF1aXJlKCcuL190YWJzJyk7XG5yZXF1aXJlKCcuL190cmVlJyk7XG5yZXF1aXJlKCcuL19zaG93LWhvdmVyJyk7XG5yZXF1aXJlKCcuL19kYXRlcmFuZ2VwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2V4cGFuZGFibGUnKTtcbnJlcXVpcmUoJy4vX25lc3RhYmxlJyk7XG5yZXF1aXJlKCcuL19jb3ZlcicpO1xucmVxdWlyZSgnLi9fdG9vbHRpcCcpO1xucmVxdWlyZSgnLi9fdGFibGVzJyk7XG5yZXF1aXJlKCcuL19jaGVjay1hbGwnKTtcbnJlcXVpcmUoJy4vX3Byb2dyZXNzLWJhcnMnKTtcbnJlcXVpcmUoJy4vX2lmcmFtZScpO1xucmVxdWlyZSgnLi9fYm9vdHN0cmFwLWNvbGxhcHNlJyk7XG5yZXF1aXJlKCcuL19ib290c3RyYXAtY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vX2Jvb3RzdHJhcC1tb2RhbCcpO1xucmVxdWlyZSgnLi9fcGFuZWwtY29sbGFwc2UnKTtcblxuLy8gRm9ybXNcbnJlcXVpcmUoJy4vX3RvdWNoc3BpbicpO1xucmVxdWlyZSgnLi9fc2VsZWN0MicpO1xucmVxdWlyZSgnLi9fc2xpZGVyJyk7XG5yZXF1aXJlKCcuL19zZWxlY3RwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2RhdGVwaWNrZXInKTtcbnJlcXVpcmUoJy4vX21pbmljb2xvcnMnKTtcbnJlcXVpcmUoJy4vX2Jvb3RzdHJhcC1zd2l0Y2gnKTtcbnJlcXVpcmUoJy4vX3dpemFyZCcpOyJdfQ==
