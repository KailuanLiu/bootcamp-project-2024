import React from "react";
import style from "./resume.module.css";
import ResumeItem from "@/components/resumeItem";
import SectionModel, { Section } from "@/database/resumeSchema";
import connectDB from "@/database/db";

const ResumePage = async () => {
  
  // Fetch data from the database directly in the server component
  await connectDB();

  try {
    const resumeEntries = await SectionModel.find({}); // Fetch all sections
    return (
      <main className={style.main}>
        <div className={style.titleContent}>
          <div className={style.titleImage}>
            <img width="500" src="./public/Witch1.png" alt="small witch" />
          </div>
          <a className={style.button} href="resume.pdf" download>
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
