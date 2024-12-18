import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
   return (
      <html lang="en">
         <body className={inter.className}> //remember Inter is simply the font I chose.
	   <Navbar/> // This sets the navbar on every page 
           {children}
        </body>
    </html>
   );
};

export default Layout;
