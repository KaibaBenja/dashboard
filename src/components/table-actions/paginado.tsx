import React from "react";
import cx from "classnames";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex items-center justify-center gap-4 mt-4 text-green-800">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={cx({
                    "text-gray-300 cursor-not-allowed": currentPage === 1,
                    "text-green-800": currentPage > 1,
                })}
            >
                <FaArrowCircleLeft className="w-6 h-6" />
            </button>
            <span className="font-semibold">
                {currentPage} - {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={cx({
                    "text-gray-300 cursor-not-allowed": currentPage === totalPages,
                    "text-green-800": currentPage < totalPages,
                })}
            >
                <FaArrowCircleRight className="w-6 h-6" />
            </button>
        </div>
    );
};
