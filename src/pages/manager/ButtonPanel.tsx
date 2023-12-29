import {
    AcademicCapIcon, Square3Stack3DIcon, UserIcon
} from '@heroicons/react/24/outline'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ButtonPanel() {
    return (
        <div
            className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <div
                className={classNames(
                    'group relative bg-white p-6'
                )}
            >
                <div>
            <span
                className={classNames(
                    'text-primary bg-gray-100 inline-flex rounded-lg p-3 ring-4 ring-white'
                )}
            >
              <Square3Stack3DIcon className="h-6 w-6" aria-hidden="true"/>
            </span>
                </div>
                <div className="mt-8">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        <a href="#" className="focus:outline-none">
                            Unternehmen anlegen
                        </a>
                    </h3>
                </div>
                <span
                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                  d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
            </svg>
          </span>
            </div>
            <div
                className={classNames(
                    'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                )}
            >
                <div>
            <span
                className={classNames(
                    'text-primary bg-gray-100 inline-flex rounded-lg p-3 ring-4 ring-white'
                )}
            >
              <UserIcon className="h-6 w-6" aria-hidden="true"/>
            </span>
                </div>
                <div className="mt-8">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        <a href="#" className="focus:outline-none">
                            Berufskraftfahrer/in anlegen
                        </a>
                    </h3>
                </div>
                <span
                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                  d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
            </svg>
          </span>
            </div>
            <div
                className={classNames(
                    'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                )}
            >
                <div>
            <span
                className={classNames(
                    'text-primary bg-gray-100 inline-flex rounded-lg p-3 ring-4 ring-white'
                )}
            >
              <AcademicCapIcon className="h-6 w-6" aria-hidden="true"/>
            </span>
                </div>
                <div className="mt-8">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        <a href="#" className="focus:outline-none">
                            Weiterbildung anlegen
                        </a>
                    </h3>
                </div>
                <span
                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                  d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
            </svg>
          </span>
            </div>
        </div>
    )
}
