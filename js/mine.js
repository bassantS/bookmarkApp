var container;
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var regexUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
var regexName=/^[a-zA-Z-_]+$/;
if (localStorage.getItem("db") == null) {
    container = [];
}
else {
    container = JSON.parse(localStorage.getItem("db"));
    displayBookmark()
}

function addBookmark() {
    if ( regexUrl.test(siteUrlInput.value)&& regexName.test(siteNameInput.value) ) {
        var bookmark =
        {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value
        }
        container.push(bookmark);

        localStorage.setItem("db", JSON.stringify(container))

        displayBookmark();

        clearInputs()
        document.getElementById("webNameValidation").innerHTML="";
        document.getElementById("webUrlValidation").innerHTML="";
        // document.querySelector("#webUrlValidation").classList.replace('visiblevisibility','hidevisibility') ;

    }
    else {
        // if (regexUrl.test(siteUrlInput.value)==false && regexName.test(siteNameInput.value) ==false) {
        //     document.getElementById("webUrlValidation").innerHTML=`
        //     <p class="alert alert-danger w-25 mx-auto mt-4 " id="webUrlValidation" role="alert">Url is invalid</p>`;
        //     document.getElementById("webNameValidation").innerHTML=`
        //     <p class="alert alert-danger w-25 mx-auto mt-4 " id="webNameValidation" role="alert">Name is invalid</p>`;
        //     // document.querySelector("#webUrlValidation").classList.replace('hidevisibility','visiblevisibility') ;
        // }
        if(siteUrlInput.value=="" ||siteUrlInput.value==null) {
            document.getElementById("webUrlValidation").innerHTML=`
            <p class="alert alert-danger w-25 mx-auto mt-4 " id="webUrlValidation" role="alert">Url is required</p>`;
        }
        else if(regexUrl.test(siteUrlInput.value)==false)
        {
            document.getElementById("webUrlValidation").innerHTML=`
            <p class="alert alert-danger w-25 mx-auto mt-4 " id="webUrlValidation" role="alert">Url is invalid</p>`;
        }
        else{
            document.getElementById("webUrlValidation").innerHTML=``;
        }
        if(siteNameInput.value=="" ||siteNameInput.value==null) {
            document.getElementById("webNameValidation").innerHTML=`
            <p class="alert alert-danger w-25 mx-auto mt-4 " id="webNameValidation" role="alert">Name is required</p>`;
        }
        else if(regexName.test(siteNameInput.value) ==false)
        {
            document.getElementById("webNameValidation").innerHTML=`
            <p class="alert alert-danger w-25 mx-auto mt-4 " id="webNameValidation" role="alert">Name is invalid</p>`;
        }
        else{
            document.getElementById("webNameValidation").innerHTML=``;
        }
    }

}

function displayBookmark() {
    var tableContent = ``;
    for (var i = 0; i < container.length; i++) {
        tableContent += `<tr>
    
       <td>${container[i].siteName}</td>
       <td><button onclick="visitBookmark(${i})" class="btn btn-outline-info">Visit</button></td>
       <td><button onclick="retrieveBookmark(${i})" class="btn btn-outline-warning">Update</button></td>
       <td><button onclick="delBookmark(${i})" class="btn btn-outline-danger">Delete</button></td>
       </tr>`
    }
    document.getElementById("tBody").innerHTML = tableContent;
}

function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function delBookmark(bookmarkIndex) {
    container.splice(bookmarkIndex, 1);
    displayBookmark();
    localStorage.setItem("db", JSON.stringify(container))
}

function retrieveBookmark(bookmarkIndex) {
    siteNameInput.value = container[bookmarkIndex].siteName;
    siteUrlInput.value = container[bookmarkIndex].siteUrl;
    document.getElementById("buttonsContainer").innerHTML = `
    <button onclick="updateBookmark(${bookmarkIndex})" class="btn btn-warning text-white">Update</button>`
}

