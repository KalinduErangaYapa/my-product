import Select from "react-select";
import makeAnimated from "react-select/animated";

interface SelectInputProps {
    options: { label: string; value: string }[];
    isFocused?: boolean;
    className?: string;
    selectedOption?: any;
    setData?: any;
}

const SelectInput = ({
    options,
    selectedOption,
    className = "",
    isFocused = false,
    setData,
    ...props
}: SelectInputProps) => {
    const animatedComponents = makeAnimated();

    const handleChange = (selectedOption: any) => {
        setData(selectedOption.value);
    };

    return (
        <Select
            className={className}
            value={selectedOption}
            onChange={handleChange}
            options={options}
            components={animatedComponents}
        />
    );
};

export default SelectInput;
