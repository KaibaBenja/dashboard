import { FieldError, Merge } from "react-hook-form";

export function inputMessageHelper(
    helperSection: React.ReactNode,
    errorMessage: string,
    errorType?: FieldError | (FieldError | undefined)[] | Merge<FieldError, (FieldError | undefined)[]> | undefined
) {
    if (errorType && Array.isArray(errorType)) {
        return (
            <div>
                {errorType.map((error, index) =>
                    error ? (
                        <p key={index} className="text-red-700 font-semibold h-auto">
                            {error.message} <br/>
                        </p> 
                    ) : null
                )}
            </div>
        );
    } else if (errorType && "message" in errorType) {
        return <p className="text-red-800 font-bold h-auto p-2 rounded-xl text-center shadow-sm ring-1 mx-2 mt-4 ring-red-800 bg-red-200">{errorMessage} <br/></p>;
    }
    return <div className="text-gray-400 text-sm">{helperSection}</div>;
}