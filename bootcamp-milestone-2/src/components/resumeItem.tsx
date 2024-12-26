import React from "react";
import style from "@/app/resume/resume.module.css";

// Define types for the items prop
type ListItem = string;

interface EntryItem {
  title: string;
  info?: string;
  description?: string;
}

// Define the props type for ResumeSection
interface ResumeSectionProps {
  title: string;
  items: string | EntryItem[];
}

const ResumeItem: React.FC<ResumeSectionProps> = ({ title, items }) => {
  return (
    <section className={style.section}>
      <h2 className={style.sectionTitle}>{title}</h2>
      {Array.isArray(items) ? (
        <ul className={style.courseList || style.skillList}>
          {items.map((item, index) =>
            typeof item === "string" ? (
              <li key={index}>{item}</li>
            ) : (
              <div className={style.entry} key={index}>
                <h3 className={style.entryTitle}>{item.title}</h3>
                {item.info && <p className={style.entryInfo}>{item.info}</p>}
                {item.description && (
                  <p className={style.entryDescrip}>{item.description}</p>
                )}
              </div>
            )
          )}
        </ul>
      ) : null}
    </section>
  );
};

export default ResumeItem;
