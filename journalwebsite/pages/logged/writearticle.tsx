import Image from "next/image";
import styles from "@/styles/Write.module.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Navigation from "../sidebar";
import PDFViewer from "../pdfviewer";

export default function Home() {
  //TODO maybe save this to local storage so that it isn't lost? maybe allow draft saving?
  const [article, setArticle] = useState({
    title: "Enter Title",
    authors: "",
  });

  const [numfacts, setNumFacts] = useState(1);
  const [file, setFile] = useState(null as File | null);
  return (
    <div className={styles.page}>
      <Navigation />
      <img
        src="/images/BG.png"
        className="background-image"
        draggable="false"
      />

      <div className={styles.pageContent}>
        <h1 className="heading-2">Submit Your Research Here</h1>
        {/* Research Title Input */}
        <div>
          <h2 className="body-bold"> Work Title</h2>
          <input
            id="title"
            placeholder="e.g The Effects of Climate Change on the Economy"
            onChange={(e) => {
              setArticle({ ...article, title: e.target.value });
            }}
            className={styles.textinput}
          ></input>
        </div>

        {/* Authors Input */}
        <div>
          <h2 className="body-bold">Work Authors</h2>
          <input
            id="Authors"
            placeholder="e.g John Doe, Anna Mark"
            onChange={(e) => {
              setArticle({ ...article, authors: e.target.value });
            }}
            className={styles.textinput}
          ></input>
        </div>
        <div>
          <h2 className="body-bold"> Attach Fun Facts</h2>
          <ol id="submmitedfacts" className={styles.factslist}>
            {Array.from({ length: numfacts }).map((_, i) => (
              <li key={i} className = {
                styles.factslistitem
              }>
                <input
                  placeholder="Enter Fun Fact"
                  className={styles.textinput}
                ></input>
                <button
                  className={styles.removebutton}
                  onClick={(e) => {
                    const targetElement = e.target as HTMLElement;
                    const list =
                      targetElement.parentElement?.parentElement?.children;
                    if (list) {
                      for (let i = 0; i < list?.length; i++) {
                        if (list[i] == targetElement.parentElement) {
                          list[i].remove();
                        }
                      }
                    }
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ol>

          <button
            className={styles.submitbutton}
            onClick={(e) => {
              setNumFacts(numfacts + 1);
            }}
          >
            Add Fun Fact
          </button>
        </div>
        <h2 className="body-bold">Submit Article</h2>
        <div>
          {/* Selection for File or Text */}
          <div className={styles.rightcontents}></div>
          <label htmlFor="file" className={styles.fileinputcont}>
            {!file && (
              <Image
                src="/fileplus.svg"
                width={0}
                height={0}
                className={styles.uploadicon}
                alt="file upload"
              />
            )}
            <div className={styles.filelabel}>
              {file
                ? file.name
                : "Drag and drop a file here or click the button below"}
            </div>
            <input
              type="file"
              id="file"
              className={styles.fileinput}
              onChange={async (e) => {
                if (e.target.files) {
                  if (
                    e.target.files[0].type.indexOf("msword") != -1 ||
                    e.target.files[0].type.indexOf("officedocument") != -1
                  ) {
                    console.log(e.target.files[0]);
                    if (
                      e.target.files[0].size > 10000000 ||
                      e.target.files == null
                    ) {
                      return;
                    }
                    const base64file = await new Promise((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        resolve(
                          (reader.result as string).replace(
                            /^data:.+;base64,/,
                            ""
                          )
                        );
                      };
                      if (e.target.files) {
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    });
                    const res = await fetch("/api/convertdoc", {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                      body: JSON.stringify({
                        file: base64file,
                      }),
                    }).then((res) => res.text());
                    setFile(
                      new File(
                        [Buffer.from(res, "base64")],
                        e.target.files[0].name + ".pdf",
                        {
                          type: "application/pdf",
                        }
                      )
                    );
                  } else {
                    setFile(e.target.files[0]);
                  }
                }
              }}
              accept=".pdf, .doc, .docx"
            />
            {file ? (
              <button
                className={styles.filebutton}
                onClick={(e) => {
                  setFile(null);
                }}
              >
                Clear File
              </button>
            ) : (
              <div className={styles.filebutton}>Select File</div>
            )}
          </label>
        </div>

        <h1 className={styles.leftinputtitle}>Preview</h1>
        {file && <PDFViewer file={file} style={{}}></PDFViewer>}
        <button
          className={styles.submitbutton}
          onClick={async (e) => {
            if (article.title == "Enter Title" || !file) {
              return;
            }
            let base64file = null;
            if (file) {
              base64file = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                  resolve(
                    (reader.result as string).replace(/^data:.+;base64,/, "")
                  );
                };
                reader.readAsDataURL(file);
              });
            }
            let funfacts = [];
            const factlist = document.getElementById("submmitedfacts") 
            if(factlist != null){
            for(let i = 0; i <factlist.children.length; i++){
              funfacts.push((factlist.children[i].children[0] as HTMLInputElement).value)
            }
          }
            const res = await fetch("/api/addarticle", {
              method: "POST",
              body: JSON.stringify({
                ...article,
                ...{
                  file: file ? base64file : null,
                  filename: file ? file.name : null,
                  filetype: file ? file.type : null,
                },
                funfacts: funfacts
                  ,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res) => res.json());
            window.location.href = "/article/" + res.id;
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
