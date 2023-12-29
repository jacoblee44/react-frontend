import Input from "../../components/inputs/Input.tsx";
import Panel from "../../components/Panel.tsx";
import { useEffect } from "react";
// import ComboBox from "../../components/inputs/ComboBox.tsx";
import DriversForm, {Driver} from "./drivers/DriversForm.tsx";
import {useState} from "react";
import {Disclosure} from "@headlessui/react";
import {MinusSmallIcon, PlusSmallIcon} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastr } from "../../components/utils/toastr.tsx";
import api from "../../api/api.ts";
import Select from "../../components/inputs/Select.tsx";
import { localStorageUserInfo, isEmpty, isValidEmail } from "../../components/utils/index.tsx";

const emptyDriver: Driver = {
    name: '',
    birth_name: '',
    birth_date: '',
    module_date: '',
    birth_place: '',
    doctor_type: '',
    gender: '',
    email: '',
    school_company_id: '',
    user_id: '',
    driving_license: 'C',
    school_company_name: '',
}

type CompanyType = {
  name: string;
  id: null | string;
};

const initialCompanyForm = {
  name: "",
  id: null,
};

const modules = [
    {id: 1, name: 'Training', knowledgeAreas: ["1.1", "1.2", "1.3", "1.3a"]},
    {id: 2, name: 'Vorschriften für den Güterverkehr', knowledgeAreas: ["2.1", "2.2", "2.3"]},
    {id: 3, name: 'Sicherheitstechnik und Fahrsicherheit', knowledgeAreas: ["1.2", "3.1", "3.5"]},
    {
        id: 4,
        name: 'Schaltstelle Fahrer: Dienstleister, Imageträger, Profi',
        knowledgeAreas: ["3.2", "3.3", "3.4", "3.6", "3.7", "3.8"]
    },
    {id: 5, name: 'Ladungssicherung', knowledgeAreas: ["1.4", "1.5", "1.6"]},
]

const areasOfKnowledge: { [key: string]: string } = {
    "1.1": "Kenntnis der Eigenschaften der kinematischen Kette für eine optimierte Nutzung.",
    "1.2": "Kenntnis der technischen Merkmale und der Funktionsweise der Sicherheitsausstattung.",
    "1.3": "Fähigkeit zur Optimierung des Kraftstoffverbrauchs.",
    "1.3a": "Fähigkeit, Risiken im Straßenverkehr vorherzusehen, zu bewerten und sich daran anzupassen.",
    "1.4": "Fähigkeit zur Sicherung der Ladung unter Anwendung der Sicherheitsvorschriften und durch richtige Benutzung des Fahrzeugs.",
    "1.5": "Fähigkeit zur Gewährleistung der Fahrgastsicherheit und des Fahrgastkomforts.",
    "1.6": "Fähigkeit zur Sicherung der Ladung unter Anwendung der Sicherheitsvorschriften und durch richtige Benutzung des Fahrzeugs.",
    "2.1": "Kenntnis der sozialrechtlichen Rahmenbedigungen und Vorschriften für den Güter- oder Personenverkehr.",
    "2.2": "Kenntnis der Vorschriften für den Güterkraftverkehr.",
    "2.3": "Kenntnis der Vorschriften für den Personenverkehr.",
    "3.1": "Sensibilisierung in Bezug auf Risiken des Straßenverkehrs und Arbeitsunfälle.",
    "3.2": "Fähigkeit, der Kriminalität und der Schleusung illegaler Einwanderer vorzubeugen.",
    "3.3": "Fähigkeit, Gesundheitsschäden vorzubeugen.",
    "3.4": "Sensibilisierung für die Bedeutung einer guten körperlichen und geistigen Verfassung.",
    "3.5": "Fähigkeit zu richtiger Einschätzung der Lage bei Notfällen.",
    "3.6": "Fähigkeit zu einem Verhalten, das zu einem positiven Image des Unternehmens beiträgt.",
    "3.7": "Kenntnis des wirtschaftlichen Umfelds des Güterkraftverkehrs und der Marktordnung.",
    "3.8": "Kenntnis des wirtschaftlichen Umfelds des Personenkraftverkehrs und der Marktordnung."
}


