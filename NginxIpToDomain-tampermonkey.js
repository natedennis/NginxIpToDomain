// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */status.html
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_addStyle
// ==/UserScript==



function highlightGoodComments (jNode) {

    'use strict';

//    console.log("here i go a looking");
    setTimeout(function(){
    },100);
    var span = $(jNode);
    var el = span.text();
    console.log(el);


    var ipp = el.split(":");
    if( ipp.length > 1 ){

        GM_xmlhttpRequest({
            method: "GET",
            url: "http://ndennis.empoweredbenefits.com:10081/ptr?ip="+ipp[0],
            onload: function (response) {
//                console.log(JSON.parse(response.responseText));
                span.text(JSON.parse(response.responseText)[0]);
            },//+":"+ipp[1]
            onerror:    function(reponse) {
                console.log("error: ", reponse);
            }
        });


    }
}
waitForKeyElements (".table__td_upstream_name span", highlightGoodComments);

/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
 actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
 bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
 iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
            .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey];
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                waitForKeyElements (    selectorTxt,
                                    actionFunction,
                                    bWaitOnce,
                                    iframeSelector
                                   );
            },
                                       300
                                      );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}


