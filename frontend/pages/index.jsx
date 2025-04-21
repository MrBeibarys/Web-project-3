import { Header } from "./components/header"
import { Wellcome } from "./components/index/welcome";



export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
    <Header/>
    <Wellcome/>
    </div>
  );
}
