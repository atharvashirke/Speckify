var textItems = document.querySelectorAll(".card-content p")

for (var i = 0; i < textItems.length; i++) {
    console.log(textItems[i].textContent)
    if (textItems[i].textContent.length > 20) {
        textItems[i].textContent = textItems[i].textContent.substring(0, 20) + "..."
    } 
}

console.log(textItems)