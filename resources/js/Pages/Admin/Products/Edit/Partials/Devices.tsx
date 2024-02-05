import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import Modal from "@/Components/elements/other/Modal";
import { Product } from "@/types";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import useState from "react-usestateref";

export default function DeviceModal({
    show,
    closeModal,
    product,
    productStatus,
}: {
    show: boolean;
    closeModal: any;
    product: Product;
    productStatus: { label: string; value: string }[];
}) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        // Set initial values when the component mounts
        if (product.devices.length > 0) {
            setName(product.devices[0].name);
            setStatus(product.devices[0].status);
        }
    }, [product.devices]);

    const { data, setData, post, errors, reset } = useForm({
        name: "",
        status: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.services.createDevice", { product: product.id }), {
            onSuccess: () => {
                closeModal(false);
                reset();
            },
        });
    };

    return (
        <Modal show={show} onClose={closeModal}>
            <form onSubmit={submit} className="p-8">
                <h6 className="font-[800]">Device Information</h6>

                {/* Name input */}
                <div className="mb-4">
                    <InputLabel
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </InputLabel>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                {/* Status input */}
                <div>
                    <InputLabel htmlFor="status" value="Status" />

                    <SelectInput
                        className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                        options={productStatus}
                        selectedOption={productStatus.filter((obj: any) => {
                            return obj.value === data.status;
                        })}
                        setData={(e: any) => setData("status", e)}
                    />

                    <InputError message={errors.status} className="mt-2" />
                </div>

                {/* Submit button */}
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-gray-900 py-3 px-12 rounded-xl text-white"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    );
}
