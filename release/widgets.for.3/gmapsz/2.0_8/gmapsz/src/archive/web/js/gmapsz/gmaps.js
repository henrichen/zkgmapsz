/* gmaps.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Thu Oct 12 14:29:16     2006, Created by henrichen
}}IS_NOTE

Copyright (C) 2006 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
/* Due to the Gmaps limitation that we cannot create script element dynamically
	So, it is user's job to declare <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=xxx"
	in a page that is not dynamically loaded.
zk.load(
	"http://maps.google.com/maps?file=api&v=2&key="+getZKAttr($e("zk_gmapsKey"),"key"),
	null,
	function () {
		return typeof GMap2 != "undefined";
	});
*/
zk.load("ext.gmaps.markermanager");

function Gmaps_newMarkerManager(map, opt_opts) {
	//20080215, Henri Chen: When drag a gmarker outside,
	//the auto tracking of the MarkerManager is not good.
	//which will remove then add which cause the lost of the mouse
	//capture.
	var me = new MarkerManager(map, opt_opts);
	me.removeOverlay_ = function(marker) {
		if (marker._oldcenter == null) {
			me.map_.removeOverlay(marker);
			me.shownMarkers_--;
			me.notifyRemove_(marker);
		}
	};
	me.addOverlay_ = function(marker) {
		if (marker._oldcenter == null) {
			var gmaps = me.map_;
			gmaps.addOverlay(marker);
			
			me.shownMarkers_++;
			me.notifyAdd_(marker);
		}
	};

	if (!me.notifyRemove) {
		//Override MarkerManager to support fire addmarker and removemarker events to gmaps
		me.notifyRemove_ = function(marker) {
			GEvent.trigger(this.map_, "removemarker", marker);
		};

		me.notifyAdd_ = function(marker) {
			GEvent.trigger(this.map_, "addmarker", marker);
		};
	}

	return me;
}

////
zkGmaps = {};
function Gmaps_newGGnd(gmaps, elm) {
	var lat = getZKAttr(elm, "swlat");
	var lng = getZKAttr(elm, "swlng");
	var sw = new GLatLng(lat, lng);
	lat = getZKAttr(elm, "nelat");
	lng = getZKAttr(elm, "nelng");
	var ne = new GLatLng(lat, lng);
	var src = getZKAttr(elm, "src");
	var bound = new GLatLngBounds(sw, ne);
	var ggnd = new GGroundOverlay(src, bound);
	gmaps.addOverlay(ggnd);
	ggnd._elm = elm;
	elm._ggnd = ggnd;
}

function Gmaps_newGGon(gmaps, elm) {
	var opt = new Array();
	var color = getZKAttr(elm, "cr");
	opt["color"] = color;
	var weight = getZKAttr(elm, "wg");
	opt["weight"] = weight;
	var lopacity = parseFloat(getZKAttr(elm, "lop"));
	opt["opacity"] = lopacity;
	var points = getZKAttr(elm, "pts");
	opt["points"] = points
	var levels = getZKAttr(elm, "lvs");
	opt["levels"] = levels;
	var zoomFactor = parseInt(getZKAttr(elm, "zf"));
	opt["zoomFactor"] = zoomFactor;
	var numLevels = parseInt(getZKAttr(elm, "nlvs"));
	opt["numLevels"] = numLevels;

	var polys = new Array(1);
	polys[0] = opt;
	
	var args = new Array();
	args["polylines"] = polys;
	var fill = (getZKAttr(elm, "fl") == "true");
	args["fill"] = fill;
	var fillColor = getZKAttr(elm, "fcr");
	args["color"] = fillColor;
	var opacity = parseFloat(getZKAttr(elm, "op"));
	args["opacity"] = opacity;
	var outline = (getZKAttr(elm, "ol") == "true");
	args["outline"] = outline;
	
	var ggon = new GPolygon.fromEncoded(args);
	gmaps.addOverlay(ggon);
	ggon._elm = elm;
	elm._ggon = ggon;
}

