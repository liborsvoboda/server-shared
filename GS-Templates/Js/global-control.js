//OBJECT Controls Library Show/Hide, Input/Output/Join Data  Control FrameWindow


function loadPage(url) {
	showPageLoading();
    $.ajax({
        url: url
    }).done(function (data) {
        $('#frameWindow').html(data);
		hidePageLoading();
    });
}


function ShowToolPanel(close) {
	$("#UserAutomaticTranslate").val('checked')[0].checked = Metro.storage.getItem('UserAutomaticTranslate', null);
	if (close) { { Metro.bottomsheet.close($('#toolPanel')); } } else {
		if (Metro.bottomsheet.isOpen($('#toolPanel'))) { Metro.bottomsheet.close($('#toolPanel')); }
		else { Metro.bottomsheet.open($('#toolPanel')); }
	}
}


function ShowMessagePanel(close) {
    OpenCharm(0);
    charms = Metro.getPlugin($("#charmPanel"), 'charms');
    if (close) {
        charms.close();
    } else { charms.toggle(); }
}


function ShowNewsInfoBox() {
    if (Metro.infobox.isOpen('#NewsInfoBox')) { Metro.infobox.close('#NewsInfoBox'); }
    else { GetNewsList(); }
};


function ChangeSource(url) {
    $("#FrameWindow").attr("src",url);
    ScrollToTop();
}


function ShowSource() {
    var source = "<html>";
    source += document.getElementsByTagName('html')[0].innerHTML;
    source += "</html>";
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    source = "<pre>" + source + "</pre>";
    sourceWindow = window.open('', 'Interaktnivní Kód', 'height=800,width=800,scrollbars=1,resizable=1');
    sourceWindow.document.write(source);
    sourceWindow.document.close();
    if (window.focus) sourceWindow.focus();
}


function ShowFrameSource() {
    var source = "<html>";
    source += window.frames['FrameWindow'].contentWindow.document.body.innerHTML;
    source += "</html>";
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    source = "<pre>" + source + "</pre>";
    sourceWindow = window.open('', 'Interaktnivní Kód', 'height=800,width=800,scrollbars=1,resizable=1');
    sourceWindow.document.write(source);
    sourceWindow.document.close();
    if (window.focus) sourceWindow.focus();
}
