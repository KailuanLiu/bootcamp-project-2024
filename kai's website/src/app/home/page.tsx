import React from "react";
import style from "./home.module.css";

export default function HomePage() {
  return (
    <main className={style.main}>
        <div className={`${style.about} animate-slideFromTop`}>
            <div className={style.aboutImage}>
              <img width="500" src="/images/iu.jpg" alt="my wife"/>
            </div>
            <div className={style.aboutText}>
                <p>Hi! My name is <em>Min Hset Hlaing</em> and I'm a <strong> software engineer </strong> with a goal of focusing in ML!</p>
            </div>
        </div>
    </main>
  );
}