function Gmaps_newGPoly(gmaps, elm) {
	var opt = new Array();
	var color = getZKAttr(elm, "cr");
	opt["color"] = color;
	var weight = getZKAttr(elm, "wg");
	opt["weight"] = weight;
	var opacity = parseFloat(getZKAttr(elm, "lop"));
	opt["opacity"] = opacity;
	var points = getZKAttr(elm, "pts");
	opt["points"] = points
	var levels = getZKAttr(elm, "lvs");
	opt["levels"] = levels;
	var zoomFactor = parseInt(getZKAttr(elm, "zf"));
	opt["zoomFactor"] = zoomFactor;
	var numLevels = parseInt(getZKAttr(elm, "nlvs"));
	opt["numLevels"] = numLevels;

	var gpoly = new GPolyline.fromEncoded(opt);
	gmaps.addOverlay(gpoly);
	gpoly._elm = elm;
	elm._gpoly = gpoly;
}

function Gmaps_newGMarker(gmaps, elm) {
	var gicon = new GIcon(G_DEFAULT_ICON);
	var iimg = getZKAttr(elm, "iimg");
	if (iimg) {
		gicon.image = iimg;
	}
	var isdw = getZKAttr(elm, "isdw");
	if (isdw) {
		gicon.shadow = isdw;
	}
	var isz = Gmaps_parseIntArray(getZKAttr(elm, "isz"));
	if (isz) {
		gicon.iconSize = new GSize(isz[0], isz[1]);
	}
	var isdwsz = Gmaps_parseIntArray(getZKAttr(elm, "isdwsz"));
	if (isdwsz) {
		gicon.shadowSize = new GSize(isdwsz[0], isdwsz[1]);
	}
	var ianch = Gmaps_parseIntArray(getZKAttr(elm, "ianch"));
	if (ianch) {
		gicon.iconAnchor = new GPoint(ianch[0], ianch[1]);
	}
	var iinfanch = Gmaps_parseIntArray(getZKAttr(elm, "iinfanch"));
	if (iinfanch) {
		gicon.infoWindowAnchor = new GPoint(iinfanch[0], iinfanch[1]);
	}
	var iprtimg = getZKAttr(elm, "iprtimg");
	if (iprtimg) {
		gicon.printImage = iprtimg;
	}
	var imozprtimg = getZKAttr(elm, "imozprtimg");
	if (imozprtimg) {
		gicon.mozPrintImage = imozprtimg;
	}
	var iprtsdw = getZKAttr(elm, "iprtsdw");
	if (iprtsdw) {
		gicon.printShadow = iprtsdw;
	}
	var itrpt = getZKAttr(elm, "itrpt");
	if (itrpt) {
		gicon.transparent = itrpt;
	}
		var iimgmap = getZKAttr(elm, "iimgmap");
		
	var imaxhgt = getZKAttr(elm, "imaxhgt");
	if (imaxhgt) {
		gicon.maxHeight = parseInt(imaxhgt);
	}
	var idrgcrsimg = getZKAttr(elm, "idrgcrsimg");
	if (idrgcrsimg) {
		gicon.dragCrossImage = idrgcrsimg;
	}
	var idrgcrssz = Gmaps_parseIntArray(getZKAttr(elm, "idrgcrssz"));
	if (idrgcrssz) {
		gicon.dragCrossSize = new GSize(idrgcrssz[0], idrgcrssz[1]);
	}
	var idrgcrsanch = Gmaps_parseIntArray(getZKAttr(elm, "idrgcrsanch"));
	if (idrgcrsanch) {
		gicon.dragCrossAnchor = new GPoint(idrgcrsanch[0], idrgcrsanch[1]);
	}
	var anch = Gmaps_getLatLng(getZKAttr(elm, "anch"));
	var opt = new Array();
	opt["icon"] = gicon;
	
	var drag = getZKAttr(elm, "drag");
	if (drag) {
		opt["draggable"] = true;
	}
	var title = elm.getAttribute("title");
	if (title) {
		opt["title"] = title;
	}
	var gmark = new GMarker(new GLatLng(anch[0], anch[1]), opt);
	gmark._elm = elm;
	elm._gmark = gmark;
	
//20080214, Henri Chen: support maxzoom and minzoom
//	gmaps.addOverlay(gmark);
	var maxz = getZKAttr(elm, "maxz");
	var minz = getZKAttr(elm, "minz");
	var mp = $outer(gmaps.getContainer());
	mp._mgr.addMarker(gmark, parseInt(minz), parseInt(maxz));
	
	if (drag) {
		gmark.enableDragging();
	}
	
	gmark._dragstart = GEvent.addListener(gmark, "dragstart", Gmarker_ondrag);
	gmark._dragend = GEvent.addListener(gmark, "dragend", Gmarker_ondrop);
	gmark._dblclick = GEvent.addListener(gmark, "dblclick", Gmarker_ondblclick);
}

