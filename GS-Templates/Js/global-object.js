//Global OBJECT Library Definitions

var notify = Metro.notify; notify.setup({
    width: defaultSetting[0].notifyWidth,
    duration: defaultSetting[0].notifyDuration,
    animation: defaultSetting[0].notifyAnimation
});

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
 
 
 
//Blocked IP Info Panel
function ShowBlockedMessage() {
    var html_content =
        "<h3>Blokovaná IP Adresa</h3>" +
        "<p>Vaše adrese je blokována, protože byla zjištěna podezřelá činnost...</p>" +
        "<p>Pro Odblokování nás kontaktujte Telefonicky.</p>";
    Metro.infobox.create(html_content, "alert");
}

//Unauthorized Access Info Panel
function ShowUnAuthMessage() {
    Logout();
    var html_content =
        "<h3>Neautorizovaný Přístup</h3>" +
        "<p>Pokoušíte se provést autorizovanou operaci neoprávněně,</p>" +
        "<p>nebo platnost vašeho tokenu vypršela.</p>";
    Metro.infobox.create(html_content, "alert");
}

//Translation Tool Panel
function CreateToolPanel() {
    let html = '<div id="toolPanel" data-role="bottom-sheet" class="bottom-sheet pos-fixed list-list grid-style opened" style="top: 0px; left: 90%; z-index:10000;min-width: 430px;">';
    html += '<div class="c-pointer mif-cancel mif-1x icon pos-absolute fg-red" style="top:5px;right:5px;" onclick=ShowToolPanel(); ></div>';
    html += '<div class="w-100 text-left"> <audio id="radio" class="light bg-transparent" data-role="audio-player" data-src="/server-integrated/razor-pages/serverportal/media/hotel_california.mp3" data-volume=".5"></audio> </div>';
    html += '<div class="w-100 text-left" style="z-index: 1000000;"><div id="google_translate_element"></div></div>';
    html += '<div class="w-100 d-inline-flex"><div class="w-75 text-left">';
    html += '<input id="UserAutomaticTranslate" type="checkbox" data-role="checkbox" data-cls-caption="fg-cyan text-bold" data-caption="Auto Translate" onchange=UserChangeTranslateSetting(); checked >';
    html += '</div><div class="w-25 mt-1 text-right" style="max-width:25% !important;"><button class="button secondary mini" style="max-width:100% !important;" onclick=CancelTranslation(); >Cancel Translate</button></div>';
    html += '</div><div class="d-flex w-100" title="Theme">';
    let themes = [
        ["#585b5d", "darcula.css?white"], ["#AF0015", "red-alert.css?white"], ["#690012", "red-dark.css?white"], ["#0CA9F2", "sky-net.css?white"],
        ["#585b5d", "darcula.css?#585b5d"], ["#AF0015", "red-alert.css?#AF0015"], ["#690012", "red-dark.css?#690012"], ["#0CA9F2", "sky-net.css?#0CA9F2"]
    ];
    themes.forEach((theme, index) => {
        html += '<button class="button shadowed w-50px ' + (index < 4 ? "opc-05" : "") + ' mt-1" style="background-color: ' + theme[0] + ';" onclick="ChangeSchemeTo(\'' + theme[1] + '\')" ></button>';
        if (index == 3) { html += '</div><div class="d-flex w-100" title="BackGround">'; }
    });
}


function initCodeSamples() {
    var $source = $("#sourceCode");
    $("#codeExample").clickToggle(
        function () {
            $source.show("fast");
            if (!this.old) {
                this.old = $(this).html();
                $.get(this.href, function (code) {
                    code = code.replace(/<!-- Start_Exclude(.|\n|\r)*?End_Exclude -->/gi, "<!-- (Irrelevant source removed.) -->");
                    code = code.replace(/\t/g, "  ");
                    $source.text(code);
                    try {
                        prettyPrint();
                    } catch (e) {
                        alert(e);
                    }
                }, "html");
            }
            $(this).html("Hide source code");
        },
        function () {
            $(this).html(this.old);
            $source.hide("fast");
        }
    );
    if (jQuery.ui) {
        var info = "EIC&ESB Groupware Solution" + jQuery.ui.dynatree.version
            + ", jQuery UI " + jQuery.ui.version
            + ", jQuery " + jQuery.fn.jquery;
        $("p.sample-links").after("<p class='version-info'>" + info + "</p>");
    }
}