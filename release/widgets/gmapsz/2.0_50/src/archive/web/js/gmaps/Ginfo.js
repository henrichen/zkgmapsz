/* Ginfo.js

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Tue Aug 04 11:50:41     2009, Created by henrichen
		
	Used with ZK 5.0 and later
}}IS_NOTE

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 3.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
gmaps.Ginfo = zk.$extends(gmaps.Goverlay, {
	$define: {
		anchor: function(c) {
			if (this.parent)
				this.parent.reopenInfo(this);
		},
		content: function(s) {
			if (this.parent)
				this.parent.reopenInfo(this);
		},
		open: function(b) {
			if (this.parent) {
				if (b)
					this.parent.openInfo(this);
				else if (this == this.parent._curInfo)
					this.parent.closeInfo();
			}
		}
	},
	clearOpen_: function() {
		this._open = false;
	},
	bindMapitem_: function() {
		if (this.parent && this._open)
			this.parent.openInfo(this);
	},
	unbindMapitem_: function() {
		if (this.parent && this == this.parent._curInfo)
			this.parent.closeInfo();
	}
});