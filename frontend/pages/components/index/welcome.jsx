import Link from "next/link";
import { UiButton } from "../uikit/ui-button";

export function Wellcome() {
  return (
    <div className="flex flex-col gap-2 m-auto w-lg bg-white mt-6 shadow rounded-b-xs px-3 py-4">
      <div className="text-2xl">Здравствйте! Выберите действия:</div>
      <div className="grid gap-1">
        <UiButton variant="outline" href="login">logIn</UiButton>
        <UiButton variant="primary" href="init">singIn</UiButton>
      </div>
    </div>
  );
}
