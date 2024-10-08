import Navigation from "./sidebar";

export default function page404(props : {rus : boolean}) {
    return (
        <div style = {{
            textAlign: "center",
        }}>
             <Navigation rus = {props.rus}/>
            <h1>404 Page not found</h1>
            <br/>
            <p>This page or article does not exist. Please check the URL and try again, or <a href = "/" style = {{
                textDecoration: "underline"
            }}>return to home</a>.</p>
        </div>
    )
}