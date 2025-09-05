import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";  

export default function RootLayOut() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Header />

     
      <main className="flex-grow">
        <Outlet />
      </main>

     
      <Footer />
    </div>
  );
}