function Gmaps_parseIntArray(n) {
	if (!n) return null;
	var a = n.split(",");
	for (var j = 0; j < a.length; ++j) {
		a[j] = parseInt(a[j]);
	}
	return a;
}
		
/** get expected center from server */
function Gmaps_getLatLng(n) {
	if (!n) return null;
	var a = n.split(",");
	var len = a.length;
	var lat = parseFloat(a[0]);
	var lng = parseFloat(a[1]);
	if (len < 3) {
		return [lat, lng];
	}
	var zoom = parseInt(a[2]);
	if (len < 4) {
		return [lat, lng, zoom];
	}
	return [lat, lng, zoom, a[3]];
}

/** open the specified info window */
function Gmaps_openInfo(mp, elm) {
	var gmaps = mp._gmaps;
	var nelm = elm.cloneNode(true);
	nelm.id = elm.id+"!real";
	var infowintab = new GInfoWindowTab("tab1", nelm);
	var tabs = new Array(1);
	tabs[0] = infowintab;
	tabs._info = elm;
	
	var zktype = getZKAttr(elm, "type");
    if (zktype.lastIndexOf("mark") >= 0) { //gmapsz.gmaps.Gmark
		var gmark = elm._gmark;
		gmark.openInfoWindowTabs(tabs);
	} else {
        var anch = Gmaps_getLatLng(getZKAttr(elm, "anch"));
		gmaps.openInfoWindowTabs(new GLatLng(anch[0], anch[1]), tabs);
	}
}

/** onMarkerDrag event handler */
function Gmarker_ondrag() {
	//20080215, Henri Chen: reset the position of the gmark for the MarkerManager
	var gmark = this;
	gmark._oldcenter = gmark.getLatLng();
}

/** onMarkerDrop event handler */
function Gmarker_ondrop() {
	var gmark = this;
	var elm = gmark._elm;
	var mp = $e(getZKAttr(elm, "pid"));
	
	//20080215, Henri Chen: reset the position of the gmark for the MarkerManager
	var mgr = mp._mgr;
	var center = gmark.getPoint();
	var oldcenter = gmark._oldcenter;
	gmark.setLatLng(oldcenter);
	mgr.removeMarker(gmark);
	gmark.setLatLng(center);
	var maxz = getZKAttr(elm, "maxz");
	var minz = getZKAttr(elm, "minz");
	mgr.addMarker(gmark, minz, maxz);
	gmark._oldcenter = null;
	
	//20080215, decrease sticky draggable gmarker issue.
	mgr.removeMarker(gmark);
	mgr.addMarker(gmark, minz, maxz);
	
	var uuid = elm.id;
	var comp = elm;
	var lat = center.lat();
	var lng = center.lng();
	zkau.send({uuid: uuid, cmd: "onMarkerDrop", data: [lat, lng]}, zkau.asapTimeout(comp, "onMarkerDrop"));
}

function Gmarker_ondblclick() {
	var gmark = this;
	var elm = gmark._elm;
	var mp = $e(getZKAttr(elm, "pid"));
	Gmaps_dodblclick(mp, gmark, null);
}	

/** onMapMove event handler */
function Gmaps_onmove() {
	var gmaps = this;
	var mp = $outer(gmaps.getContainer());
	var uuid = mp.id;
	var comp = mp;
	var center = gmaps.getCenter();
	var lat = center.lat();
	var lng = center.lng();
	var bounds = gmaps.getBounds();
	var sw = bounds.getSouthWest();
	var ne = bounds.getNorthEast();
	var swlat = sw.lat();
	var swlng = sw.lng();
	var nelat = ne.lat();
	var nelng = ne.lng();
	zkau.send({uuid: uuid, cmd: "onMapMove", data: [lat, lng, swlat, swlng, nelat, nelng]}, zkau.asapTimeout(comp, "onMapMove"));
}

