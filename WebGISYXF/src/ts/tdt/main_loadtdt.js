define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/WMTSLayer", "esri/config"], function (require, exports, Map, MapView, WMTSLayer, esriConfig) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var map, view;
    esriConfig.request.corsEnabledServers.push("http://t0.tianditu.com/img_c/wmts");
    //define a new WMTSLayer
    var img_layer = new WMTSLayer({
        url: "http://t0.tianditu.com/img_c/wmts",
        serviceMode: "KVP",
        customLayerParameters: {
            tilematrixset: "c",
            format: "tiles"
        }
    });
    map = new Map({
        layers: [img_layer]
    });
    view = new MapView({
        container: "viewDiv",
        map: map
    });
    view.watch("viewpoint", function () {
        document.getElementById("info").innerText = "中心点坐标： " + (view.extent.xmax + view.extent.xmin) / 2 + ", "
            + (view.extent.ymax + view.extent.ymin) / 2;
    });
});
//# sourceMappingURL=main_loadtdt.js.map