console.info('contentScript is running')
import './index.css'

function createModal() {
  const modal = document.createElement('div')
  modal.id = 'circularModal'
  modal.className = 'modal'

  const modalContent = document.createElement('div')
  modalContent.className = 'modal-content'

  const closeModalBtn = document.createElement('span')
  closeModalBtn.id = 'closeModalBtn'
  closeModalBtn.innerHTML = '&times;'

  const videoSection = document.createElement('video')
  videoSection.id = 'video-cam'
  videoSection.autoplay = true
  // Append children
  modalContent.appendChild(closeModalBtn)
  modalContent.appendChild(videoSection)
  modal.appendChild(modalContent)

  // Append modal to the body
  document.body.appendChild(modal)

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none'
    const videoCam = document.getElementById('video-cam')
    if (videoCam && videoCam.srcObject) {
      const tracks = videoCam.srcObject.getTracks()
      tracks.forEach((track) => track.stop()) // Stop all video tracks
      videoCam.srcObject = null
    }
  })
}
chrome.runtime.onMessage.addListener(function (messageObj, sender, sendResponse) {
  console.log('messgae++', messageObj)
  if (messageObj.message === 'start-video') {
    createModal()
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then(function (stream) {
        document.getElementById('video-cam').srcObject = stream
      })
      .catch(function (err) {
        console.error('Error accessing webcam: ' + err)
      })
  }
})