/** onMapZoom event hander */
function Gmaps_onzoom() {
	var gmaps = this;
	var mp = $outer(gmaps.getContainer());
	var uuid = mp.id;
	var comp = mp;
	var zoom = gmaps.getZoom();
	zkau.send({uuid: uuid, cmd: "onMapZoom", data: [zoom]}, zkau.asapTimeout(comp, "onMapZoom"));
}

/** when GInfoWindow of the Google Maps is opened */
function Gmaps_oninfoopen() {
	var gmaps = this;
	var mp = $outer(gmaps.getContainer());
	var opening = gmaps.getInfoWindow().getTabs()._info;

	var elm = opening;
	var uuid = mp.id;
	zkau.send({uuid: uuid, cmd: "onInfoChange", data: [elm.id]}, 350);
	mp._curInfo = elm;
}

/** when GInfoWindow of the Google Maps is closed */
function Gmaps_oninfoclose() {
	var gmaps = this;
	var mp = $outer(gmaps.getContainer());

    var uuid = mp.id;
	zkau.send({uuid: uuid, cmd: "onInfoChange", data: null}, 350);
	mp._curInfo = null;
}

/** when Google Maps is clicked */
function Gmaps_onclick(gmark, point) {
	var gmaps = this;
	var mp = $outer(gmaps.getContainer());
	var uuid = mp.id;
	var comp = mp;
	if (gmark && !point) {
		point = gmark.getPoint();
	}
	var lat = point.lat();
	var lng = point.lng();
	var markid = gmark && gmark._elm ? gmark._elm.id : null;
	
	zkau.send({uuid: uuid, cmd: "onMapClick", data: [markid, lat, lng]}, zkau.asapTimeout(comp, "onMapClick"));
}

function Gmaps_ondblclick(gmark, point) {
	var mp = $outer(this.getContainer());
	Gmaps_dodblclick(mp, gmark, point);
}
	
function Gmaps_dodblclick(mp, gmark, point) {
	var uuid = mp.id;
	var comp = mp;
	if (gmark && !point) {
		point = gmark.getPoint();
	}
	var lat = point.lat();
	var lng = point.lng();
	var markid = gmark && gmark._elm ? gmark._elm.id : null;
	
	zkau.send({uuid: uuid, cmd: "onMapDoubleClick", data: [markid, lat, lng]}, zkau.asapTimeout(comp, "onMapDoubleClick"));
}

/*function Gmaps_doremovemarker(gmarker) {
	alert("Remove gmarker:"+gmarker+", elm:"+gmarker._elm);
}

function Gmaps_doaddmarker(gmarker) {
	alert("Add gmarker:"+gmarker+",  elm:"+gmarker._elm);
}
*/

function Gmaps_addListeners(gmaps) {
	gmaps._moveend = GEvent.addListener(gmaps, "moveend", Gmaps_onmove);
	gmaps._zoomend = GEvent.addListener(gmaps, "zoomend", Gmaps_onzoom);
	gmaps._infowindowclose = GEvent.addListener(gmaps, "infowindowclose", Gmaps_oninfoclose);
	gmaps._infowindowopen = GEvent.addListener(gmaps, "infowindowopen", Gmaps_oninfoopen);
	gmaps._click = GEvent.addListener(gmaps, "click", Gmaps_onclick);
	gmaps._dblclick = GEvent.addListener(gmaps, "dblclick", Gmaps_ondblclick);
//	gmaps._addmarker = GEvent.addListener(gmaps, "addmarker", Gmaps_doaddmarker);
//	gmaps._removemarker = GEvent.addListener(gmaps, "removemarker", Gmaps_doremovemarker);
}

function Gmaps_removeListeners(gmaps) {
	GEvent.removeListener(gmaps._moveend);
	gmaps._moveend = null;

	GEvent.removeListener(gmaps._zoomend);
	gmaps._zoomend = null;

	GEvent.removeListener(gmaps._infowindowclose);
	gmaps._infowindowclose = null;

	GEvent.removeListener(gmaps._infowindowopen);
	gmaps._infowindowopen = null;

	GEvent.removeListener(gmaps._click);
	gmaps._click = null;

	GEvent.removeListener(gmaps._dblclick);
	gmaps._dblclick = null;

//	GEvent.removeListener(gmaps._addmarker);
//	gmaps._addmarker = null;
	
//	GEvent.removeListener(gmaps._removemarker);
//	gmaps._removemarker = null;
}
	
