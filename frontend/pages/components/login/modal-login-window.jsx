import { useState } from "react";
import { FaceLandmarksDetection } from "../webcam/face-landmarker";
import { UiButton } from "../uikit/ui-button";
import { useRouter } from "next/router";


export function ModalLogWin() {
  const [capturedImage, setCapturedImage] = useState(null);
  const { checkPhoto } = login();
  const [isReal, setIsReal] = useState()
  return (
    <div className="flex flex-col gap-2 m-auto w-lg bg-white mt-6 shadow rounded-b-xs px-3 py-4">
      <div className="text-2xl">Используйте лицо для входа</div>
      <FaceLandmarksDetection onCapture={setCapturedImage} isReal={setIsReal}/>
      <div className="flex justify-end">
        <UiButton variant="primary" onClick={() => checkPhoto(capturedImage, isReal)}>Готово!</UiButton>
      </div>
    </div>
  );
}

function login() {
  const router = useRouter()
  function checkPhoto(capturedImage, isReal) {
    if (!capturedImage) {
      alert("Фото не получено");
      return;
    }
    if (!isReal.is_real) {
      alert("Лицо подделанное!")
      return;
    }

    fetch("http://localhost:3429/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ img: capturedImage }),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.status = "success") {
          console.log("Ответ от сервера:", data);
          alert("Вход прошел успешно!");
          sessionStorage.setItem("login", data.login);
          router.push("/profile");
        }
        
      })
      .catch((err) => {
        console.error("Ошибка при отправке профиля:", err);
        alert("Не удалось отправить данные");
      });
  }
  return { checkPhoto };
}
