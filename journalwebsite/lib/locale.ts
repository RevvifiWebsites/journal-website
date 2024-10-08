import { createContext } from 'react';
function russianLocale() {
    console.log(navigator.languages[0]  === 'ru' || navigator.languages[0] === 'ru-RU');
    return navigator.languages[0] === 'ru' || navigator.languages[0] === 'ru-RU';
}
const LocaleContext = createContext(russianLocale());
export default {
    russianLocale,
    LocaleContext
};