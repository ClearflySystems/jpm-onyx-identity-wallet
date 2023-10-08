/**
 * Add click event listeners to web3 login button
 */
let web3Buttons = document.getElementsByClassName('web3loginbutton');
if(web3Buttons.length) {
  let button = null;

  web3Buttons[0].addEventListener('click', async (evt) => {
    button = evt.target;
    // using pollyfill browser ref - send message to SW
    // pass any data atrributes on button eg VC request type
    await browser.runtime.sendMessage({
      action: 'OPEN_ENKI_WALLET',
      data: button.dataset
    }).then(r => {
      console.log(r);
      if(!r.data){
        alert('Select and present credential in Wallet first.');
      }else{
        // Post Auth request to self
        fetch(document.location.href, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authentication": "web3credential " + r.data
          }
        }).then(res => {
          console.log(res);
        })

      }
    });
    //document.body.style.border = "2px solid green";
  });
}

//document.body.style.border = "2px solid orange";
