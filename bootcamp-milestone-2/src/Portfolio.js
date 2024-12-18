//src/Portfolio.js
import React from 'react';

function Portfolio() {
   return (
      <main>
         <h2>My Portfolio</h2>
         <div className="project">
            <img
               src="/Users/kailuanliu/IdeaProjects/y2023-24-q3-csc203-project4-liu-kailuan-huang-anna/images/Witch1.png"
               alt="Witch in motion"
            />
            <div className="project-details">
               <p>I did this shot of a witch motion for a CSC 203 project.</p>
               <p>The Idea was that the witch flies up and down while moving across a 2D plane in the game.</p>
               <a href="index.html">Learn More</a>
            </div>
         </div>
      </main>
   );
}
export default Portfolio;
