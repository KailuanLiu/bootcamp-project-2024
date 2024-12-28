// Define section data types
interface Section {
    title: string;
    items: string[] | { title: string; info?: string; description?: string }[];
  }

export const resumeEntries: Section[] = [
    {
      title: "Education",
      items: [{ title: "CalPoly SLO", info: "BS in Comp Sci" }],
    },
    {
      title: "Relevant CourseWork",
      items: ["Data Structures", "Systems Programming", "Object-Oriented Programming"],
    },
    {
      title: "Skills",
      items: ["Python", "Java", "JS", "HTML", "RISCV", "C"],
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
  ];