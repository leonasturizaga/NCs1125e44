//src/features/testimonials/components/CategoryMultiSelect.jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CATEGORY_OPTIONS = [
  { value: "Clients", label: "Clientes" },
  { value: "Suppliers", label: "Proveedores" },
  { value: "Products", label: "Productos" },
  { value: "Events", label: "Eventos" },
];

// Reemplaza todo tu bloque de checkboxes
export default function CategoryMultiSelect({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((c) => c !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const selectedLabels = selected
    .map((val) => CATEGORY_OPTIONS.find((opt) => opt.value === val)?.label)
    .filter(Boolean);

  const displayText =
    selected.length === 0
      ? "Todas las categorías"
      : selected.length === 1
      ? selectedLabels[0]
      : `${selected.length} seleccionadas`;

  return (
    <div className="relative ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input  dark:bg-gray-900 flex items-center justify-between gap-2 min-w-[200px] text-left"
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
              {CATEGORY_OPTIONS.map((option) => {
                const isChecked = selected.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(option.value)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>

            {selected.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-2">
                <button
                  onClick={() => {
                    onChange([]);
                    setIsOpen(false);
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Limpiar selección
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}