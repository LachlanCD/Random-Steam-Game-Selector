// function to format HTML 
export function removeHTMLTagsAndDecode(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText;
}

// function to fix dates
export function fixDate(date){
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString();
}