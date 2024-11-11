"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { RiAddCircleLine } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";


interface MultiInputProps {
    name: string;
    onChange: (values: string[]) => void;
    values: string[];
}

export const MultiInput = ({ name, onChange, values }: MultiInputProps) => {
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
            <div className="flex flex-col">
                <div className="flex flex-row gap-4 justify-between items-center mb-2">
                    <label className="block text-gray-700">
                        {name} <span className="font-bold text-red-800">*</span>
                    </label>
                    <Button type="button" onClick={handleAdd} className="bg-green-500 text-white -py-2 px-4 rounded-lg flex items-center gap-2">
                        <span>Agregar</span> <RiAddCircleLine className="w-5 h-5" />
                    </Button>
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-green-800"
                />
            </div>
            <div className="mt-2">
                {values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span className="mr-2">{value}</span>
                        <div onClick={() => handleRemove(index)} className="text-red-700 cursor-pointer hover:text-red-800">
                            <IoMdCloseCircle className="w-6 h-6"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