/** Init */
zkGmaps.init = function (mp) {
	if (window.GMap2 == null) {
		$real(mp).innerHTML =
			'<p>To use <code>&lt;gmaps&gt;</code>, you have to specify the following statement in one of your page(s) that is not dynmically loaded:</p>'
			+'<code>&lt;script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=key-assigned-by-google" type="text/javascript"/&gt;</code>';
		return; //failed
	}

	if (GBrowserIsCompatible()) {
		var gmaps = new GMap2($real(mp));
		mp._gmaps = gmaps;

		//init the GMap2
		var center = Gmaps_getLatLng(getZKAttr(mp, "init"));
		gmaps.setCenter(new GLatLng(center[0], center[1]), center[2]);

		//set map type
		var mapType = getZKAttr(mp, "mt");
		zkGmaps.setMapType(gmaps, mapType);
		
		//prepare map types
		zkGmaps.setAttr(mp, "z.nmap", getZKAttr(mp, "nmap"));
		zkGmaps.setAttr(mp, "z.smap", getZKAttr(mp, "smap"));
		zkGmaps.setAttr(mp, "z.hmap", getZKAttr(mp, "hmap"));
		zkGmaps.setAttr(mp, "z.pmap", getZKAttr(mp, "pmap"));
		
		//prepare controls
		if (center.length > 3) {
			var ctrls = center[3];
			if (ctrls.indexOf("s") >= 0) {
				zkGmaps.setAttr(mp, "z.sctrl", "true");
			}
			if (ctrls.indexOf("t") >= 0) {
				zkGmaps.setAttr(mp, "z.tctrl", "true");
			}
			if (ctrls.indexOf("l") >= 0) {
				zkGmaps.setAttr(mp, "z.lctrl", "true");
			}
			if (ctrls.indexOf("z") >= 0) {
				zkGmaps.setAttr(mp, "z.zctrl", "true");
			}
			if (ctrls.indexOf("c") >= 0) {
				zkGmaps.setAttr(mp, "z.cctrl", "true");
			}
			if (ctrls.indexOf("o") >= 0) {
				zkGmaps.setAttr(mp, "z.octrl", "true");
			}
		}
		
		//other configuration
		zkGmaps.setAttr(mp, "z.dg", getZKAttr(mp, "dg"));
		zkGmaps.setAttr(mp, "z.cz", getZKAttr(mp, "cz"));
		zkGmaps.setAttr(mp, "z.dz", getZKAttr(mp, "dz"));
		zkGmaps.setAttr(mp, "z.wz", getZKAttr(mp, "wz"));
		zkGmaps.setAttr(mp, "z.gb", getZKAttr(mp, "gb"));
		
		//prepare GInfoWindow, GMarker, GPolyline, GPolygon of the Google Maps
		mp._mgr = Gmaps_newMarkerManager(gmaps);
		var info = null;
		var cave = $e(mp.id + "!cave");
		for (j=0;j<cave.childNodes.length;j++) {
			var elm = cave.childNodes[j];
			if ($tag(elm) == "SPAN") {
				var zktype = getZKAttr(elm, "type");
				if (zktype.lastIndexOf("mark") >= 0) { //gmapsz.gmaps.Gmark
					Gmaps_newGMarker(gmaps, elm);
				} else if (zktype.lastIndexOf("poly") >= 0) { //gmapsz.gmaps.Gpoly
					Gmaps_newGPoly(gmaps, elm);
				} else if (zktype.lastIndexOf("gon") >= 0) { //gmapsz.gmaps.Ggon
					Gmaps_newGGon(gmaps, elm);
				} else if (zktype.lastIndexOf("gnd") >= 0) { //gmapsz.gmaps.Ggnd
					Gmaps_newGGnd(gmaps, elm);
				}
				if (getZKAttr(elm, "open")) {
					info = elm;
				}
			}
		}

		//prepare the event listener
		Gmaps_addListeners(gmaps);
		
		//register once the onunload handler
		if (!zkGmaps._reg) {
			zkGmaps._reg = true; //register once only
			
			//chain zkGmaps into onunload chain
			zkGmaps._oldDocUnload = window.onunload;
			window.onunload = zkGmaps._onDocUnload; //unable to use zk.listen
		}
		
		if (info) {
			Gmaps_openInfo(mp, info);
		}
	}
		//Note: HTML is rendered first (before gmaps.js), so we have to delay
		//until now
};
zkGmaps.cleanup = function (mp) {
	if (window.GMap2 != null) {
		Gmaps_removeListeners(mp._gmaps);
		if (mp._mgr) {
			mp._mgr.clearMarkers();
			mp._mgr = null;
		}
		mp._gmaps = null;
		mp._curInfo = null;
		mp._lctrl = null;
		mp._sctrl = null;
		mp._zctrl = null;
		mp._tctrl = null;
		mp._cctrl = null;
		mp._octrl = null;
	}
};

