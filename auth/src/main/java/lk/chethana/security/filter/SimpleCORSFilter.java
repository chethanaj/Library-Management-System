//package lk.chethana.security.filter;
//
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//
//@Component
//@Order(Ordered.HIGHEST_PRECEDENCE)
//public class SimpleCORSFilter extends OncePerRequestFilter {
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        if (!response.containsHeader("Access-Control-Allow-Origin")) {
//            response.setHeader("Access-Control-Allow-Origin", "*");
//        }
//        if (!response.containsHeader("Access-Control-Allow-Methods")) {
//            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//        }
//        if (!response.containsHeader("Access-Control-Max-Age")) {
//            response.setHeader("Access-Control-Max-Age", "3600");
//        }
//        if (!response.containsHeader("Access-Control-Allow-Headers")) {
//            response.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
//        }
//
//        //response.addHeader("Access-Control-Expose-Headers", "xsrf-token");
//        if ("OPTIONS".equals(request.getMethod())) {
//            response.setStatus(HttpServletResponse.SC_OK);
//        } else {
//            filterChain.doFilter(request, response);
//        }
//    }
//
//}
