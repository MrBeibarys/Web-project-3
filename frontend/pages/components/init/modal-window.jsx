import { useState } from "react";
import { UiButton } from "../uikit/ui-button";
import { useRouter } from "next/router";
import { useInitState } from "./init";
import Webcam from "react-webcam";
import { FaceLandmarksDetection } from "../webcam/face-landmarker";

export function ModalWin() {
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isReal, setIsReal] = useState(false)
  const { submit, setLogin, setPassword1, setPassword2, isCorrect, sendProfile, back, setIsCorrect } = useInitState();

  const render = !isCorrect ? (
    <div className="flex flex-col gap-2 m-auto w-lg bg-white mt-6 shadow rounded-b-xs px-3 py-4">
      <div className="text-2xl">Создайте пользователя!</div>
      <div className="grid gap-4">
        <div className="grid">
          <div className="text-xl">Придумайте логин</div>
          <input
            type="text"
            onChange={(e) => setLogin(e.target.value)}
            className="bg-gray-100 border-1 rounded-xs border-gray-300"
          />
        </div>
        <div className="grid">
          <div className="text-xl">Придумайте пароль</div>
          <input
            type="password"
            onChange={(e) => setPassword1(e.target.value)}
            className="bg-gray-100  border-1 rounded-xs border-gray-300"
          />
        </div>
        <div className="grid">
          <div className="text-xl">Повторите пароль</div>
          <input
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
            className="bg-gray-100  border-1 rounded-xs border-gray-300"
          />
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <UiButton
          variant="outline"
          onClick={() =>
            back()
          }
        >
          Назад
        </UiButton>
        <UiButton variant="primary" onClick={submit}>
          Дальше
        </UiButton>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-2 m-auto w-lg bg-white mt-6 shadow rounded-b-xs px-3 py-4 ">
      <div>
        <div className="text-2xl">Создайте пользователя!</div>
        <div className="text-xl">Сделаем фото индентификацию</div>
        <FaceLandmarksDetection
          onCapture={setCapturedImage}
          isReal={setIsReal}
        />
      </div>
      <div className="flex justify-between">
        <UiButton
          variant="outline"
          onClick={() =>
            async function bacl() {
              await setIsCorrect(false);
            }
          }
        >
          Назад
        </UiButton>
        <UiButton
          variant="primary"
          onClick={() => sendProfile(capturedImage, isReal)}
        >
          Готово!
        </UiButton>
      </div>
    </div>
  );

  return render;
}