const DriversBulkCreatePage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [company, setCompany] = useState<CompanyType>(initialCompanyForm);
    const [drivers, setDrivers] = useState<Driver[]>([emptyDriver]);
    const { user_id } = localStorageUserInfo();
    useEffect(() => {
      if (isEmpty(user_id)) {
        window.localStorage.clear();
        return navigate("/login");
      }
    }, [company, navigate, user_id]);
    const handleCreate = () => {
        let flag = 1;
        let email_flag = 1;
        drivers && drivers.forEach(item => {
            if(!item.name || !item.birth_name || !item.birth_date || !item.module_date || !item.birth_place || !item.doctor_type || !item.gender || !item.email || !item.driving_license){
                flag ++
            }
            if(!isValidEmail(item.email)){
              email_flag ++;
            }
            if (!company?.id) {
              item.school_company_id = ""; // Replace "default_value" with the actual default value you want to use
            } else {
              item.school_company_id = company.id;
              item.school_company_name = company.name;
              item.user_id = user_id;
            }
        })
        if(flag > 1 || !company.id){
            return toastr.warning("Bitte einen Wert eingeben"); 
        }
        if(email_flag > 1){
          return toastr.warning("Falsche E-Mail Adresse");
        }
        create.mutate();
    };
    
    const create = useMutation({
        mutationFn: async () => {
        console.log("drivercreate:", drivers);
        let data ;
        for(let i=0;i<drivers.length;i++){
            const res = await api.post("/api/v1/manager/drivers", drivers[i]);
            data = res.data.data;
        }
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["drivers"] }).then((result) => {
          toastr.success("Erfolgreich registriert");
          console.log("driver_register_result:", result)
          navigate("/manager/drivers");
        });
      },
      onError: (err) => {
        console.log("create_database_error:", err);
        toastr.warning("Bitte versuchen Sie es später noch einmal");
      },
    });

    const companies = useQuery<
        Array<{
            id: string;
            name: string;
        }>
    >({
        queryKey: ["companies"],
        queryFn: async () => {
            const res = await api.get("/api/v1/companies");
            if(!company.id){
                setCompany((data) => {
                    return {
                        ...data,
                        id: res.data.data[0].id,
                        name: res.data.data[0].name
                    }
                })
            }
            return res.data.data;
        },
    });
    if (!companies.isSuccess) return <div>Loading...</div>;
    // const options = [
    //     {
    //         name: 'Wade Cooper',
    //         id: 'wade-cooper',
    //         imageUrl: 'https://placehold.co/128',
    //     },
    //     {
    //         name: 'Wade Cooper2',
    //         id: 'wade-cooper2',
    //         imageUrl: 'https://placehold.co/128',
    //     },
    // ]
    

    return (
      <div className="divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 pb-4">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Allgemein
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600"></p>
          </div>
          <Panel>
            {/* <ComboBox
              label="Unternehmen"
              options={options}
              onChanged={(value) => console.log(value)}
            /> */}
            <Select
              name={"school_company_id"}
              label={"Unternehmen"}
              options={companies.data}
              value={
                companies.data.find((data) => data.id === company.id) ||
                companies.data[0]
              }
              onChange={(value) =>
                setCompany((data) => {
                  return { ...data, id: value.id, name: value.name };
                })
              }
            />
            <Input
              name="id"
              label="Sachbearbeiterkennung"
              type="text"
              value="Anton Jacker"
              disabled={true}
            />
          </Panel>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 py-4">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personendaten
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600"></p>
          </div>
          <div className="w-full col-span-2 space-y-4">
            {drivers.map((driver, index) => (
              <DriversForm
                onChange={(value) => {
                  setDrivers((data) => {
                    const newData = [...data];
                    newData[index] = value;
                    return newData;
                  });
                }}
                value={driver}
                key={index}
              />
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setDrivers((data) => {
                    const newData = [...data];
                    newData.push({ ...emptyDriver });
                    return newData;
                  });
                }}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ➕ Neuer Fahrer
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 py-4">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Kenntnisbereiche
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600"></p>
          </div>
          <div className="w-full col-span-2 space-y-4">
            <fieldset>
              <dl className="divide-y divide-gray-200 grid grid-cols-1 gap-2">
                {modules.map((faq) => (
                  <Disclosure
                    as="div"
                    key={faq.id}
                    className="bg-white rounded-xl shadow"
                  >
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-center justify-between px-4 py-3 text-left">
                            <div className="flex items-center">
                              <span className="text-lg font-medium text-gray-900">
                                {faq.id} - {faq.name}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {open ? (
                                <MinusSmallIcon
                                  className="h-6 w-6 text-gray-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmallIcon
                                  className="h-6 w-6 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}
                              <input
                                id={`person-${faq.id}`}
                                name={`person-${faq.id}`}
                                type="checkbox"
                                className="ml-3 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="px-4 pb-3">
                          <ul className="space-y-2">
                            {faq.knowledgeAreas &&
                              faq.knowledgeAreas.map((category) => (
                                <li
                                  key={category}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-gray-600">
                                    {category} - {areasOfKnowledge[category]}
                                  </span>
                                  <input
                                    type="checkbox"
                                    className="ml-3 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                </li>
                              ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </fieldset>
          </div>
        </div>

        <div className="col-span-2 flex justify-end">
          <button
            className="rounded-md add-button px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              handleCreate();
            }}
          >
            ✔️ Treiber anlegen
          </button>
        </div>
      </div>
    );
}

export default DriversBulkCreatePage;