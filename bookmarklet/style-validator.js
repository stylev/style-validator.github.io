javascript:"use strict";var STYLEV=STYLEV||{};STYLEV.isChrome=navigator.userAgent.toLowerCase().indexOf("chrome")>-1&&navigator.userAgent.toLowerCase().indexOf("opr")<0,STYLEV.isChromeExtension=function(){try{return chrome.runtime.onMessage.addListener(function(){}),!0}catch(e){return!1}}(),STYLEV.isBookmarklet=STYLEV.isChrome?!STYLEV.isChromeExtension:!0,STYLEV.isReLoaded=void 0!==STYLEV.VALIDATOR,STYLEV.isLoaded=!STYLEV.isReLoaded,STYLEV.isFirstExecution=!0,STYLEV.isValidated=!1,STYLEV.options={ENABLE_MUTATION_OBSERVER:!0,ENABLE_AUTO_EXECUTION:!1,ENABLE_ANIMATION:!1,SCOPE_SELECTORS:!1,SCOPE_SELECTORS_TEXT:"",IGNORE_SELECTORS:!1,IGNORE_SELECTORS_TEXT:"",URL_FILTER:"/Style-Validator/page/rules.html"},STYLEV.isPassedFilter=-1===location.href.indexOf(STYLEV.options.URL_FILTER),STYLEV.affectedElemsStylevId=STYLEV.affectedElemsStylevId||[],STYLEV.ignoreElemsStylevId=STYLEV.ignoreElemsStylevId||[],STYLEV.sameElemCount=STYLEV.sameElemCount||0,STYLEV.consoleWrapperHeight=STYLEV.consoleWrapperHeight||0,STYLEV.consoleScrollTop=STYLEV.consoleScrollTop||0,STYLEV.selectedLineInConsole=STYLEV.selectedLineInConsole||null,STYLEV.VALIDATOR={execute:function(e){var t=STYLEV.VALIDATOR;return STYLEV.isFirstExecution?(t.setParameters(),void Promise.all([t.getDataFromURL(t.settings.RULES_PATH).then(JSON.parse),t.getDataFromURL(t.settings.TAGS_ALL_PATH).then(JSON.parse),t.getDataFromURL(t.settings.EMPTY_TAGS_PATH).then(JSON.parse),t.getDataFromURL(t.settings.TAGS_REPLACED_ELEMENT_PATH).then(JSON.parse),t.getDataFromURL(t.settings.TAGS_TABLE_CHILDREN_PATH).then(JSON.parse)].concat(t.insertLibs4Bookmarklet())).then(function(o){t.rulesData=o[0],t.tagsAllData=o[1],t.tagsEmptyData=o[2],t.tagsReplacedElementData=o[3],t.tagsTableChildren=o[4],t.regexAllHTMLTag=new RegExp(" "+t.tagsAllData.join(" | ")+" "),t.regexEmptyElem=new RegExp("^( "+t.tagsEmptyData.join(" | ")+" )"),t.regexReplacedElem=new RegExp("^( "+t.tagsReplacedElementData.join(" | ")+" )"),t.regexTableChildElem=new RegExp("^( "+t.tagsTableChildren.join(" | ")+" )"),t.updateOptions().then(function(){t.moManager=t.setupMutationObserver(),t.validate(e),STYLEV.isFirstExecution=!1})})):(t.validate(e),!1)},setParameters:function(){var e=STYLEV.VALIDATOR;e.html=document.querySelector("html"),e.head=document.querySelector("head"),e.body=document.querySelector("body"),e.htmlDefaultBorderBottomWidth=""===e.html.style.borderBottomWidth?null:e.html.style.borderBottomWidth,e.RESOURCE_ROOT=e.RESOURCE_ROOT||"https://style-validator.github.io/Style-Validator/extension/",e.isObserving=!1,e.isUpdated=!1,e.settings={CONSOLE_WRAPPER_ID:"stylev-console-wrapper",CONSOLE_LIST_ID:"stylev-console-list",STYLESHEET_ID:"stylev-stylesheet",CONSOLE_WRAPPER_DEFAULT_HEIGHT:200,CONSOLE_HEADING_TEXT:"Style Validator",CONGRATULATION_MESSAGE_TEXT:"It's Perfect!",STYLESHEET_PATH:e.RESOURCE_ROOT+"style-validator-for-elements.css",SPECIFICITY_PATH:e.RESOURCE_ROOT+"specificity.js",GA_PATH:e.RESOURCE_ROOT+"google-analytics.js",RULES_PATH:e.RESOURCE_ROOT+"data/rules.json",TAGS_ALL_PATH:e.RESOURCE_ROOT+"data/tags-all.json",EMPTY_TAGS_PATH:e.RESOURCE_ROOT+"data/tags-empty.json",TAGS_REPLACED_ELEMENT_PATH:e.RESOURCE_ROOT+"data/tags-replaced-element.json",TAGS_TABLE_CHILDREN_PATH:e.RESOURCE_ROOT+"data/tags-table-children.json",ICON_REFRESH_PATH:e.RESOURCE_ROOT+"iconmonstr-refresh-3-icon.svg",ICON_REFRESH_ACTIVE_PATH:e.RESOURCE_ROOT+"iconmonstr-refresh-3-icon-active.svg",ICON_CLOSE_PATH:e.RESOURCE_ROOT+"iconmonstr-x-mark-icon.svg",ICON_MINIMIZE_PATH:e.RESOURCE_ROOT+"iconmonstr-minus-2-icon.svg",ICON_NORMALIZE_PATH:e.RESOURCE_ROOT+"iconmonstr-plus-2-icon.svg",ICON_CONNECTED_PATH:e.RESOURCE_ROOT+"iconmonstr-link-4-icon.svg",ICON_DISCONNECTED_PATH:e.RESOURCE_ROOT+"iconmonstr-link-5-icon.svg",ICON_LOGO_PATH:e.RESOURCE_ROOT+"style-validator.logo.black.svg",CONNECTED_2_DEVTOOLS_MESSAGE:"Connected to DevTools",DISCONNECTED_2_DEVTOOLS_MESSAGE:"Disconnected to DevTools",CONNECTED_2_DEVTOOLS_CLASS:"stylev-console-mode-devtools-connected",DISCONNECTED_2_DEVTOOLS_CLASS:"stylev-console-mode-devtools-disconnected"}},getDataFromURL:function(e){return new Promise(function(t,o){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onload=function(){200===n.status?t(n.responseText):o(new Error(n.statusText))},n.onerror=function(){o(new Error(n.statusText))},n.send()})},getScriptFromURL:function(e,t){var o=STYLEV.VALIDATOR;return new Promise(function(n,s){var a=document.createElement("script");a.src=e,a.classList.add("stylev-ignore"),a.addEventListener("load",function(){n()},!1),a.addEventListener("error",function(e){s(new URIError("The script "+e.target.src+" is not accessible."))},!1),t?t.appendChild(a):o.head.appendChild(a)})},insertLibs4Bookmarklet:function(){var e=STYLEV.VALIDATOR;if(STYLEV.isBookmarklet){var t=[e.settings.SPECIFICITY_PATH],o=[],n=document.createDocumentFragment();STYLEV.METHODS.each(t,function(t){return document.querySelectorAll('script[src="'+t+'"]').length?"continue":void o.push(e.getScriptFromURL(t,n))}),e.head.appendChild(n)}return o},insertGA:function(){var e=STYLEV.VALIDATOR;void 0!==e.scriptTagGA&&e.scriptTagGA.parentElement.removeChild(e.scriptTagGA),e.scriptTagGA=document.createElement("script"),e.scriptTagGA.src=e.settings.GA_PATH,e.scriptTagGA.async="async",e.scriptTagGA.id="stylev-ga",e.scriptTagGA.classList.add("stylev-ignore"),e.head.appendChild(e.scriptTagGA)},updateOptions:function(){STYLEV.VALIDATOR;return new Promise(function(e,t){STYLEV.isChromeExtension?chrome.storage.sync.get("options",function(t){void 0!==t.options&&(STYLEV.options={ENABLE_MUTATION_OBSERVER:t.options.enabledMutationObserver,ENABLE_AUTO_EXECUTION:t.options.enableAutoExecution,ENABLE_ANIMATION:t.options.enableAnimation,SCOPE_SELECTORS:t.options.scopeSelectors,SCOPE_SELECTORS_TEXT:t.options.scopeSelectorsText?t.options.scopeSelectorsText.split(","):"",IGNORE_SELECTORS:t.options.ignoreSelectors,IGNORE_SELECTORS_TEXT:t.options.ignoreSelectorsText?t.options.ignoreSelectorsText.split(","):"",URL_FILTER:t.options.urlFilter}),e()}):e()})},validate:function(e){console.info("Validator is starting...");var t=STYLEV.VALIDATOR;t.initializeBeforeValidation();for(var o=0;o<t.allElemLength;o++){var n={};n.targetElem=t.allElem[o],n.targetElemTagName=n.targetElem.tagName.toLowerCase(),n.targetElemDefault=t.iframeDocument.querySelector(n.targetElemTagName);var s=t.regexAllHTMLTag.test(" "+n.targetElemTagName+" ");if(s&&"style"!==n.targetElemTagName){n.targetElemStyles=getComputedStyle(n.targetElem,""),n.targetParentElem=n.targetElem.parentElement||null,n.targetParentElem&&(n.targetElemParentStyles=getComputedStyle(n.targetParentElem,""),n.targetElemParentDisplayProp=n.targetElemParentStyles.getPropertyValue("display")),n.targetElemDisplayPropVal=n.targetElemStyles.getPropertyValue("display"),n.targetElemDefaultDisplayProp=t.getStyle(n.targetElemDefault,"display");var a=t.regexEmptyElem.test(" "+n.targetElemTagName+" "),r=t.regexReplacedElem.test(" "+n.targetElemTagName+" ");"html"!==n.targetElemTagName;STYLEV.METHODS.each(t.rulesData,function(e){var o=!0,s=e["base-styles"],i=e["ng-styles"],l=e.replaced,c=e.empty,d="";return n.isDisplayPropChanged=!1,"Replaced elements"!==l||r?"Non-replaced elements"===l&&r?"continue":"Empty elements"!==c||a?(STYLEV.METHODS.each(s,function(e,t){d+=e+": ",d+=t+";";var s=getComputedStyle(n.targetElem,"").getPropertyValue(e),a=t===s;return a?void 0:(o=!1,"break")}),void(o&&STYLEV.METHODS.each(i,function(o,s){STYLEV.METHODS.each(s,function(s,a){t.detectError(o,s,a,e,n,d)})}))):"continue":"continue"}),n.targetElem.classList.contains("stylev-target-error")||n.targetElem.classList.contains("stylev-target-warning")||n.targetElem.classList.remove("stylev-target-selected")}else console.info("Unsupported Tag")}t.removeIframe4getDefaultStyles(),t.showConsole(),t.bind4targetElements(),"function"==typeof e&&e(),t.insertGA(),console.info("Validated and Console Displayed"),t.moManager.connect(),STYLEV.isValidated=!0},detectError:function(e,t,o,n,s,a){var r,i=STYLEV.VALIDATOR,l={},c=e.split("-"),d=s.targetParentElem&&"parent"===c[0],E="pseudo"===c[0]?c[1]:null,m=i.getStyle(s.targetElemDefault,t,E),g=i.getStyle(s.targetElem,t,E);o instanceof Array&&(l.comment=o[1]||null,l.referenceURL=o[2]||null,o=o[0]);var u=0===o.indexOf("!"),T=o.match(/^!{0,1}\[(.+)\]$/);o=T?T[1]:o.replace("!","");var p=o.split("|").length>1;if(o=p?o.split("|"):o,r=p?new RegExp(" "+o.join(" | ")+" "):new RegExp(" "+o+" "),s.targetParentElem){var v=s.targetElemParentStyles.getPropertyValue(t);if("line-height"===t){var S=parseFloat(s.targetElemStyles.getPropertyValue("font-size")),h=parseFloat(s.targetElemParentStyles.getPropertyValue("font-size")),L=h/S,y=1.14;g="normal"===g?S*y+"px":g,v="normal"===v?i.controlFloat(h*y,1)+"px":v}}var f=r.test(" "+g+" "),O=parseInt(g,10)>0,C=parseInt(g,10)<0,A=0===parseInt(g,10),V=g===m,R=i.controlFloat(parseFloat(g)*L,1)!==i.controlFloat(parseFloat(v),1),_=g===v,D=r.test(" "+s.targetElemParentDisplayProp+" ");(!u&&f||!u&&"over-0"===o&&O||!u&&"under-0"===o&&C||!u&&"default"===o&&V||!u&&"inherit"===o&&"line-height"===t&&R||!u&&"inherit"===o&&_||!u&&d&&D||u&&"0"===o&&!A||u&&"default"===o&&!V||u&&"inherit"===o&&"line-height"===t&&!R||u&&"inherit"===o&&!_||u&&d&&!D)&&(s.targetElem.classList.contains("stylev-target-error")||s.targetElem.classList.contains("stylev-target-warning")||i.errorIndex++,s.targetElem.dataset.stylevid=i.errorIndex,d?l.text="["+n.title+"] <"+s.targetElemTagName+"> "+a+" parent element's style is "+t+": "+v+"; "+l.comment:l.text="["+n.title+"] <"+s.targetElemTagName+"> "+a+" "+t+": "+g+"; "+l.comment,l.idName=s.targetElem.dataset.stylevid,l.errorLevel=c[c.length-2],i.resultArray.push(l),"error"===l.errorLevel&&s.targetElem.classList.add("stylev-target-error"),"warning"===l.errorLevel&&s.targetElem.classList.add("stylev-target-warning"))},initializeBeforeValidation:function(){var e=STYLEV.VALIDATOR;STYLEV.isValidated&&e.destroy(),e.allElem=document.querySelectorAll("*:not(.stylev-ignore)"),e.allElemLength=e.allElem.length,e.resultArray=[],e.errorNum=0,e.warningNum=0,e.errorIndex=0,e.isUpdated&&(e.isUpdated=!1,e.consoleRefreshButtonImage.src=e.settings.ICON_REFRESH_PATH,e.consoleRefreshButtonImage.classList.remove("stylev-console-refresh-button-image-active")),void 0!==e.observationTimer&&clearTimeout(e.observationTimer),e.insertIframe4getDefaultStyles(),e.setStyleDataBySelectors(document),e.setStyleDataByElements(document),e.setStyleDataBySelectors(e.iframeDocument),e.setStyleDataByElements(e.iframeDocument)},setupMutationObserver:function(){var e=STYLEV.VALIDATOR,t=["style","class"],o=3e3,n=5e3;e.moMessageArray=[];var s=!0;e.observer=new MutationObserver(function(t){e.informUpdating();e:for(var a=0,r=t.length;r>a;a++){var i=t[a],l=new RegExp(" "+STYLEV.ignoreElemsStylevId.join(" | ")+" ");if(!l.test(" "+i.target.dataset.stylevid+" ")&&!i.target.classList.contains("stylev-ignore")){for(var c=0,d=i.addedNodes,E=d.length;E>c;c++){var m=d[c];if("script"===m.tagName.toLocaleLowerCase()&&-1!==m.src.indexOf("analytics.js"))continue e}for(var g=0,u=i.removedNodes,T=u.length;T>g;g++){var p=u[g];if("script"===p.tagName.toLocaleLowerCase()&&-1!==p.src.indexOf("analytics.js"))continue e}if(s=!1,STYLEV.affectedElemsStylevId.length&&(i.target.dataset.stylevid===STYLEV.affectedElemsStylevId[STYLEV.affectedElemsStylevId.length-1]?STYLEV.sameElemCount++:STYLEV.sameElemCount=0),STYLEV.sameElemCount<5?STYLEV.affectedElemsStylevId.push(i.target.dataset.stylevid):(STYLEV.affectedElemsStylevId=[],STYLEV.sameElemCount=0,STYLEV.ignoreElemsStylevId.push(i.target.dataset.stylevid)),i.target.tagName){for(var v=[],S=0,h=i.target.attributes,L=h.length;L>S;S++){var y=h[S];v.push(" "+y.nodeName+'="'+y.nodeValue+'"')}e.moMessageArray.push("<"+i.target.tagName.toLowerCase()+v.join(" ")+">")}"attributes"===i.type&&e.moMessageArray.push(i.attributeName+" "+i.type+' of above is changed from "'+i.oldValue+'".'),"characterData"===i.type&&e.moMessageArray.push(i.characterData+" "+i.type+' of above is changed from "'+i.oldValue+'".');for(var f=0,d=i.addedNodes,E=d.length;E>f;f++){var m=d[f];e.moMessageArray.push(m.outerHTML+" is added.")}for(var O=0,u=i.removedNodes,C=u.length;C>O;O++){var p=u[O];e.moMessageArray.push(p.outerHTML+" is removed.")}console.info("DOM modified...")}}void 0!==e.observationTimer&&clearTimeout(e.observationTimer),e.observationTimer=setTimeout(function(){s||(STYLEV.isChromeExtension&&STYLEV.CHROME_EXTENSION.execute(),STYLEV.isBookmarklet&&e.execute(),console.info(e.moMessageArray.join("\n\n")),e.moMessageArray=[],s=!0)},o),e.resetTImer=setInterval(function(){STYLEV.ignoreElemsStylevId=[]},n)});var a={attributes:!0,attributeFilter:t,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0};return{connect:function(){return STYLEV.options.ENABLE_MUTATION_OBSERVER?void(e.isObserving||(e.observer.observe(e.body,a),e.observer.observe(e.head,a),e.isObserving=!0,console.info("Mutation Observer has connected"))):!1},disconnect:function(){return STYLEV.options.ENABLE_MUTATION_OBSERVER?void(e.isObserving&&(clearTimeout(e.observationTimer),clearTimeout(e.resetTImer),e.observer.disconnect(),e.isObserving=!1,console.info("Mutation Observer has disconnected"))):!1}}},insertStylesheet:function(){var e=STYLEV.VALIDATOR;e.linkTag=document.createElement("link"),e.linkTag.id=e.settings.STYLESHEET_ID,e.linkTag.rel="stylesheet",e.linkTag.type="text/css",e.linkTag.classList.add("stylev-ignore"),e.linkTag.href=e.settings.STYLESHEET_PATH,e.head.appendChild(e.linkTag)},removeStylesheet:function(){var e=STYLEV.VALIDATOR;e.linkTag.parentElement.removeChild(e.linkTag)},removeConsole:function(){var e=STYLEV.VALIDATOR;e.consoleWrapper.parentElement.removeChild(e.consoleWrapper),e.html.style.setProperty("border-bottom-width",e.htmlDefaultBorderBottomWidth,"")},insertIframe4getDefaultStyles:function(){var e=STYLEV.VALIDATOR;e.iframe4test=document.createElement("iframe"),e.iframe4test.id="stylev-dummy-iframe",e.html.appendChild(e.iframe4test),e.iframeWindow=e.iframe4test.contentWindow,e.iframeDocument=e.iframeWindow.document,e.iframeBody=e.iframeDocument.querySelector("body");var t=document.createDocumentFragment();STYLEV.METHODS.each(e.tagsAllData,function(e,o){t.appendChild(document.createElement(e))}),e.iframeBody.appendChild(t)},removeIframe4getDefaultStyles:function(){var e=STYLEV.VALIDATOR;e.iframe4test.parentElement.removeChild(e.iframe4test)},removeAllAttrAndEvents:function(){var e=STYLEV.VALIDATOR;STYLEV.METHODS.each(e.allElem,function(t){t.removeAttribute("data-stylevid"),t.removeAttribute("data-stylevclass"),t.classList.remove("stylev-target-error"),t.classList.remove("stylev-target-warning"),t.removeEventListener("click",STYLEV.CHROME_DEVTOOLS.inspectFromTargets),t.removeEventListener("click",e.markElementFromTargets)}),void 0!==e.html&&e.html.removeEventListener("keyup",e.destroyByEsc)},informUpdating:function(){var e=STYLEV.VALIDATOR;return e.isUpdated?!1:(e.isUpdated=!0,e.consoleRefreshButtonImage.src=e.settings.ICON_REFRESH_ACTIVE_PATH,void e.consoleRefreshButtonImage.classList.add("stylev-console-refresh-button-image-active"))},insertStyle2ShadowDOM:function(){var e=STYLEV.VALIDATOR;e.consoleWrapperShadowRoot.innerHTML='<style>@import "'+e.RESOURCE_ROOT+'style-validator-for-console.css";</style>'},showConsole:function(){var e=STYLEV.VALIDATOR;e.docFlag=document.createDocumentFragment(),e.consoleWrapper=document.createElement("div"),e.consoleWrapperShadowRoot=e.consoleWrapper.createShadowRoot(),e.consoleHeader=document.createElement("header"),e.consoleHeading=document.createElement("h1"),e.consoleHeadingLogo=document.createElement("a"),e.consoleHeadingLogoImage=document.createElement("img"),e.consoleMode=document.createElement("p"),e.consoleButtons=document.createElement("div"),e.consoleRefreshButton=document.createElement("a"),e.consoleRefreshButtonImage=document.createElement("img"),e.consoleCounter=document.createElement("div"),e.consoleBody=document.createElement("div"),e.consoleList=document.createElement("ul"),e.consoleCloseButton=document.createElement("a"),e.consoleCloseButtonImage=document.createElement("img"),e.consoleMinimizeButton=document.createElement("a"),e.consoleMinimizeButtonImage=document.createElement("img"),e.consoleNormalizeButton=document.createElement("a"),e.consoleNormalizeButtonImage=document.createElement("img"),e.isMouseDownConsoleHeader=!1,e.consoleStartPosY=0,e.consoleCurrentPosY=0,e.consoleDiffPosY=0,e.consoleWrapper.id=e.settings.CONSOLE_WRAPPER_ID,e.consoleWrapper.classList.add("stylev-ignore"),e.consoleList.id=e.settings.CONSOLE_LIST_ID,e.consoleHeader.classList.add("stylev-console-header"),e.consoleHeading.classList.add("stylev-console-heading"),e.consoleHeadingLogo.classList.add("stylev-console-heading-logo"),e.consoleHeadingLogoImage.classList.add("stylev-console-heading-logo-image"),e.consoleHeadingLogoImage.src=e.settings.ICON_LOGO_PATH,e.consoleMode.classList.add("stylev-console-mode"),e.consoleButtons.classList.add("stylev-console-buttons"),e.consoleRefreshButton.href="javascript: void(0);",e.consoleRefreshButton.classList.add("stylev-console-refresh-button"),e.consoleRefreshButtonImage.classList.add("stylev-console-refresh-button-image"),e.consoleRefreshButtonImage.src=e.settings.ICON_REFRESH_PATH,e.consoleCounter.classList.add("stylev-console-counter"),e.consoleBody.classList.add("stylev-console-body"),e.consoleList.classList.add("stylev-console-list"),e.consoleCloseButton.href="javascript: void(0);",e.consoleCloseButton.classList.add("stylev-console-close-button"),e.consoleCloseButtonImage.classList.add("stylev-console-close-button-image"),e.consoleCloseButtonImage.src=e.settings.ICON_CLOSE_PATH,e.consoleMinimizeButton.href="javascript: void(0);",e.consoleMinimizeButton.classList.add("stylev-console-minimize-button"),e.consoleMinimizeButtonImage.classList.add("stylev-console-minimize-button-image"),e.consoleMinimizeButtonImage.src=e.settings.ICON_MINIMIZE_PATH,e.consoleNormalizeButton.href="javascript: void(0);",e.consoleNormalizeButton.hidden=!0,e.consoleNormalizeButton.classList.add("stylev-console-normalize-button"),e.consoleNormalizeButtonImage.classList.add("stylev-console-normalize-button-image"),e.consoleNormalizeButtonImage.src=e.settings.ICON_NORMALIZE_PATH,e.insertStyle2ShadowDOM(),e.createMessagesInConsole(),e.bindEvents2Console(),e.consoleHeadingText=document.createTextNode(e.settings.CONSOLE_HEADING_TEXT),e.consoleCounter.textContent="Total: "+e.resultArray.length+" / Error: "+e.errorNum+" / Warning: "+e.warningNum,e.consoleHeadingLogo.appendChild(e.consoleHeadingLogoImage),e.consoleHeading.appendChild(e.consoleHeadingLogo),e.consoleRefreshButton.appendChild(e.consoleRefreshButtonImage),e.consoleNormalizeButton.appendChild(e.consoleNormalizeButtonImage),e.consoleMinimizeButton.appendChild(e.consoleMinimizeButtonImage),e.consoleCloseButton.appendChild(e.consoleCloseButtonImage),e.consoleButtons.appendChild(e.consoleRefreshButton),e.consoleButtons.appendChild(e.consoleMinimizeButton),e.consoleButtons.appendChild(e.consoleNormalizeButton),e.consoleButtons.appendChild(e.consoleCloseButton),e.consoleHeader.appendChild(e.consoleHeading),e.consoleHeader.appendChild(e.consoleButtons),e.consoleHeader.appendChild(e.consoleCounter),e.consoleHeader.appendChild(e.consoleMode),e.consoleWrapperShadowRoot.appendChild(e.consoleHeader),e.consoleWrapperShadowRoot.appendChild(e.consoleBody),e.consoleList.appendChild(e.docFlag),e.consoleBody.appendChild(e.consoleList),e.html.appendChild(e.consoleWrapper),e.doAfterShowingConsole()},doAfterShowingConsole:function(){var e=STYLEV.VALIDATOR;setTimeout(function(){e.consoleWrapper.style.setProperty("height",(STYLEV.consoleWrapperHeight||e.settings.CONSOLE_WRAPPER_DEFAULT_HEIGHT)+"px",""),e.consoleWrapperDynamicHeight=parseInt(e.consoleWrapper.offsetHeight,10),e.html.style.setProperty("border-bottom-width",e.consoleWrapperDynamicHeight+"px","important"),e.send2ChromeExtension(),e.restorePreviousCondition()},0)},send2ChromeExtension:function(){var e=STYLEV.VALIDATOR;STYLEV.isChromeExtension&&(chrome.runtime.sendMessage({setBadgeText:e.resultArray.length}),chrome.runtime.sendMessage({name:"switchMode"},function(t){if(void 0!==t.isConnected2Devtools){var o=document.createElement("img"),n=document.createTextNode(t.isConnected2Devtools?e.settings.CONNECTED_2_DEVTOOLS_MESSAGE:e.settings.DISCONNECTED_2_DEVTOOLS_MESSAGE);o.classList.add("stylev-console-mode-image"),o.src=t.isConnected2Devtools?e.settings.ICON_CONNECTED_PATH:e.settings.ICON_DISCONNECTED_PATH,e.consoleMode.appendChild(o),e.consoleMode.appendChild(n),e.consoleMode.classList.add(t.isConnected2Devtools?e.settings.CONNECTED_2_DEVTOOLS_CLASS:e.settings.DISCONNECTED_2_DEVTOOLS_CLASS)}}))},restorePreviousCondition:function(){var e=STYLEV.VALIDATOR;if(setTimeout(function(){e.consoleList.scrollTop=STYLEV.consoleScrollTop},0),e.consoleList.addEventListener("scroll",function(){STYLEV.consoleScrollTop=event.currentTarget.scrollTop}),"function"==typeof STYLEV.CHROME_DEVTOOLS.inspectOfConsoleAPI&&STYLEV.CHROME_DEVTOOLS.inspectOfConsoleAPI(),STYLEV.selectedLineInConsole){var t=e.consoleList.querySelectorAll("li");STYLEV.METHODS.each(t,function(e){return e.isEqualNode(STYLEV.selectedLineInConsole)?(e.classList.add("stylev-trigger-selected"),"break"):void 0})}},createMessagesInConsole:function(){var e=STYLEV.VALIDATOR;0===e.resultArray.length?(e.congratulationsMessage=document.createElement("li"),e.congratulationsMessage.classList.add("stylev-console-perfect"),e.congratulationsMessage.textContent=e.settings.CONGRATULATION_MESSAGE_TEXT,e.docFlag.appendChild(e.congratulationsMessage)):STYLEV.METHODS.each(e.resultArray,function(t){var o=document.createElement("li"),n=document.createElement("a"),s=document.createElement("span"),a=document.createElement("a");n.href="javascript: void(0);",n.addEventListener("click",e.markElementFromConsole.bind(e,t),!1),n.textContent=t.text,s.textContent=t.idName,a.textContent="?",n.dataset.stylevconsoleid=t.idName,n.classList.add("stylev-console-list-anchor"),s.classList.add("stylev-console-list-logid"),a.classList.add("stylev-console-list-reference"),a.href=t.referenceURL,"error"===t.errorLevel&&(o.classList.add("stylev-trigger-error"),e.errorNum++),"warning"===t.errorLevel&&(o.classList.add("stylev-trigger-warning"),e.warningNum++),o.appendChild(n),s.appendChild(a),o.appendChild(s),e.docFlag.appendChild(o)})},bindEvents2Console:function(){var e=STYLEV.VALIDATOR;e.consoleWrapper.addEventListener("click",e.stopPropagation,!1),e.consoleHeader.addEventListener("mousedown",e.initConsoleHeader,!1),e.html.addEventListener("mousemove",e.moveConsoleHeader,!1),e.html.addEventListener("mouseup",e.offConsoleHeader,!1),e.consoleCloseButton.addEventListener("click",e.destroy,!1),e.consoleRefreshButton.addEventListener("click",e.validate,!1),e.consoleMinimizeButton.addEventListener("click",e.minimize,!1),e.consoleNormalizeButton.addEventListener("click",e.normalize,!1),e.html.addEventListener("keyup",e.destroyByEsc,!1)},stopPropagation:function(e){e.stopPropagation()},initConsoleHeader:function(e){var t=STYLEV.VALIDATOR;e.stopPropagation(),t.isMouseDownConsoleHeader=!0,t.consoleStartPosY=e.pageY},moveConsoleHeader:function(e){var t=STYLEV.VALIDATOR;e.stopPropagation(),t.isMouseDownConsoleHeader&&(t.consoleCurrentPosY=e.pageY,t.consoleDiffPosY=t.consoleStartPosY-t.consoleCurrentPosY,t.consoleWrapper.style.setProperty("height",t.consoleWrapperDynamicHeight+t.consoleDiffPosY+"px",""),e.currentTarget.style.setProperty("border-bottom-width",t.consoleWrapperDynamicHeight+t.consoleDiffPosY+"px","important"),30===t.consoleWrapper.offsetHeight?(t.consoleNormalizeButton.hidden=!1,t.consoleMinimizeButton.hidden=!0):t.consoleWrapper.offsetHeight>30&&(t.consoleNormalizeButton.hidden=!0,t.consoleMinimizeButton.hidden=!1))},offConsoleHeader:function(e){var t=STYLEV.VALIDATOR;e.stopPropagation(),t.isMouseDownConsoleHeader&&(t.consoleWrapperDynamicHeight=parseInt(t.consoleWrapper.offsetHeight,10),STYLEV.consoleWrapperHeight=t.consoleWrapperDynamicHeight),t.isMouseDownConsoleHeader=!1},destroyByEsc:function(e){var t=STYLEV.VALIDATOR,o=27;e.keyCode===o&&t.destroy()},markElementFromConsole:function(e){event.preventDefault(),event.stopPropagation();var t=STYLEV.VALIDATOR;t.moManager.disconnect();var o=document.querySelector("#stylev-console-wrapper").shadowRoot,n=o.querySelectorAll("li");STYLEV.METHODS.each(n,function(e){e.classList.remove("stylev-trigger-selected")});var s=o.querySelectorAll('[data-stylevconsoleid="'+event.currentTarget.dataset.stylevconsoleid+'"]');STYLEV.METHODS.each(s,function(e){e.parentElement.classList.add("stylev-trigger-selected"),0===j&&(STYLEV.selectedLineInConsole=e.parentElement)}),STYLEV.METHODS.each(t.allElem,function(e){e.classList.remove("stylev-target-selected")});var a=document.querySelector('[data-stylevid="'+e.idName+'"]');a.classList.add("stylev-target-selected"),STYLEV.METHODS.smoothScroll.execute(a),t.moManager.connect()},bind4targetElements:function(){var e=STYLEV.VALIDATOR;return 0===e.resultArray.length?!1:(e.consoleWrapper=document.querySelector("#stylev-console-wrapper"),e.consoleWrapperShadowRoot=e.consoleWrapper.shadowRoot,e.consoleTriggerWrapper=e.consoleWrapperShadowRoot.querySelector("ul"),e.consoleTriggers=e.consoleWrapperShadowRoot.querySelectorAll("li"),e.targets=document.querySelectorAll(".stylev-target-error, .stylev-target-warning"),void STYLEV.METHODS.each(e.targets,function(t){t.addEventListener("click",e.markElementFromTargets,!1)}))},markElementFromTargets:function(){var e=STYLEV.VALIDATOR;e.moManager.disconnect(),event.stopPropagation(),event.preventDefault();var t=document.querySelector("#stylev-console-wrapper").shadowRoot;STYLEV.METHODS.each(e.consoleTriggers,function(e){e.classList.remove("stylev-trigger-selected")});var o=t.querySelectorAll('[data-stylevconsoleid="'+event.currentTarget.dataset.stylevid+'"]');STYLEV.METHODS.each(o,function(e,t){e.parentElement.classList.add("stylev-trigger-selected"),0===t&&(STYLEV.selectedLineInConsole=e.parentElement)}),STYLEV.METHODS.each(e.allElem,function(e){e.classList.remove("stylev-target-selected")});var n=document.querySelector('[data-stylevid="'+event.currentTarget.dataset.stylevid+'"]');n.classList.add("stylev-target-selected");var s=o[0].offsetTop;e.consoleTriggerWrapper.scrollTop=s,e.moManager.connect()},controlFloat:function(e,t){return Math.round(parseFloat(e)*Math.pow(10,t))/Math.pow(10,t)},destroy:function(e){var t=STYLEV.VALIDATOR,o=e&&e.currentTarget.className===t.consoleCloseButton.className;t.removeAllAttrAndEvents(),t.removeConsole(),void 0!==t.moManager&&t.moManager.disconnect(),STYLEV.isBookmarklet&&o&&t.removeStylesheet(),STYLEV.isChromeExtension&&setTimeout(function(){chrome.runtime.sendMessage({name:"validatedStatus2False"})},0),STYLEV.isValidated=!1,console.info("Style Validator has removed.")},minimize:function(e){var t=STYLEV.VALIDATOR;t.consoleMinimizeButton.hidden=!0,t.consoleNormalizeButton.hidden=!1,t.consoleWrapper.style.setProperty("height",t.consoleHeader.style.getPropertyValue("height"),""),t.consoleWrapperDynamicHeight=t.consoleWrapper.offsetHeight},normalize:function(e){var t=STYLEV.VALIDATOR;t.consoleMinimizeButton.hidden=!1,t.consoleNormalizeButton.hidden=!0,t.consoleWrapper.style.setProperty("height",t.settings.CONSOLE_WRAPPER_DEFAULT_HEIGHT+"px",""),t.consoleWrapperDynamicHeight=t.consoleWrapper.offsetHeight},setStyleDataBySelectors:function(e){var t=(STYLEV.VALIDATOR,e||document),o=t.styleSheets;STYLEV.METHODS.each(o,function(e){var o=e.cssRules;return null===o?"continue":void STYLEV.METHODS.each(o,function(e){if(e.media||void 0===e.style||void 0===e.selectorText)return"continue";var o=e.selectorText,n=e.style,s=n.width?n.width:"auto",a=n.height?n.height:"auto",r=n.getPropertyPriority("width"),i=n.getPropertyPriority("height"),l=SPECIFICITY.calculate(o);STYLEV.METHODS.each(l,function(e){var o=e.selector,n=parseInt(e.specificity.replace(/,/g,""),10);try{var l=t.querySelectorAll(o)}catch(c){return"continue"}STYLEV.METHODS.each(l,function(e){var t=e.style,o=t.width?t.width:"auto",l=t.height?t.height:"auto",c=o?1e3:n,d=l?1e3:n,E=t.getPropertyPriority("width"),m=t.getPropertyPriority("height");void 0===e.dataset_stylevwidthspecificity&&(e.dataset_stylevwidthspecificity=c),void 0===e.dataset_stylevheightspecificity&&(e.dataset_stylevheightspecificity=d),void 0===e.dataset_stylevwidthimportant&&(e.dataset_stylevwidthimportant=E),void 0===e.dataset_stylevheightimportant&&(e.dataset_stylevheightimportant=m),s&&!o&&c>=parseInt(e.dataset_stylevwidthspecificity,10)&&r.length>=e.dataset_stylevwidthimportant.length&&(e.dataset_stylevwidth=s,e.dataset_stylevwidthspecificity=c,e.dataset_stylevwidthimportant=r),s&&r&&!E&&c>=parseInt(e.dataset_stylevwidthspecificity,10)&&r.length>=e.dataset_stylevwidthimportant.length&&(e.dataset_stylevwidth=s,e.dataset_stylevwidthspecificity=c,e.dataset_stylevwidthimportant=r),s&&!r&&o&&c>=parseInt(e.dataset_stylevwidthspecificity,10)&&E.length>=e.dataset_stylevwidthimportant.length&&(e.dataset_stylevwidth=o,e.dataset_stylevwidthspecificity=c,e.dataset_stylevwidthimportant=E),o&&E&&c>=parseInt(e.dataset_stylevwidthspecificity,10)&&E.length>=e.dataset_stylevwidthimportant.length&&(e.dataset_stylevwidth=o,e.dataset_stylevwidthspecificity=c,e.dataset_stylevwidthimportant=E),a&&!l&&d>=parseInt(e.dataset_stylevheightspecificity,10)&&E.length>=e.dataset_stylevheightimportant.length&&(e.dataset_stylevheight=a,e.dataset_stylevheightspecificity=d,e.dataset_stylevheightimportant=m),a&&i&&l&&d>=parseInt(e.dataset_stylevheightspecificity,10)&&E.length>=e.dataset_stylevheightimportant.length&&(e.dataset_stylevheight=a,e.dataset_stylevheightspecificity=d,e.dataset_stylevheightimportant=m),a&&!i&&l&&d>=parseInt(e.dataset_stylevheightspecificity,10)&&E.length>=e.dataset_stylevheightimportant.length&&(e.dataset_stylevheight=l,e.dataset_stylevheightspecificity=d,e.dataset_stylevheightimportant=m),l&&m&&d>=parseInt(e.dataset_stylevheightspecificity,10)&&E.length>=e.dataset_stylevheightimportant.length&&(e.dataset_stylevheight=l,e.dataset_stylevheightspecificity=d,e.dataset_stylevheightimportant=m)})})})})},setStyleDataByElements:function(e){var t=e||document,o=t.querySelectorAll("*:not(.stylev-ignore)");STYLEV.METHODS.each(o,function(e,t){if(void 0===e.dataset_stylevwidth){var o=e.style.getPropertyValue("width");o?e.dataset_stylevwidth=o:e.dataset_stylevwidth="auto"}if(void 0===e.dataset_stylevheight){var n=e.style.getPropertyValue("height");n?e.dataset_stylevheight=n:e.dataset_stylevheight="auto"}})},getStyle:function(e,t,o){var n,s=o||null,a=getComputedStyle(e,s).getPropertyValue(t);return"width"===t||"height"===t?("width"===t&&(n=e.dataset_stylevwidth),"height"===t&&(n=e.dataset_stylevheight)):n=a,n}},STYLEV.METHODS={smoothScroll:{getOffsetTop:function(e){return"html"===e.nodeName.toLowerCase()?-window.pageYOffset:e.getBoundingClientRect().top+window.pageYOffset},easeInOutCubic:function(e){return.5>e?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},getTargetPos:function(e,t,o,n){var s=STYLEV.METHODS.smoothScroll;return o>n?t:e+(t-e)*s.easeInOutCubic(o/n)},execute:function(e,t){var o=STYLEV.METHODS.smoothScroll,t=t||500,n=window.pageYOffset,s=o.getOffsetTop(e)-100,a=Date.now(),r=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){window.setTimeout(e,15)},i=function(){var e=Date.now()-a;window.scroll(0,o.getTargetPos(n,s,e,t)),t>=e&&r(i)};i()}},each:function(e,t){var o,n=!!e,s="function"==typeof t,a=0;if(!n||!s)return!1;if("length"in e)for(var r=e.length||null;r>a;a++){var i=e[a];if(o=t(i,a),"continue"!==o&&"break"===o)break}else for(var l in e)if(e.hasOwnProperty(l)){var c=e[l];if(o=t(l,c,a++),"continue"===o)continue;if("break"===o)break}}},STYLEV.CHROME_EXTENSION={execute:function(){console.info("Style Validator by Chrome Extension"),setTimeout(function(){chrome.runtime.sendMessage({name:"execute"})},0)}},STYLEV.CHROME_DEVTOOLS={execute:function(e){var t=STYLEV.CHROME_DEVTOOLS;return 0===STYLEV.VALIDATOR.resultArray.length?!1:(t.inspectOfConsoleAPI=e,
t.setParameters(),void t.bindEvents())},setParameters:function(){var e=STYLEV.CHROME_DEVTOOLS;e.consoleWrapper=document.querySelector("#stylev-console-wrapper"),e.consoleWrapperShadowRoot=e.consoleWrapper.shadowRoot,e.consoleList=e.consoleWrapperShadowRoot.querySelector("#stylev-console-list"),e.triggers=e.consoleList.querySelectorAll("a[data-stylevconsoleid]"),e.targets=document.querySelectorAll(".stylev-target-error, .stylev-target-warning")},bindEvents:function(){var e=STYLEV.CHROME_DEVTOOLS;STYLEV.METHODS.each(e.triggers,function(t){t.addEventListener("click",e.inspectFromConsole,!1)}),STYLEV.METHODS.each(e.targets,function(t){t.addEventListener("click",e.inspectFromTargets,!1)})},inspectFromConsole:function(){event.preventDefault(),event.stopPropagation();var e=STYLEV.CHROME_DEVTOOLS,t=event.currentTarget,o=t.dataset.stylevconsoleid,n=document.querySelector('[data-stylevid="'+o+'"]');try{e.inspectOfConsoleAPI(n)}catch(s){console.error(s)}},inspectFromTargets:function(){event.preventDefault(),event.stopPropagation();var e=STYLEV.CHROME_DEVTOOLS,t=event.target;try{e.inspectOfConsoleAPI(t)}catch(o){console.error(o)}}},STYLEV.isChromeExtension&&(STYLEV.VALIDATOR.updateOptions().then(function(){STYLEV.options.ENABLE_AUTO_EXECUTION&&STYLEV.CHROME_EXTENSION.execute(),STYLEV.VALIDATOR.RESOURCE_ROOT=chrome.runtime.getURL("")}),chrome.storage.onChanged.addListener(function(e,t){"sync"===t&&e.options&&(e.options.newValue.enableAnimation?STYLEV.VALIDATOR.html.classList.add("stylev-animation"):STYLEV.VALIDATOR.html.classList.remove("stylev-animation"))})),STYLEV.isBookmarklet&&STYLEV.isPassedFilter&&(STYLEV.isLoaded?(console.info("Style Validator by Bookmarklet."),STYLEV.VALIDATOR.execute(STYLEV.VALIDATOR.insertStylesheet)):STYLEV.isReLoaded&&(console.info("Style Validator by Bookmarklet (ReExecution)"),STYLEV.VALIDATOR.validate()));