//$Id$
package com.restAPI.DemoRest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class createRest {
	long ticket_Id;
	String ticket_owner;
	long agent_ID;
	
	public long getTicket_Id() {
		return ticket_Id;
	}
	public void setTicket_Id(long ticket_Id) {
		this.ticket_Id = ticket_Id;
	}
	public long getAgent_ID() {
		return agent_ID;
	}
	public void setAgent_ID(long agent_ID) {
		this.agent_ID = agent_ID;
	}
	public String getTicket_owner() {
		return ticket_owner;
	}
	public void setTicket_owner(String ticket_owner) {
		this.ticket_owner = ticket_owner;
	}
}
