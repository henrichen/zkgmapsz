/* Gscreen.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Tue Aug 18 11:21:14     2009, Created by henrichen
		
	Used with ZK 5.0 and later
}}IS_NOTE

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 3.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
gmaps.Gscreen = zk.$extends(gmaps.Goverlay, {
	$define: {
		src: function(s) {
			this.rebindMapitem_();
		},
		screenX: function(s) {
			this.rebindMapitem_();
		},
		screenY: function(s) {
			this.rebindMapitem_();
		},
		offsetX: function(s) {
			this.rebindMapitem_();
		},
		offsetY: function(s) {
			this.rebindMapitem_();
		},
		width: function(s) {
			this.rebindMapitem_();
		},
		height: function(s) {
			this.rebindMapitem_();
		}
	},
	initMapitem_: function() {
		var sxy = this._topoint(this._screenX, this._screenY),
			oxy = this._topoint(this._offsetX, this._offsetY),
			sz = this._tosize(this._width, this._height),
			gscreen = new GScreenOverlay(this._src, sxy, oxy, sz);
		
		gscreen._wgt = this;
		this.mapitem_ = gscreen;
	},
	//private
	_tospoint: function(x) {
		var ix, xu;
		if (!x.endsWith("%")) {
			if (x.endsWith("px"))
				x = x.substring(0, x.length() - 2);
			ix = parseInt(x);
			xu = "pixels";
		} else {
			ix = parseFloat(x) / 100;
			xu = "fraction";
		}
		return [ix, xu];
	},
	_topoint: function(x, y) {
		var xp = _tospoint(x),
			yp = _tospoint(y);
		return new GScreenPoint(xp[0], yp[0], xp[1], yp[1]);
	},
	_tosize: function(w, h) {
		var wp = _tospoint(w),
			hp = _tospoint(h);
		return new GScreenSize(wp[0], hp[0], wp[1], hp[1]);
	},
	setRerender_: function(info) {
		this._src = info.src;
		this._screenX = info.screenX;
		this._screenY = info.screenY;
		this._offsetX = info.offsetX;
		this._offsetY = info.offsetY;
		this._width = info.width;
		this._height = info.height;
		
		this.rebindMapitem_();
	}
});