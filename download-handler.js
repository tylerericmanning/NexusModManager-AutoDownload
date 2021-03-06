var portFromCS;
var modPage;

function connected(p) {
    portFromCS = p;
    console.log("connected");

    portFromCS.onMessage.addListener(function (m) {
        console.log(m.greeting);

        var modWindow = browser.tabs.create({
            url: m.greeting,
            active: false
        });
        modWindow.then(onCreated, onError);

        function onCreated(tab) {
            controlTab(tab.id);
        }

        function onError() {
            console.log("Error");
        }
    });

    function controlTab(tabId) {
        console.log("Sending code to " + tabId);

        function onExecuted(result) {
            // console.log(browser.tabs.get(tabId));
            // browser.tabs.remove(tabId);
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }

        var downloadClick = 'var btns = document.getElementsByClassName("btn inline-flex popup-btn-ajax"); btns[0].click()';

        var port = browser.tabs.executeScript(
            tabId, {
                code: downloadClick
            }
        );
        port.then(onExecuted, onError);



    }
}



function handleMessage(request, sender, sendResponse) {
    console.log(`${request.content}`);
    // sendResponse({response: "response from background script"});
}
browser.runtime.onConnect.addListener(connected);