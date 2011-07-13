/* Gmaps.java

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Thu Oct 12 16:35:20     2006, Created by henrichen
}}IS_NOTE

Copyright (C) 2006 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
package org.zkoss.gmaps;
import org.zkoss.lang.Objects;
import org.zkoss.xml.HTMLs;

import org.zkoss.zk.ui.AbstractComponent;
import org.zkoss.zk.ui.UiException;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.HtmlBasedComponent;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zk.au.Command;

import java.util.Iterator;


/**
 * The component used to represent
 * &lt;a href="http://www.google.com/apis/maps/"&gt;Google Maps&lt;/a&gt;
 *
 * @author henrichen
 * @version $Revision: 1.6 $ $Date: 2006/03/31 08:38:55 $
 */
public class Gmaps extends HtmlBasedComponent {
	private transient Ginfo _oneinfo; //the only one Ginfo child of this Gmaps.
	private transient Ginfo _info; //current opened info window, null means none is open.

	private double _lat = 37.4419;
	private double _lng = -122.1419;
	private int _zoom = 13;
	private boolean _large;
	private boolean _small;
	private boolean _type;
	private boolean _smallZoom;
	private boolean _scale;
	private boolean _overview;
	
	private boolean _normal = true;
	private boolean _satellite = true;
	private boolean _hybrid = true;
	private boolean _physical;
	
	private String _mapType = "normal";
	private boolean _enableDragging = true;
	private boolean _continuousZoom;
	private boolean _doubleClickZoom;
	private boolean _scrollWheelZoom;
	private boolean _enableGoogleBar;
	
	private double _swlat;
	private double _swlng;
	private double _nelat;
	private double _nelng;


	/** Sets the center of the Google Maps.
	 * @param lat latitude of the Google Maps center
	 * @param lng longitude of the Google Maps center
	 */
	public void setCenter(double lat, double lng) {
		boolean update = false;
		if (lat != _lat) {
			_lat = lat;
			update = true;
		}
		if (lng != _lng) {
			_lng = lng;
			update = true;
		}

		if (update) {
			smartUpdate("z.center", getCenter());
		}
	}

	/** Sets the current latitude of the Maps center.
	 * @param lat latitude of the Google Maps center
	 */
	public void setLat(double lat) {
		if (lat != _lat) {
			_lat = lat;
			smartUpdate("z.center", getCenter());
		}
	}
	
	/** Returns the current latitude of the Maps center.
	 * @return the current latitude of the Maps center.
	 */
	public double getLat() {
		return _lat;
	}
	
	/** Sets the current longitude of the Maps center.
	 * @param lng the current longitude of the Maps center.
	 */
	public void setLng(double lng) {
		if (lng != _lng) {
			_lng = lng;
			smartUpdate("z.center", getCenter());
		}
	}
	
	/** Returns the currrent longitude of the Maps center.
	 * @return the currrent longitude of the Maps center.
	 */
	public double getLng() {
		return _lng;
	}
	
	/** Returns the Maps center in String form lat,lng; used by component developers
	 * only.
	 */
	private String getCenter() {
		return ""+_lat+","+_lng;
	}

	/**
	 * Returns the bounded south west latitude.
	 * @return the bounded south west latitude.
	 * @since 2.0_8
	 */
	public double getSwLat() {
		return _swlat;
	}
	/**
	 * Returns the bounded south west longitude.
	 * @return the bounded south west longitude.
	 * @since 2.0_8
	 */
	public double getSwLng() {
		return _swlng;
	}
	/**
	 * Returns the bounded north east latitude.
	 * @return the bounded north east latitude.
	 * @since 2.0_8
	 */
	public double getNeLat() {
		return _nelat;
	}
	/**
	 * Returns the bounded north east longitude.
	 * @return the bounded north east longitude.
	 * @since 2.0_8
	 */
	public double getNeLng() {
		return _nelng;
	}

	/** Pan to the new center of the Google Maps.
	 * @param lat latitude of the Google Maps center
	 * @param lng longitude of the Google Maps center
	 */
	public void panTo(double lat, double lng) {
		boolean update = false;
		if (lat != _lat) {
			_lat = lat;
			update = true;
		}
		if (lng != _lng) {
			_lng = lng;
			update = true;
		}
		
		if (update) {
			smartUpdate("z.panTo", getCenter());
		}
	}
	
