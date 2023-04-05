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
@WebServlet("/addnumber")
public class AddServlet extends HttpServlet {

	public  void service(HttpServletRequest req,HttpServletResponse resp) throws IOException, ServletException {
//		int i=Integer.parseInt(req.getParameter("num1"));
//		int j=Integer.parseInt(req.getParameter("num2"));
//		int k=i+j;
//		req.setAttribute("k", k);
		RequestDispatcher rd=req.getRequestDispatcher("server");
		rd.forward(req,resp);
		System.out.println("AddServlet");
	}

}
