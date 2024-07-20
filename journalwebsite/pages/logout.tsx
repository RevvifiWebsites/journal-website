import { useEffect } from "react";


export default function Logout() {
    useEffect(() => {
        fetch("/api/logout").then(() =>
    {window.location.href = "/login";}
    );
    })
    return <></>;
}