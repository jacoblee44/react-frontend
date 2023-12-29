import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../../api/api.ts";
import {ChangeEvent, useState} from "react";
import Panel from "../../../components/Panel.tsx";
import Input from "../../../components/inputs/Input.tsx";
import {useNavigate} from "react-router-dom";
import { toastr } from "../../../components/utils/toastr";

const CreateInstructorPage = () => {
    const [form, setForm] = useState({
        name: "",
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleCreate = () => {
        if(!form.name){
            return toastr.warning("Bitte einen Wert eingeben");
        }
        create.mutate();
    }
    const create = useMutation({
        mutationFn: async () => {
            const res = await api.post("/api/v1/manager/instructors", form);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["instructors"]}).then(() => {
                toastr.success("Erfolgreich registriert");
                navigate("/manager/instructors");
            });
        },
        onError:() => {
            toastr.warning("Bitte versuchen Sie es später noch einmal");
        },
    });
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((data) => {
            return {
                ...data,
                [e.target.name]: e.target.value
            }
        });
    };

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
          <div className="col-span-2 flex justify-end">
            <button
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                handleCreate();
              }}
            >
              ✔️ Dozent anlegen
            </button>
          </div>
        </div>
      </Panel>
    );
};

export default CreateInstructorPage;