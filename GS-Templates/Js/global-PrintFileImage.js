//Global Operations For Working with Files, Images Printing, Download, Upload


function PrintElement(elementId) {
    try {
        $("#" + elementId).printElement({ pageTitle: elementId.split("_")[1] + ".html", printMode: "popup" });
    } catch (t) { }
}
function PrintFrameElement() {
    try {
        window.frames['FrameWindow'].contentWindow.printElement({ pageTitle: "KlikneteZdeCz.html", printMode: "popup" });
    } catch (t) { }
}



function DownloadHtmlElement(elementId) {
    try {
        var t = document.body.appendChild(document.createElement("a")); t.download = elementId + ".html"; t.href = "data:text/html;charset=utf-8," + encodeURIComponent(document.getElementById(elementId).innerHTML); t.click();
    } catch (i) { }
}
function DownloadFrameHtmlElement() {
    try {
        var t = document.body.appendChild(document.createElement("a")); t.download = "KlikneteZde" + ".html"; t.href = "data:text/html;charset=utf-8," + encodeURIComponent(window.frames['FrameWindow'].contentWindow.document.body.innerHTML); t.click();
    } catch (i) { }
}



async function CopyElement(elementId) {
    try {
        let t = document.getElementById(elementId).innerHTML; await navigator.clipboard.writeText(t);
    } catch (t) { }
}
async function CopyFrameElement() {
    try {
        let t = window.frames['FrameWindow'].contentWindow.document.body.innerHTML; await navigator.clipboard.writeText(t);
    } catch (t) { }
}


function ImageFromElement(elementId) {
    try {
        $("document").ready(function () {
            html2canvas($("#" + elementId), {
                onrendered: function (t) {
                    $("#previewImage").append(t);
                    var r = t.toDataURL("image/png"), u = r.replace(/^data:image\/png/, "data:application/octet-stream"), i = document.body.appendChild(document.createElement("a")); i.download = elementId + ".png"; i.href = u; i.click();
                }
            });
        });
    } catch (t) { }
}
function ImageFromFrameElement() {
    try {
        $("document").ready(function () {
            html2canvas(window.frames['FrameWindow'].contentWindow.document.body, {
                onrendered: function (t) {
                    $("#previewImage").append(t);
                    var r = t.toDataURL("image/png"), u = r.replace(/^data:image\/png/, "data:application/octet-stream"), i = document.body.appendChild(document.createElement("a")); i.download = "KlikneteZdeCz.png"; i.href = u; i.click();
                }
            });
        });
    } catch (t) { }
}


function SaveToFavorites(title, url) {
    if (window.sidebar) {
        // Firefox
        window.sidebar.addPanel(title, url, '');
    }
    else if (window.opera && window.print) {
        // Opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click(); //this.title=document.title;
    }
    else if (document.all) {
        // ie
        window.external.AddFavorite(url, title);
    }
}


async function FileReaderToImageData(n) {
    const t = new FileReader; return await new Promise((t, i) => {
        const r = new FileReader; r.onloadend = () => t(r.result); r.onerror = i;
        console.log("files", JSON.parse(JSON.stringify(files)));
        r.readAsDataURL(n[0]);
    });
}



async function UploadFile(files) {
    if (files.length > 0) {
        $("#ButtonDownloadFile").show(); $("#ButtonRemoveFile").show();

        const reader = new FileReader();
        uploadedFileContent = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(files[0]);
        });
        uploadedFileName = files[0].name;
    } else { ClearFile(); }

    /*
    HELP Available FILE Processing Types

    uploadedFileContent = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(files[0]);
    });

    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);

    fr = new FileReader();
    fr.onload = receivedBinary;
    fr.readAsBinaryString(file);
    */
}


function DownloadFile() {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = uploadedFileContent;
    a.download = uploadedFileName;
    document.body.appendChild(a);
    a.click();
}


function ClearFile() {
    try { Metro.getPlugin("#FormFile", 'file').clear(); } catch { }
    uploadedFileName = uploadedFileContent = "";
    $("#ButtonDownloadFile").hide();
    $("#ButtonRemoveFile").hide();
}
