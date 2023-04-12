import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    country: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))

function onInputSearch(event) {
    const search = event.target.value.trim();
    refs.countryInfo.innerHTML = '';
    refs.country.innerHTML = '';
    if (!search) {
        return
    }  
    fetchCountries(search).then(data => createMarkup(data))
}

function createMarkup(arr) {
    if (!arr) {
        return
    }
    if (arr.length>10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return
    }
    if (arr.length === 1) {
        const markup = arr.map(item =>
            `<img src="${item.flags.svg}" alt="" width = "40px"/>
            <h2>${item.name.official}</h2>
            <p><span>Capital:</span> ${item.capital}</p>
            <p><span>Population:</span>  ${item.population}</p>
            <p><span>Languages:</span> ${Object.values(item.languages)}</p>
            `).join('');
        
        refs.countryInfo.innerHTML = markup
        
        return
    } 
    
    const markupCountries = arr.map(item =>
        `<li class="list">
        <img src="${item.flags.svg}" alt="flag" width = "50px"/>
        <h2>${item.name.official}</h2>
        </li>`).join('');
    
    refs.country.innerHTML = markupCountries;  
}