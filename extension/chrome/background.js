let chromeBrowser = null;
let currentButton = null;
let currentTabId = null;
let selectedCredential = null;
let onSelectResponder = null;
let walletWindow = null;

// Listen for messages from the webpage
if (typeof browser !== 'undefined') {
  chromeBrowser = browser;
} else if (typeof chrome !== 'undefined') {
  chromeBrowser = chrome;
}

// onSelection responder



if(chromeBrowser) {
  chromeBrowser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(typeof(message) === 'string'){
      message = JSON.parse(message);
    }
    console.log('Message detected in Background Script');
    console.log(message);

    // Handle Messages from Wallet to SW
    if (message.action === 'PRESENT_VP') {
      selectedCredential = message.data;
      onSelectResponder({
        action: 'RETURNED_VC',
        data: selectedCredential,
        tab: currentTabId,
      });
      selectedCredential = null;

      chromeBrowser.windows.remove(walletWindow.id);
      walletWindow = null;
    }

    // Handle Call from Content Script to SW
    else if (message.action === 'OPEN_ENKI_WALLET') {
      console.log('open wallet called');

      if(walletWindow){
        chromeBrowser.windows.update(walletWindow.id, {focused:true});
      }else {
        chromeBrowser.windows.create({
          state: 'normal',
          type: 'popup',
          width: 360,
          height: 700,
          left: 1000,
          top: 50,
          url: chromeBrowser.runtime.getURL('/index.html')
        }).then(r => {
          walletWindow = r;
        });
      }

      onSelectResponder = sendResponse;
      currentButton = message.data;
      currentTabId = sender.tab.id;

      //chromeBrowser.runtime.openPopup().then(() => {
      //  sendResponse({'OPENED'})
      //}).catch((e) => {
      //  sendResponse('FAILED_TO_OPEN', e)
      //});

      if(selectedCredential) {
        sendResponse({
          action: 'RETURNED_VC',
          data: selectedCredential,
          tab: currentTabId,
        });
        selectedCredential = null;
      }

    }
    return true
  });
}