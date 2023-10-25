/**
 * Add click event listeners to web3 login button
 */
let web3Buttons = document.getElementsByClassName('web3loginbutton');
if(web3Buttons.length) {
  let button = null;
  let url = window.location.href;

  web3Buttons[0].addEventListener('click', async (evt) => {
    button = evt.target;
    if(button.dataset.url){
      url = button.dataset.url;
    }

    // using pollyfill browser ref - send message to SW
    // pass any data atrributes on button eg VC request type
    await browser.runtime.sendMessage({
      action: 'OPEN_ENKI_WALLET',
      data: button.dataset
    }).then(r => {
      console.log(r);
      if(!r || !r.data){
        alert('Select and present credential in Wallet first.');
      }else{
        // Post Auth request to self
        fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authentication": "web3credential " + r.data
          }
        }).then(res => {
          if(res.status == 200){
            // if authed then reload. - TODO check for redirect url/header
            if(confirm('Authentication complete.')){
              window.location.reload();
            }else{
              window.location.reload();
            }
          }else{
            alert('Authentication failed - try again');
          }
        })

      }
    });
    //document.body.style.border = "2px solid green";
  });
}

//document.body.style.border = "2px solid orange";
