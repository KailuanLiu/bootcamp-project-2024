import React from "react";
import style from "./resume.module.css";
import ResumeItem from "@/components/resumeItem";
import SectionModel, { Section } from "@/database/resumeSchema";
import connectDB from "@/database/db";

async function seedDatabase() {
  await connectDB();
  const dummyData = [
    {
      title: "Education",
      items: [
        { title: "Cal Poly SLO", info: "B.S. in Computer Science" },
      ],
    },
    {
      title: "Relevant Coursework",
      items: ["Data Structures", "Systems Programming", "Object-Oriented Programming"],
    },
    {
      title: "Skills",
      items: ["Python", "Java", "C", "Adobe Illustrator, Photoshop"],
    },
    {
      title: "Projects",
      items: [
        {
          title: "County Demographic Data Analysis Tool",
          info: "Developed in C",
          description: "created a tool to load, filter, and analyze U.S. county-level demographic data from CSV files",
        },

        {
          title: "Jigsaw Puzzle",
          info: "Godot game engine, GDScript",
          description: "worked as back-end developer and implemented a functional database with Firebase to integrate with Godot"

        }
      ],
    },
    {
      title: "Experience",
      items: [
        {
          title: "Hack4Impact Developer",
          info: "Front-end/back-end developer",
          description: "working with local business as a non-profit developer to create websites for them",
        },
      ],
    },
    {
      title: "Activities and Leadership",
      items: [
        {
          title: "Kaja Krew Dance Club",
          info: "Treasurer",
          description: "manages budget for the club",
        },
      ],
    },
  ]
     try {
       await SectionModel.insertMany(dummyData);
       console.log("data has been seed");
     } catch (err) {
       console.error("Seeding error:", err);
     }
   }

seedDatabase();
const ResumePage = async () => {
  
  // Fetch data from the database directly in the server component
  await connectDB();

  try {
    const resumeEntries = await SectionModel.find({}).orFail(); // Fetch all sections
    return (
      <main className={style.main}>
        <div className={style.titleContent}>
          <div className={style.titleImage}>
            <img width="200" src="./Witch1.png" alt="small witch" />
          </div>
          <a className={style.button} href="./SLOResume.pdf" download>
            Download Resume
          </a>
        </div>

        <div className={style.resume}>
          {resumeEntries.map((section, index) => (
            <ResumeItem key={index} title={section.title} items={section.items} />
          ))}
        </div>
      </main>
    );
  } catch (err) {
    console.error(err);
    return (
      <main className={style.main}>
        <p>Error loading resume data</p>
      </main>
    );
  }
};

export default ResumePage;
