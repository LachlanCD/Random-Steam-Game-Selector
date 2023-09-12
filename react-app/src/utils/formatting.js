export function removeHTMLTagsAndDecode(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText;
}

export function fixDate(date){
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString();
}