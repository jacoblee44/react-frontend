import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../../../api/api.ts";
import {Link, Outlet} from "react-router-dom";
import { toastr } from "../../../components/utils/toastr";

const CoursesPage = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const removeMutation = useMutation({
    mutationFn: async (deleteId: string) => {
      const res = await api.delete(`/api/v1/manager/courses/delete/${deleteId}`);
      console.log("removeCourseItem:", res);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["manager", "courses"]});
      toastr.success("Erfolgreich gelöscht");
    }, 
    onError: () => {
      toastr.warning("Bitte versuchen Sie es später noch einmal")
    }
  })
  
  const courses = useQuery<Array<{
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
      }
  }>>({
      queryKey: ["manager", "courses"],
      queryFn: async () => {
          const res = await api.get("/api/v1/manager/courses");
          return res.data.data;
      }
  });

  console.log("manager_course:", courses)
  if (!courses.isSuccess) return <div>Loading...</div>
  
  const handleDelete = (course_id: string) => {
    console.log("course_id:", course_id)
    if (window.confirm("Löschen Sie das ausgewählte Element?")) {
      // remove it!
      removeMutation.mutate(course_id);
    }
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 relative">
      <Outlet />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Weiterbildungen
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to={`/manager/courses/create`}
            className="block rounded-md add-button px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ➕ Neue Weiterbildung
          </Link>
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Modul
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Dozent
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Standort
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {courses.data.map((course) => (
                    <tr key={course.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {course.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {course.module.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {course.instructor.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {course.location.name}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={course.id} className="ml-4 edit-button">
                          📰 Anzeigen
                        </Link>
                        <a
                          href="#"
                          className="ml-4 delete-button"
                          onClick={() => { handleDelete(course.id)}}
                        >
                          🗑️ Löschen
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;