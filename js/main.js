import { supernaturalCharacters } from './data.js';

(() => {
  //run when page loads
  //loop through data and generate <details><summary>character name</summary> Other details</details>
  // write a function for each of the following three approaches
  // 1. <template> in the HTML to copy and append to a single documentFragment. One append to DOM
  // 2. document.createElement that is appended into a single documentFragment. One append to DOM
  // 3. .innerHTML with map().join(). One update to innerHTML
  // call each method once. The content will be repeated on the page three times.
  const main = document.querySelector('main');
  addCharactersTemplate(main);
  addCharactersCreateElement(main);
  addCharactersInnerHTML(main);
})();

function addCharactersTemplate(parentElement) {
  //append to parentElement
  let template = document.getElementById('character');
  let fragment = document.createDocumentFragment();
  supernaturalCharacters.forEach((char) => {
    let html = template.content.cloneNode(true);
    let details = html.querySelector('details');
    details.setAttribute('data-ref', char.uuid);
    details.querySelector('summary').textContent = char.name;
    details.querySelector('.role').textContent = char.role;
    details.querySelector('.species').textContent = char.species;
    details.querySelector('.firstAppearance').textContent = `First appeared in episode: "${char.firstAppearance}."`;
    fragment.append(html);
  });
  parentElement.append(fragment);
}

function addCharactersCreateElement(parentElement) {
  //append to parentElement
  let fragment = document.createDocumentFragment();
  supernaturalCharacters.forEach((char) => {
    let details = document.createElement('details');
    details.setAttribute('data-ref', char.uuid);
    let summary = document.createElement('summary');
    summary.textContent = char.name;
    details.append(summary);
    let role = document.createElement('h3');
    role.textContent = char.role;
    role.className = 'role';
    details.append(role);
    let species = document.createElement('p');
    species.className = 'species';
    species.textContent = char.species;
    details.append(species);
    let first = document.createElement('p');
    first.className = 'firstAppearance';
    first.textContent = `First appeared in episode: "${char.firstAppearance}."`;
    details.append(first);
    fragment.append(details);
  });
  parentElement.append(fragment);
}

function addCharactersInnerHTML(parentElement) {
  //set innerHTML of parentElement with .map().join()
  parentElement.innerHTML += supernaturalCharacters
    .map((char) => {
      return `<details data-ref="${char.uuid}">
        <summary>${char.name}</summary>
        <h3 class="role">${char.role}</h3>
        <p class="species">${char.species}</p>
        <p class="firstAppearance">First appeared in episode: "${char.firstAppearance}."</p>
      </details>`;
    })
    .join('');
}
