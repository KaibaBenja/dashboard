import { FieldError } from "react-hook-form";

export function inputMessageHelper(helperText: string, errorMessage: string, errorType: FieldError) {
    return errorType ? (
        <p className="text-red-700 font-semibold">{errorMessage}</p>
    ) : (
        <p className="text-gray-400 text-sm">{helperText}</p>
    );
}