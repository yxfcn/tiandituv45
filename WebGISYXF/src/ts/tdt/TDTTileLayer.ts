///<reference path="../../lib/typings/typings.d.ts"/>

import BaseTileLayer=require("esri/layers/BaseTileLayer");
import esriConfig=require("esri/config");
import TileInfo=require("esri/layers/support/TileInfo");
import Map=require("esri/Map");
import MapView=require("esri/views/MapView");
import SpatialReference=require("esri/geometry/SpatialReference");
import Extent=require("esri/geometry/Extent");


var tdtTileInfo = new TileInfo({
    dpi: 90.71428571428571,
    origin: {x: -180, y: 90},
    spatialReference: {wkid: 4490},
    lods: [
        {"level": 0, "resolution": 0.7031249999891485, "scale": 2.958293554545656E8},
        {"level": 1, "resolution": 0.35156249999999994, "scale": 1.479146777272828E8},
        {"level": 2, "resolution": 0.17578124999999997, "scale": 7.39573388636414E7},
        {"level": 3, "resolution": 0.08789062500000014, "scale": 3.69786694318207E7},
        {"level": 4, "resolution": 0.04394531250000007, "scale": 1.848933471591035E7},
        {"level": 5, "resolution": 0.021972656250000007, "scale": 9244667.357955175},
        {"level": 6, "resolution": 0.01098632812500002, "scale": 4622333.678977588},
        {"level": 7, "resolution": 0.00549316406250001, "scale": 2311166.839488794},
        {"level": 8, "resolution": 0.0027465820312500017, "scale": 1155583.419744397},
        {"level": 9, "resolution": 0.0013732910156250009, "scale": 577791.7098721985},
        {"level": 10, "resolution": 0.000686645507812499, "scale": 288895.85493609926},
        {"level": 11, "resolution": 0.0003433227539062495, "scale": 144447.92746804963},
        {"level": 12, "resolution": 0.00017166137695312503, "scale": 72223.96373402482},
        {"level": 13, "resolution": 0.00008583068847656251, "scale": 36111.98186701241},
        {"level": 14, "resolution": 0.000042915344238281406, "scale": 18055.990933506204},
        {"level": 15, "resolution": 0.000021457672119140645, "scale": 9027.995466753102},
        {"level": 16, "resolution": 0.000010728836059570307, "scale": 4513.997733376551},
        {"level": 17, "resolution": 0.000005364418029785169, "scale": 2256.998866688275},
        {"level": 18, "resolution": 2.68220901485e-6, "scale": 1128.499433344138},
        {"level": 19, "resolution": 1.341104507425e-6, "scale": 564.2497166720688}
    ]
});

var TDTTileLayer = BaseTileLayer.createSubclass({
    getTileUrl: function (level, row, col) {
        return "http://t" + col % 8 + ".tianditu.com/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img"
            + "&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";
    }



});




var map: Map;
var view: MapView;

var tdtLayer = new TDTTileLayer({
    //tileInfo:tdtTileInfo
    //title:"img"
});
//tdtLayer.tileInfo=tdtTileInfo;


for (var i = 0; i <= 8; i++)
    esriConfig.request.corsEnabledServers.push("http://t" + i.toString() + ".tianditu.com/");

map = new Map({
    basemap:{
        baseLayers:[tdtLayer]
    }
});
view = new MapView({
    map: map,
    container: "viewDiv",
    center:{x:120.21,y:30.254,spatialReference:{wkid:4490}}
    //spatialReference:{wkid:4490}

});
view.watch("viewpoint",function(){
    document.getElementById("info").innerText="中心点坐标： "+(view.extent.xmax+view.extent.xmin)/2+" ， "
        +(view.extent.ymax+view.extent.ymin)/2;

});

