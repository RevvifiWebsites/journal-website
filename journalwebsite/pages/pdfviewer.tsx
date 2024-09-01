import * as pdf from "pdfjs-dist";
import style from "../styles/pdfviewer.module.css";
import { useEffect, useId, useState } from "react";
//absolute abomination of a module, I highly recommend not messing too hard with all the weird props
export default function PDFViewer(props: {
  file: string | File;
  style?: any;
  numpages?: number | undefined;
  nostacked?: boolean;
  width?: string;
  overflow?: string;
  contstile?: any;
  canvasstyle?: any;
}) {
    const numPages = props.numpages;
    const id = useId();
  const [file, setFile] = useState("");
  pdf.GlobalWorkerOptions.workerSrc =
    "/pdf.worker.mjs";
  useEffect(() => {
    async function run() {
      if (props.file instanceof File) {
        let reader = new FileReader();
        reader.onload = () => {
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
    async function run() {
      let box = document.getElementById("pdfviewer" + id);
      const dpi = window.devicePixelRatio;
      if (box && file != "" && file != undefined && file != null && typeof file == typeof " "
      ) {
        let filedata = (file).split(",") as any;
        filedata = filedata[filedata.length - 1];
        let doc = await pdf.getDocument({
          data: atob(filedata),
          isEvalSupported:false
        });
        let completed = await doc.promise;
        let numpages = props.numpages  || completed.numPages;
        for (let i = 1; i <= numpages; i++) {
          let c = document.createElement("canvas");
          box.appendChild(c);
          c.getContext("2d")?.scale(dpi, dpi);
          c.className = ` ${props.nostacked ? style.nostackedcanvas : style.canvaspdf}  ${props.canvasstyle}`;
          c.width = 800 * dpi;
          c.height = 1000 * dpi;
          let page = await completed.getPage(i);
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
      <div id = {"pdfviewer" + id} className={` ${props.nostacked ? style.unstackedflex :  style.flexcontainer} ${props.contstile}` } style={{
        width: props.width || "",
        overflow: props.overflow || "scoll",
      }}>
      </div>
  );
}
