import { Header } from "./components/header";
import { ModalLogWin } from "./components/login/modal-login-window";

export default function Login() {
      return (
        <div className="min-h-screen bg-slate-50">
            <Header/>
            <ModalLogWin/>
        </div>
      );
}