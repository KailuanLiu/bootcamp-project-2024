import React from 'react';
import Navbar from './Navbar';
import Portfolio from './Portfolio';
import Footer from './Footer';
import './App.css'; // import global styles for the app

function App() {
   return (
      <div>
         <Navbar />
         <Portfolio />
         <Footer />
      </div>
   );
}

export default App;
