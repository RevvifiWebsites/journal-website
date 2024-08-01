import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    fetch("/api/logout").then(() => {
      window.location.href = "/login";
    });
  });
  return <><a href = "/">
    If you are not redirected shortly click here.
    </a></>;
}
