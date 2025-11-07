import { useState } from "react";

export default function MultiSelectDropdown({ categories, selectedCategories, toggleCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-left"
      >
        {selectedCategories.length > 0
          ? selectedCategories.join(", ")
          : "Select Program"}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
          <div className="p-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => toggleCategory(category.name)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