	/** Sets zoom level.
	 * @param zoom the zoom level (0-18)
	 */
	public void setZoom(int zoom) {
		if (zoom != _zoom) {
			_zoom = zoom;
			smartUpdate("z.zoom", ""+_zoom);
		}
	}
	
	/** Returns the current zoom level.
	 * @return the current zoom level.
	 */
	public int getZoom() {
		return _zoom;
	}
	
	/** Sets whether show the large Google Maps Control.
	 * @param b true to show the large Google Maps Control.
	 */
	public void setShowLargeCtrl(boolean b) {
		if (_large == b) {
			return;
		}
		_large = b;
		if (b) {
			setShowSmallCtrl(false);
			setShowZoomCtrl(false);
		}
		smartUpdate("z.lctrl", ""+b);
	}
	
	/** Returns whether show the large Google Maps Control.
	 * @return whether show the large Google Maps Control.
	 */
	public boolean isShowLargeCtrl() {
		return _large;
	}
	
	/** Sets whether show the small Google Maps Control.
	 * @param b true to show the small Google Maps Control.
	 */
	public void setShowSmallCtrl(boolean b) {
		if (_small == b) {
			return;
		}
		_small = b;
		if (b) {
			setShowLargeCtrl(false);
			setShowZoomCtrl(false);
		}
		smartUpdate("z.sctrl", ""+b);		
	}
	
	/** Returns whether show the large Google Maps Control.
	 * @return whether show the large Google Maps Control.
	 */
	public boolean isShowSmallCtrl() {
		return _small;
	}
	
	/** Sets whether show the small zoom Google Maps Control.
	 * @param b true to show the small zoom Google Maps Control.
	 * @since 2.0_7
	 */
	public void setShowZoomCtrl(boolean b) {
		if (_smallZoom == b) {
			return;
		}
		_smallZoom = b;
		if (b) {
			setShowLargeCtrl(false);
			setShowSmallCtrl(false);
		}
		smartUpdate("z.zctrl", ""+b);		
	}
	
	/** Returns whether show the small zoom Google Maps Control.
	 * @return whether show the small zoom Google Maps Control.
	 * @since 2.0_7
	 */
	public boolean isShowZoomCtrl() {
		return _smallZoom;
	}
	
	/** Sets whether show the Google Maps type Control.
	 * @param b true to show the Google Maps type Control.
	 */
	public void setShowTypeCtrl(boolean b) {
		if (_type == b) {
			return;
		}
		_type = b;
		smartUpdate("z.tctrl", ""+b);
	}

	/** Returns whether show the Google Maps type Control.
	 * @return whether show the Google Maps type Control.
	 */
	public boolean isShowTypeCtrl() {
		return _type;
	}
	
	/** Sets whether show the Google Maps scale Control.
	 * @param b true to show the Google Maps scale Control.
	 * @since 2.0_7
	 */
	public void setShowScaleCtrl(boolean b) {
		if (_scale == b) {
			return;
		}
		_scale = b;
		smartUpdate("z.cctrl", ""+b);
	}

	/** Returns whether show the Google Maps scale Control, default to false.
	 * @return whether show the Google Maps scale Control.
	 * @since 2.0_7
	 */
	public boolean isShowScaleCtrl() {
		return _scale;
	}
	
	/** Sets whether show the Google Maps overview Control, default to false.
	 * @param b whether show the Google Maps overview Control.
	 * @since 2.0_7
	 */
	public void setShowOverviewCtrl(boolean b) {
		if (_overview == b) {
			return;
		}
		_overview = b;
		smartUpdate("z.octrl", ""+b);
	}

	/** Returns whether show the Google Maps overview Control, default to false.
	 * @return whether show the Google Maps overview Control.
	 * @since 2.0_7
	 */
	public boolean isShowOverviewCtrl() {
		return _overview;
	}

	/** Sets whether support normal map, default to true.
	 * @param b whether support normal map, default to true.
	 * @since 2.0_7
	 */
	public void setNormal(boolean b) {
		if (_normal != b) {
			if (!b && "normal".equals(_mapType)) {
				if (isHybrid()) setMapType("hybrid");
				else if (isSatellite()) setMapType("satellite");
				else if (isPhysical()) setMapType("physical");
				else return; //cannot do it if no more map!
			}
			_normal = b;
			smartUpdate("z.nmap", b);
		}
	}
	
