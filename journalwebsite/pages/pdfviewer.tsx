import * as pdf from "pdfjs-dist";
import style from "../styles/pdfviewer.module.css";
import { useEffect, useId, useState } from "react";

export default function PDFViewer(props: {
  file: string | File;
  style: any;//depercated do not use this
  numpages?: number | undefined;
  nostacked?: boolean;
  width?: string;
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
      else {
        setFile(props.file);
      }
    }
    run();
  }, []);
  useEffect(() => {
    setFile(props.file as string);
  }, [props.file]);
  useEffect(() => {
    console.log(file);
    async function run() {
      let box = document.getElementById("pdfviewer" + id);
      const dpi = window.devicePixelRatio;
      if (box && file != "" && file != undefined && file != null && typeof file == typeof " "
      ) {
        console.log("here");
        let filedata = (file).split(",") as any;
        filedata = filedata[filedata.length - 1];
        let doc = await pdf.getDocument({
          data: atob(filedata),
        });
        let completed = await doc.promise;
        let numpages = props.numpages  || completed.numPages;
        console.log(numpages);
        for (let i = 1; i <= numpages; i++) {
          let c = document.createElement("canvas");
          box.appendChild(c);
          c.getContext("2d")?.scale(dpi, dpi);
          c.className = props.nostacked ? style.nostackedcanvas : style.canvaspdf;
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
      <div id = {"pdfviewer" + id} className={props.nostacked ? style.unstackedflex :  style.flexcontainer } style={{
        width: props.width || "",
      }}>
      </div>
  );
}
