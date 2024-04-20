import { createEffect, createMemo, createSignal, type Component } from 'solid-js';

import styles from './App.module.css';
import { ReceiveNUI } from './utils';

type ShakeLevel = "LOW" | "MID" | "HIGH"

type EventDataType = {
  ShowHud: true
  CurrentCarRPM: number
  CurrentCarGear: number
  CurrentCarSpeed: number
  CurrentCarKmh: number
  CurrentCarIL: number
  CurrentCarAcceleration: number
  CurrentCarHandbrake: boolean
  CurrentCarABS: boolean
  CurrentCarLS_r: boolean
  CurrentCarLS_o: boolean
  CurrentCarLS_h: boolean
} | {
  ShowHud: false
}

const App: Component = () => {
  const randRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
  const [showHud, setShowHud] = createSignal(false, { equals: false })
  const [speed, setSpeed] = createSignal(0, { equals: false })
  const [gear, setGear] = createSignal(0, { equals: false })
  const [abs, setAbs] = createSignal(false, { equals: false })
  const [hbk, setHbk] = createSignal(false, { equals: false })
  const humanizedGear = createMemo(() => {
    const g = gear()
    if(g > 0) return g
    return "R"
  })
  const [rpm, setRPM] = createSignal(0.0, { equals: false })
  const [shake, setShake] = createSignal(false, { equals: false })
  const [shakeLevel, setShakeLevel] = createSignal<ShakeLevel>("LOW", { equals: false })
  const [animatedRpmAngle, setAnimatedRpmAngle] = createSignal(0.0, { equals: false })
  const rpmAngle = createMemo(() => {
    const raw = rpm()
    const idleAngle = 6
    const runAngle = 233
    const idleRpm = 0.21
    if(raw <= idleRpm) return raw * (idleAngle / idleRpm)
    
    const normalized = (raw - idleRpm) / (1 - idleRpm)
    return idleAngle + (runAngle * (Math.pow(normalized, 2)))
  })
  const shaker = () => {
    if(!shake()) return
    const angle = rpmAngle()
    let shakeRange = 0
    switch(shakeLevel()) {
      case "LOW":
        shakeRange = 1
        break;
      case "MID":
        shakeRange = 3
        break;
      case "HIGH":
        shakeRange = 10
        break;
    }
    const rand = randRange(Math.max(angle - shakeRange, 0), Math.min(angle + shakeRange, 239))
    setAnimatedRpmAngle(rand)
    window.requestAnimationFrame(shaker)
  }
  createEffect(() => {
    if(rpm() === 1) setShakeLevel("HIGH")
    else if (rpm() > 0.93) setShakeLevel("MID")
    else if (rpm() > 0.83) setShakeLevel("LOW")
    if(rpm() > 0.83) {
      setShake(true)
      shaker()
      return
    }

    setShake(false)
  })
  const paddedRpmAngle = createMemo(() => 327 + (shake() ? animatedRpmAngle() : rpmAngle()))
  ReceiveNUI(event => {
    const data: EventDataType = event.data
    setShowHud(data.ShowHud)
    if(data.ShowHud) {
      setRPM(data.CurrentCarRPM)
      setGear(data.CurrentCarGear)
      setSpeed(data.CurrentCarKmh)
      setAbs(data.CurrentCarABS)
      setHbk(data.CurrentCarHandbrake)
    } else {
      setRPM(0)
      setGear(0)
      setSpeed(0)
      setAbs(false)
      setHbk(false)
    }
  })
  return (
    <div class={styles.App}>
      <div class={`${styles.meterContainer} ${showHud() ? styles.showMeter : ""}`}>
        <div id={styles.fh4container}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501.39 500.96">
            <circle id="gear_circle" class={`${styles.cls5} ${(gear() > 0 ? styles.green : styles.red)}`} cx="253.61" cy="241.48" r="44"/>
            <path class={styles.cls3} d="m252.11,4c-42.26.26-81.9,11.55-116.18,31.15"/>
            <path class={styles.cls3} d="m444.59,100.29c-19.01-25.66-43.06-47.36-70.7-63.62"/>
            <path class={styles.cls4} d="m458.78,121.8c-4.35-7.44-9.09-14.62-14.19-21.51"/>
            <path class={styles.cls4} d="m491.1,240.48c-.17-42.2-11.36-81.8-30.82-116.09"/>
            <path class={styles.cls3} d="m371.3,35.15c-34.29-19.6-73.93-30.89-116.18-31.15"/>
            <path class={styles.cls3} d="m16.14,243.48c.35,42.14,11.66,81.66,31.23,115.84"/>
            <path class={styles.cls3} d="m48.89,361.91c20.6,34.94,49.88,64.14,84.88,84.64"/>
            <path class={styles.cls3} d="m46.95,124.39c-19.47,34.28-30.65,73.89-30.82,116.09"/>
            <path class={styles.cls3} d="m133.34,36.66c-35.06,20.63-64.36,50.01-84.89,85.13"/>
            <g class={styles.cls8}>
              <line class={styles.cls1} x1="230.09" y1="17.71" x2="229.57" y2="12.74"/>
              <line class={styles.cls1} x1="206.83" y1="21.4" x2="205.79" y2="16.51"/>
              <line class={styles.cls1} x1="184.08" y1="27.49" x2="182.54" y2="22.74"/>
              <line class={styles.cls1} x1="162.1" y1="35.93" x2="160.06" y2="31.37"/>
              <line class={styles.cls1} x1="121.36" y1="59.45" x2="118.42" y2="55.41"/>
              <line class={styles.cls1} x1="103.06" y1="74.27" x2="99.71" y2="70.56"/>
              <line class={styles.cls1} x1="86.41" y1="90.93" x2="82.69" y2="87.58"/>
              <line class={styles.cls1} x1="71.58" y1="109.23" x2="67.54" y2="106.29"/>
              <line class={styles.cls1} x1="48.07" y1="149.97" x2="43.5" y2="147.93"/>
              <line class={styles.cls1} x1="39.63" y1="171.95" x2="34.87" y2="170.41"/>
              <line class={styles.cls1} x1="33.53" y1="194.7" x2="28.64" y2="193.66"/>
              <line class={styles.cls1} x1="29.85" y1="217.96" x2="24.87" y2="217.44"/>
              <line class={styles.cls1} x1="29.85" y1="265" x2="24.87" y2="265.52"/>
              <line class={styles.cls1} x1="33.53" y1="288.26" x2="28.64" y2="289.3"/>
              <line class={styles.cls1} x1="39.63" y1="311.01" x2="34.87" y2="312.55"/>
              <line class={styles.cls1} x1="48.07" y1="333" x2="43.5" y2="335.03"/>
              <line class={styles.cls1} x1="71.58" y1="373.73" x2="67.54" y2="376.67"/>
              <line class={styles.cls1} x1="86.41" y1="392.04" x2="82.69" y2="395.38"/>
              <line class={styles.cls1} x1="103.06" y1="408.69" x2="99.71" y2="412.4"/>
              <line class={styles.cls1} x1="121.36" y1="423.51" x2="118.42" y2="427.55"/>
              <line class={styles.cls1} x1="477.38" y1="217.96" x2="482.35" y2="217.44"/>
              <line class={styles.cls1} x1="473.7" y1="194.7" x2="478.59" y2="193.66"/>
              <line class={styles.cls1} x1="467.6" y1="171.95" x2="472.36" y2="170.41"/>
              <line class={styles.cls1} x1="459.16" y1="149.97" x2="463.73" y2="147.93"/>
              <line class={styles.cls1} x1="435.64" y1="109.23" x2="439.69" y2="106.29"/>
              <line class={styles.cls1} x1="420.82" y1="90.93" x2="424.54" y2="87.58"/>
              <line class={styles.cls1} x1="404.17" y1="74.27" x2="407.51" y2="70.56"/>
              <line class={styles.cls1} x1="385.87" y1="59.45" x2="388.8" y2="55.41"/>
              <line class={styles.cls1} x1="345.13" y1="35.93" x2="347.16" y2="31.37"/>
              <line class={styles.cls1} x1="323.14" y1="27.49" x2="324.69" y2="22.74"/>
              <line class={styles.cls1} x1="300.39" y1="21.4" x2="301.43" y2="16.51"/>
              <line class={styles.cls1} x1="277.13" y1="17.71" x2="277.65" y2="12.74"/>
            </g>
            <path class={styles.cls2} d="m314.1,241.98c0-.17.01-.33.01-.5,0-33.41-27.09-60.5-60.5-60.5s-60.5,27.09-60.5,60.5c0,22.22,11.99,41.62,29.84,52.14"/>
            <g id="abs" class={`${styles.cls11} ${abs() ? styles.statOn : ""}`}>
              <path class={styles.cls9} d="m103,233.37h-5.18l-.85,3.66h-4.16l4.53-18.36h6.15l4.53,18.36h-4.16l-.85-3.66Zm-.79-3.4l-.36-1.52c-.51-2.17-.88-3.9-1.41-6.51h-.08c-.53,2.61-.9,4.34-1.41,6.51l-.36,1.52h3.61Z"/>
              <path class={styles.cls9} d="m124.47,231.72c0,3.35-1.84,5.31-5.99,5.31h-7.47v-18.36h6.83c4.07,0,5.79,1.41,5.79,4.62,0,1.99-.96,3.46-2.61,3.99,2.31.3,3.45,1.96,3.45,4.44Zm-9.31-5.54h2.17c1.29,0,2.06-.65,2.06-2.2,0-1.32-.54-1.91-1.93-1.91h-2.29v4.12Zm5.05,5.07c0-1.62-.84-2.11-2.01-2.11h-3.04v4.5h2.99c1.44,0,2.06-.84,2.06-2.38Z"/>
              <path class={styles.cls9} d="m127.59,234.62l2.27-3.04c1.21,1.55,2.79,2.33,4.54,2.33s2.51-.69,2.51-1.79-.64-1.55-2.47-2.14l-1.3-.43c-3.26-1.06-4.8-2.7-4.8-5.69,0-3.25,2.32-5.56,6.75-5.56,2.69,0,4.62.79,6.23,2.56l-2.19,2.92c-1.06-1.38-2.53-2.04-4.16-2.04s-2.4.65-2.4,1.75.61,1.72,2.29,2.27l1.18.38c3.96,1.26,5,2.74,5,5.46,0,3.51-2.33,5.75-6.73,5.75-2.8,0-4.9-.85-6.73-2.75Z"/>
            </g>
            <g id="hbk" class={`${styles.cls11} ${hbk() ? styles.statOn : ""}`}>
              <path class={styles.cls9} d="m93.33,245.82h3.99v7.02h4.88v-7.02h3.99v18.36h-3.99v-7.82h-4.88v7.82h-3.99v-18.36Z"/>
              <path class={styles.cls9} d="m123.83,258.88c0,3.35-1.84,5.31-5.99,5.31h-7.47v-18.36h6.83c4.07,0,5.79,1.41,5.79,4.62,0,1.99-.96,3.46-2.61,3.99,2.31.3,3.45,1.96,3.45,4.44Zm-9.31-5.54h2.17c1.29,0,2.06-.65,2.06-2.2,0-1.32-.54-1.91-1.93-1.91h-2.29v4.12Zm5.05,5.07c0-1.62-.84-2.11-2.01-2.11h-3.04v4.5h2.99c1.44,0,2.06-.84,2.06-2.38Z"/>
              <path class={styles.cls9} d="m133.19,256.28l-1.79,2.62v5.29h-4.09v-18.36h4.09v7.65l4.69-7.65h4.89l-4.85,7.32,5.29,11.04h-4.86l-3.37-7.91Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls9} d="m247.5,32.89l1.56-2.16c.97.94,2.16,1.72,3.75,1.72,1.77,0,3.01-1.03,3.01-2.9s-1.15-2.87-2.87-2.87c-1.01,0-1.56.25-2.55.9l-1.54-.99.46-8.28h9.11v2.83h-6.19l-.32,3.61c.69-.3,1.27-.46,2.05-.46,2.85,0,5.24,1.61,5.24,5.15s-2.8,5.77-5.96,5.77c-2.69,0-4.48-1.06-5.75-2.32Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls9} d="m148.77,58.76h-7.27v-2.32l6.35-10.14h4.07v9.87h2v2.6h-2v4.12h-3.15v-4.12Zm0-2.6v-3.31c0-.99.07-2.55.11-3.54h-.09c-.41.9-.87,1.75-1.36,2.67l-2.64,4.19h3.98Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls9} d="m64.27,138.83l1.59-2.14c1.01.99,2.25,1.75,3.79,1.75,1.72,0,2.9-.83,2.9-2.25,0-1.61-.99-2.6-4.69-2.6v-2.44c3.13,0,4.14-1.03,4.14-2.46,0-1.29-.83-2.05-2.28-2.05-1.22,0-2.21.57-3.22,1.52l-1.73-2.07c1.47-1.29,3.1-2.12,5.1-2.12,3.29,0,5.52,1.61,5.52,4.46,0,1.79-1.06,3.04-2.83,3.75v.11c1.91.51,3.38,1.91,3.38,4.09,0,3.04-2.74,4.81-5.98,4.81-2.69,0-4.51-1.01-5.7-2.37Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls9} d="m35.92,243.66c4.44-4.23,7.36-7.13,7.36-9.59,0-1.68-.92-2.69-2.55-2.69-1.24,0-2.25.83-3.13,1.77l-1.84-1.84c1.56-1.68,3.08-2.6,5.4-2.6,3.22,0,5.36,2.05,5.36,5.17,0,2.9-2.67,5.89-5.7,9.06.85-.09,1.98-.18,2.78-.18h3.73v2.85h-11.41v-1.96Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls9} d="m63.65,351.84h3.66v-10.32h-3.08v-2.09c1.7-.32,2.87-.76,3.96-1.43h2.51v13.84h3.2v2.74h-10.23v-2.74Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls9} d="m140.82,423.38c0-5.61,2.28-8.53,5.77-8.53s5.75,2.94,5.75,8.53-2.25,8.69-5.75,8.69-5.77-3.06-5.77-8.69Zm8.32,0c0-4.6-1.08-5.89-2.55-5.89s-2.58,1.29-2.58,5.89,1.1,6.05,2.58,6.05,2.55-1.43,2.55-6.05Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls9} d="m352.15,56.58c0-6.32,3.15-9.06,6.6-9.06,2.07,0,3.59.87,4.6,1.93l-1.79,2.02c-.6-.67-1.63-1.22-2.62-1.22-1.95,0-3.56,1.45-3.7,5.73.94-1.17,2.39-1.86,3.5-1.86,2.85,0,4.9,1.63,4.9,5.1s-2.44,5.52-5.36,5.52c-3.22,0-6.12-2.48-6.12-8.16Zm3.17,1.75c.32,2.81,1.47,3.86,2.87,3.86,1.29,0,2.32-.99,2.32-2.97,0-1.86-.97-2.71-2.44-2.71-.87,0-1.91.48-2.76,1.82Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls10} d="m438.83,127.67h-7.66v-2.83h11.31v2.07c-3.86,4.71-4.48,8.05-4.76,14.51h-3.43c.3-5.73,1.36-9.34,4.53-13.75Z"/>
            </g>
            <g class={styles.cls8}>
              <path class={styles.cls10} d="m459.97,243.88c0-2.05,1.36-3.36,2.92-4.18v-.09c-1.29-.94-2.25-2.16-2.25-3.91,0-2.74,2.18-4.48,5.13-4.48s4.94,1.79,4.94,4.51c0,1.63-1.1,2.97-2.18,3.73v.11c1.54.87,2.85,2.09,2.85,4.32,0,2.58-2.28,4.55-5.73,4.55-3.24,0-5.68-1.88-5.68-4.55Zm8.25-.12c0-1.66-1.59-2.25-3.77-3.15-.9.71-1.56,1.72-1.56,2.9,0,1.54,1.26,2.53,2.85,2.53,1.45,0,2.48-.81,2.48-2.28Zm-.28-7.82c0-1.38-.83-2.34-2.25-2.34-1.15,0-2.07.74-2.07,2.09,0,1.52,1.33,2.23,3.1,2.92.78-.83,1.22-1.72,1.22-2.67Z"/>
            </g>
            <g class={`${styles.cls8} ${styles.kmh}`}>
              <path class={styles.cls9} d="m432.29,278.34l-2.98,2.82-2.12,5.69h-4.4l7.38-19.77h4.4l-3.07,8.24,8.12-8.24h5.26l-8.16,7.88,1.25,11.89h-5.23l-.45-8.51Z"/>
              <path class={styles.cls9} d="m448.1,267.08h4.86l-.6,5.67c-.15,1.38-.32,2.77-.54,4.17h.04c.82-1.39,1.69-2.79,2.57-4.17l3.63-5.67h4.85l-7.38,19.77h-3.55l5.21-13.96h-.01c-.86,1.36-1.32,2.08-2.34,3.67l-4.08,6.3h-2.29l.61-6.3c.18-1.59.25-2.31.4-3.67h-.01l-5.21,13.96h-3.54l7.38-19.77Z"/>
            </g>
            <g class={`${styles.cls8} ${styles.kmh}`}>
              <path class={styles.cls9} d="m487.55,267.15h4.29l-2.82,7.56h5.25l2.82-7.56h4.29l-7.38,19.77h-4.29l3.14-8.42h-5.25l-3.14,8.42h-4.29l7.38-19.77Z"/>
            </g>
            <line class={`${styles.cls6} ${styles.kmh}`} x1="477.86" y1="265.29" x2="464.36" y2="288.67"/>
            <polygon id={styles.needle} transform={`rotate(${paddedRpmAngle()})`} class={styles.cls7} points="48.32 346.41 47.85 345.52 191.07 267.03 195.2 275.03 48.32 346.41"/>
          </svg>
          <div id={styles.gearContainer}>{humanizedGear()}</div>
          <div id={styles.speed}>{speed()}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
