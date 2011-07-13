/* Gmarker.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Tue Aug 04 17:08:50     2009, Created by henrichen
		
	Used with ZK 5.0 and later
}}IS_NOTE

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 3.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
/**
 * The gmarker that can be overlay on the Google Maps.
 */
gmaps.Gmarker = zk.$extends(gmaps.Ginfo, {
	$define: {
		/** Returns the anchor point of the info window.
		 * @return double[] anchor[0] is latitude; anchor[1] is longitude.
		 */
		/** set the anchor point of the info window.
		 * @param double[] anchor anchor[0] is latitude; anchor[1] is longitude.
		 */
		anchor: function(c) {
			if (this.mapitem_) {
				var oldPoint = this.mapitem_.getLatLng(),
					newPoint = new GLatLng(c[0], c[1]);
				this.mapitem_.setLatLng(newPoint);
				if (this.parent) {
					this.parent._mm.onMarkerMoved_(this.mapitem_, oldPoint, newPoint); 
					this.parent._reopenInfo(this);
				}
			}
		},
		/**
		 * Returns the foreground image URL of the icon.
		 * @return String the iconImage URL
		 */
		/**
		 * Sets the foreground image URL of the icon. No operation if a null value.
		 * @param String iconImage the iconImage URL to set
		 */
		iconImage: function(s) {
	    	if (this.mapitem_)
	    		this.mapitem_.setImage(s);
		},
		/**
		 * Returns the shadow image URL of the icon.
		 * @return String the iconShadow image URL
		 */
		/**
		 * Sets the shadow image URL of the icon. No operation if a null value.
		 * @param String iconShadow the iconShadow URL to set
		 */
		iconShadow: function(s) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the icon size of this Gmarker.
		 * @return int[] size[0] is width, size[1] is height.
		 */
		/**
		 * Sets the icon size of this Gmarker.
		 * @param int[] size size[0] is width, size[1] is height.
		 */
		iconSize: function(d) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the icon shadow size of this Gmarker.
		 * @return int[] size[0] is width, size[1] is height.
		 */
		/**
		 * Sets the icon shadow size of this Gmarker.
		 * @param int[] size size[0] is width, size[1] is height.
		 */
		iconShadowSize: function(d) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the pixel coordinate relative to the top left corner of the icon 
		 * image at which this icon is anchored to the map. No operation if a value 
		 * less than -100.
		 * @return int[] xy[0] is x pixel coordinate; xy[1] is y pixel coordinate
		 */
		/**
		 * Sets the pixel coordinate relative to the top left corner of the icon 
		 * image at which this icon is anchored to the map. No operation if a value 
		 * less than -100.
		 * @param int[] xy xy[0] is x pixel coordinate; xy[1] is y pixel coordinate
		 */
		iconAnchor: function(c) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the pixel coordinate relative to the top left corner of the icon image 
		 * at which the info window is anchored to this icon. No operation if a value 
		 * less than -100.
		 * @return int[] xy[0] is x pixel coordinate; xy[1] is y pixel coordinate
		 */
		/**
		 * Sets the pixel coordinate relative to the top left corner of the icon image 
		 * at which the info window is anchored to this icon. No operation if a value 
		 * less than -100.
		 * @param int[] xy xy[0] is x pixel coordinate; xy[1] is y pixel coordinate
		 */
		iconInfoAnchor: function(c) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the URL of the foreground icon image used for printed maps. It must be the same size 
		 * as the main icon image given by image. 
		 * No operation if a null value.  
		 * @return String the iconPrintImage URL
		 */
		/**
		 * Sets the URL of the foreground icon image used for printed maps. It must be the same size 
		 * as the main icon image given by image. 
		 * No operation if a null value.  
		 * @param String iconPrintImage the iconPrintImage URL
		 */
		iconPrintImage: function(s) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the URL of the foreground icon image used for printed maps in Firefox/Mozilla. 
		 * It must be the same size as the main icon image given by image. 
		 * No operation if a null value. 
		 * @return String the iconMozPrintImage URL
		 */
		/**
		 * Sets the URL of the foreground icon image used for printed maps in Firefox/Mozilla. 
		 * It must be the same size as the main icon image given by image. 
		 * No operation if a null value. 
		 * @param String iconMozPrintImage the iconMozPrintImage URL
		 */
		iconMozPrintImage: function(s) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the URL of the shadow image used for printed maps. It should be a 
		 * GIF image since most browsers cannot print PNG images. No operation 
		 * if a null value.
		 * @return String the iconPrintShadow URL
		 */
		/**
		 * Sets the URL of the shadow image used for printed maps. It should be a 
		 * GIF image since most browsers cannot print PNG images. No operation 
		 * if a null value.
		 * @param String iconPrintShadow the iconPrintShadow URL
		 */
		iconPrintShadow: function(s) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the URL of a virtually transparent version of the foreground 
		 * icon image used to capture click events in Internet Explorer. This 
		 * image should be a 24-bit PNG version of the main icon image with 1% 
		 * opacity, but the same shape and size as the main icon. No operation 
		 * if a null value.
		 * @return String iconTransparent the iconTransparent URL
		 */
		/**
		 * Sets the URL of a virtually transparent version of the foreground 
		 * icon image used to capture click events in Internet Explorer. This 
		 * image should be a 24-bit PNG version of the main icon image with 1% 
		 * opacity, but the same shape and size as the main icon. No operation 
		 * if a null value.
		 * @param String iconTransparent the iconTransparent URL
		 */
		iconTransparent: function(s) {
			this.rebindMapitem_();
		},
		/**
		 * Returns an comma delimited integers representing the x/y coordinates of the image map we 
		 * should use to specify the click-able part of the icon image in browsers other than 
		 * Internet Explorer. No operation if a null value. 
		 * @return String an comma delimited integers representing the x/y coordinates of the image map we 
		 * should use to specify the click-able part of the icon image
		 */
		/**
		 * Sets an comma delimited integers representing the x/y coordinates of the image map we 
		 * should use to specify the click-able part of the icon image in browsers other than 
		 * Internet Explorer. No operation if a null value. 
		 * @param String iconImageMap an comma delimited integers representing the x/y coordinates of the image map we 
		 * should use to specify the click-able part of the icon image
		 */
		iconImageMap: function(s) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the distance pixels in which a marker will visually "rise" vertically when dragged. 
		 * @return int the distance pixels in which a marker will visually "rise" vertically when dragged. 
		 */
		/**
		 * Sets the distance pixels in which a marker will visually "rise" vertically when dragged. 
		 * No operation if a value less than 0.
		 * @param int iconMaxHeight the distance pixels in which a marker will visually "rise" vertically when dragged. 
		 */
		iconMaxHeight: function(i) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the cross image URL when an icon is dragged. No operation if a null value.
		 * @return String the iconDragCrossImage URL
		 */
		/**
		 * Sets the cross image URL when an icon is dragged. No operation if a null value.
		 * @param String iconDragCrossImage the iconDragCrossImage URL
		 */
		iconDragCrossImage: function(s) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the pixel size of the cross image when an icon is dragged. 
		 * No operation if a value less than 0. 
		 * @return int[] size[0] is width; size[1] is height.
		 */
		/**
		 * Sets the pixel size of the cross image when an icon is dragged. 
		 * No operation if a value less than 0. 
		 * @param int[] size size[0] is width; size[1] is height.
		 */
		iconDragCrossSize: function(d) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the pixel coordinate offsets (relative to the iconAnchor) of the 
		 * cross image when an icon is dragged. No operation if a value less than -100.
		 * @param int[] xy[0] is the x coordinate, xy[1] is the y coordinate
		 */
		/**
		 * Sets the pixel coordinate offsets (relative to the iconAnchor) of the 
		 * cross image when an icon is dragged. No operation if a value less than -100.
		 * @param int[] xy xy[0] is the x coordinate, xy[1] is the y coordinate
		 */
		iconDragCrossAnchor: function(c) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the maximum visible zoom level of this Gmarker (default to 17).
		 * @return int maximum visible zoom level
		 */
		/**
		 * Sets the maximum visible zoom level of this Gmarker (default to 17).
		 * @param int zoom maximum visible zoom level
		 */
		maxzoom: function(i) {
			this.rebindMapitem_();
		},
		/**
		 * Returns the minimum visible zoom level of this Gmarker (default to 0).
		 * @return int minimum visible zoom level
		 */
		/**
		 * Sets the minmum visible zoom level of this Gmarker  (default to 0).
		 * @param int zoom minimum visible zoom level
		 */
		minzoom: function(i) {
			this.rebindMapitem_();
		},
		/**
		 * Returns whether this Gmarker is enabled to drag "INSIDE" the maps; default is true.
		 * Note that this property takes precedence than {#link #setDraggable}.
		 * If you want to drag Gmarker as other ZK widgets (that is, you can
		 * drag the Gmarker "OUTSIDE" the maps), you have to set this property 
		 * to "false".
		 * @return boolean whether enable dragging this Gmarker inside the maps.
		 */
		/**
		 * Sets whether this Gmarker is enabled to drag "INSIDE" the maps; default is true.
		 * Note that this property takes precedence than {#link #setDraggable}.
		 * If you want to drag Gmarker as other ZK widgets (that is, you can
		 * drag the Gmarker "OUTSIDE" the maps), you have to set this property 
		 * to "false".
		 * @param boolean b whether enable dragging this Gmarker inside the maps.
		 */
		draggingEnabled: function(b) {
			this._initDraggable();
		},
		draggable: function(v) {
			this._initDraggable();
		}
	},
	gmarker: function() {
		return this.mapitem_;
	},
	bindMapitem_: function() {
		if (!this.mapitem_) {
			this.initMapitem_();
			
			//binding if exists Gmaps
			if (this.parent) {
				this.parent._mm.addMarker(this.mapitem_, this._minzoom, this._maxzoom);
			}
		}
	},
	initMapitem_: function() {
		var gicon = new GIcon(G_DEFAULT_ICON),
			iimg = this._iconImage,
			isdw = this._iconShadow,
			isz = this._iconSize,
			isdwsz = this._iconShadowSize,
			ianch = this._iconAnchor,
			iinfanch = this._iconInfoAnchor,
			iprtimg = this._iconPrintImage,
			imozprtimg = this._iconMozPrintImage,
			iprtsdw = this._iconPrintShadow,
			itrpt = this._iconTransparent,
			iimgmap = this._iconImageMap,
			imaxhgt = this._iconMaxHeight,
			idrgcrsimg = this._iconDragCrossImage,
			idrgcrssz = this._iconDragCrossSize,
			idrgcrsanch = this._iconDragCrossAnchor;
		
		if (iimg) gicon.image = iimg;
		if (isdw) gicon.shadow = isdw;
		if (isz) gicon.iconSize = new GSize(isz[0], isz[1]);
		if (isdwsz) gicon.shadowSize = new GSize(isdwsz[0], isdwsz[1]);
		if (ianch) gicon.iconAnchor = new GPoint(ianch[0], ianch[1]);
		if (iinfanch) gicon.infoWindowAnchor = new GPoint(iinfanch[0], iinfanch[1]);
		if (iprtimg) gicon.printImage = iprtimg;
		if (imozprtimg) gicon.mozPrintImage = imozprtimg;
		if (iprtsdw) gicon.printShadow = iprtsdw;
		if (itrpt) gicon.transparent = itrpt;
		if (imaxhgt) gicon.maxHeight = parseInt(imaxhgt);
		if (idrgcrsimg) gicon.dragCrossImage = idrgcrsimg;
		if (idrgcrssz) gicon.dragCrossSize = new GSize(idrgcrssz[0], idrgcrssz[1]);
		if (idrgcrsanch) gicon.dragCrossAnchor = new GPoint(idrgcrsanch[0], idrgcrsanch[1]);
		
		var opt = {icon: gicon, draggable: true},
			anch = this._anchor,
			title = this._tooltiptext;
		
		if (title) opt["title"] = title;
		
		var gmarker = new GMarker(new GLatLng(anch[0], anch[1]), opt);
		gmarker._wgt = this;
		this.mapitem_ = gmarker;
	},
	unbindMapitem_: function() {
		var gmarker = this.mapitem_;
		if (gmarker) {
			if (this.parent) { 
				this.parent._mm.removeMarker(gmarker);
				this.parent.tryFireCloseInfo_(this);
			}
			gmarker._wgt = null;
			this.mapitem_ = null;
		}
	},
	getDragNode: function() {
		return this._icon;
	},
	getDragOptions_: function() {
		return {handle: this._area};
	},
	initDrag_: function() { //must !isDraggingEnabled() to initDrag_
		if (!this._draggingEnabled && this.mapitem_ && this._icon) { 
			this.$supers(gmaps.Gmarker, 'initDrag_', arguments);
		}
	},
	doClick_: function(evt) {
		//calling this to correct the popup submenu not auto closed issue
		zk.Widget.mimicMouseDown_(this);
		this.$supers(gmaps.Gmarker, 'doClick_', arguments);
	},
	doRightClick_: function (evt) {
		//Google Maps API will not bubble up the right-click-on-gmarker
		//domEvent to container(Gmaps#_gmaps) so we add own listener
		//to handle such cases. 
		//@see Gmarker#_initListeners

		//calling this to correct the context submenu not auto closed issue
		zk.Widget.mimicMouseDown_(this);
		
		//when right-click-on-gmarker, evt.data will be undefined.
		//so context#onOpen and doMapRightClick not working properly
		evt.data = zk.copy(evt.data, evt.domEvent.mouseData());
		evt.pageX = evt.pageX || evt.data.pageX;
		evt.pageY = evt.pageY || evt.data.pageY;
		this.$supers(gmaps.Gmarker, 'doRightClick_', arguments);
	},
	onDrop_: function (drag, evt) {
		var xy = gmaps.Gmaps.pageXYToXY(this.parent, evt.pageX, evt.pageY),
			latlng = this.gmaps().fromContainerPixelToLatLng(new GPoint(xy[0],xy[1])),
			data = zk.copy({dragged: drag.control,lat:latlng.lat(),lng:latlng.lng(),x:xy[0],y:xy[1]}, evt.data);
		this.fire('onMapDrop', data, null, 38);
	},
	//private//
	_initDraggable: function() {
		if (this.mapitem_) {
	    	if (this._draggingEnabled) { //drag inside maps 
	    		this.mapitem_.enableDragging();
	    	 	if (this._draggable && this._draggable != 'false')
	    	 		this.cleanDrag_();
	    	} else {
	    		this.mapitem_.disableDragging();
	    		if (this._draggable && this._draggable != 'false')
	    			this.initDrag_();
		   	}
		}
	},
	_doDragstart: function(latlng) {
		this._dragstarted = latlng; //start dragging this gmarker, store original latlng
	},
	_doPreDragend: function(evt) {
		//@see Gmaker.bindMapitem_
		//tricky! 
		//When dragging a marker inside the map and drop on the map,
		//prepare zk.Event to fire onMapDrop in _doDragend
		//then the #_doDragend method
		if (this._dragstarted)
			this._zkEvt = evt;
		//@see #_doDragend
	},
	_doDragend: function(latlng) {
		if (this._dragstarted) {
			//update the MarkerManager managing info to new point
			this.parent._mm.updateMarker(this.mapitem_, this._dragstarted, latlng); 
			this._dragstarted = null;
		}
		
		//reopen the info if this Gmarker is the current info
		this.parent._reopenInfo(this);
		
		//When dragging a marker inside the map and drop on the map
		//#_doPreDragend was called first, then this method(in some special 
		//case, it will miss.  DON'T know how to solve this yet.)
		//so we mainly try to get the keys of the event only, 
		var data = this._zkEvt ? this._zkEvt.data : {which:1}, //for keys only
			opts = this._zkEvt ? this._zkEvt.opts : {},
			domEvent = this._zkEvt ? this._zkEvt.domEvent : {},
			xy = this.gmaps().fromLatLngToContainerPixel(latlng),
			pageXY = gmaps.Gmaps.xyToPageXY(this.parent, xy.x, xy.y),
			//add information prepared by the _doPreDragend
			data = zk.copy(data, {lat:latlng.lat(),lng:latlng.lng(),dragged:this,x:xy.x,y:xy.y,pageX:pageXY[0],pageY:pageXY[1]});

		this._zkEvt = null;
		this.parent.fireX(new zk.Event(this.parent, 'onMapDrop', data, opts, domEvent));
		
		//after onMapDrop event, an unwanted onMapClick will be fired, shall block it
		//@see Gmaps#doClick_
		this._setAfterDragend(true);
	},
	_setAfterDragend: function(b) {
		this._afterDragend = b;
	},
	_isAfterDragend: function() {
		return this._afterDragend;
	},
	_initListeners: function() {
		var gmapswgt = this.parent, //Gmaps
			gmarker = this.mapitem_,
			gmarkerwgt = this;
		this._dragstart = GEvent.addListener(this.mapitem_, "dragstart", function(latlng) {gmarkerwgt._doDragstart(latlng);});
		this._dragend = GEvent.addListener(this.mapitem_, "dragend", function(latlng) {gmarkerwgt._doDragend(latlng);});

		if (this._area) {
			//Google Maps API will not bubble up the right-click-on-gmarker
			//and double-click-on-gmarker, so we add own dom listener here to 
			//handle such cases.   
			//Gmarker#doDoubleClick_ listens to area's ondblclick event
			this.domListen_(this._area, "ondblclick", "doDoubleClick_");
			//Gmarker#doRightClick_ listens to area's oncontextmenu event
			this.domListen_(this._area, "oncontextmenu", "doRightClick_");
			//Gmarker#_doPreDragend listens to area's onmouseup event
			this.domListen_(this._area, "onmouseup", "_doPreDragend");
			//Gmarker#_doPreDragend listens to area's onmouseout event
			this.domListen_(this._area, "onmouseout", "_doPreDragend");
		}
	},
	_clearListeners: function() {
		if (this._dragstart) {
			GEvent.removeListener(this._dragstart);
			this._dragstart = null;
		}
		if (this._dragend) {
			GEvent.removeListener(this._dragend);
			this._dragend = null;
		}
		if (this._area) {
			this.domUnlisten_(this._area, "ondblclick", "doDoubleClick_");
			this.domUnlisten_(this._area, "oncontextmenu", "doRightClick_");
			this.domUnlisten_(this._area, "onmouseup", "_doPreDragend");
			this.domUnlisten_(this._area, "onmouseout", "_doPreDragend");
		}
	},
	setRerender_: function(info) {
		this._minzoom = info.minzoom;
		this._maxzoom = info.maxzoom;
		if (info.iconShadow) this._iconShadow = info.iconShadow;
		if (info.iconSize) this._iconSize = info.iconSize;
		if (info.iconShadowSize) this._iconShadowSize = info.iconShadowSize;
		if (info.iconAnchor) this._iconAnchor = info.iconAnchor;
		if (info.iconInfoAnchor) this._iconInfoAnchor = info.iconInfoAnchor;
		if (info.iconPrintImage) this._iconPrintImage = info.iconPrintImage;
		if (info.iconMozPrintImage) this._iconMozPrintImage = info.iconMozPrintImage;
		if (info.iconPrintShadow) this._iconPrintShadow = info.iconPrintShadow;
		if (info.iconTransparent) this._iconTransparent = info.iconTransparent;
		if (info.iconImageMap) this._iconImageMap = info.iconImageMap;
		if (info.iconMaxHeight) this._iconMaxHeight = info.iconMaxHeight;
		if (info.iconDragCrossImage) this._iconDragCrossImage = info.iconDragCrossImage;
		if (info.iconDragCrossSize) this._iconDragCrossSize = info.iconDragCrossSize;
		if (info.iconDragCrossAnchor) this._iconDragCrossAnchor = info.iconDragCrossAnchor;
		
		this.rebindMapitem_();
	},
	_tryOpenInfoIfInView: function() {
		var gmaps = this.parent;
		if (gmaps && gmaps._curInfo === this && this._area) {
			if (this._open)
				gmaps.openInfo(this);
			else {//it might be closed by MarkerManger#removeOverlay_ when move out of bound
				var b = gmaps._gmaps.getBounds(),
					anchor = this.getAnchor(),
					latlng = new GLatLng(anchor[0], anchor[1]);
				if (b.containsLatLng(latlng)) //in view
					gmaps._reopenInfo(this);
			}
		}
	}
},{//static
	initMarkerManager: function(maps) {
		var me = new MarkerManager(maps);
		//override addOverlay_ callback
		me.addOverlay_ = function(marker) {
			var wgt = marker._wgt; //Gmarker widget
			if (wgt._dragstarted || me.isHidden()) return; //under dragging or hidden, DO NOT bind marker
			
			//binding if exists gmaps
			var maps = wgt.gmaps(),
				gmarker = wgt.mapitem_;
			maps.addOverlay(gmarker);
			me.shownMarkers_++;
			
			//Tricky! the 'gmimap' is the key
			//locate the mouse event "area" of this gmarker(must after addOverly())
			var pane1 = maps.getPane(G_MAP_MARKER_MOUSE_TARGET_PANE);
			
			//in IE, pane1.lastChild is the marker area; 
			//in FF, pane1.lastChild is the gmimap which contains marker area
			wgt._area = pane1.lastChild; 
			if (!wgt._area.id || !wgt._area.id.startsWith("mtgt_unnamed_"))
				wgt._area = wgt._area.firstChild;
			
			//bind Google Maps click area id to Gmarker widget
			wgt.extraBind_(wgt._area.id, true);
			
			//Tricky!
			//locate the marker's icon image
			//in IE, pane2.lastChild.previousSibling is the marker image
			//in FF, pane2.lastChild is the marker image
			var pane2 = maps.getPane(G_MAP_MARKER_PANE);
			wgt._icon = pane2.lastChild;
			if (wgt._icon.height == 0 || wgt._icon.width == 0) {
				wgt._icon = wgt._icon.previousSibling;
			}
			
			//init draggable (which handle Gmarker draging inside/outside Gmaps)
			wgt._initDraggable();

			//init listeners
			wgt._initListeners();
			
			//open or reopen the info
			wgt._tryOpenInfoIfInView();
		};
		
		//override removeOverlay_ callback
		me.removeOverlay_ = function(marker) {
			var wgt = marker._wgt; //Gmarker widget
			if (wgt._dragstarted) return; //under dragging, DO NOT unbind marker
			
			var maps = wgt.gmaps();
			wgt._clearListeners();
			wgt.extraBind_(wgt._area.id, false);
			wgt.parent.tryCloseInfo_(wgt); //try to close the info window 
			maps.removeOverlay(marker);
			me.shownMarkers_--;
			wgt._area = null;
		};
		return me;
	}
});