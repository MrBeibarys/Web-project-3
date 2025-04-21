import { useState } from "react";
import { useRouter } from "next/router";

export function useInitState() {
  const [login, setLogin] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false)
  const router = useRouter();

  function back() {
    router.push("/")
  }
  const profile = {
    login: login,
    password: password1,
    photo: ""
  }
  function submit() {
    if ((password1 > 0) === (password2 > 0)) {
      console.log(profile)
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
      alert("Неверно указаны пароли");
    }
  }
  function sendProfile(photo, isReal) {
    if (!photo) {
      alert("Фото не получено");
      return;
    }
    if (!isReal.is_real) {
      alert("Лицо подделанное!")
      return;
    }

    const payload = {
      login: login,
      password: password1,
      img: photo,
    };

    fetch("http://localhost:3429/singin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Регистрация прошла успешно!")
        console.log("Ответ от сервера:", data);
        router.push("/"); 
      })
      .catch((err) => {
        console.error("Ошибка при отправке профиля:", err);
        alert("Не удалось отправить данные");
      });
  }
  
  
  
  return { submit, setLogin, setPassword1, setPassword2, login, password1, isCorrect, sendProfile, back, setIsCorrect};
}
