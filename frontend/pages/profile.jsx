import { Header } from "./components/header";
import { ModalProfileWin } from "./components/profile/modal-window-profile";

export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <ModalProfileWin/>
    </div>
  );
}
