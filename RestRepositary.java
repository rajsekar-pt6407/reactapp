//$Id$
package com.restAPI.DemoRest;

import java.util.ArrayList;

public class RestRepositary {
	static ArrayList<createRest> list=new ArrayList<>();
	
	public static ArrayList <createRest> GetList(){
		return list;
	}
	
	
	public static void AddData(createRest create) {
		list.add(create);
	}
	
	
	public static createRest GetData(long ticket_id) {
		createRest empty=null;
		for(createRest create:list) {
			if(ticket_id==create.ticket_Id) {
				return create;
			}
		}
		return empty;
	}
    
}
