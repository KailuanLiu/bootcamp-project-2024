import React from "react";
import style from "./home.module.css";

export default function HomePage() {
  return (
    <main className={style.main}>
        <div className={`${style.about} animate-slideFromLeft`}>
            <div className={style.aboutImage}>
              <img width="500" src="/Users/kailuanliu/IdeaProjects/y2023-24-q3-csc203-project4-liu-kailuan-huang-anna/images/Witch2.png" alt="witch for project"/>
            </div>
            <div className={style.aboutText}>
                <p>My name is Kailuan Liu and currently studying computer science at Cal Poly SLO</p>
            </div>
        </div>
    </main>
  );
}