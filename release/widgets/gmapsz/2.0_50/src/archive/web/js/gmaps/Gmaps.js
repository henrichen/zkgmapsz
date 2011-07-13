/* Gmaps.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Thu Jul 30 11:45:16     2009, Created by henrichen
		
	Used with ZK 5.0 and later
}}IS_NOTE

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 3.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
gmaps.Gmaps = zk.$extends(zul.Widget, {
	$define: {
		center: function(c) {
			var maps = this._gmaps;
			if (maps) maps.setCenter(new GLatLng(c[0],c[1]));
		},
		zoom: function(z) {
			var maps = this._gmaps;
			if (maps) maps.setZoom(z);
		},
		mapType: function(t) {
			var maps = this._gmaps;
			if (maps && t) {
				switch (t) {
				default:
				case 'normal':
					maps.setMapType(G_NORMAL_MAP);
					break;
				case 'satellite':
					if (G_SATELLITE_MAP) //china has no satellite map
						maps.setMapType(G_SATELLITE_MAP);
					else
						maps.setMapType(G_NORMAL_MAP);
					break;
				case 'hybrid':
					if (G_HYBRID_MAP)
						maps.setMapType(G_HYBRID_MAP);
					else 
						maps.setMapType(G_NORMAL_MAP);
					break;
				case 'physical':
					if (G_PHYSICAL_MAP)
						maps.setMapType(G_PHYSICAL_MAP);
					else
						maps.setMapType(G_NORMAL_MAP);
					break;
				}
			}
		},
		normal: function(b) {
			this._initMapType(b, 'normal');
		},
		satellite: function(b) {
			this._initMapType(b, 'satellite');
		},
		hybrid: function(b) {
			this._initMapType(b, 'hybrid');
		},
		physical: function(b) {
			this._initMapType(b, 'physical');
		},
		showLargeCtrl: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b && !this._lctrl) {
					this._lctrl = new GLargeMapControl();
					maps.addControl(this._lctrl);
				} else if (!b && this._lctrl) {
					maps.removeControl(this._lctrl);
					this._lctrl = null;
				}
			}
		},
		showSmallCtrl: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b && !this._sctrl) {
					this._sctrl = new GSmallMapControl();
					maps.addControl(this._sctrl);
				} else if (!b && this._sctrl) {
					maps.removeControl(this._sctrl);
					this._sctrl = null;
				}
			}
		},
		showZoomCtrl: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b && !this._zctrl) {
					this._zctrl = new GSmallZoomControl();
					maps.addControl(this._zctrl);
				} else if (!b && this._zctrl) {
					maps.removeControl(this._zctrl);
					this._zctrl = null;
				}
			}
		},
		showTypeCtrl: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b && !this._tctrl) {
					this._tctrl = new GMapTypeControl();
					maps.addControl(this._tctrl);
				} else if (!b && this._tctrl) {
					maps.removeControl(this._tctrl);
					this._tctrl = null;
				}
			}
		},
		showScaleCtrl: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b && !this._cctrl) {
					this._cctrl = new GScaleControl();
					maps.addControl(this._cctrl);
				} else if (!b && this._cctrl) {
					maps.removeControl(this._cctrl);
					this._cctrl = null;
				}
			}
		},
		showOverviewCtrl: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b && !this._octrl) {
					this._octrl = new GOverviewMapControl();
					maps.addControl(this._octrl);
				} else if (!b && this._octrl) {
					maps.removeControl(this._octrl);
					this._octrl = null;
				}
			}
		},
		enableDragging: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b)
					maps.enableDragging();
				else
					maps.disableDragging();
			}
		},
		continuousZoom: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b)
					maps.enableContinuousZoom();
				else
					maps.disableContinuousZoom();
			}
		},
		doubleClickZoom: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b)
					maps.enableDoubleClickZoom();
				else
					maps.disableDoubleClickZoom();
			}
		},
		scrollWheelZoom: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b)
					maps.enableScrollWheelZoom();
				else
					maps.disableScrollWheelZoom();
			}
		},
		enableGoogleBar: function(b) {
			var maps = this._gmaps;
			if (maps){
				if (b)
					maps.enableGoogleBar();
				else
					maps.disableGoogleBar();
			}
		},
		baseDomain: null,
		sensor: null,
		language: null
	},
	addMapType: function(t) {
		var maps = this._gmaps;
		if (maps && t) {
			switch (t) {
			case 'normal':
				maps.addMapType(G_NORMAL_MAP);
				break;
			case 'satellite':
				maps.addMapType(G_SATELLITE_MAP);
				break;
			case 'hybrid':
				maps.addMapType(G_HYBRID_MAP);
				break;
			case 'physical':
				maps.addMapType(G_PHYSICAL_MAP);
				break;
			}
		}
	},
	removeMapType: function(t) {
		var maps = this._gmaps;
		if (maps && t) {
			switch (t) {
			case 'normal':
				maps.removeMapType(G_NORMAL_MAP);
				break;
			case 'satellite':
				maps.removeMapType(G_SATELLITE_MAP);
				break;
			case 'hybrid':
				maps.removeMapType(G_HYBRID_MAP);
				break;
			case 'physical':
				maps.removeMapType(G_PHYSICAL_MAP);
				break;
			}
		}
	},
	panTo: function(c) {
		this.setPanTo_(c);
	},
	openInfo: function(info) {
		this.setOpenInfo_(info);
	},
	closeInfo: function() {
		this.setCloseInfo_();
	},
	reopenInfo: function(info) {
		if (info && this._curInfo == info) {
			this._curInfo = null;
			this.openInfo(info);
		}
	},
	redraw: function(out) {
		out.push('<div', this.domAttrs_(), '/>');
	},
	setOpenInfo_: function(info) {
		if (typeof info == 'string') {
			info = this.$f(info);
		}
		var maps = this._gmaps;
		if (maps && info && this._curInfo != info) {
			var infowintab = new GInfoWindowTab("tab1", info.getContent()),
				tabs = [infowintab];
			
			this._opening = true; //opening so _doInfoClose of the curInfo don't _fireCloseInfo()
		    if (info.$instanceof(gmaps.Gmarker)) { //gmaps.Gmarker
				info.gmarker().openInfoWindowTabsHtml(tabs);
			} else { //gmaps.Ginfo
		        var anch = info.getAnchor();
				maps.openInfoWindowTabsHtml(new GLatLng(anch[0], anch[1]), tabs);
			}
		    this._curInfo = info;
		    this._opening = false;
		}
	},
	setCloseInfo_: function() {
		var maps = this._gmaps;
		if (maps) {
		    maps.closeInfoWindow();
		}
	},
	//Try to close the info if given info is the _curInfo. Used by MarkerManager#removeOverlay_.
	tryCloseInfo_: function(info) {
		if (info && this._curInfo == info) {
			var maps = this._gmaps;
			if (maps) {
				this._closing = true; //mark _closing to avoid _fireCloseInfo()
			    maps.closeInfoWindow();
			    this._closing = false;
			}
		}
	},
	//Try to fire the closeInfo if the given info is the _curInfo. Used by Gmarker#unbindMapitem_.
	tryFireCloseInfo_: function(info) {
		if (info && this._curInfo == info) {
			this._fireCloseInfo();
		}
	},
	setPanTo_: function(c) {
		this._center = c;
		var maps = this._gmaps;
		if (maps)
			maps.panTo(new GLatLng(c[0], c[1]));
	},
	bind_: function(dt, skipper, after) {
		var wgt = this;
		zk.gapi.loadAPIs(wgt, function() {wgt._tryBind(dt, skipper, after)});
	},
	_tryBind: function(dt, skipper, after) {
		if (window.GMap2 == null) {
			if (!window.google || !window.google.load || window.google.loader.LoadFailure) {
				var n = jq(this.uuid, zk)[0];
				n.innerHTML = gmaps.Gmaps.errormsg; 
				return;  //failed to load the Google AJAX APIs
			}
			var opts = {},
				wgt = this;
			if (this._language)
				opts['language'] = this._language;
			if (this._baseDomain)
				opts['base_domain'] = this._baseDomain;
			opts['other_params'] = 'sensor=' + this._sensor ? 'true' : 'false';
			opts['callback'] = (function() {wgt._realBind(dt, skipper, after);});  
			this._initMask();
			google.load('maps', '2.x', opts);
		} else
			this._realBind(dt, skipper, after);
	},
	_realBind: function(dt, skipper, after) {
		this._clearMask();
		var n = jq(this.uuid, zk)[0];
		if (window.GMap2 == null) {
			n.innerHTML = gmaps.Gmaps.errormsg;
			return; //failed to load the Google Maps APIs
		}
		if (!window.GBrowserIsCompatible() || this._gmaps) 
			return;
		this._initGmaps(n);
		this.$supers('bind_', arguments); //calling down kid widgets to do binding
		
		//Tricky!
		//IE will not fire onSize at the end, so we have to enforce a 
		//resize(true) to restore the center
		if (zk.ie) {
			var wgt = this;
			setTimeout(function () {wgt._resize(true)}, 500);
		}
	},
	unbind_: function() { //detach or server invalidate()
		this.$supers('unbind_', arguments);
		this._clearGmaps();
	},
	beforeParentChanged_: function(p) { //detach()
		this.$supers('beforeParentChanged_', arguments);
		if (!p) this._clearGmaps();
	},
	//override dom event//
	doClick_: function(evt) {
		var wgt = evt.target;

		//calling this to correct the popup submenu not auto closed issue
		zk.Widget.mimicMouseDown_(wgt);

		//after Gmarker#_doDragend(fire onMapDrop), shall not fire an unwanted 
		//onMapClick. So block it.
		if (!wgt.$instanceof(gmaps.Gmarker) || !wgt._isAfterDragend()) {
			var xy = gmaps.Gmaps.pageXYToXY(this, evt.pageX, evt.pageY),
				latlng = this._gmaps.fromContainerPixelToLatLng(new GPoint(xy[0],xy[1])),
				data = zk.copy(evt.data, {lat:latlng.lat(),lng:latlng.lng(),reference:wgt,x:xy[0],y:xy[1]}),
				opts = evt.opts;
			this.fireX(new zk.Event(this, 'onMapClick', data, opts, evt.domEvent));
			this.fireX(new zk.Event(this, 'onSelect', {items:[wgt],reference:wgt}, opts, evt.domEvent));
			this.$supers('doClick_', arguments);
		} 
		if (wgt.$instanceof(gmaps.Gmarker))
			wgt._setAfterDragend(false);
	},
	doDoubleClick_: function (evt) {
		//Google Maps API will not bubble up the double-click-on-gmarker
		//domEvent to container(Gmaps#_gmaps) so we add own listener
		//to handle such cases. 
		//@see Gmarker#_initListeners
		var xy = gmaps.Gmaps.pageXYToXY(this, evt.pageX, evt.pageY),
			latlng = this._gmaps.fromContainerPixelToLatLng(new GPoint(xy[0],xy[1])),
			wgt = evt.target,
			data = zk.copy(evt.data, {lat:latlng.lat(),lng:latlng.lng(),reference:wgt,x:xy[0],y:xy[1]});
		this.fireX(new zk.Event(this, 'onMapDoubleClick', data, evt.opts, evt.domEvent));
		this.$supers('doDoubleClick_', arguments);
	},
	doRightClick_: function (evt) {
		var data = evt.data || evt.domEvent.mouseData(),
			xy = gmaps.Gmaps.pageXYToXY(this, data.pageX, data.pageY),
			latlng = this._gmaps.fromContainerPixelToLatLng(new GPoint(xy[0],xy[1])),
			wgt = evt.target;
		//Google Maps API will not bubble up the right-click-on-gmarker
		//domEvent to container(Gmaps#_gmaps) so we add own listener
		//to handle such cases. 
		//@see Gmarker#_initListeners

		//calling this to correct the context submenu not auto closed issue
		zk.Widget.mimicMouseDown_(wgt);
		
		data = zk.copy(data, {lat:latlng.lat(),lng:latlng.lng(),reference:wgt,x:xy[0],y:xy[1]});
		this.fireX(new zk.Event(this, 'onMapRightClick', data, evt.opts, evt.domEvent));
		this.$supers('doRightClick_', arguments);
	},
	onDrop_: function (drag, evt) {
		var xy = gmaps.Gmaps.pageXYToXY(this, evt.pageX, evt.pageY),
			latlng = this._gmaps.fromContainerPixelToLatLng(new GPoint(xy[0],xy[1])),
			data = zk.copy({dragged: drag.control,lat:latlng.lat(),lng:latlng.lng(),x:xy[0],y:xy[1]}, evt.data);
		this.fire('onMapDrop', data, null, 38);
	},
	//private//
	_initMapType: function(b, t) {
		if (b)
			this.addMapType(t);
		else
			this.removeMapType(t);
	},
	_initMapitems: function() {
		var kid = this.firstChild;
		while(kid) {
			kid.bindMapitem_();
			kid = kid.nextSibling;
		}
	},
	_doMoveEnd: function() {
		var maps = this._gmaps,
			c = maps.getCenter(),
			b = maps.getBounds(),
			sw = b.getSouthWest(),
			ne = b.getNorthEast();
		this._center = [c.lat(), c.lng()];
		this.fireX(new zk.Event(this, 'onMapMove', {lat:this._center[0],lng:this._center[1],swlat:sw.lat(),swlng:sw.lng(),nelat:ne.lat(),nelng:ne.lng()}, {}, null));
	},
	_doZoomEnd: function() {
		var maps = this._gmaps;
		this._zoom = maps.getZoom();
		this.fireX(new zk.Event(this, 'onMapZoom', {zoom:this._zoom}, {}, null));
	},
	_doMapTypeChanged: function() {
		var maps = this._gmaps,
			type = maps.getCurrentMapType();
		if (type) {
			switch (type) {
			default:
			case G_NORMAL_MAP:
				type = 'normal';
				break;
			case G_SATELLITE_MAP:
				type = 'satellite';
				break;
			case G_HYBRID_MAP:
				type = 'hybrid';
				break;
			case G_PHYSICAL_MAP:
				type = 'physical';
				break;
			}
			_mapType = type;
			this.fireX(new zk.Event(this, 'onMapTypeChange', {type:type}, {}, null));
		}
	},
	//1. when end user click the x icon, or click outside the info window, close without condition
	//2. when programmer called setCloseInfo_ (directly, or indirectly from Gmarker#setOpen(false)), close without condition
	//3. when MarkerManager#removeOverlay_, _closing == true
	//4. when Gmarker was removed from the gmaps(MarkerManager#removeOverlay_ then Gmarker#unbindMapitem_).
	//   Shall tryFireCloseInfo_ in Gmarker#unbindMapitem_.
	//5. when another Ginfo/Gmarker open (via API only), _opening == true
	_doInfoClose: function() {
		if (this._curInfo) {
			this._curInfo.clearOpen_();
		}
		if (!this._opening && !this._closing) {
			this._fireCloseInfo();
		}
		this._closing = false;
	},
	//fire onInfoChange when close the info, fire event and null this._curInfo.
	_fireCloseInfo: function() {
		this._curInfo = null;
		this.fireX(new zk.Event(this, 'onInfoChange', {}, {}, null));
	},
	_resize: function(isshow) {
		var maps = this._gmaps; 
		if (maps && maps.isLoaded() && this.isRealVisible()) {
			//bug 2099729: in IE, gmap's container div height will not resize automatically
			var n = this.$n();
			if (zk.ie) { 
			    var hgh = n.style.height;
			    if (hgh.indexOf('%') >= 0) {
			    	n.style.height="";
			    	n.style.height=hgh;
			    }
			}
			
			//Still has to restore the center if onSize event fired first
			var shallRestoreCenter = isshow || !this._centerRestored; 
			if (shallRestoreCenter)
				maps.savePosition();
			
			maps.checkResize(); //will change center but will NOTE trigger _doMoveEnd
			
			if (shallRestoreCenter) {
				maps.returnToSavedPosition(); //will trigger _doMoveEnd asynchronously
				//@see #_doMoveEnd
				this._centerRestored = true;
			} else {
				this._doMoveEnd(); //fire _doMoveEnd for maps.checkResize() case
			}
		}
	},
	_initListeners: function(n) {
		var maps = this._gmaps,
			wgt = this;
		
		this._moveend = GEvent.addListener(maps, 'moveend', function() {wgt._doMoveEnd()});
		this._zoomend = GEvent.addListener(maps, 'zoomend', function() {wgt._doZoomEnd()});
		this._infowindowclose = GEvent.addListener(maps, 'infowindowclose', function() {wgt._doInfoClose()});
		this._maptypechanged = GEvent.addListener(maps, 'maptypechanged', function() {wgt._doMapTypeChanged()});
		
		//Tricky! 
		//Listen double click on the panes's parent!
		//@see _doDoubleClick_
		this.domListen_(n.firstChild.firstChild, "ondblclick", "doDoubleClick_");
	},
	_clearListeners: function() {
		if (this._moveend ) {
			GEvent.removeListener(this._moveend);
			this._moveend = null;
		}

		if (this._zoomend) {
			GEvent.removeListener(this._zoomend);
			this._zoomend = null;
		}

		if (this._infowindowclose) {
			GEvent.removeListener(this._infowindowclose);
			this._infowindowclose = null;
		}

		if (this._maptypechanged) {
			GEvent.removeListener(this._maptypechanged);
			this._maptypechanged = null;
		}

		var n = this.$n();
		if (n) this.domUnlisten_(n.firstChild.firstChild, "ondblclick", "doDoubleClick_");
	},
	_initGmaps: function(n) {
		var maps = this._gmaps = new GMap2(n);

		//init listeners
		this._initListeners(n);
		
		//set center and zoom
		maps.setCenter(new GLatLng(this._center[0], this._center[1]), this._zoom);
		
		this.setNormal(this._normal, {force:true}) //prepare map types
			.setHybrid(this._hybrid, {force:true})
			.setSatellite(this._satellite, {force:true})
			.setPhysical(this._physical, {force:true})
			.setMapType(this._mapType, {force:true}) //set initial map type
			.setShowLargeCtrl(this._showLargeCtrl, {force:true}) //prepare controls
			.setShowSmallCtrl(this._showSmallCtrl, {force:true})
			.setShowTypeCtrl(this._showTypeCtrl, {force:true})
			.setShowZoomCtrl(this._showZoomCtrl, {force:true})
			.setShowScaleCtrl(this._showScalCtrl, {force:true})
			.setShowOverviewCtrl(this._showOverviewCtrl, {force:true})
			.setContinuousZoom(this._continuousZoom, {force:true}) //other configuration
			.setDoubleClickZoom(this._doubleClickZoom, {force:true})
			.setScrollWheelZoom(this._scrollWheelZoom, {force:true})
			.setEnableDragging(this._enableDragging, {force:true})
			.setEnableGoogleBar(this._enableGoogleBar, {force:true});
		
		//prepare the MarkerManager (for efficient gmarker allocation)
		this._mm = gmaps.Gmarker.initMarkerManager(maps);
		
		//hide the MarkerManager first so gmarkers can be added in batch in #_initMapitems
		this._mm.hide();
		
		//init mapitems
		this._initMapitems();
		
		//show the MarkerManager now, that will refresh the gmarkers in batch
		this._mm.show();
		
		//watch the global event onSize/onShow
		zWatch.listen({onSize: this, onShow: this});
	},
	_clearGmaps: function() {
		this._clearMask();
		this._clearListeners();
		this._gmaps = this._curInfo = this._lctrl = this._sctrl = this._zctrl = this._tctrl = this._cctrl = this._octrl = null;
	},
	_initMask: function() {
		if (!this._mask) {
			this._mask = new zk.eff.Mask({anchor:this});
		}
	},
	_clearMask: function() {
		if (this._mask) {
			this._mask.destroy();
			delete this._mask;
		}
	},
	//zWatch//
	onSize: function() {
		this._resize(false);
	},
	onShow: function() {
		this._resize(true);
	}
},{//static
	//given Gmaps, pageXY, return relative xy as [x, y]
	pageXYToXY: function(gmaps, x, y) {
		var orgxy = zk(gmaps).revisedOffset();
		return [x - orgxy[0], y - orgxy[1]]; 
	},
	//given Gmaps, relative xy, return pageXY as [pageX, pageY]
  	xyToPageXY: function(gmaps, x, y) {
  		var orgxy = zk(gmaps).revisedOffset();
  		return [x + orgxy[0], y + orgxy[1]]; 
  	},
  	errormsg: '<p>To use <code>&lt;gmaps&gt;</code>, you have to specify the following statement in your page:</p>'
		+'<code>&lt;script content="zk.googleAPIkey='+"'key-assigned-by-google'"+'" /></code>' 
});
//register to be called when window.onunload. 
//jq(function(...)) tells to do this until html document is ready.
jq(function() {jq(window).unload(function(){if (GUnload) GUnload();})});
