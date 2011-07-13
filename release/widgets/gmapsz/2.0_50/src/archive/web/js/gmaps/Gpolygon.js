/* Gpolygon.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Mon Aug 17 18:30:42     2009, Created by henrichen
		
	Used with ZK 5.0 and later
}}IS_NOTE

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 3.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
gmaps.Gpolygon = zk.$extends(gmaps.Gpolyline, {
	$define: {
		fillColor: function(s) {
			this._rebindMapitem_();
		},
		outline: function(b) {
			this._rebindMapitem_();
		},
		fill: function(b) {
			this._rebindMapitem_();
		},
		fillOpacity: function(f) {
			this._rebindMapitem_();
		}
	},
	initMapitem_: function() {
		var opt = {color:this._color,weight:this._weight,opacity:this._opacity,
				points:this._pointsAndLevels[0],levels:this._pointsAndLevels[1],
				zoomFactor:this._numLevelsAndZoomFactor[1],
				numLevels:this._numLevelsAndZoomFactor[0]},
			arg = {polylines:[opt],fill:this._fill,color:this._fillColor,
				opacity:this._fillOpacity,outline:this._outline},
			gpolygon = new GPolygon.fromEncoded(arg);
		
		gpolygon._wgt = this;
		this.mapitem_ = gpolygon;
	},
	setRerender_: function(info) {
		this.$supers('prepareRerender_', arguments);
		this._fillColor = info.fillColor;
		this._outline = info.outline;
		this._fill = info.fill;
		this._fillOpacity = info.fillOpacity;
		
		this._rebindMapitem_();
	}
});
