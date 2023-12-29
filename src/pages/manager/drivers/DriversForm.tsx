import Panel from "../../../components/Panel.tsx";
import Input from "../../../components/inputs/Input.tsx";
import {ChangeEvent} from "react";
import drivingLicenseClasses from "../../../utils/helpers/drivingLicenseClasses.ts";
import Select from "../../../components/inputs/Select.tsx";

export type Driver = {
  name: string;
  birth_name: string;
  birth_date: string;
  module_date: string;
  birth_place: string;
  doctor_type: string;
  gender: string;
  email: string;
  user_id: string;
  school_company_id: string;
  school_company_name: string;
  driving_license: (typeof drivingLicenseClasses)[number];
};


type Props = {
    onChange: (updatedDriver: Driver) => void;
    value: Driver;
}

const drivingLicenseClassesTransformed = drivingLicenseClasses.map((cls, index) => ({name: cls, id: String(index)}));

const DriversForm = (props: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof Driver) => {
        const updatedDriver = {...props.value, [field]: e.target.value};
        props.onChange(updatedDriver);
    };

    const handleChangeSelect = (value: { name: string; id: string; }, field: keyof Driver) => {
        const updatedDriver = {...props.value, [field]: value.name};
        props.onChange(updatedDriver);
    };

    return (
        <Panel>
            <div className="grid grid-cols-2 gap-4">
                <Input name="name" label="Vollständigername" type="text" value={props.value.name}
                       onChange={(e) => handleChange(e, 'name')}/>
                <Input name="birth_name" label="Geburtsname" type="text" value={props.value.birth_name}
                       onChange={(e) => handleChange(e, 'birth_name')}/>
                <Input name="birth_date" label="Geburtsdatum" type="datetime-local" value={props.value.birth_date}
                       onChange={(e) => handleChange(e, 'birth_date')}/>
                <Input name="birth_place" label="Geburtsort" type="text" value={props.value.birth_place}
                       onChange={(e) => handleChange(e, 'birth_place')}/>
                <Input name="doctor_type" label="Doktorgrad" type="text" value={props.value.doctor_type}
                       onChange={(e) => handleChange(e, 'doctor_type')}/>
                <Input name="gender" label="Geschlecht" type="text" value={props.value.gender}
                       onChange={(e) => handleChange(e, 'gender')}/>
                <Input name="email" label="Email" type="email" value={props.value.email}
                       onChange={(e) => handleChange(e, 'email')}/>
                <Input name="module_date" label="Module 95 ablaufdatum (Führerschein)" type="datetime-local"
                       value={props.value.module_date}
                       onChange={(e) => handleChange(e, 'module_date')}/>
                <Select name="driving_license" label="Führerscheinklasssen"
                        value={{
                            name: props.value.driving_license,
                            id: String(drivingLicenseClasses.indexOf(props.value.driving_license))
                        }}
                        options={drivingLicenseClassesTransformed}
                        onChange={(value) => handleChangeSelect(value, 'driving_license')}/>
            </div>
        </Panel>
    );
};

export default DriversForm;
