//$Id$
package com.restAPI.DemoRest;

import java.util.ArrayList;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("Fetchdata")
public class RestResource {
  @GET
  @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
  public ArrayList<createRest> fetchdata() {
	  return RestRepositary.GetList();
	  
  }
  
  
  @GET
  @Path("Fetchdata/{id}")
  @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
  public createRest Specificdata(@PathParam("id") long id) {
	  
	return RestRepositary.GetData(id);  
  }
  
  
  @POST
  @Path("Createdata")
  @Consumes({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
  public void  produce(createRest create) {
	  RestRepositary.AddData(create);
	  
  }
}