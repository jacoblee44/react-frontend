import {Transition, Dialog} from "@headlessui/react";
import {Fragment, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {XMarkIcon} from "@heroicons/react/24/outline";
import AddParticipantModal from "./AddParticipantModal.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../../../api/api.ts";
import moment from "moment";
import { toastr } from "../../../components/utils/toastr.tsx";

const CoursePage = () => {
    const navigate = useNavigate();
    const [openParticipantModal, setOpenParticipantModal] = useState(false);
    const {id} = useParams();
    const queryClient = useQueryClient();

    const course = useQuery<{
        id: string;
        name: string;
        module: {
            id: string;
            name: string;
        }
        location: {
            id: string;
            name: string;
        }
        instructor: {
            id: string;
            name: string;
        },
        extern: boolean;
        max_participants: number;
        start_date: string;
        end_date: string;
        participants: Array<{
            id: string;
            name: string;
        }>
    }>({
        queryKey: ["manager", "courses", id],
        queryFn: async () => {
            const res = await api.get(`/api/v1/manager/courses/${id}`);
            console.log("courses:", res);
            return res.data.data;
        }
    });

    const removeParticipants = useMutation({
        mutationFn: async (deleteId: string) => {
            const res = await api.delete(`/api/v1/manager/courses/${id}/participants`, {
                data: {
                    ids: [deleteId]
                }
            });
            console.log("removeParticipants:", res);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["manager", "courses"]});
            toastr.success("Erfolgreich gelöscht");
        },
        onError: () => {
            toastr.warning("Bitte versuchen Sie es später noch einmal");
        }

    });
    console.log("courpage_data:", course);

    if (!course.isSuccess) return <div>Loading...</div>;

    return <Transition.Root show as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate("/manager/courses")}>
            <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="pointer-events-auto w-screen max-w-lg pt-16">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                Weiterbildung
                                            </Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => navigate("/manager/courses")}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative flex-1 px-4 sm:px-6">
                                        <div>
                                            <div className="mt-6 border-t border-gray-100">
                                                <dl className="divide-y divide-gray-100">
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.data.name}</dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Modul</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.data.module.name}</dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Dozent</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.data.instructor.name}</dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Art</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            Inhouse {course.data.extern ? "Extern" : "Intern"}
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Teilnehmer</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.data.max_participants}</dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Start</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{moment(course.data.start_date).format("DD.MM.YYYY")}</dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Ende</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{moment(course.data.end_date).format("DD.MM.YYYY")}</dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Standort</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{course.data.location.name}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                            <ul role="list"
                                                className="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl px-4">
                                                {course.data.participants.map((participant) => (
                                                    <li key={participant.id}
                                                        className="flex items-center justify-between gap-x-6 py-5">
                                                        <div className="min-w-0">
                                                            <div className="flex items-start gap-x-3">
                                                                <p className="text-sm font-semibold leading-6 text-gray-900">{participant.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-none items-center gap-x-4">
                                                            <button
                                                                onClick={() => removeParticipants.mutate(participant.id)}
                                                                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                                            >
                                                                Entfernen
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="w-full text-right mt-1">
                                                <NavLink to={`/manager/courses/${course.data.id}/pdf`}
                                                         className="text-blue-500 text-xs">
                                                    Drucken
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                onClick={() => setOpenParticipantModal(true)}
                                            >
                                                Teilnehmer hinzufügen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </div>
            {openParticipantModal ?
                <AddParticipantModal course_id={course.data.id} onClose={() => setOpenParticipantModal(false)}/> : null}
        </Dialog>
    </Transition.Root>
}

export default CoursePage;