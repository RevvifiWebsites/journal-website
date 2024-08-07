import { useEffect, useState } from "react";
import styles from "../styles/OtherWorks.module.css"
import PDFViewer from "./pdfviewer";
 

interface propss {
    id : string;
    title : string;
    credit : string;
    createdAt : string;
}
export default function OtherWorks(props: propss) {
    //every time I regret not putting this code into the pdfviewer module yet here we are
    useEffect(() => {
        fetch("/api/getpdf?id=" + props.id, {
        }).then((res) => res.json()).then((data) => {
            if (data.url) {
                fetch(data.url)
                  .then(async (res) => {
                    if(res.status != 200){
                      return (await fetch("/placeholderpdf.txt")).text();
                    }
                    return res.text();
                  })
                  .then((blob) => {
                    setFile("data:application/pdf;base64," + blob);
                  });
              }
              else {
                fetch("/placeholderpdf.txt").then((res) => {
                  return res.text();
                }).then((blob) => {
                  setFile("data:application/pdf;base64," + blob);
                });
              }
        })

    } , []);
    const [file, setFile] = useState("");
    return (
        <div className={styles.container} onClick={ () => {
            window.location.href = "/article/" + props.id
        }}>
            <div className= {styles.pdfview}>
            <PDFViewer  file={file} overflow="hidden" numpages={1} 
            contstile = {styles.pdfviewer}
            canvasstyle={styles.pdfcanvas}
            />
            </div>
            <div className={styles.textContent}>
                <p className="body-bold" style={{cursor: 'pointer'}}>{props.title}</p>
                <p className="body-secondary" style={{cursor: 'pointer'}}>{`by ${props.credit} | ${new Date(props.createdAt).toLocaleDateString()} ` } </p>
            </div>
        </div>
    )
}