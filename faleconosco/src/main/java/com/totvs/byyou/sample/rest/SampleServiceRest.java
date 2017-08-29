package com.totvs.byyou.sample.rest;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.totvs.technology.foundation.common.ServiceLocator;
import com.totvs.technology.wcm.common.WCMRestResult;
import com.totvs.technology.wcm.sdk.rest.WCMRest;
import com.totvs.technology.wcm.sdk.service.WCMSDK;

@Path("/sample")
public class SampleServiceRest extends WCMRest {
	private static Logger log = LoggerFactory.getLogger(SampleServiceRest.class);

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/dosomething/{param1}")
	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public Response doSomething(@PathParam("param1") String param1, @QueryParam("pars") String pars) {
		if (log.isDebugEnabled()) {
			log.debug("doSomething");
		}

		try {
			Map<String, Object> vars = (pars != null && !pars.isEmpty() ? this.jsonToMap(pars) : new LinkedHashMap<String, Object>(0));
			// TODO: do something
			
			String result = "OK";
			return this.buildJSONResponse(new WCMRestResult(result));
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return this.buildJSONResponse(ex, super.getWCMSDK().getLocale());
		}
	}
}