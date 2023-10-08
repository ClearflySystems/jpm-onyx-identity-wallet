## ENKI Wallet

A proof of concept Digital Asset wallet and SSI credential storage wallet. 
The idea being an all in one WEB3 Identity solution for use in WEB2/WEB3 authentication flows.
Using the JPM Onyx SSI SDK for the storage, verification and presentation of issued credentials (in the form of JWT Tokens)

The purpose of this project was to show that issued credentials can be stored in a users web browser context using WebExtensions and thus enabling the user to present those credentials easily when authenticating with web based applications. As an alternative or replacement to traditional login username/password flows or social media SSO flows.
The current UX flow is limited by outstanding issues with certain WebExtension API's namely the openPopup() which is still currently blocked in Chrome and Mozilla browsers.
https://bugs.chromium.org/p/chromium/issues/detail?id=1245093

The current workaround in this project requires the user to pre-select the credential in the WebExtension (which passes it to the background service_worker) where it can then be returned from the injected content script via the onMessage API.
In future, we hope that the Wallet WebExtension can be opened directly from an event in a webpage (eg button click) and the user selects the credential required then presents it.


### Instructions on use:
1) Clone/Download Repo.
2) Web Extension is available in the /extension/chrome directory, and should work in most chrome based browsers. A firefox version to follow.
3) Navigate your chrome browser to 'chrome://extensions/' in the address bar.
4) Under 'My extensions' select 'Load Unpacked' and select the project /extension/chrome directory
5) The Wallet plugin should now be available in the Chrome browser toolbar. This demo wallet has no password to unlock it, and currently uses 2 test accounts.
6) If you want to test with your own accounts, you'll need to build the project and set the private keys/api keys in .env (and take note of the build notes file)
7) Watch the video for demo of the auth flow. https://streamable.com/7uri7x or https://www.clearfly.co.uk/screen-capture.webm