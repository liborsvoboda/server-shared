
//Loading Data from XML by URL param
function loadData() {
	fetch("/www/data/nabidky.xml")
  .then((asyncRes) => asyncRes.text())
  .then((tmpRes) => { 
		const tmpParser = new DOMParser();
    let tmpDoc = tmpParser.parseFromString(tmpRes, "text/xml").getElementsByTagName("data");
		let tmpDataset = tmpDoc.item("data");
		const tmpId = new URLSearchParams(window.location.search).get("id");
		
		if(tmpId != null) {
			try {
		  	const tmpData = tmpDataset.getElementsByTagName("nabidka")[tmpId];
				tmpData.childNodes.forEach(param => { 
					try{
						let targetElement = document.getElementById(param.nodeName);
						if (targetElement != null) {
							if(param.innerHTML != null && param.textContent != "") {targetElement.innerText = param.textContent;}	
							else if (param.attributes.name != undefined) {targetElement.innerText = param.attributes.name.textContent; }
						}
					} catch (ex) {}
				});
			} catch (ex) {}
		}
		//window.tmpDoc = tmpDataset;
  });
}

loadData();

