import React from "react";
import style from "./home.module.css";

export default function HomePage() {
  return (
    <main className={style.main}>
        <div className={`${style.about} animate-slideFromTop`}>
            <div className={style.aboutImage}>
              <img width="500" src="/Witch1.png" alt="small witch"/>
            </div>
            <div className={style.aboutText}>
                <p>Hi! My name is Kailuan Liu and I'm a currently studying computer science at Cal Poly SLO</p>
            </div>
        </div>
    </main>
  );
}