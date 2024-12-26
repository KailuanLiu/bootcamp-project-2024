import React from "react";
import style from "./resume.module.css";
import ResumeItem from "@/components/resumeItem";
import SectionModel, { Section } from "@/database/resumeSchema";
import connectDB from "@/database/db";

const Resume = () => {
   return (
      <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
         <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1>Kailuan Liu</h1>
	         <p>
	            (626)-525-1021 ❖ <a href="mailto:kliu97@calpoly.edu">kliu97@calpoly.edu</a> ❖{' '}
               <a href="https://linkedin.com/in/KailuanLiu" target="_blank" rel="noopener noreferrer">linkedin.com/in/KailuanLiu</a> ❖{' '}
               <a href="htps://github.com/KailuanLiu" target="_blank" rel="noopener noreferrer">github.com/KailuanLiu</a>
            </p>  
         </header>

         <section>
            <h2>PROJECTS</h2>
            <div>
               <h3>County Demographic Data Analysis Tool</h3>
               <p><strong>Developed in C</strong> - <em>San Luis Obispo, CA, Nov. 2024</em></p>
               <ul>
                  <li>Created a tool to load, filter, and analyze U.S. county-level demographic data from CSV files.</li>
                  <li>Built functions to process and display key statistics on education,ethnicity, income, and population.</li>
                  <li>Enabled flexible filtering by state, education level, ethnicity, income, and population, optimizing memory usage for large datasets.</li>
                  <li>Developed features to calculate percentages for demographic groups, such as Bachelor's degree holders, ethnic populations, and income below the poverty level.</li>
                  <li>Designed a system that dynamically processes operations from external configuration files, making the analysis adaptable and easy to modify.</li>
               </ul>

               <h3>Jigsaw Puzzle Game</h3>
               <p><strong>Godot game engine, GDScript</strong> - <em>San Luis Obispo, CA, June. 2024 - Sep. 2024</em></p>
               <ul>
                  <li>Worked as back-end developer and implemented a functional database with Firebase to integrate with Godot</li>
                  <li>Implemeneted Firebase OAuth to get and store data from user's logins</li>
                  <li>Implemented storage in Godot with GDScript to store individual coordination of the puzzle pieces</li>
                  <li>Configured puzzle pieces to automatically reset to their original positions when the player replays the same puzzle.</li>
               </ul>
            </div>
         </section>

         <section>
            <h2>EDUCATION</h2>
            <div>
               <h3>Cal Poly San Luis Obispo</h3>
               <p><strong>BS, Computer Science</strong> - <em>San Luis Obispo, CA, June. 2027</em></p>
               <ul>
                  <li>Cal Poly Scholars, Hack4Impact</li>
                  <li>Courses taken: Data Structures, Systems Programming, Object-Oriented Programming</li>
               </ul>
            </div>
         </section>

         <section>
            <h2>WORK EXPERIENCE</h2>
            <div>
               <h3>Hack4Impact Developer</h3>
               <p><strong>California Polytechnic State University, San Luis Obispo</strong> - <em>San Luis Obispo, CA, Oct.2024 - Present</em></p>
               <ul>
                  <li> Frontend/backend developer</li>
                  <li> working with local business as a non-profit club to create websites cater to them</li>
               </ul>
               <h3>Treasurer</h3>
               <p><strong>Kaja Krew, California Polytechnic Sate University, San Luis Obispo</strong> - <em>San Luis Obispo, CA, Feb.2024 - Present</em></p>
               <ul>
                  <li>Coordinated fundraisers with businesses to raise money for the club</li>
                  <li>Evalueates budgets for socials and miscellaneous items</li>
                  <li>Handles merch, membership dues, and member discounts</li>
               </ul>
            </div>
         </section>

         <section>
            <h2>SKILLS & INTERESTS</h2>
            <div>
               <li>Skills: C, Java, Python, RISCV, HTML, CSS</li>
               <li>Developer Tools: Firebase, MongoDB, VSCode, PyCharm, IntelliJ</li>
            </div>
         </section>
      </div>
   );
}

export default Resume;
