import Panel from "../../../components/Panel.tsx";
import Input from "../../../components/inputs/Input.tsx";
import {ChangeEvent, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../../api/api.ts";
import { toastr } from "../../../components/utils/toastr";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../../components/utils/index.tsx";

const initialForm = {
    name: "",
    contact_person: "",
    email: "",
    phone_number: "",
    customer_number: "",
    self_employed: false,
    street: "",
    zip_code: "",
    city: "",
    notes: "",
}

const CompanyCreatePage = () => {
    const [form, setForm] = useState(initialForm)
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const handleCreate = () => {
        if(!form.name || !form.contact_person || !form.email || !form.phone_number || !form.customer_number || !form.street || !form.zip_code || !form.city || !form.notes){
            return toastr.warning("Bitte einen Wert eingeben");
        }
         if (!isValidEmail(form.email)) {
           return toastr.warning("Falsche E-Mail Adresse");
         }
        create.mutate();
    }
    const create = useMutation(["create", "company"], {
        mutationFn: async () => {
            const res = await api.post("/api/v1/companies", form);
            return res.data;
        },
        onSuccess: (data) => {
            console.log("company_create_success:",data)
            setForm(initialForm)
            navigate('/manager/companies');
            toastr.success("Erfolgreich registriert");
            queryClient.invalidateQueries({queryKey: ["companies"]});
        },
        onError: () => {
            toastr.warning("Bitte versuchen Sie es später noch einmal");
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log("company_form_data:", form);
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
          <Input
            name="contact_person"
            label="Ansprechpartner"
            type="text"
            value={form.contact_person}
            onChange={handleChange}
          />
          <Input
            name="email"
            label="Email"
            type="text"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            name="phone_number"
            label="Telefon"
            type="text"
            value={form.phone_number}
            onChange={handleChange}
          />
          <Input
            name="customer_number"
            label="Kundennummer"
            type="text"
            value={form.customer_number}
            onChange={handleChange}
          />
          <div>
            <fieldset className="mt-9">
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    id="company"
                    name="self_employed"
                    type="radio"
                    value={!form.self_employed ? "true" : "false"}
                    onChange={() =>
                      setForm((data) => {
                        return { ...data, self_employed: false };
                      })
                    }
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={!form.self_employed}
                  />
                  <label
                    htmlFor="company"
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Unternehmen
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="self_employed"
                    name="self_employed"
                    type="radio"
                    value={form.self_employed ? "true" : "false"}
                    onChange={() =>
                      setForm((data) => {
                        return { ...data, self_employed: true };
                      })
                    }
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="self_employed"
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Selbstständiger Kraftfahrer/in
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Input
              name="street"
              label="Anschrift"
              type="text"
              value={form.street}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>
          <div className="flex flex-col h-full">
            <label
              htmlFor="notes"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Notizen
            </label>
            <textarea
              name="notes"
              id="notes"
              className="flex-grow mt-2 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              value={form.notes}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                handleCreate();
              }}
            >
              ✔️ Unternehmen anlegen
            </button>
          </div>
        </div>
      </Panel>
    );
}

export default CompanyCreatePage;