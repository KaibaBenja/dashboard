export interface FormProps<T> {
    updateID?: string;
    formAction?: boolean;
    formData: T | null;
    onSubmitSuccess: () => void;
    handleCloseSheet: () => void;
}