import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../../api/api.ts";
import {Link, useNavigate} from "react-router-dom";
import { toastr } from "../../components/utils/toastr.tsx";

const DriversListPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const removeMutation = useMutation({
    mutationFn: async (deleteId: string) => {
        const res = await api.delete(`/api/v1/manager/drivers/delete/${deleteId}`);
        console.log("removeDriverItem:", res);
        return res.data.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["manager", "courses"] });
        toastr.success("Erfolgreich gelöscht");
    },
    onError: () => {
        toastr.warning("Bitte versuchen Sie es später noch einmal");
    },
    });

    const drivers = useQuery({
        queryKey: ["drivers"],
        queryFn: async () => {
            const res = await api.get("/api/v1/drivers");
            console.log("Driver:", res)
            return res.data.data;
        }
    })


    if (drivers.isLoading) { return <div>Loading...</div> }

    const handleDelete = (driver_id: string) => {
        console.log("driver_id:", driver_id);
        if (window.confirm("Löschen Sie das ausgewählte Element?")) {
        // remove it!
        removeMutation.mutate(driver_id);
        }
    };
  
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Kraftfahrer
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => navigate("/manager/drivers/create")}
              className="block rounded-md add-button px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ➕ Neuer Kraftfahrer
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Sachbearbeiter
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Unternehmen
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {drivers.data.map(
                      (driver: {
                        id: string;
                        name: string;
                        school_company_name: string;
                        email: string;
                      }) => (
                        <tr key={driver.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            -
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {driver.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {driver.school_company_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {driver.email}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link to={driver.id} className="ml-4 edit-button">
                              📰 Anzeigen
                            </Link>
                            <a
                              href="#"
                              className="ml-4 delete-button"
                              onClick={() => {
                                handleDelete(driver.id);
                              }}
                            >
                              🗑️ Löschen
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DriversListPage;