	/** Returns whether support normal map, default to true.
	 * @return whether support normal map.
	 * @since 2.0_7
	 */
	public boolean isNormal() {
		return _normal;
	}
	
	/** Sets whether support satellite map, default to true.
	 * @param b whether support satellite map, default to true.
	 * @since 2.0_7
	 */
	public void setSatellite(boolean b) {
		if (_satellite != b) {
			if (!b && "satellite".equals(_mapType)) {
				if (isNormal()) setMapType("normal");
				else if (isHybrid()) setMapType("hybrid");
				else if (isPhysical()) setMapType("physical");
				else return; //cannot do it if no more maps!
			}
			_satellite = b;
			smartUpdate("z.smap", b);
		}
	}
	
	/** Returns whether support satellite map, default to true.
	 * @return whether support satellite map.
	 * @since 2.0_7
	 */
	public boolean isSatellite() {
		return _satellite;
	}
	
	/** Sets whether support hybrid map, default to true.
	 * @param b whether support hybrid map, default to true.
	 * @since 2.0_7
	 */
	public void setHybrid(boolean b) {
		if (_hybrid != b) {
			if (!b && "hybrid".equals(_mapType)) {
				if (isNormal()) setMapType("normal");
				else if (isSatellite()) setMapType("satellite");
				else if (isPhysical()) setMapType("physical");
				else return; //cannot do it if no more maps!
			}
			_hybrid = b;
			smartUpdate("z.hmap", b);
		}
	}
	
	/** Returns whether support hybrid map, default to true.
	 * @return whether support hybrid map.
	 * @since 2.0_7
	 */
	public boolean isHybrid() {
		return _hybrid;
	}
	
	/** Sets whether support physical map, default to false.
	 * @param b whether support physical map, default to false.
	 * @since 2.0_7
	 */
	public void setPhysical(boolean b) {
		if (_physical != b) {
			if (!b && "physical".equals(_mapType)) {
				if (isNormal()) setMapType("normal");
				else if (isHybrid()) setMapType("hybrid");
				else if (isSatellite()) setMapType("satellite");
				else return; //cannot do it if no more maps!
			}
			_physical = b;
			smartUpdate("z.pmap", b);
		}
	}
	
	/** Returns whether support physical map, default to false.
	 * @return whether support physical map, default to false.
	 * @since 2.0_7
	 */
	public boolean isPhysical() {
		return _physical;
	}
	
	/**
	 * Get the current Map Type.
	 * @return the current Map Type.
	 */
	public String getMapType() {
		return _mapType;
	}
	
	/** 
	 * Set the map type (normal, satellite, hybrid, physical), default is normal.
	 * This implementation always set since we don't know what the current MapType is in
	 * browser side.
	 * @param mapType (normal, satellite, hybrid, physical), default is normal.
	 */
	public void setMapType(String mapType) {
		if ("normal".equals(mapType)) {
			setNormal(true);
		} else if ("satellite".equals(mapType)) {
			setSatellite(true);
		} else if ("hybrid".equals(mapType)) {
			setHybrid(true);
		} else if ("physical".equals(mapType)) {
			setPhysical(true);
		}
		_mapType = mapType;
		smartUpdate("z.mt", mapType);
	}

	/** Sets whether enable dragging maps by mouse, default to true.
	 * @param b true to enable dragging maps by mouse.
	 * @since 2.0_7
	 */
	public void setEnableDragging(boolean b) {
		if (_enableDragging != b) {
			_enableDragging = b;
			smartUpdate("z.dg", ""+b);
		}
	}
	
	/** Returns whether enable dragging maps by mouse, default to true.
	 * @return true to enable dragging maps by mouse.
	 * @since 2.0_7
	 */
	public boolean isEnableDragging() {
		return _enableDragging;
	}
	
	/** Sets whether enable continuous zoom effects, default to false.
	 * @param b true to enable continuous zoom effects.
	 * @since 2.0_7
	 */
	public void setContinuousZoom(boolean b) {
		if (_continuousZoom != b) {
			_continuousZoom = b;
			smartUpdate("z.cz", ""+b);
		}
	}
	
