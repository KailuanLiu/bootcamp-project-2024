import React from 'react';
import Image from 'next/image';
import style from './blogPreview.module.css'
import { Blog } from '@/app/blogData';

export default function BlogPreview(props: Blog) {
  return (
    <div className={style.blogPreviewContainer}>  
      <h3 className={style.title}> {props.title} </h3>
      <div className={style.content}>
        {/* <Image className={style.blogImg} src={props.image} alt={props.imageAlt} width={500} height={500} ></Image> */}
        <p className={style.date}>{props.date}</p>
        <p>Click in to view details...</p>
        {/* <p className={style.description}>{props.description}</p> */}
      </div>
	  </div>
  );
}