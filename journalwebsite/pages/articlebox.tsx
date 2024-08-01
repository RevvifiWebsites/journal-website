import Image from "next/image";
import styles from "../styles/Article.module.css";
import { useEffect, useState } from "react";
import * as pdf from "pdfjs-dist";
 
export default  function Articlebox(Article: {
  id: string;
  title: string;
  content: string;
  credit: string;
}) {
    pdf.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.mjs"
     const [file, setFile] = useState(null as any);
  useEffect(() => {
    console.log(Article.id);
    fetch("/api/getpdf?id=" + Article.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.url) {
          fetch(data.url)
            .then((res) => {
              return res.text();
            })
            .then((blob) => {
              setFile("data:application/pdf;base64," + blob);
            });
        }
      });
  }, []);
  useEffect(() => {
    console.log("rann" + file);
    if (file) {
      let run = async () => {
        let c = document.getElementById("canvasdis" + Article.id) as HTMLCanvasElement;
        const dpi = window.devicePixelRatio;
        if (c) {
            c.getContext('2d')?.scale(dpi, dpi);
             let pdfjs = await pdf.getDocument({ data: atob(file.split(",")[1]) });
          let completed = await pdfjs.promise;
          let page = await completed.getPage(1);
          let scale = 1.6;
          let viewport = page.getViewport({ scale: scale });
          await page.render({
            canvasContext: c.getContext("2d") as any,
            viewport: viewport,
          });
        }
      };
      run();
    }
  }, [file]);
  return (
    <li
      className={styles.container}
      key={Article.id}
      onClick={() => {
        window.location.href = "/article/" + Article.id;
      }}
    >
      <canvas  width = {900} height = {800} className={styles.image} id={"canvasdis" + Article.id}></canvas>
      <h1>{Article.title}</h1>
      <h2>By: {Article.credit}</h2>
    </li>
  );
}
