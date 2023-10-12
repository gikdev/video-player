import { Nullable, Speed, Volume } from './lib'

export default class VideoPlayer {
  private readonly AmountOfSkipInSeconds = 10
  private readonly FPS = 100
  private readonly FinalFPS = Math.round(1000 / this.FPS)
  private videoContainer = document.querySelector('.vpvideo__container') as HTMLDivElement
  private video: Nullable<HTMLVideoElement> = null;
  private timeline: Nullable<HTMLProgressElement> = null;
  private currentTime: Nullable<HTMLSpanElement> = null;
  private duration: Nullable<HTMLSpanElement> = null;
  private soundBtn: Nullable<HTMLButtonElement> = null;
  private skipBackBtn: Nullable<HTMLButtonElement> = null;
  private playPauseBtn: Nullable<HTMLButtonElement> = null;
  private skipForwardBtn: Nullable<HTMLButtonElement> = null;
  private speedBtn: Nullable<HTMLButtonElement> = null;

  constructor(videoContainerElement?: HTMLDivElement) {
    if (videoContainerElement) this.videoContainer = videoContainerElement
    this.init()
    setInterval(this.updateUI, this.FinalFPS)
  }
  init = () => {
    this.videoContainer.innerHTML += `
      <div class="vpvideo__controls">
        <input class="vpvideo__timeline" type="range">
        <div class="vpvideo__btn-controls">
          <span class="vpvideo__time">
            <span class="vpvideo__current-time">00:00</span>
            <span>&nbsp;-&nbsp;</span>
            <span class="vpvideo__duration">00:00</span>
          </span>
          <button class="vpvideo__sound"><i class="ph-duotone ph-speaker-high"></i></button>
          <button class="vpvideo__skip-back"><i class="ph-duotone ph-skip-back"></i></button>
          <button class="vpvideo__play-pause"><i class="ph-duotone ph-play"></i></button>
          <button class="vpvideo__skip-forward"><i class="ph-duotone ph-skip-forward"></i></button>
          <button class="vpvideo__speed"><i class="ph-duotone ph-gauge"></i></button>
        </div>
      </div>
    `
    this.video = this.videoContainer.querySelector(".vpvideo")
    this.timeline = this.videoContainer.querySelector(".vpvideo__timeline")
    this.currentTime = this.videoContainer.querySelector(".vpvideo__current-time")
    this.duration = this.videoContainer.querySelector(".vpvideo__duration")
    this.soundBtn = this.videoContainer.querySelector(".vpvideo__sound")
    this.skipBackBtn = this.videoContainer.querySelector(".vpvideo__skip-back")
    this.playPauseBtn = this.videoContainer.querySelector(".vpvideo__play-pause")
    this.skipForwardBtn = this.videoContainer.querySelector(".vpvideo__skip-forward")
    this.speedBtn = this.videoContainer.querySelector(".vpvideo__speed")

    
    this.playPauseBtn!.addEventListener('click', this.playpause)
    this.soundBtn!.addEventListener('click', this.toggleSound)
    this.speedBtn!.disabled = true
    this.skipBackBtn!.addEventListener('click', this.skipBackward)
    this.skipForwardBtn!.addEventListener('click', this.skipForward)
    this.timeline!.addEventListener('change', this.updateTime)
  }
  updateUI = () => {
    // Time Numbers
    this.currentTime!.innerText = this.secondsToTime(Math.floor(this.video!.currentTime))
    this.duration!.innerText = this.secondsToTime(Math.floor(this.video!.duration))

    // Progress bar
    this.timeline!.max = this.video!.duration
    if (!this.video!.paused)
      this.timeline!.value = this.video!.currentTime
  }
  secondsToTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    const minutesWithZero = minutes > 9 ? minutes : `0${minutes}`
    const remainingSecondsWithZero = remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`
    return `${minutesWithZero}:${remainingSecondsWithZero}`
  }
  playpause = () => {
    this.video!.paused ? this.video!.play() : this.video!.pause()
  }
  toggleSound = () => {
    this.video!.muted = !this.video!.muted
  }
  skipForward = () => {
    this.video!.currentTime += this.AmountOfSkipInSeconds
  }
  skipBackward = () => {
    this.video!.currentTime -= this.AmountOfSkipInSeconds
  }
  setSound = (volume: Volume = Volume.full) => {
    this.video!.volume = volume
  }
  setSpeed = (speed: Speed = Speed.normal) => {
    this.video!.playbackRate = speed
  }
  updateTime = (e: Event) => {
    // @ts-ignore
    const VALUE = e.target!.valueAsNumber
    this.video!.currentTime = VALUE
  }
}
