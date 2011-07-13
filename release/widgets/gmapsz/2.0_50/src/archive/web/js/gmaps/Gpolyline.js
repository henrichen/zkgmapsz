/* Gpolyline.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Tue Aug 05 15:20:11     2009, Created by henrichen
		
	Used with ZK 5.0 and later
}}IS_NOTE

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 3.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
gmaps.Gpolyline = zk.$extends(gmaps.Goverlay, {
	$define: {
		pointsAndLevels: function(sa) {
			this.rebindMapitem_();
		},
		numLevelsAndZoomFactor: function(ia) {
			this.rebindMapitem_();
		},
		color: function(s) {
			this.rebindMapitem_();
		},
		weight: function(i) {
			this.rebindMapitem_();
		},
		opacity: function(f) {
			this.rebindMapitem_();
		}
	},
	initMapitem_: function() {
		var opt = {color:this._color,weight:this._weight,opacity:this._opacity,
				points:this._pointsAndLevels[0],levels:this._pointsAndLevels[1],
				zoomFactor:this._numLevelsAndZoomFactor[1],
				numLevels:this._numLevelsAndZoomFactor[0]},
			gpolyline = new GPolyline.fromEncoded(opt);
		
		gpolyline._wgt = this;
		this.mapitem_ = gpolyline;
	},
	prepareRerender_: function(info) {
		this._pointsAndLevels = info.pointsAndLevels;
		this._numLevelsAndZoomFactor = info.numLevelsAndZoomFactor;
		this._color = info.color;
		this._weight = info.weight;
		this._opacity = info.opacity;
	},
	setRerender_: function(info) {
		this.prepareRerender_(info);
		this.rebindMapitem_();
	}
});