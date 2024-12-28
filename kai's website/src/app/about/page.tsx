"use client"

import React, { useState } from "react";
import style from "./about.module.css";
import emailjs from "emailjs-com";

export default function AboutPage() {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState(""); // For showing success/error messages

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
        setStatus("Please fill out all fields.");
        return;
    }

    emailjs
        .send(
        "service_i8g80et", 
        "template_m5coetp", 
        {
            name: formState.name,
            email: formState.email,
            message: formState.message,
        },
        "-J25k7TUiwdKo5Udn" 
        )
        .then(
        () => {
            setStatus("Your message has been sent successfully!");
            setFormState({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
            console.error("EmailJS error:", error);
            setStatus("Failed to send the message. Please try again.");
        }
        );
    };

  return (
    <main className={style.main}>
        <div className={style.contact}>
            <div className={style.contactImage}>
                <img width="500" src="./images/iu i stan u 4.jpg" alt="my wife"/>
            </div>
            <div className={style.contactText}>
                <p>Hi! Please feel free to reach out to me!! :D</p>
            </div>
        </div>

        <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            value={formState.name}
            onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={formState.email}
            onChange={handleChange}
            />
            <br />
            <label htmlFor="message">Comments: </label>
            <textarea
            id="message"
            name="message"
            placeholder="Message"
            required
            value={formState.message}
            onChange={handleChange}
            ></textarea>
            <br />
            <input type="submit" value="Submit" />
        </form>
        {status && <p>{status}</p>}
    </main>
  );
}