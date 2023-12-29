import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api.ts";
import { ChangeEvent, useState } from "react";
import Panel from "../../../components/Panel.tsx";
import Input from "../../../components/inputs/Input.tsx";
import Select from "../../../components/inputs/Select.tsx";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toastr } from "../../../components/utils/toastr";

type CourseType = {
  name: string;
  max_participants: number;
  extern: boolean;
  start_date: Date;
  end_date: Date;
  instructor_id: null | string;
  location_id: null | string;
  module_id: null | string;
};

const initialForm = {
  name: "",
  max_participants: 1,
  extern: false,
  start_date: new Date(),
  end_date: new Date(),
  instructor_id: null,
  location_id: null,
  module_id: null,
};

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<CourseType>(initialForm);
  const handleCreate = () => {
    if (
      !form.name ||
      !form.instructor_id ||
      !form.location_id ||
      !form.module_id
    ) {
      return toastr.warning("Bitte einen Wert eingeben");
    }
    console.log("createcourse:", form);
    setForm({ ...form, max_participants: Number(form.max_participants) });
    create.mutate();
  };
  const create = useMutation({
    mutationFn: async () => {
      console.log(form);
      const res = await api.post("/api/v1/manager/courses", form);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] }).then(() => {
        toastr.success("Erfolgreich registriert");
        navigate("/manager/courses");
      });
    },
    onError: () => {
      toastr.warning("Bitte versuchen Sie es später noch einmal");
    },
  });

  const instructors = useQuery<
    Array<{
      id: string;
      name: string;
    }>
  >({
    queryKey: ["manager", "instructors"],
    queryFn: async () => {
      const res = await api.get("/api/v1/manager/instructors");
      if (!form.instructor_id)
        setForm((data) => {
          return {
            ...data,
            instructor_id: res.data.data[0].id,
          };
        });
      return res.data.data;
    },
  });

  const locations = useQuery<
    Array<{
      id: string;
      name: string;
    }>
  >({
    queryKey: ["manager", "locations"],
    queryFn: async () => {
      const res = await api.get("/api/v1/manager/locations");
      console.log("locations_data:", res);
      if (!form.location_id)
        setForm((data) => {
          return {
            ...data,
            location_id: res.data.data[0].id,
          };
        });
      return res.data.data;
    },
  });

  const modules = useQuery<
    Array<{
      id: string;
      name: string;
    }>
  >({
    queryKey: ["manager", "modules"],
    queryFn: async () => {
      const res = await api.get("/api/v1/manager/modules");
      console.log("modules_data:", res);
      if (!form.module_id)
        setForm((data) => {
          return {
            ...data,
            module_id: res.data.data[0].id,
          };
        });
      return res.data.data;
    },
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  if (!instructors.isSuccess || !modules.isSuccess || !locations.isSuccess)
    return <></>;

  return (
    <Panel>
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="name"
          label="Name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        <Select
          name={"instructor_id"}
          label={"Dozent"}
          options={instructors.data}
          value={
            instructors.data.find((data) => data.id === form.instructor_id) ||
            instructors.data[0]
          }
          onChange={(value) =>
            setForm((data) => {
              return { ...data, instructor_id: value.id };
            })
          }
        />
        <Input
          name="max_participants"
          label="Teilnehmerzahl"
          type="number"
          value={form.max_participants}
          onChange={handleChange}
        />

        <div>
          <fieldset className="mt-9">
            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
              <div className="flex items-center">
                <input
                  id="extern"
                  name="extern"
                  type="radio"
                  value={!form.extern ? "true" : "false"}
                  onChange={() =>
                    setForm((data) => {
                      console.log("extern:", data);
                      return { ...data, extern: false };
                    })
                  }
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={!form.extern}
                />
                <label
                  htmlFor="intern"
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  Inhouse Extern
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="extern"
                  name="extern"
                  type="radio"
                  value={form.extern ? "true" : "false"}
                  onChange={() =>
                    setForm((data) => {
                      return { ...data, extern: true };
                    })
                  }
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="extern"
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  Inhouse Intern
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="col-span-2">
          <Datepicker
            value={{
              startDate: form.start_date,
              endDate: form.end_date,
            }}
            onChange={(value) =>
              setForm((data) => {
                return {
                  ...data,
                  start_date: moment(value?.startDate, "YYYY-MM-DD").toDate(),
                  end_date: moment(value?.endDate, "YYYY-MM-DD").toDate(),
                };
              })
            }
          />
        </div>
        <Select
          name={"location_id"}
          label={"Standort"}
          options={locations.data}
          value={
            locations.data.find((data) => data.id === form.location_id) ||
            locations.data[0]
          }
          onChange={(value) =>
            setForm((data) => {
              console.log("selected_item1:", data);
              return { ...data, location_id: value.id };
            })
          }
        />
        <Select
          name={"module_id"}
          label={"Module"}
          options={modules.data}
          value={
            modules.data.find((data) => data.id === form.module_id) ||
            modules.data[0]
          }
          onChange={(value) =>
            setForm((data) => {
              console.log("selected_item2:", data);
              return { ...data, module_id: value.id };
            })
          }
        />
        <div className="col-span-2 flex justify-end">
          <button
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              handleCreate();
            }}
          >
            ✔️ Weiterbildung anlegen
          </button>
        </div>
      </div>
    </Panel>
  );
};

export default CreateCoursePage;
