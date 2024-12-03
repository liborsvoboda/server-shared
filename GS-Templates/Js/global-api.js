//Global API library 

//Run POST Api Request: bool, string, structuredObject
function RunServerPostApi(authRequired, apiPath, jsonData) {
    showPageLoading();
    var def = $.ajax({
        global: false, type: "POST", url: Metro.storage.getItem('ApiOriginSuffix', null) + apiUrl, dataType: 'json',
        headers: authRequired ? { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + Metro.storage.getItem('ApiToken', null) } : { 'Content-type': 'application/json' },
        data: JSON.stringify(jsonData)
    });

    def.fail(function (err) {
        notify.create(apiMessages[0].apiSaveFail, "Alert", { cls: "alert" }); notify.reset();
        hidePageLoading();
        return false;
    });

    def.done(function (data) {
        notify.create(apiMessages[0].apiSaveSuccess, "Info", { cls: "success" }); notify.reset();
        hidePageLoading();
        return true;
    });
}

//Run GET Api Request: bool, string, storageName 
function RunServerGetApi(authRequired, apiPath, storageName) {
    showPageLoading();
    $.ajax({
        url: Metro.storage.getItem('ApiOriginSuffix', null) + apiPath, dataType: 'json',
        type: "GET",
        headers: authRequired ? { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + Metro.storage.getItem('ApiToken', null) } : { 'Content-type': 'application/json' },
        success: function (apiData) {
            Metro.storage.setItem(storageName, JSON.parse(JSON.stringify(apiData)));
            notify.create(apiMessages[0].apiLoadSuccess, "Info", { cls: "success" }); notify.reset();
            hidePageLoading();
            return true;
        },
        error: function (error) {
            Metro.storage.setItem(storageName, null);
            notify.create(apiMessages[0].apiLoadFail, "Alert", { cls: "alert" }); notify.reset();
            hidePageLoading();
        }
    });
}



 
async function SendMessage() {
    showPageLoading();

    let response = await fetch(Metro.storage.getItem('ApiOriginSuffix', null) + '/WebPages/InsertMessage', {
        method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ message: $("#NewMessage").val() })

    });
    let result = await response.json();
    if (result.status == "error") {
        var notify = Metro.notify; notify.setup({ width: 300, duration: 1000, animation: 'easeOutBounce' });
        notify.create("Sending Messages Failed", "Alert", { cls: "alert" }); notify.reset();
        hidePageLoading();
    } else {
        var notify = Metro.notify; notify.setup({ width: 300, duration: 1000, animation: 'easeOutBounce' });
        notify.create("Děkuji za Zprávu", "Info", { cls: "success" }); notify.reset();
        $("#NewMessage").val(null);
        hidePageLoading();
        GetMessages();
    }
}

async function GetMessages() {
    showPageLoading();
    let response = await fetch(Metro.storage.getItem('ApiOriginSuffix', null) + '/WebPages/GetMessageList', {
        method: 'GET', headers: { 'Content-type': 'application/json'}
    });
    let result = await response.json();
    if (result.status == "error") {
        var notify = Metro.notify; notify.setup({ width: 300, duration: 1000, animation: 'easeOutBounce' });
        notify.create("Downloading Messages Failed", "Alert", { cls: "alert" }); notify.reset();
        hidePageLoading();
    } else {
        data = JSON.parse(JSON.stringify(result));

        let messageData = "";
        data.forEach(message => {
            messageData += "<div class=\"card image-header\"><div class=\"card-content p-2 op-lightBrown-low\"><p class=\"fg-black\">" + message.Name + "</p>" + JSON.stringify(message.Description) + "</div></div>";
        });
        $("#MessageBox").html(messageData);
        hidePageLoading();
    }
}

function GetNewsList() {
    if (Metro.storage.getItem('NewsList', null) == null) {
        showPageLoading();
        $.ajax({
            url: Metro.storage.getItem('ApiOriginSuffix', null) + '/WebPages/GetNewsList', dataType: 'json',
            type: "GET",
            headers: { 'Content-type': 'application/json' },
            success: function (data) {
                data = JSON.parse(JSON.stringify(data));
                Metro.storage.setItem('NewsList', data);
                let messageData = "";
                data.forEach(message => {
                    messageData += "<div class=\"card image-header\"><div class=\"card-content p-2\"><p class=\"fg-black\"><b>" + new Date(message.timeStamp).toLocaleDateString() + "</b> " + message.title + "</p>" + message.description + "</div></div>";
                });
                $("#NewsListBox").html(messageData);
                Metro.infobox.open('#NewsInfoBox');
                hidePageLoading();
            },
            error: function (error) {
                var notify = Metro.notify; notify.setup({ width: 300, duration: 1000, animation: 'easeOutBounce' });
                notify.create("Downloading Messages Failed", "Alert", { cls: "alert" }); notify.reset();
                hidePageLoading();
            }
        });
    } else {
        let data = Metro.storage.getItem('NewsList', null);
        let messageData = "";
        data.forEach(message => {
            messageData += "<div class=\"card image-header\"><div class=\"card-content p-2\"><p class=\"fg-black\"><b>" + new Date(message.timeStamp).toLocaleDateString() + "</b> " + message.title + "</p>" + message.description + "</div></div>";
        });
        $("#NewsListBox").html(messageData);
        Metro.infobox.open('#NewsInfoBox');
    }
}