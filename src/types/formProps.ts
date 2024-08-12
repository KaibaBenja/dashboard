export interface FormProps<T> {
    formAction: boolean;
    formData: T | null;
    onSubmitSuccess: () => void;
    handleCloseSheet: () => void;
}