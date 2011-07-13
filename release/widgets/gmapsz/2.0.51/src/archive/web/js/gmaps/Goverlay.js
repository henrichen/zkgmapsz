/* Goverlay.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Tue Aug 17 19:30:20     2009, Created by henrichen
		
	Used with ZK 5.0 and later
}}IS_NOTE

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 3.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
/**
 *  A skeletal implementation for Google Maps overlay widget.
 *  @see gmaps.Ginfo
 *  @see gmaps.Gmarker
 *  @see gmaps.Gpolyline
 *  @see gmaps.Gpolygon
 *  @see gmaps.Gimage
 *  @see gmaps.Gscreen
*/
gmaps.Goverlay = zk.$extends(zul.Widget, {
	mapitem_: null,
	
	gmaps: function() {
		return this.parent ? this.parent._gmaps : null;
	},
	redraw: function(out) {
		//do nothing
	},
	bindMapitem_: function() {
		if (!this.mapitem_) {
			this.initMapitem_();
			var maps = this.gmaps();
			if (maps)
				maps.addOverlay(this.mapitem_);
		}
	},
	unbindMapitem_: function() {
		var gpolyline = this.mapitem_;
		if (gpolyline) {
			gpolyline._wgt = null;
			this.mapitem_ = null;
			var maps = this.gmaps();
			if (maps)
				maps.removeOverlay(gpolyline);
		}
	},
	rebindMapitem_: function() {
		if (this.mapitem_) {
			this.unbindMapitem_();
			this.bindMapitem_();
		}
	},
	bind_: function(dt, skipper, after) {
		this.$supers(gmaps.Goverlay, 'bind_', arguments);
		this.bindMapitem_();
	},
	unbind_: function() { //server invalidate()
		this.$supers(gmaps.Goverlay, 'unbind_', arguments);
		this.unbindMapitem_();
	},
	beforeParentChanged_: function(p) { //detach()
		this.$supers(gmaps.Goverlay, 'beforeParentChanged_', arguments);
		if (!p) {
			this.unbindMapitem_();
		}
	}
});