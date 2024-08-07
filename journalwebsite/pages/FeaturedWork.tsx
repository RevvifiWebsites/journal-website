import { useEffect, useState } from "react";
import styles from "../styles/FeaturedWork.module.css"
import PDFViewer from "./pdfviewer";
interface FeaturedWorkProps {
    id : string;
    title : string;
    credit : string;
    createdAt : string;
}
export default function FeaturedWork(props: FeaturedWorkProps) {
    const [file, setFile] = useState("");
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
                  console.log(blob);
                  setFile("data:application/pdf;base64," + blob);
                });
              }
        })

    } , []);
    return (
        <div className={styles.container} onClick={ () => {
            window.location.href = "/article/" + props.id;
        }}>
             {/*<img className={styles.thumbnail} src={props.image} draggable="false" style={{cursor: 'pointer'}}/>*/}
             <div className={styles.thumbnail} style={{cursor: 'pointer'}}>
                <PDFViewer file={file} overflow="hidden" numpages={1}
                
                />
            </div>
            <p className="body-bold" style={{cursor: 'pointer'}}>{props.title}</p>
            <p className="body-secondary" style={{cursor: 'pointer'}}>{`by ${props.credit} | ${new Date(props.createdAt).toLocaleDateString()}`}</p>
            {/*<div className={styles.tags}>
                <img className={styles.tagIcon} src="/icons/tag.svg" />
                <p className="body-secondary">{props.tags.join(", ")}</p>
            </div>*/}
        </div>
    )
}