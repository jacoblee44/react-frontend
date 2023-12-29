import {ChangeEvent, HTMLInputTypeAttribute} from "react";

type Props = {
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: HTMLInputTypeAttribute;
}
const Input = (props: Props) => {
    return (
        <div>
            {props.label && <label htmlFor={props.name} className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>}
            <div className="mt-2">
                <input
                    type={props.type}
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    disabled={props.disabled}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    aria-describedby={`${props.name}-description`}
                />
            </div>
            {props.description && <p className="mt-2 text-sm text-gray-500" id={`${props.name}-description`}>
                {props.description}
            </p>}
        </div>
    )
}

export default Input;
