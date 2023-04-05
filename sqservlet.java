//$Id$
package com.demo;
import java.io.IOException;

import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet("/servers")
public class sqservlet extends HttpServlet{
	public void service(HttpServletRequest req,HttpServletResponse resp) throws IOException
	{
		int k=(int)req.getAttribute("k");
		PrintWriter out=resp.getWriter();
		out.println(k*k);
	}
	
}
@WebServlet("/server")
class one extends HttpServlet{
	public class sqservlet extends HttpServlet{
		public void service(HttpServletRequest req,HttpServletResponse resp) throws IOException
		{
			
			PrintWriter out=resp.getWriter();
			out.println("second class");
		}
	
}
}
