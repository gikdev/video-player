import "@phosphor-icons/web/duotone";
import './style.scss'
import { Nullable, secondsToTime, $ } from "./lib";



// Elements / data
const els = {
  videoContainer: $<HTMLDivElement>('.video-container'),
  video: $<HTMLVideoElement>('.video'),
  playpause: $<HTMLButtonElement>('.play-pause'),
  skipBackward: $<HTMLButtonElement>('.skip-backward'),
  skipForward: $<HTMLButtonElement>('.skip-forward'),
  volume: $<HTMLButtonElement>('.volume'),
  currentTime: $<HTMLSpanElement>('.current-time'),
  videoDuration: $<HTMLSpanElement>('.video-duration'),
  picInPic: $<HTMLButtonElement>('.pic-in-pic'),
  fullscreen: $<HTMLButtonElement>('.fullscreen'),
  playbackSpeed: $<HTMLButtonElement>('.playback-speed'),
  timeline: $<HTMLInputElement>('.timeline'),
}
const classes = {
  pause: `ph-duotone ph-pause`,
  play: `ph-duotone ph-play`,
  speakerHigh: `ph-duotone ph-speaker-high`,
  speakerLow: `ph-duotone ph-speaker-low`,
  speakerNone: `ph-duotone ph-speaker-none`,
}



// Event Listeners
els.playpause.addEventListener('click', e => {
  els.playpause.querySelector('i')!.className = els.video.paused 
    ? classes.pause 
    : classes.play
  playPause()
})
els.video.addEventListener('click', e => {
  els.playpause.querySelector('i')!.className = els.video.paused 
    ? classes.pause 
    : classes.play
  playPause()
})
els.skipBackward.addEventListener('click', e => {
  skip(-10)
})
els.skipBackward.addEventListener('contextmenu', e => {
  e.preventDefault()
  els.video.currentTime = 0
})
els.skipForward.addEventListener('click', e => {
  skip(10)
})
els.skipForward.addEventListener('contextmenu', e => {
  e.preventDefault()
  els.video.currentTime = els.video.duration
})
els.volume.addEventListener('click', e => {
  const i = els.volume.querySelector('i')!
  switch(els.video.volume) {
    case 0:
      setSound(0.5)
      i.className = classes.speakerLow
      break;
    case 0.5:
      setSound(1)
      i.className = classes.speakerHigh
      break;
    case 1:
      setSound(0)
      i.className = classes.speakerNone
      break;
    default:
      setSound(1)
      i.className = classes.speakerHigh
      break;
  }
})
els.video.addEventListener('loadeddata', e => {
  els.videoDuration.innerText = secondsToTime(els.video.duration)
  els.timeline.max = Math.floor(els.video.duration).toString()
})
els.video.addEventListener('timeupdate', e => {
  els.currentTime.innerText = secondsToTime(els.video.currentTime)
  els.timeline.value = Math.floor(els.video.currentTime).toString()
})
els.picInPic.addEventListener('click', e => {
  els.video.requestPictureInPicture()
})
els.fullscreen.addEventListener('click', e => {
  els.videoContainer.classList.toggle('fullscreen')
  if (document.fullscreenElement) {
    return document.exitFullscreen();
  } 
  els.videoContainer.requestFullscreen()
})
els.playbackSpeed.addEventListener('click', e => {
  switch(els.video.playbackRate) {
    case 0.5:
      setVideoSpeed(1.0)
      break;
    case 1.0:
      setVideoSpeed(1.5)
      break;
    case 1.5:
      setVideoSpeed(2.0)
      break;
    case 2.0:
      setVideoSpeed(0.5)
      break;
    default:
      setVideoSpeed(1.0)
      break;
  }
})



// Functions
function playPause() {
  const video = els.video
  video.paused ? video.play() : video.pause()
}
function skip(amountOfTimeToSkip: number) {
  const video = els.video
  video.currentTime = video.currentTime + amountOfTimeToSkip
}
function setSound(sound?: number) {
  const video = els.video
  video.volume = sound ?? 1
}
function setVideoSpeed(speed: number) {
  const video = els.video
  video.playbackRate = speed
}