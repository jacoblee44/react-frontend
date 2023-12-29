import './App.css'
import MainWrapper from "./components/MainWrapper.tsx";
import {AcademicCapIcon, Square3Stack3DIcon, UserIcon} from "@heroicons/react/24/outline";

function App() {

    return (
        <MainWrapper>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-gray-50 rounded-xl h-full"></div>
                <div className="p-4 grid-cols-1 grid gap-4 bg-gray-50 rounded-xl">
                    <div
                        className="p-4 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <Square3Stack3DIcon className="w-8 h-8"/>
                        <span className="uppercase mt-2">Unternehmen anlegen</span>
                    </div>
                    <div
                        className="p-4 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <UserIcon className="w-8 h-8"/>
                        <span className="uppercase mt-2">Berufskraftfahrer/in anlegen</span>
                    </div>
                    <div
                        className="p-4 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <AcademicCapIcon className="w-8 h-8"/>
                        <span className="uppercase mt-2">Weiterbildung anlegen</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 grid-cols-1 grid gap-3 bg-gray-50 rounded-xl">
                    <span>Nächste Weiterbildungen</span>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>Crashkurs Woche Juli 2023</div>
                        <div>MODUL 5a - 04/Jul/2023 - 1/20</div>
                    </div>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>Crashkurs Woche Juli 2023</div>
                        <div>MODUL 5a - 04/Jul/2023 - 1/20</div>
                    </div>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>Crashkurs Woche Juli 2023</div>
                        <div>MODUL 5a - 04/Jul/2023 - 1/20</div>
                    </div>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>Crashkurs Woche Juli 2023</div>
                        <div>MODUL 5a - 04/Jul/2023 - 1/20</div>
                    </div>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>Crashkurs Woche Juli 2023</div>
                        <div>MODUL 5a - 04/Jul/2023 - 1/20</div>
                    </div>
                </div>
                <div className="p-3 grid-cols-1 grid gap-3 bg-gray-50 rounded-xl">
                    <span>Abgeschlossene Weiterbildungen</span>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>A-T Führerschein Akademie / Quaabo</div>
                        <div>MODUL 5c - 21/Jan/2023 - 2/3</div>
                    </div>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>A-T Führerschein Akademie / Quaabo</div>
                        <div>MODUL 5c - 21/Jan/2023 - 2/3</div>
                    </div>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>A-T Führerschein Akademie / Quaabo</div>
                        <div>MODUL 5c - 21/Jan/2023 - 2/3</div>
                    </div>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>A-T Führerschein Akademie / Quaabo</div>
                        <div>MODUL 5c - 21/Jan/2023 - 2/3</div>
                    </div>
                    <div
                        className="p-2 grid justify-items-center bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer">
                        <div>A-T Führerschein Akademie / Quaabo</div>
                        <div>MODUL 5c - 21/Jan/2023 - 2/3</div>
                    </div>
                </div>
            </div>
        </MainWrapper>
    )
}

export default App