	/** Returns whether enable continuous zoom effects, default to false.
	 * @return true to enable continuous zoom effects.
	 * @since 2.0_7
	 */
	public boolean isContinuousZoom() {
		return _continuousZoom;
	}
	
	/** Sets whether enable zoom in-out via mouse double click, default to false.
	 * @param b true to enable zoom in-out via mouse double clilck.
	 * @since 2.0_7
	 */
	public void setDoubleClickZoom(boolean b) {
		if (_doubleClickZoom != b) {
			_doubleClickZoom = b;
			smartUpdate("z.dz", ""+b);
		}
	}
	
	/** Returns whether enable zoom in-out via mouse double click, default to false.
	 * @return true to enable zoom in-out via mouse double clilck.
	 * @since 2.0_7
	 */
	public boolean isDoubleClickZoom() {
		return _doubleClickZoom;
	}
	
	/** Sets whether enable zoom in-out via mouse scroll wheel, default to false.
	 * @param b true to enable zoom in-out via mouse scroll wheel.
	 * @since 2.0_7
	 */
	public void setScrollWheelZoom(boolean b) {
		if (_scrollWheelZoom != b) {
			_scrollWheelZoom = b;
			smartUpdate("z.wz", ""+b);
		}
	}
	
	/** Returns whether enable zoom in-out via mouse scroll wheel, default to false.
	 * @return true to enable zoom in-out via mouse scroll wheel.
	 * @since 2.0_7
	 */
	public boolean isScrollWheelZoom() {
		return _scrollWheelZoom;
	}

	/** Sets whether show the Google Search Bar on the Map, default to false.
	 * @param b true to show the Google Search Bar
	 * @since 2.0_7
	 */
	public void setEnableGoogleBar(boolean b) {
		if (_enableGoogleBar != b) {
			_enableGoogleBar = b;
			smartUpdate("z.gb", ""+b);
		}
	}

	/** Returns whether show the Google Search Bar on the Map, default to false.
	 * @return true if show the Google Search Bar.
	 * @since 2.0_7
	 */
	public boolean isEnableGoogleBar() {
		return _enableGoogleBar;
	}
	
    /** Open the specified Ginfo or Gmarker. The specified Ginfo must be child of this Gmaps.
	 * @param info the specified Ginfo or Gmarker.
     */
    public void openInfo(Ginfo info) {
        if (info == null) {
            closeInfo();
            return;
        }
        if (info.getParent() != this) {
            throw new UiException("The to be opened Ginfo or Gmarker must be child of this Gmaps!");
        }
        smartUpdate("z.open", info.getUuid());
    }
    
    /** Close the currently opened info window.
     */
    public void closeInfo() {
        if (getInfo() != null) {
            smartUpdate("z.close", "");
        }
    }
    
	/** Returns the currently opened info window of this Google Maps (might be Gmarker or Ginfo).
	 * @return the currently opened Ginfo.
	 */
	public Ginfo getInfo() {
		return _info;
	}

	/** Internal Use Only. Returns the HTML attributes for this tag.
	 * <p>Used only for component development, not for application developers.
	 */
	public String getOuterAttrs() {
		final String attrs = super.getOuterAttrs();
		final StringBuffer sb = new StringBuffer(64);
		if (attrs != null) {
			sb.append(attrs);
		}
		if (Events.isListened(this, "onMapMove", true)) {
			HTMLs.appendAttribute(sb, "z.onMapMove", "true");
		}
		if (Events.isListened(this, "onMapZoom", true)) {
			HTMLs.appendAttribute(sb, "z.onMapZoom", "true");
		}
		if (Events.isListened(this, "onInfoChange", true)) {
			HTMLs.appendAttribute(sb, "z.onInfoChange", "true");
		}
		if (Events.isListened(this, "onMapClick", true)) {
			HTMLs.appendAttribute(sb, "z.onMapClick", "true");
		}
		if (Events.isListened(this, "onMapDoubleClick", true)) {
			HTMLs.appendAttribute(sb, "z.onMapDoubleClick", "true");
		}
		final StringBuffer ctrls = new StringBuffer(3);
		if (isShowLargeCtrl()) {
			ctrls.append("l");
		}
		if (isShowSmallCtrl()) {
			ctrls.append("s");
		} 
		if (isShowZoomCtrl()) {
			ctrls.append("z");
		}
		if (isShowTypeCtrl()) {
			ctrls.append("t");
		}
		if (isShowScaleCtrl()) {
			ctrls.append("c");
		} 
		if (isShowOverviewCtrl()) {
			ctrls.append("o");
		} 
		HTMLs.appendAttribute(sb, "z.init", getCenter()+","+_zoom+(ctrls.length() == 0 ? "" : (","+ctrls)));
		HTMLs.appendAttribute(sb, "z.mt", getMapType());
		HTMLs.appendAttribute(sb, "z.dg", isEnableDragging());
		HTMLs.appendAttribute(sb, "z.cz", isContinuousZoom());
		HTMLs.appendAttribute(sb, "z.dz", isDoubleClickZoom());
		HTMLs.appendAttribute(sb, "z.wz", isScrollWheelZoom());
		HTMLs.appendAttribute(sb, "z.gb", isEnableGoogleBar());
		
		HTMLs.appendAttribute(sb, "z.smap", isSatellite());
		HTMLs.appendAttribute(sb, "z.hmap", isHybrid());
		HTMLs.appendAttribute(sb, "z.pmap", isPhysical());
		HTMLs.appendAttribute(sb, "z.nmap", isNormal());
		
		return sb.toString();
	}

