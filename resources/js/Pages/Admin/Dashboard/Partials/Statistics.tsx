export default function Statistics({
    productDetails,
    inquiryDetails,
    cvDetails,
}: any) {
    return (
        <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
                Hello Admin,
            </h3>
            <p>Welcome to dashboard.</p>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <h1 className="text-gray-600 font-bold text-2xl">
                        Products
                    </h1>
                    <div className="flex gap-x-5 items-center w-full">
                        <h2 className="text-gray-600 font-medium">Total</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {productDetails?.allProducts}
                        </span>
                    </div>
                    <div className="flex gap-x-5 items-center w-full">
                        <h2 className="text-gray-600 font-medium">Active</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {productDetails?.activeProducts}
                        </span>
                    </div>
                    <div className="flex gap-x-5 items-center w-full">
                        <h2 className="text-gray-600 font-medium">Inactive</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {productDetails?.inactiveProducts}
                        </span>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <h1 className="text-gray-600 font-bold text-2xl">
                        Inquiries
                    </h1>
                    <div className="flex gap-x-5 items-center w-full">
                        <h2 className="text-gray-600 font-medium">Total</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {inquiryDetails?.allInquiry}
                        </span>
                    </div>
                    <div className="flex gap-x-5 items-center w-full">
                        <h2 className="text-gray-600 font-medium">Read</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {inquiryDetails?.readedInquiry}
                        </span>
                    </div>
                    <div className="flex gap-x-5 items-center w-full">
                        <h2 className="text-gray-600 font-medium">New</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {inquiryDetails?.newInquiry}
                        </span>
                    </div>
                    <div className="flex gap-x-5 items-center w-full">
                        <h2 className="text-gray-600 font-medium">Scam</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {inquiryDetails?.scamInquiry}
                        </span>
                    </div>
                </div>

                {/* <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <h1 className="text-gray-600 font-bold text-2xl">
                        Recieved CVs
                    </h1>
                    <div className="flex items-center w-full">
                        <h2 className="text-gray-600 font-medium">Total</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {cvDetails?.allCvs}
                        </span>
                    </div>
                    <div className="flex gap-x-5 items-center">
                        <h2 className="text-gray-600 font-medium">Read</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {cvDetails?.rededCvs}
                        </span>
                    </div>
                    <div className="flex gap-x-5 items-center">
                        <h2 className="text-gray-600 font-medium">New</h2>
                        <span className="text-2xl font-semibold tracking-tight text-gray-900 flex justify-end w-full">
                            {cvDetails?.newCvs}
                        </span>
                    </div>
                </div> */}

                {/* {stats.map((item) => (
                    <div
                        key={item.name}
                        className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                    >
                        <dt className="truncate text-sm font-medium text-gray-500">
                            {item.name}
                        </dt>
                        <div className="flex">
                            <h1>Total</h1>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                {productDetails?.total.length}
                            </dd>
                        </div>
                    </div>
                ))} */}
            </dl>
        </div>
    );
}
