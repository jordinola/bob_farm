import { format } from "date-fns";
import { FaEye } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import type { TransactionItem } from "../../types/table";

interface TableProps {
  data: TransactionItem[];
  totalPages: number;
  currentPage: number;
  goToPage: (pageNumber: number) => void;
}

const Table = ({ data, totalPages, currentPage, goToPage }: TableProps) => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto mt-10 shadow-lg rounded-lg border border-gray-200">
      <table className="max-w-4xl bg-white">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="hidden px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:flex visible">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="visible px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:hidden">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-700 sm:flex visible">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {format(item.date, "MMMM dd, yyyy HH:mm:ss")}
              </td>
              <td className="visible flex justify-center px-6 py-4 whitespace-nowrap text-sm text-gray-700 sm:hidden">
                <FaEye
                  data-tooltip-id="tooltip"
                  data-tooltip-content={`ID: ${item.id}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === i + 1
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <Tooltip id="tooltip" place="bottom" />
    </div>
  );
};

export default Table;