/** Called by the server to set the attribute. */
zkGmaps.setAttr = function (mp, name, value) {
    var gmaps = mp._gmaps;
	switch (name) {
	case "z.center": 
		var center = Gmaps_getLatLng(value);
		gmaps.setCenter(new GLatLng(center[0], center[1]));
		return true;
	case "z.panTo":
		var panTo = Gmaps_getLatLng(value);
		gmaps.panTo(new GLatLng(panTo[0], panTo[1]));
		return true;
	case "z.zoom":
		gmaps.setZoom(parseInt(value));
		return true;
	case "z.lctrl":
		if (value == "true" && !mp._lctrl) {
			mp._lctrl = new GLargeMapControl();
			gmaps.addControl(mp._lctrl);
		} else if (value != "true" && mp._lctrl) {
			gmaps.removeControl(mp._lctrl);
			mp._lctrl = null;
		}
		return true;
	case "z.sctrl":			
		if (value == "true" && !mp._sctrl) {
			mp._sctrl = new GSmallMapControl();
			gmaps.addControl(mp._sctrl);
		} else if (value != "true" && mp._sctrl) {
			gmaps.removeControl(mp._sctrl);
			mp._sctrl = null;
		}
		return true;
	case "z.zctrl":			
		if (value == "true" && !mp._zctrl) {
			mp._zctrl = new GSmallZoomControl();
			gmaps.addControl(mp._zctrl);
		} else if (value != "true" && mp._zctrl) {
			gmaps.removeControl(mp._zctrl);
			mp._zctrl = null;
		}
		return true;
	case "z.tctrl":
		if (value == "true" && !mp._tctrl) {
			mp._tctrl = new GMapTypeControl();
			gmaps.addControl(mp._tctrl);
		} else if (value != "true" && mp._tctrl) {
			gmaps.removeControl(mp._tctrl);
			mp._tctrl = null;
		}
		return true;
	case "z.cctrl":
		if (value == "true" && !mp._cctrl) {
			mp._cctrl = new GScaleControl();
			gmaps.addControl(mp._cctrl);
		} else if (value != "true" && mp._cctrl) {
			gmaps.removeControl(mp._cctrl);
			mp._cctrl = null;
		}
		return true;
	case "z.octrl":
		if (value == "true" && !mp._octrl) {
			mp._octrl = new GOverviewMapControl();
			gmaps.addControl(mp._octrl);
		} else if (value != "true" && mp._octrl) {
			gmaps.removeControl(mp._octrl);
			mp._octrl = null;
		}
		return true;
    case "z.open":
        var elm = $e(value);
        Gmaps_openInfo(mp, elm);
        return true;
    case "z.close":
//        gmaps._opening = null;
        gmaps.closeInfoWindow();
        return true;
    case "z.mt":
    	zkGmaps.setMapType(gmaps, value);
    	return true;
    case "z.nmap":
    case "z.smap":
    case "z.hmap":
    case "z.pmap":
		if (value == "true")
			zkGmaps.addMapType(gmaps, name);
		else
			zkGmaps.removeMapType(gmaps, name);
    	return true;
	case "z.dg":
		if (value == "true")
			gmaps.enableDragging();
		else
			gmaps.disableDragging();
		return true;
	case "z.cz":
		if (value == "true")
			gmaps.enableContinuousZoom();
		else
			gmaps.disableContinuousZoom();
		return true;
	case "z.dz":
		if (value == "true")
			gmaps.enableDoubleClickZoom();
		else
			gmaps.disableDoubleClickZoom();
		return true;
	case "z.wz":
		if (value == "true")
			gmaps.enableScrollWheelZoom();
		else
			gmaps.disableScrollWheelZoom();
		return true;
	case "z.gb":
		if (value == "true")
			gmaps.enableGoogleBar();
		else
			gmaps.disableGoogleBar();
		return true;
	}
	return false;
};

