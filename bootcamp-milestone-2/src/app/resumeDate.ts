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
      title: "Course Work",
      items: ["101", "202", "203", "357", "307"],
    },
    {
      title: "Skills",
      items: ["Python", "Java", "JS", "Tailwind", "Express", "Making IU happy :D"],
    },
    {
      title: "Projects",
      items: [
        {
          title: "Random Forest",
          info: "ML algorithm",
          description: "Implemented random forest in Java from scratch",
        },
      ],
    },
    {
      title: "Experience",
      items: [
        {
          title: "Frontend Developer at EIEN Studios",
          info: "Frontend-web dev intern",
          description: "Developed website for rhythm game",
        },
      ],
    },
  ];