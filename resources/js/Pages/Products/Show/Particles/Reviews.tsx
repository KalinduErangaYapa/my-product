import { Rating } from "react-simple-star-rating";
const fillColorArray = [
    "#f16a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045",
];
const tooltipArray = [
    "Terrible+",
    "Terrible",
    "Bad+",
    "Bad",
    "Average",
    "Average+",
    "Great",
    "Great+",
    "Awesome",
    "Awesome+",
];
export default function Reviews({ reviews }: { reviews: any }) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Reviews By our awesome customers
                </h2>
                {reviews?.length > 0 && (
                    <p className="mt-2 text-md leading-8 text-gray-600">
                        {reviews?.length} reviews
                    </p>
                )}
                <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
                    {reviews?.length === 0 ? (
                        <div>
                            <div className="mt-6 flex items-center text-sm ">
                                <div className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
                                    Sorry! No reviews yet
                                </div>
                            </div>
                        </div>
                    ) : (
                        reviews?.map((review: any) => (
                            <div
                                key={review?.id}
                                className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                            >
                                <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                                    <div className="flex items-center xl:col-span-1">
                                        <div className="flex items-center">
                                            <Rating
                                                initialValue={review?.rate ?? 0}
                                                readonly
                                                transition
                                                allowFraction
                                                showTooltip
                                                tooltipArray={tooltipArray}
                                                fillColorArray={fillColorArray}
                                                iconsCount={5}
                                                size={30}
                                                emptyStyle={{ display: "flex" }}
                                                fillStyle={{
                                                    display:
                                                        "-webkit-inline-box",
                                                }}
                                            />
                                        </div>
                                        <span className=" sr-only">
                                            {review?.rate} out of 5 stars
                                        </span>
                                    </div>

                                    <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {review?.company}
                                        </h3>

                                        <div
                                            className="mt-3 space-y-6 text-sm text-gray-500"
                                            dangerouslySetInnerHTML={{
                                                __html: review?.testimonial,
                                            }}
                                        />
                                        {review?.image_url && (
                                            <div className="mt-2">
                                                <img
                                                    src={review?.image_url}
                                                    className="w-[100px] rounded-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                                    <p className="font-medium text-gray-900">
                                        {review?.name}
                                    </p>
                                    <time
                                        dateTime={review?.created_at}
                                        className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                                    >
                                        {review?.created_at_human}
                                    </time>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
