import {Fragment, useState} from 'react'
import {UsersIcon} from '@heroicons/react/24/outline'
import {Combobox, Dialog, Transition} from '@headlessui/react'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../../../api/api.ts";

function classNames(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    course_id: string;
    onClose: () => void;
}

const AddParticipantModal = (props: Props) => {
    const [query, setQuery] = useState('')

    const drivers = useQuery<Array<{
        id: string;
        name: string;
    }>>({
        queryKey: ["manager", "drivers", query],
        queryFn: async () => {
            const res = await api.get(`/api/v1/manager/drivers?s=${query}&limit=5`);
            return res.data.data;
        }
    })
    const queryClient = useQueryClient();

    const add = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.post(`/api/v1/manager/courses/${props.course_id}/participants`, {ids: [id]});
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["manager", "courses"]}).then(() => {
                props.onClose();
            });
        }
    });

    return (
        <Transition.Root show as={Fragment} afterLeave={() => setQuery('')} appear>
            <Dialog as="div" className="relative z-10" onClose={props.onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel
                            className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                            <Combobox>
                                <Combobox.Input
                                    className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                    onChange={(event) => setQuery(event.target.value)}
                                />

                                {drivers.isSuccess && drivers.data?.length > 0 && (
                                    <Combobox.Options
                                        static
                                        className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                                    >
                                        {drivers.data.map((driver) => (
                                            <Combobox.Option
                                                key={driver.id}
                                                value={driver}
                                                className={({active}) =>
                                                    classNames(
                                                        'cursor-default select-none rounded-md px-4 py-2',
                                                        active && 'bg-indigo-600 text-white'
                                                    )
                                                }
                                                onClick={() => {
                                                    add.mutate(driver.id);
                                                }}
                                            >
                                                {driver.name}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                )}

                                {query !== '' && drivers.data?.length === 0 && (
                                    <div className="px-4 py-14 text-center sm:px-14">
                                        <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true"/>
                                        <p className="mt-4 text-sm text-gray-900">No people found using that search
                                            term.</p>
                                    </div>
                                )}
                            </Combobox>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AddParticipantModal;