function updateBookmark(bookmarkIndex) {
    if ( regexUrl.test(siteUrlInput.value)&& regexName.test(siteNameInput.value) ) {

    container[bookmarkIndex].siteName = siteNameInput.value;
    container[bookmarkIndex].siteUrl = siteUrlInput.value;
    displayBookmark();

    localStorage.setItem("db", JSON.stringify(container));

    clearInputs()

    document.getElementById("buttonsContainer").innerHTML = `
    <button onclick="addBookmark()" class="btn btn-info text-white">Submit</button>`
    document.getElementById("webUrlValidation").innerHTML="";
        // document.querySelector("#webUrlValidation").classList.replace('visiblevisibility','hidevisibility') ;

    }
    else {
        if(siteUrlInput.value=="" ||siteUrlInput.value==null) {
            document.getElementById("webUrlValidation").innerHTML=`
            <p class="alert alert-danger w-25 mx-auto mt-4 " id="webUrlValidation" role="alert">Url is required</p>`;
        }
        else if(regexUrl.test(siteUrlInput.value)==false)
        {
            document.getElementById("webUrlValidation").innerHTML=`
            <p class="alert alert-danger w-25 mx-auto mt-4 " id="webUrlValidation" role="alert">Url is invalid</p>`;
        }
        else{
            document.getElementById("webUrlValidation").innerHTML=``;
        }
        if(siteNameInput.value=="" ||siteNameInput.value==null) {
            document.getElementById("webNameValidation").innerHTML=`
            <p class="alert alert-danger w-25 mx-auto mt-4 " id="webNameValidation" role="alert">Name is required</p>`;
        }
        else if(regexName.test(siteNameInput.value) ==false)
        {
            document.getElementById("webNameValidation").innerHTML=`
            <p class="alert alert-danger w-25 mx-auto mt-4 " id="webNameValidation" role="alert">Name is invalid</p>`;
        }
        else{
            document.getElementById("webNameValidation").innerHTML=``;
        }
    }
    // else {
    //     console.log(regexUrl.test(siteUrlInput.value));
    //     console.log(regexName.test(siteNameInput.value));
    //     if (( regexUrl.test(siteUrlInput.value))==false&& (regexName.test(siteNameInput.value))==false)
    //     {
    //         document.getElementById("webUrlValidation").innerHTML=`
    //     <p class="alert alert-danger w-25 mx-auto mt-4 " id="webUrlValidation" role="alert">Url and Name is invalid</p>`;
        
    //     }
    //     else if ( regexUrl.test(siteUrlInput.value)==false) {
    //     document.getElementById("webUrlValidation").innerHTML=`
    //     <p class="alert alert-danger w-25 mx-auto mt-4 " id="webUrlValidation" role="alert">Url is invalid</p>`;
    //     }
    //     else if(regexName.test(siteNameInput.value)==false){
    //         document.getElementById("webUrlValidation").innerHTML=`
    //         <p class="alert alert-danger w-25 mx-auto mt-4 " id="webUrlValidation" role="alert"> Name is invalid</p>`;
    //     }
    //     // document.querySelector("#webUrlValidation").classList.replace('hidevisibility','visiblevisibility') ;
    // }
}

function searchBookmark(userWord) {
    tableContent = ``;
    for (var i = 0; i < container.length; i++) {
        if (container[i].siteName.toLowerCase().includes(userWord.toLowerCase())) {
            tableContent += `<tr>
            <td>${container[i].siteName}</td>
            <td><button onclick="visitBookmark(${i})" class="btn btn-outline-info">Visit</button></td>
            <td><button onclick="retrieveBookmark(${i})" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="delBookmark(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`
        }
    }
    document.getElementById("tBody").innerHTML = tableContent;
}

function visitBookmark(bookmarkIndex) {
    window.open(container[bookmarkIndex].siteUrl, "_blank");
}