/** Handles document.unload. */
zkGmaps._onDocUnload = function () {
	if (window.GMap2 != null) {
		GUnload();
		zkGmaps._reg = null;
		if (zkGmaps._oldDocUnload) zkGmaps._oldDocUnload.apply(document);
	}
};

/** Handles invisible -> visible and resize */
zkGmaps.onSize = zkGmaps.onVisi = function (mp) {
	if (mp._gmaps)
		mp._gmaps.checkResize();
};

/** set map type. */
zkGmaps.setMapType = function (gmaps, mapType) {
	if (mapType) {
		switch (mapType) {
		default:
		case "normal":
			gmaps.setMapType(G_NORMAL_MAP);
			break;
		case "satellite":
			gmaps.setMapType(G_SATELLITE_MAP);
			break;
		case "hybrid":
			gmaps.setMapType(G_HYBRID_MAP);
			break;
		case "physical":
			gmaps.setMapType(G_PHYSICAL_MAP);
			break;
		}
	}
};

/** add map type. */
zkGmaps.addMapType = function (gmaps, mapType) {
	if (mapType) {
		switch (mapType) {
		case "z.nmap":
			gmaps.addMapType(G_NORMAL_MAP);
			break;
		case "z.smap":
			gmaps.addMapType(G_SATELLITE_MAP);
			break;
		case "z.hmap":
			gmaps.addMapType(G_HYBRID_MAP);
			break;
		case "z.pmap":
			gmaps.addMapType(G_PHYSICAL_MAP);
			break;
		}
	}
};

/** remove map type. */
zkGmaps.removeMapType = function (gmaps, mapType) {
	if (mapType) {
		switch (mapType) {
		case "z.nmap":
			gmaps.removeMapType(G_NORMAL_MAP);
			break;
		case "z.smap":
			gmaps.removeMapType(G_SATELLITE_MAP);
			break;
		case "z.hmap":
			gmaps.removeMapType(G_HYBRID_MAP);
			break;
		case "z.pmap":
			gmaps.removeMapType(G_PHYSICAL_MAP);
			break;
		}
	}
};

////
zkGinfo = {};

/** Init */
zkGinfo.init = function (elm) {
	var mp = $e(getZKAttr(elm, "pid"));
	//when Ginfo.setContent(), elm is recreated
	//always take out the display:none
	elm.style.display = "";
	if (mp._gmaps /*&& mp._gmaps._ginfo == null*/) { //add or recreate
		if (getZKAttr(elm, "open")) {
			Gmaps_openInfo(mp, elm);
		}
	}
	//when page loading, the zkGinfo.init is called before zkGmaps.init
	//the gmaps is not ready yet, so we cannot openInfoWindow here
};

/** Called by the server to set the attribute. */
zkGinfo.setAttr = function (elm, name, value) {
	var mp = $e(getZKAttr(elm, "pid"));
	switch (name) {
	case "z.anch":
		setZKAttr(elm, "anch", value);
		if (mp._curInfo == elm) {
			Gmaps_openInfo(mp, elm);
		}
		return true;
	case "z.content":
		var relm = $e(elm.id + "!real");
		if (relm)
			zk.setInnerHTML(relm, value);
		zk.setInnerHTML(elm, value);
		return true;
	}
		
	return false;
};


////
zkGmark = {};

/** Init */
zkGmark.init = function (elm) {
	//always take out the display:none
	elm.style.display = "";

	var mp = $e(getZKAttr(elm, "pid"));
	if (mp._gmaps) { //Google Maps is ready
		Gmaps_newGMarker(mp._gmaps, elm);
		if (getZKAttr(elm, "open")) {
			Gmaps_openInfo(mp, elm);
		}
	}
	//when page loading, the zkGmark.init is called before zkGmaps.init
	//the gmaps is not ready yet, so we cannot addOverlay here.
};

