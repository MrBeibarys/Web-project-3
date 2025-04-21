import { useEffect, useState } from "react";
import Image from "next/image";
import bilimclass from "./icons/bilimclass.svg";
import { useRouter } from "next/router";
export function ModalProfileWin() {
  const [login, setLogin] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedLogin = sessionStorage.getItem("login");
    if (storedLogin) {
      setLogin(storedLogin);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 m-auto w-lg bg-white mt-6 shadow rounded-b-xs px-3 py-4">
      <div className="text-2xl">Здравствуйте, {login}</div>

      <div className="flex justify-center mt-4">
        <button
          className="flex gap-2 border-1 px-4 py-2 rounded-xs"
          onClick={() => openbilimclass(login, router)}
        >
          <Image width={30} src={bilimclass} alt="bilimclass" />
          <div className="text-xl">Войти в BilimClass</div>
        </button>
      </div>
    </div>
  );
}

function openbilimclass(login, router) {
  fetch("http://localhost:3429/bilimclass", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: login }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "success") {
        console.log(data.bilimclass.login);
        const sendData = {
          login: data.bilimclass.login,
          password: data.bilimclass.password,
        };
        const encodedData = encodeURIComponent(JSON.stringify(sendData));
        const url = `https://bilimclass.kz/login?data=${encodedData}`;
        window.open(url); 
      } else if (data.status == "bilimclass_not_finded") {
        console.log("Нужно добавить bilimclass");
        router.push("/profile/add_bilimclass");
      } else {
        alert(data.status);
      }
    })
    .catch((err) => {
      console.error("Ошибка при отправке профиля:", err);
      alert("Не удалось отправить данные");
    });
}
