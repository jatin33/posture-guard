document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app')
  // Create the main element
  const mainElement = document.createElement('main')
  // Create the link element
  const buttonElement = document.createElement('button')
  buttonElement.textContent = 'Start Recording'
  buttonElement.addEventListener('click', () => {
    // send message to content script
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        chrome.tabs.sendMessage(tabs?.[0]?.id, {
          message: 'start-video',
        })
      },
    )
  });
  // Append all elements to the main element
  mainElement.appendChild(buttonElement)
  // Append the main element to the page
  appElement.appendChild(mainElement)
})
