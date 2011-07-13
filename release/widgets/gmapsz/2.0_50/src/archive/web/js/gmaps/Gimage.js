/* Gimage.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Tue Aug 18 11:40:36     2009, Created by henrichen
		
	Used with ZK 5.0 and later
}}IS_NOTE

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 3.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
gmaps.Gimage = zk.$extends(gmaps.Goverlay, {
	$define: {
		src: function(s) {
			this.rebindMapitem_();
		},
		swlat: function(f) {
			this.rebindMapitem_();
		},
		swlng: function(f) {
			this.rebindMapitem_();
		},
		nelat: function(f) {
			this.rebindMapitem_();
		},
		nelng: function(f) {
			this.rebindMapitem_();
		}
	},
	initMapitem_: function() {
		var sw = new GLatLng(this._swlat, this._swlng),
			ne = new GLatLng(this._nelat, this._nelng),
			bound = new GLatLngBounds(sw, ne),
			gground = new GGroundOverlay(this._src, bound);
		gground._wgt = this;
		this.mapitem_ = gground;
	},
	setRerender_: function(info) {
		this._src = info.src;
		this._swlat = info.swlat;
		this._swlng = info.swlng;
		this._nelat = info.nelat;
		this._nelng = info.nelng;
		
		this.rebindMapitem_();
	}
});