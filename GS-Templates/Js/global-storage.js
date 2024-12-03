// METRO ENGINE Easy Interactive Solution For SYSTEMS, WEBS, PORTALS, ETC....
// https://docs.metroui.org.ua/intro.html

// CZECH DISTRIBUTION GroupWare-Solution.Eu && KlikneteZde.CZ
// STORAGE LOAD FIRST

let pageLoader;

let apiMessages = [
    { apiSaveSuccess: "Saving Data was Saved Sucessfully" },
    { apiSaveFail: "Saving Data was Failed" },
    { apiLoadSuccess: "Saving Data was Saved Sucessfully" },
    { apiLoadFail: "Saving Data was Failed" }
];

let defaultSetting = [
    { notifyWidth: 300 },
    { notifyDuration: 1000 },
    { notifyAnimation: "easeOutBounce" }
];




// You Can Set External Backend Server Example 
// Metro.storage.setItem('BackendServerAddress', "https://kliknetezde.cz");
Metro.storage.setItem('BackendServerAddress', window.location.origin);


Metro.storage.setItem('DetectedLanguage', (navigator.language || navigator.userLanguage).substring(0, 2));
if (Metro.storage.getItem('UserAutomaticTranslate', null) == null) { Metro.storage.setItem('UserAutomaticTranslate', false); }
if (Metro.storage.getItem('WebScheme', null) == null) {
	Metro.storage.setItem('WebScheme', "sky-net.css");
	ChangeSchemeTo(Metro.storage.getItem('WebScheme', null));
} else { ChangeSchemeTo(Metro.storage.getItem('WebScheme', null)); }



/*Start Set Global Constants*/
Metro.storage.setItem('ApiOriginSuffix', Metro.storage.getItem('BackendServerAddress', null) + "/WebApi");
Metro.storage.setItem('DefaultPath', Metro.storage.getItem('DefaultPath', null) == null ? window.location.href : Metro.storage.getItem('DefaultPath', null));


//Start Set User Default Setting
if (Metro.storage.getItem('UserAutomaticTranslate', null) == null) { Metro.storage.setItem('UserAutomaticTranslate', false); }










