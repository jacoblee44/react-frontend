import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api.ts";
import { ChangeEvent, useState } from "react";
import Panel from "../../../components/Panel.tsx";
import Input from "../../../components/inputs/Input.tsx";
import { useNavigate } from "react-router-dom";
import { toastr } from "../../../components/utils/toastr.tsx";

const initialForm = {
  name: "",
  street: "",
  zip_code: "",
  city: "",
};
const CreateLocationPage = () => {
  const [form, setForm] = useState(initialForm);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCreate = () => {
    if (!form.name || !form.street || !form.zip_code || !form.city) {
      return toastr.warning("Bitte einen Wert eingeben");
    }
    create.mutate();
  };

  const create = useMutation({
    mutationFn: async () => {
      const res = await api.post("/api/v1/manager/locations", form);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] }).then(() => {
        toastr.success("Erfolgreich registriert");
        navigate("/manager/locations");
      });
    },
    onError: () => {
      toastr.warning("Bitte versuchen Sie es später noch einmal");
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

  return (
    <Panel>
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="name"
          label="Ausbildungsstätte"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="street"
          label="Straße & Hausnummer"
          type="text"
          value={form.street}
          onChange={handleChange}
        />
        <Input
          name="zip_code"
          label="Postleitzahl"
          type="text"
          value={form.zip_code}
          onChange={handleChange}
        />
        <Input
          name="city"
          label="Stadt"
          type="text"
          value={form.city}
          onChange={handleChange}
        />
        <div className="col-span-2 flex justify-end">
          <button
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              handleCreate();
            }}
          >
            ✔️ Ort anlegen
          </button>
        </div>
      </div>
    </Panel>
  );
};

export default CreateLocationPage;