	//-- Component --//
	public boolean insertBefore(Component child, Component insertBefore) {
        if (!(child instanceof Ginfo) //Gmarker
		&& !(child instanceof Gpolyline)  //Gpolygon
		&& !(child instanceof Gimage)) {
            throw new UiException("Only Ginfo, Gmarker, Gpolyline, Gpolygon, Gimage is allowed to be child of Gmaps: "+this+", "+child);
        }
		if (isGinfo(child)) { //so it is Ginfo
			if (_oneinfo != null && _oneinfo != child)
				throw new UiException("Only one Ginfo is allowed: "+this);
			_oneinfo = (Ginfo)child;
		}
		return super.insertBefore(child, insertBefore);
	}
	public void onChildRemoved(Component child) {
		if (isGinfo(child)) { //so it is Ginfo
            _oneinfo = null;
        }
		if (child == _info) { //the detached Ginfo is the currently opened Ginfo.
            closeInfo();
		}
		super.onChildRemoved(child);
	}
	private boolean isGinfo(Component comp) {
		return (comp instanceof Ginfo) && ((Ginfo)comp).isGinfo();
	}
	//Cloneable//
	public Object clone() {
		final Gmaps clone = (Gmaps)super.clone();
		if (clone._oneinfo != null || clone._info != null) clone.afterUnmarshal();
		return clone;
	}
	private void afterUnmarshal() {
		for (Iterator it = getChildren().iterator(); it.hasNext();) {
			final Object child = it.next();
            if (isGinfo((Component)child)) { //so it is Ginfo
                _oneinfo = (Ginfo)child;
            }
			if (_info != null && ((Component)child).getId() == _info.getId()) {
				_info = (Ginfo)child;
				break;
			}
		}
	}
	
	/** used by the MapMoveEvent */
	/* package */ void setCenterByClient(double lat, double lng) {
		_lat = lat;
		_lng = lng;
	}
	/* package */ void setZoomByClient(int zoom) {
		_zoom = zoom;
	}
    /** used by the InfoChangeEvent */
    /* package */ void setInfoByClient(Ginfo info) {
        _info = info;
    }
	/* package */ void setBoundsByClient(double swlat, double swlng, double nelat, double nelng) {
		_swlat = swlat;
		_swlng = swlng;
		_nelat = nelat;
		_nelng = nelng;
	}

	//register the Gmaps related event
	static {	
		new MapMoveCommand("onMapMove", Command.IGNORE_OLD_EQUIV);
		new MapZoomCommand("onMapZoom", Command.IGNORE_OLD_EQUIV);
		new InfoChangeCommand("onInfoChange", Command.IGNORE_OLD_EQUIV);
		new MapClickCommand("onMapClick", Command.IGNORE_OLD_EQUIV);
		new MapDoubleClickCommand("onMapDoubleClick", Command.IGNORE_OLD_EQUIV);
		new MarkerDropCommand("onMarkerDrop", Command.IGNORE_OLD_EQUIV);
	}
}
