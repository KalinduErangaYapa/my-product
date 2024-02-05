import React from "react";

const Review = () => {
    const sampleReviews = [
        {
            text: "Great experience! The staff is friendly and helpful.",
            rating: 5,
            author_name: "John Doe",
            author_image: "/assets/images/home/author.jpg", // Add author image path
        },
        {
            text: "Awesome service. Will definitely come back.",
            rating: 4,
            author_name: "Jane Smith",
            author_image: "/assets/images/home/author.jpg", // Add author image path
        },
        {
            text: "Awesome service. Will definitely come back.",
            rating: 4,
            author_name: "Jane Smith",
            author_image: "/assets/images/home/author.jpg", // Add author image path
        },
        {
            text: "Awesome service. Will definitely come back.",
            rating: 4,
            author_name: "Jane Smith",
            author_image: "/assets/images/home/author.jpg", // Add author image path
        },
        {
            text: "Awesome service. Will definitely come back.",
            rating: 4,
            author_name: "Jane Smith",
            author_image: "/assets/images/home/author.jpg", // Add author image path
        },
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto flex flex-col items-center rounded-lg">
                <div className="grid md:grid-cols-5 items-center gap-x-4">
                    <div className="rounded-lg bg-gray-50">
                        <img
                            src="/assets/images/home/GoogleReview.png"
                            alt=""
                            className="w-[60%] md:w-[100%] h-[auto] object-cover mx-auto"
                        />
                    </div>
                    <div className="md:col-span-4 w-[100vw] md:w-[auto]">
                        <ul className="md:flex list-none space-y-2 md:space-y-0 md:space-x-2 overflow-x-scroll py-12 px-4 md:px-0">
                            {sampleReviews.map((review, index) => (
                                <li
                                    key={index}
                                    className="border px-4 py-4 rounded-md md:w-[400px] md:min-w-[300px]"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={review.author_image}
                                            alt={`Profile of ${review.author_name}`}
                                            className="w-8 h-8 object-cover border rounded-full mr-4"
                                        />
                                        <div>
                                            <p className="text-base font-[700]">
                                                {review.author_name}
                                            </p>
                                            <span className="text-2xl mr-2 flex items-center">
                                                {Array.from(
                                                    { length: review.rating },
                                                    (_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-3 h-3 text-yellow-500 me-1"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 22 20"
                                                        >
                                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                        </svg>
                                                    )
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        {review.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;
