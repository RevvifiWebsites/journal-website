import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function Home() {
  const [article, setArticle] = useState({
    title: "Loading...",
    content: "",
  });
  const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        fetch(`/api/getarticle?id=${id}`)
        .then((res) => {
            if(res.ok){
                return res.json();
            }
            else {
                window.location.href = "/404";
            }
        })
        .then((data) => {
            setArticle(data);
        }).catch((e) => {
            window.location.href = "/404";
        });
    }, [id]);
  return <>
  {article.title}
  <Markdown>{article.content}</Markdown>
  </>;
}
