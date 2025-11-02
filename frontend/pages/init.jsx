import { Header } from "./components/header";
import { ModalWin } from "./components/init/modal-window";

export default function init() {

  return (
    <div className="min-h-screen bg-slate-50">
        <Header/>
        <ModalWin/>
    </div>
  );
}
