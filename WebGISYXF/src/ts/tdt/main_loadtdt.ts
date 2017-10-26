///<reference path="../../lib/typings/typings.d.ts"/>
import Map=require("esri/Map");
import MapView=require("esri/views/MapView");
import WMTSLayer=require("esri/layers/WMTSLayer");
import esriConfig=require("esri/config");


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
    layers:[img_layer]
});
view = new MapView({
    container: "viewDiv",
    map: map

});

view.watch("viewpoint",function(){
    document.getElementById("info").innerText="中心点坐标： "+(view.extent.xmax+view.extent.xmin)/2+", "
        +(view.extent.ymax+view.extent.ymin)/2;

});
