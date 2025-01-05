"use client"

import React, { useState } from "react";    //import react and useState hook
import style from "./about.module.css";     // style
import emailjs from "emailjs-com";          //import emailjs to send emails

export default function AboutPage() {
    // use useState hook to manage form state
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    // useState to manage status message 
    const [status, setStatus] = useState(""); // For showing success/error messages

    // handles change in the input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // gets name and value of the input
    setFormState({ ...formState, [name]: value });
    };

    // handles form submission
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();     // prevent default form submission

    // check if all fields are filled out 
    if (!formState.name || !formState.email || !formState.message) {
        setStatus("Please fill out all fields.");   // shows a message if one field is empty
        return;     // stops submission process
    }

    emailjs
        .send(
        "service_dqq3ttm", // service ID for EmailJS
        "template_y3qtyze", // template ID for EmailJS
        {
            name: formState.name,   // pass form data
            email: formState.email,
            message: formState.message,
        },
        "IFlSJsj16QZEUd0d1" // api key for emailjs
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
                <img width="200" src="./Witch1.png" alt="witch"/>
            </div>
            <div className={style.contactText}>
                <p>Please reach out to me if you have any questions!</p>
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