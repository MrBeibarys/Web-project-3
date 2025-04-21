import { FaceLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";

export function drawLandmarks(canvasRef, results, recieved) {
  const ctx = canvasRef.current?.getContext("2d");
  if (!ctx) return;
  console.log(recieved.is_real);
  const drawingUtils = new DrawingUtils(ctx);
  ctx.clearRect(0, 0, 640, 480);
  if (results.faceLandmarks.length > 0) {
    const landmarks = results.faceLandmarks[0];
    if (recieved.is_real) {
      for (const landmarks of results.faceLandmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_TESSELATION,
          { color: "#C0C0C070", lineWidth: 0.2 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
          { color: "#C0C0C070", lineWidth: 0.5 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
          { color: "#C0C0C070" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
          { color: "#C0C0C070", lineWidth: 0.5 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
          { color: "#C0C0C070" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
          { color: "#E0E0E0", lineWidth: 1 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LIPS,
          { color: "#E0E0E0", lineWidth: 1 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
          { color: "#C0C0C070", lineWidth: 2 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
          { color: "#C0C0C070", lineWidth: 2 }
        );
      }
    } else if (!recieved.is_real) {
      for (const landmarks of results.faceLandmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_TESSELATION,
          { color: "#CF2D2D", lineWidth: 0.2 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
          { color: "#CF2D2D", lineWidth: 0.5 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
          { color: "#CF2D2D" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
          { color: "#CF2D2D", lineWidth: 0.5 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
          { color: "#CF2D2D" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
          { color: "#FC3838", lineWidth: 1 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LIPS,
          { color: "#FC3838", lineWidth: 1 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
          { color: "#CF2D2D", lineWidth: 2 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
          { color: "#CF2D2D", lineWidth: 2 }
        );
      }
    }
    let minY = Infinity;
    let centerX = 0;
    landmarks.forEach((point) => {
      if (point.y < minY) minY = point.y;
      centerX += point.x;
    });
    centerX /= landmarks.length;

    const textX = centerX * 640;
    const textY = minY * 480 - 20;
    ctx.font = "24px Inter";
    const text = recieved.is_real;
    const text2 = recieved.confidence;
    ctx.fillStyle = recieved.is_real ? "gray" : "red";
    ctx.fillText(text, textX - 140, textY - 40);
    ctx.fillText(text2, textX - 90, textY - 40);
  }
}