/** Called by the server to remove self. */
zkGmark.cleanup = function (elm) {

	var mp = $e(getZKAttr(elm, "pid"));
	if (elm._gmark) {
		var gmark = elm._gmark;
		if (gmark) {
			if (gmark._dragstart) {
				GEvent.removeListener(gmark._dragstart);
				gmark._dragstart = null;
			}
			if (gmark._dragend) {
				GEvent.removeListener(gmark._dragend);
				gmark._dragend = null;
			}
			if (gmark._dblclick) {
				GEvent.removeListener(gmark._dblclick);
				gmark._dblclick = null;
			}
			if (mp._curInfo == elm) { //currently opened info, close it first
				gmark.closeInfoWindow();
			}
			if (mp._gmaps)
				//20080214, Henri Chen: support maxzoom, minzoom
				//mp._gmaps.removeOverlay(gmark);
				mp._mgr.removeMarker(gmark);
			elm._gmark = null;
		}
	}
};

/** Called by the server to set the attribute. */
zkGmark.setAttr = function (elm, name, value) {
	var gmark = elm._gmark;
	switch (name) {
	case "z.anch":
		setZKAttr(elm, "anch", value);
		var mp = $e(getZKAttr(elm, "pid"));
		var anch = Gmaps_getLatLng(value);
		gmark.setLatLng(new GLatLng(anch[0], anch[1]));
		
		if (mp._curInfo == elm) {
			Gmaps_openInfo(mp, elm);
		}

		return true;
	case "z.content":
		var relm = $e(elm.id + "!real");
		if (relm)
			zk.setInnerHTML(relm, value);
		zk.setInnerHTML(elm, value);
		return true;
    case "z.iimg":
    	gmark.setImage(value);
    	return true;
    case "z.drag":
    	if (value) {
    		gmark.enableDragging();
    	} else {
    		gmark.disableDragging();
    	}
    	return true;
	}
		
	return false;
};

////
zkGpoly = {};

/** Init */
zkGpoly.init = function (elm) {
	//always display:none
	elm.style.display = "none";

	var mp = $e(getZKAttr(elm, "pid"));
	if (mp._gmaps) { //Google Maps is ready
		Gmaps_newGPoly(mp._gmaps, elm);
	}
	//when page loading, the zkGpoly.init is called before zkGmaps.init
	//the gmaps is not ready yet, so we cannot addOverlay here.
};

/** Called by the server to remove self. */
zkGpoly.cleanup = function (elm) {
	var mp = $e(getZKAttr(elm, "pid"));
	var gpoly = elm._gpoly;
	if (gpoly) {
		elm._gpoly = null;
		gpoly._elm = null;
		if (mp._gmaps)
			mp._gmaps.removeOverlay(gpoly);
	}
};

////
zkGgon = {};

/** Init */
zkGgon.init = function (elm) {
	//always display:none
	elm.style.display = "none";

	var mp = $e(getZKAttr(elm, "pid"));
	if (mp._gmaps) { //Google Maps is ready
		Gmaps_newGGon(mp._gmaps, elm);
	}
		//when page loading, the zkGgon.init is called before zkGmaps.init
		//the gmaps is not ready yet, so we cannot addOverlay here.
};

/** Called by the server to remove self. */
zkGgon.cleanup = function (elm) {
	var mp = $e(getZKAttr(elm, "pid"));
	var ggon = elm._ggon;
	if (ggon) {
		elm._ggon = null;
		ggon._elm = null;
		if (mp._gmaps)
			mp._gmaps.removeOverlay(ggon);
	}
};

////
zkGgnd = {};

/** Init */
zkGgnd.init = function (elm) {
	//always display:none
	elm.style.display = "none";

	var mp = $e(getZKAttr(elm, "pid"));
	if (mp._gmaps) { //Google Maps is ready
		Gmaps_newGGnd(mp._gmaps, elm);
	}
	//when page loading, the zkGgnd.init is called before zkGmaps.init
	//the gmaps is not ready yet, so we cannot addOverlay here.
};

/** Called by the server to remove self. */
zkGgnd.cleanup = function (elm) {
	var mp = $e(getZKAttr(elm, "pid"));
	var ggnd = elm._ggnd;
	if (ggnd) {
		elm._ggnd = null;
		ggnd._elm = null;
		if (mp._gmaps)
			mp._gmaps.removeOverlay(ggnd);
	}
};
