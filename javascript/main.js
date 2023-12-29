var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var addBtnInput = document.getElementById('addBtn');
var tableBody = document.getElementById('tableBody')

var bookMarksList = [];

if (localStorage.getItem('bookmarks') != null) {
    bookMarksList = JSON.parse(localStorage.getItem('bookmarks'))
    displayBookmark(bookMarksList);

}


addBtn.addEventListener('click', function () {
    if (
        siteNameInput.classList.contains("is-valid") && siteUrlInput.classList.contains("is-valid")
    ) {

        var bookMark = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        }

        bookMarksList.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookMarksList))
        console.log(bookMarksList);
        displayBookmark(bookMarksList);
        clearForm();
    }
    else {
        alert('BookMark invalid')
    }
})

function displayBookmark(list) {
    var cartoona = [];
    for (var i = 0; i < list.length; i++) {
        cartoona += `<tr>
                 <td> ${i + 1}</td>
                 <td> ${list[i].name} </td>
                 <td> <a href="${list[i].url}" target="_blank"> <button class="btn px-3" style="background-color:#9eb23b; color:#fff"> visit </button> </a> </td>
                 <td> <button onclick="deleteBookMark(${i})" class="btn btn-danger"> delete </button> </td>                
                </tr>
        `
    }
    tableBody.innerHTML = cartoona;
    console.log(cartoona);
}

function clearForm() {
    siteNameInput.value = '',
        siteUrlInput.value = ''

}

function deleteBookMark(index) {
    bookMarksList.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookMarksList))
    displayBookmark(bookMarksList);

}

function searchBookMark(term) {
    var matchedBookMarks = [];

    for (var i = 0; i < bookMarksList.length; i++) {
        if (bookMarksList[i].name.toLowerCase().includes(term.toLowerCase()) === true) {
            matchedBookMarks.push(bookMarksList[i]);
        }
    }
    console.log(matchedBookMarks);
    displayBookmark(matchedBookMarks);

}

var nameRegex = /^[a-zA-Z0-9]{3,}/;

var urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    ;

siteNameInput.addEventListener("input", function () {
    validate(siteNameInput, nameRegex);
});

siteUrlInput.addEventListener("input", function () {
    validate(siteUrlInput, urlRegex);
});

function validate(elem, regex) {
    if (regex.test(elem.value)) {

        elem.classList.add("is-valid");
        elem.classList.remove("is-invalid");

    } else {

        elem.classList.add("is-invalid");
        elem.classList.remove("is-valid");
    }




}

