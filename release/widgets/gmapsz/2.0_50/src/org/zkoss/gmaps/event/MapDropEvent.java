/* MapDropEvent.java

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Thu Jul 17 18:36:10     2008, Created by henrichen
}}IS_NOTE

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
package org.zkoss.gmaps.event;

import java.util.Map;

import org.zkoss.zk.au.AuRequest;
import org.zkoss.zk.au.AuRequests;
import org.zkoss.zk.mesg.MZk;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.UiException;
import org.zkoss.zk.ui.event.DropEvent;
import org.zkoss.zk.ui.event.MouseEvent;

/**
 * When drag and drop on a {@link org.zkoss.gmaps.Gmaps} or 
 * {@link org.zkoss.gmaps.Gmarker}; this event was sent to the dropped 
 * component.
 *  
 * @author henrichen
 * @since 2.0_9
 * @see MapMouseEvent
 */
public class MapDropEvent extends DropEvent {
	private final double _lat, _lng;

	public static final MapDropEvent getMapDropEvent(AuRequest request) {
		final Component comp = request.getComponent();
		if (comp == null)
			throw new UiException(MZk.ILLEGAL_REQUEST_COMPONENT_REQUIRED, request);
		final Map data = request.getData();
		if (data == null)
			throw new UiException(MZk.ILLEGAL_REQUEST_WRONG_DATA,
					new Object[] {data, request});

		final Component ref = request.getDesktop().getComponentByUuidIfAny((String)data.get("dragged"));
		final double lat = ((Double)data.get("lat")).doubleValue();
		final double lng = ((Double)data.get("lng")).doubleValue();
		//bug #2167700 FF3 only. Exception when click on ZK Pet Shop Maps
		final Number xn = (Number) data.get("x");
		final Number yn = (Number) data.get("y");
		final Number pxn = (Number) data.get("pageX");
		final Number pyn = (Number) data.get("pageY");
		final int x = xn instanceof Double ? (int) Math.round(((Double)xn).doubleValue()) : xn.intValue();
		final int y = yn instanceof Double ? (int) Math.round(((Double)yn).doubleValue()) : yn.intValue();
		final int pageX = pxn instanceof Double ? (int) Math.round(((Double)pxn).doubleValue()) : pxn.intValue();
		final int pageY = pyn instanceof Double ? (int) Math.round(((Double)pyn).doubleValue()) : pyn.intValue();
		return new MapDropEvent(request.getCommand(), comp, 
				ref, lat, lng, x, y, pageX, pageY, AuRequests.parseKeys(data));
	}
	
	/** Constructs a drop event.
	 * @param dragged The component being dragged and drop to {@link #getTarget}.
	 */
	public MapDropEvent(String name, Component target, Component dragged, 
		double lat, double lng, int x, int y, int pageX, int pageY, int keys) {
		super(name, target, dragged, x, y, pageX, pageY, keys);
		_lat = lat;
		_lng = lng;
	}
	
	/** Returns the latitude of the clicked position.
	 */
	public double getLat() {
		return _lat;
	}
	
	/** Returns the longitude of the clicked position.
	 */
	public double getLng() {
		return _lng;
	}
	
	/** Get the x in pixels related to the browser client
	 * @deprecated As of release 2.0_50, replaced with {@link MouseEvent#getPageX()} instead.
	 */
	public final int getClientX() {
		return getPageX();
	}
	
	/** Get the y in pixels related to the browser client
	 * @deprecated As of release 2.0_50, replaced with {@link MouseEvent#getPageY()} instead.
	 */
	public final int getClientY() {
		return getPageY();
	}
}
