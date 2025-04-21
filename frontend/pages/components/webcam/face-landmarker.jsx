import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useFaceLandmarker } from "./face-landmarks-detection";
import { drawLandmarks } from "./draw";
import { useInitState } from "../init/init";

export function FaceLandmarksDetection({onCapture, isReal}) {
  const webcamRef = useRef(null);
  const canvasref = useRef(null);
  const [recievedResult, setReceivedResult] = useState(null);
  const recievedResultRef = useRef(null)
  const [img, setImg] = useState(null)

  useEffect(() => {
    recievedResultRef.current = recievedResult
  }, [recievedResult])

  useFaceLandmarker(webcamRef, (result) => {
    drawLandmarks(canvasref, result, recievedResultRef.current);
  });

  useEffect(() => {
    const sendMessageIntervalId = setInterval(async () => {
      const img = webcamRef.current?.getScreenshot();
      if (img) {
        const result = await analyzeImage(img);
        if (result) {
          setReceivedResult(result);
          isReal(result);
          console.log("Сообщение отправлено!");
        }
      } else {
        console.log("Изображение не получено");
      }
    }, 1000);
    return () => clearInterval(sendMessageIntervalId);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const img = webcamRef.current?.getScreenshot();
      if (img && onCapture) {
        onCapture(img);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [onCapture]);

  useEffect(() => {}, []);

  return (
    <div className="relative">
      <Webcam height={480} width={680} ref={webcamRef} />
      <canvas
        height={366}
        width={488}
        ref={canvasref}
        className=" absolute top-0 left-0"
        screenshotFormat="image/jpeg"
        screenshotQuality={0.4}
      />
    </div>
  );
}

async function analyzeImage(img) {
  try {
    const response = await fetch("http://localhost:3429/check_spoof", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ img: img }),
    });

    if (!response.ok) throw new Error("Ошибка от сервера");

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("Ошибка при получении JSON: ", err);
    return null;
  }
}

// export async function saveUser(img) {
//   const {login, password} = useInitState()
//   try {
//     const response = await fetch("http://localhost:3429/singin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ login: login, password: password, img: img }),
//     });

//     if (!response.ok) throw new Error("Ошибка от сервера");

//     const data = await response.json();

//     return data;
//   } catch (err) {
//     console.error("Ошибка при получении JSON: ", err);
//     return null;
//   }
// }
