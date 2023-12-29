import {ChevronRightIcon} from "@heroicons/react/24/outline";
import ButtonPanel from "./ButtonPanel.tsx";
import DashboardChart from "../../components/dashboard/DashboardChart.tsx";
import DashboardNewDriversWidget from "../../components/dashboard/DashboardNewDriversWidget.tsx";
import DashboardModule95Widget from "../../components/dashboard/DashboardModule95Widget.tsx";

const DashboardPage = () => {

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-3 gap-4 col-span-2">
                    <div
                        className="col-span-2 divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                        <DashboardChart/>
                    </div>

                    <ButtonPanel/>
                </div>
                <ul
                    role="list"
                    className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                >

                    <div className="border-b border-gray-200 bg-white px-4 py-4">
                        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-2">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Nächste
                                    Weiterbildungen</h3>
                            </div>
                            <div className="ml-4 mt-2 flex-shrink-0">
                                <button
                                    type="button"
                                    className="relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Alle anzeigen
                                </button>
                            </div>
                        </div>
                    </div>
                    <li className="relative flex justify-between gap-x-6 px-4 py-2 hover:bg-gray-50">
                        <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <a href="#">
                                        <span className="absolute inset-x-0 -top-px bottom-0"/>
                                        Crashkurs Woche Juli 2023
                                    </a>
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <a href="#"
                                       className="relative truncate hover:underline">
                                        MODUL 5a
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">1/20</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">04.07.2023</p>
                            </div>
                            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
                        </div>
                    </li>
                </ul>
                <ul
                    role="list"
                    className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                >

                    <div className="border-b border-gray-200 bg-white px-4 py-4">
                        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-2">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Abgeschlossene
                                    Weiterbildungen</h3>
                            </div>
                            <div className="ml-4 mt-2 flex-shrink-0">
                                <button
                                    type="button"
                                    className="relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Alle anzeigen
                                </button>
                            </div>
                        </div>
                    </div>
                    <li className="relative flex justify-between gap-x-6 px-4 py-2 hover:bg-gray-50">
                        <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <a href="#">
                                        <span className="absolute inset-x-0 -top-px bottom-0"/>
                                        Crashkurs Woche Juli 2023
                                    </a>
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <a href="#"
                                       className="relative truncate hover:underline">
                                        MODUL 5a
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">1/20</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">04.07.2023</p>
                            </div>
                            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
                        </div>
                    </li>
                </ul>
                <DashboardModule95Widget/>

                <DashboardNewDriversWidget/>
            </div>
        </>
    )
}

export default DashboardPage
