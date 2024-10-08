import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Login.module.css";
import Navigation from "./sidebar";
import { useState } from "react";
import Popup from "./popup";
const countries = ["Select a Country ", "Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas (the)","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia (Plurinational State of)","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory (the)","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Cayman Islands (the)","Central African Republic (the)","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands (the)","Colombia","Comoros (the)","Congo (the Democratic Republic of the)","Congo (the)","Cook Islands (the)","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czechia","Côte d'Ivoire","Denmark","Djibouti","Dominica","Dominican Republic (the)","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands (the) [Malvinas]","Faroe Islands (the)","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories (the)","Gabon","Gambia (the)","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See (the)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran (Islamic Republic of)","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea (the Democratic People's Republic of)","Korea (the Republic of)","Kuwait","Kyrgyzstan","Lao People's Democratic Republic (the)","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands (the)","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia (Federated States of)","Moldova (the Republic of)","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands (the)","New Caledonia","New Zealand","Nicaragua","Niger (the)","Nigeria","Niue","Norfolk Island","Northern Mariana Islands (the)","Norway","Oman","Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines (the)","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Republic of North Macedonia","Romania","Russian Federation (the)","Rwanda","Réunion","Saint Barthélemy","Saint Helena, Ascension and Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin (French part)","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Sudan","Spain","Sri Lanka","Sudan (the)","Suriname","Svalbard and Jan Mayen","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands (the)","Tuvalu","Uganda","Ukraine","United Arab Emirates (the)","United Kingdom of Great Britain and Northern Ireland (the)","United States Minor Outlying Islands (the)","United States of America (the)","Uruguay","Uzbekistan","Vanuatu","Venezuela (Bolivarian Republic of)","Viet Nam","Virgin Islands (British)","Virgin Islands (U.S.)","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe","Åland Islands"
];
export default function Login(props : {rus : boolean}) {
  const [popup, setPopup] = useState(null as string | null);

  return (
    <div className={styles.container}>
       <Navigation rus = {props.rus}/>
      <Popup popup = {popup} setPopup = {setPopup}/>
      <h2 className="heading-2">Sign Up to <span className="accent-color">young</span>minds.</h2>
      <input type="text" placeholder="Username" id="username"/>
      <input type="email" placeholder="Email" id="email"/>
      <input type="password" placeholder="Password" id="password"/>
      <input type="password" placeholder="Repeat Password" id="repeat"/>
     <select  id = "country" name = "country" style = {{
        backgroundColor: "transparent",
        color: "white",
        border: "2px solid #115ed4",
        padding: "0.5em",
        textAlign: "center",
        borderRadius: "0.5em",
        fontSize: "1.5em",
        width: "45%",
      }}>
        {countries.map((country) => {
          return <option value = {country} style = {{
            fontSize: "0.5em",
            color: "black",
          }}>{country}</option>
        })}
      </select>
      <div className={styles.buttonsContainer}>
        <button className="button-primary" onClick={async  () => {
            const username = (document.getElementById("username") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;
            const repeat = (document.getElementById("repeat") as HTMLInputElement).value;
            const country = (document.getElementById("country") as HTMLSelectElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            if(email == "" || /\S+@\S+\.\S+/.test(email) == false){
              setPopup("Please enter a valid email address");
              return;
            }
            if(password != repeat){
                setPopup("Passwords do not match");
              return;
            }
            if(username.length < 4){
              setPopup("Username must be at least 4 characters long");
              return;
            }
            if(password.length < 8){
              setPopup("Password must be at least 8 characters long");
              return;
            }
            if(country == "Select a Country "){
              setPopup("Please select a country");
              return;
            }
            const response = await fetch("/api/register", {
              method: "POST",
              body: JSON.stringify({ username, password, country, email }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {

              window.location.href = "/logged/home";
            } else {
              setPopup("Username already exists");
            }
        }}>Register</button>
        <button className="button-secondary"><a href = "/login">Login</a></button>
      </div>
    </div>
  );
}
