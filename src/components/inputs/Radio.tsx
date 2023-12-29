const notificationMethods = [
    {id: 'company', title: 'Unternehmen'},
    {id: 'self_employed', title: 'Selbstständiger Kraftfahrer/in'},
]

const Radio = () => <div>
    <fieldset className="mt-9">
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
            {notificationMethods.map((notificationMethod) => (
                <div key={notificationMethod.id} className="flex items-center">
                    <input
                        id={notificationMethod.id}
                        name="notification-method"
                        type="radio"
                        defaultChecked={notificationMethod.id === 'email'}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor={notificationMethod.id}
                           className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        {notificationMethod.title}
                    </label>
                </div>
            ))}
        </div>
    </fieldset>
</div>

export default Radio;