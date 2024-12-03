// METRO ENGINE 
// https://docs.metroui.org.ua/intro.html  
// CZECH DISTRIBUTION GroupWare - Solution.Eu && KlikneteZde.CZ

// Controls and Behaviors For MAIN Logic


function UserChangeTranslateSetting() {
    Metro.storage.setItem('UserAutomaticTranslate', $("#UserAutomaticTranslate").val('checked')[0].checked);
	if ($("#UserAutomaticTranslate").val('checked')[0].checked) { GoogleTranslateElementInit(); } else { CancelTranslation(); }
}

function hidePageLoading() { Metro.activity.close(pageLoader); }
function showPageLoading() {
	if (pageLoader != undefined) {
		if (pageLoader[0]["DATASET:UID:M4Q"] == undefined) { pageLoader = null; }
		else {
			try { Metro.activity.close(pageLoader); } catch {
				try { pageLoader.close(); } catch { pageLoader = pageLoader[0]["DATASET:UID:M4Q"].dialog; pageLoader.close(); }; pageLoader = null;
			}
		}
	}
	pageLoader = Metro.activity.open({ type: 'atom', style: 'dark', overlayClickClose: true, /*overlayColor: '#fff', overlayAlpha: 1*/ });
}


function ChangeSchemeTo(n) {
	$("#AppPanel").css({ backgroundColor: n.split("?")[1] });
	$("#portal-color-scheme").attr("href", window.location.origin + "/css/schemes/" + n.split("?")[0]);
    $("#scheme-name").html(n.split("?")[0]);
    Metro.storage.setItem('WebScheme', n.split("?")[0]);
}




function GoogleTranslateElementInit() {
    $(document).ready(function () {
        new google.translate.TranslateElement({
            pageLanguage: 'cs', //includedLanguages: 'en,cs',
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false
        }, 'google_translate_element');

        let autoTranslateSetting = Metro.storage.getItem('UserAutomaticTranslate', null) == null || Metro.storage.getItem('UserAutomaticTranslate', null) == false ? false : true;
        if (autoTranslateSetting && document.querySelector('#google_translate_element select') != null) {
            setTimeout(function () {
                let selectElement = document.querySelector('#google_translate_element select');
                selectElement.value = Metro.storage.getItem('DetectedLanguage', null);
                selectElement.dispatchEvent(new Event('change'));
            }, 1000);
        }
    });
}


function CancelTranslation() {
    Metro.storage.setItem('UserAutomaticTranslate', false);
    $("#UserAutomaticTranslate")[0].checked = false;

    setTimeout(function () {
        let selectElement = document.querySelector('#google_translate_element select');
        if (GetGoogleOptionLanguageIndex("") == 0) {
            selectElement.selectedIndex = 0; ShowToolPanel();
        } else { selectElement.selectedIndex = GetGoogleOptionLanguageIndex("en"); }
        selectElement.dispatchEvent(new Event('change'));
        if (selectElement.value != '') {
            setTimeout(function () {
                if (GetGoogleOptionLanguageIndex("") == 0) {
                    selectElement.selectedIndex = 0; ShowToolPanel();
                } else { selectElement.selectedIndex = GetGoogleOptionLanguageIndex("en"); }
                selectElement.dispatchEvent(new Event('change'));
                if (selectElement.value != '') {
                    setTimeout(function () {
                        if (GetGoogleOptionLanguageIndex("") == 0) {
                            selectElement.selectedIndex = 0; ShowToolPanel();
                        } else { selectElement.selectedIndex = GetGoogleOptionLanguageIndex("en"); }
                        selectElement.dispatchEvent(new Event('change'));
                    }, 2000);
                }
            }, 2000);
        }
    }, 1000);
}


async function AdminLogin(data) {
    Cookies.set('ApiToken', data.Token);
    Metro.storage.setItem('ApiToken', data.Token);
    Metro.storage.setItem('User', data);

    window.location.href = '/' + Metro.storage.getItem('WebMenuList', null)[0].id + "-" + Metro.storage.getItem('WebMenuList', data.Token)[0].name.replace(/\s+/g, '');
}


function Logout() {
    Cookies.remove('ApiToken');
    Metro.storage.storage.clear();
    window.location.href = Metro.storage.getItem('DefaultPath', null);
}


//Load Metro
async function LoadMetro() {
    const pathCss = './metro/css/metro-all.min.css';
    const pathThemeCss = './metro/css/schemes/sky-net.css';
    const pathJs = './metro/js/metro.4.5.2.min.js?v=4.5.2';

    const dataCss = await fetch(pathCss).then((r) => r.text());
    const dataThemeCss = await fetch(pathThemeCss).then((r) => r.text());

    const myFont = new FontFace('metro', "url('./metro/mif/metro.svg') format('svg'), url('./metro/mif/metro.woff') format('woff'), url('./metro/mif/metro.ttf') format('truetype')");
    await myFont.load(); document.fonts.add(myFont);

    const dataJs = await fetch(pathJs).then((r) => r.text())

    const style = document.createElement("style")
    style.textContent = dataCss
    document.querySelector("head").appendChild(style)

    style.textContent = dataThemeCss
    document.querySelector("head").appendChild(style)

    new Function(dataJs)();
    Metro.init();
    Metro.toast.create("Metro 4 did loaded successful!", { showTop: true, clsToast: "success" });
    $("#a1").accordion()
}


//Unload Metro 
function UnloadMetro() {
    delete Metro;
}