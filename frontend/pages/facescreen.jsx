
import { Header } from "./components/header";
import { FaceLandmarksDetection } from "./components/webcam/face-landmarker";

export default function FaceScreen() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex flex-col gap-2 m-auto w-lg bg-white mt-6 shadow rounded-b-xs px-3 py-4">
        <FaceLandmarksDetection />
      </div>
    </div>
  );
}
