import { useEffect, useReducer, useState } from "react";
import { Header } from "../components/header";
import { UiButton } from "../components/uikit/ui-button";
import { useRouter } from "next/router";

export default function AddBilimclass() {
  const { setBilimclassLogin, setPassword, send } = sendBilimclass();
  const [login, setLogin] = useState("");
  const router = useRouter()

  useEffect(() => {
    const storedLogin = sessionStorage.getItem("login");
    if (storedLogin) {
      setLogin(storedLogin);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex flex-col gap-4 m-auto w-lg bg-white mt-6 shadow rounded-b-xs px-3 py-4">
        <div className="text-2xl">Добавьте профиль BilimClass</div>
        <div>
          <div className="grid">
            <div className="text-xl ">Логин</div>
            <input
              className="bg-gray-100  border-1 rounded-xs border-gray-300"
              type="text"
              onChange={(e) => setBilimclassLogin(e.target.value)}
            />
          </div>
          <div className="grid">
            <div className="text-xl ">Пароль</div>
            <input
              className="bg-gray-100  border-1 rounded-xs border-gray-300"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <UiButton variant="outline">Назад</UiButton>
          <UiButton variant="primary" onClick={() => send(login, router)}>
            Готово!
          </UiButton>
        </div>
      </div>
    </div>
  );
}

function sendBilimclass() {
  const [bilimclassLogin, setBilimclassLogin] = useState(null);
  const [password, setPassword] = useState(null);

  function send(login, router) {
    if (login.length == 0 && password.length == 0) {
      alert("Введите данные!");
      return;
    }

    fetch("http://localhost:3429/add_bilimclass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: login,
        bilim_login: bilimclassLogin,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          sessionStorage.setItem("bilimLogin", bilimclassLogin)
          sessionStorage.setItem("bilimPassword", password)
          router.push("/profile")
        }
      });
  }

  return { setBilimclassLogin, setPassword, send };
}
