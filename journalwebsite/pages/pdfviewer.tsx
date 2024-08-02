import * as pdf from "pdfjs-dist";
import style from "../styles/pdfviewer.module.css";
import { useEffect, useId, useState } from "react";

export default function PDFViewer(props: {
  file: string | File;
  style: any;
  numpages?: number | undefined;
}) {
    const numPages = props.numpages;
    const id = useId();
  const [file, setFile] = useState("");
  pdf.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.mjs";
  useEffect(() => {
    async function run() {
      if (props.file instanceof File) {
        let reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            setFile(reader.result as string);
        };
        reader.readAsDataURL(props.file);
      }
    }
    run();
  }, []);
  useEffect(() => {
    async function run() {
      let box = document.getElementById("pdfviewer" + id);
      const dpi = window.devicePixelRatio;
      if (box && file != "") {
        let doc = await pdf.getDocument({
          data: atob((file).split(",")[1]),
        });
        let completed = await doc.promise;
        let numpages = props.numpages  || completed.numPages;
        console.log(numpages);
        for (let i = 1; i <= numpages; i++) {
          let c = document.createElement("canvas");
          box.appendChild(c);
          c.getContext("2d")?.scale(dpi, dpi);
          c.className = style.canvaspdf;
          c.width = 800 * dpi;
          c.height = 1000 * dpi;
          let page = await completed.getPage(i);
          let scale = 1;
          const viewport = page.getViewport({scale: c.height / page.getViewport({scale: 1}).height});
          await page.render({
            canvasContext: c.getContext("2d") as any,
            viewport: viewport,
          });
          await page.cleanup();
        }
      }
    }
    run();
  }, [file]);
  return (
    
      <div id = {"pdfviewer" + id} className={style.flexcontainer}>
      </div>
  );
}
