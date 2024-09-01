import Image from "next/image";
import styles from "../styles/Article.module.css";
import { useEffect, useState } from "react";
import * as pdf from "pdfjs-dist";

export default function Articlebox(Article: {
  id: string;
  title: string;
  credit: string;
}) {
  pdf.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.mjs";
  const [file, setFile] = useState(null as any);
  useEffect(() => {
    fetch("/api/getpdf?id=" + Article.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.url) {
          fetch(data.url)
            .then(async (res) => {
              if (res.status != 200) {
                console.log("No pdf found for article " + Article.id);
                return (await fetch("/placeholderpdf.txt")).text();
              }
              return res.text();
            })
            .then((blob) => {
              setFile("data:application/pdf;base64," + blob);
            });
        } else {
          fetch("/placeholderpdf.txt")
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
    if (file) {
      let run = async () => {
        let c = document.getElementById(
          "canvasdis" + Article.id
        ) as HTMLCanvasElement;
        const dpi = window.devicePixelRatio;
        if (c) {
          c.width = 800 * dpi;
          c.height = 400 * dpi;
          let pdfjs = await pdf.getDocument({ data: atob(file.split(",")[1]), isEvalSupported:false } );
          let completed = await pdfjs.promise;
          let page = await completed.getPage(1);
          const viewport = page.getViewport({
            scale: c.width / page.getViewport({ scale: 1 }).width,
          });
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
        if (Article.id != "") {
          window.location.href = "/article/" + Article.id;
        }
      }}
    >
      <canvas
        width={1000}
        height={800}
        className={styles.image}
        id={"canvasdis" + Article.id}
      ></canvas>
      <h1 className="body-bold" >{Article.title}</h1>
      <h2 className="body-secondary">By: {Article.credit}</h2>
    </li>
  );
}
