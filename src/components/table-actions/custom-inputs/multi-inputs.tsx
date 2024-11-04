import { useState } from "react";

interface MultiInputProps {
    onChange: (values: string[]) => void;
    values: string[];
}

export const MultiInput = ({ onChange, values }: MultiInputProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim() !== "") {
            onChange([...values, inputValue]);
            setInputValue("");
        }
    };

    const handleRemove = (index: number) => {
        const newValues = values.filter((_, i) => i !== index);
        onChange(newValues);
    };

    return (
        <div>
            <div className="flex">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                />
                <button type="button" onClick={handleAdd} className="bg-green-500 text-white ml-2 px-4 rounded-lg">
                    Agregar
                </button>
            </div>
            <div className="mt-2">
                {values.map((value, index) => (
                    <div key={index} className="flex items-center">
                        <span className="mr-2">{value}</span>
                        <button type="button" onClick={() => handleRemove(index)} className="text-red-500">
                            Quitar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
