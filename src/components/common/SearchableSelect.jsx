import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiChevronDown, FiCheck, FiX, FiPlus } from "react-icons/fi";

/**
 * SearchableSelect Component
 * A modern, accessible, searchable select dropdown with grouped options,
 * smart suggestion pinning, keyboard navigation, and custom text entry support.
 */
const SearchableSelect = ({
    value = "",
    onChange,
    placeholder = "Select an option",
    groupedOptions = [],
    flatOptions = [],
    highlightCategory = null,
    allowCustom = true,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [customValue, setCustomValue] = useState("");
    
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);

    // Normalize options into groups if flatOptions is passed
    const groups = groupedOptions.length > 0 
        ? groupedOptions 
        : flatOptions.length > 0 
            ? [{ category: "Options", options: flatOptions }] 
            : [];

    // Reorder groups if highlightCategory is present
    const orderedGroups = React.useMemo(() => {
        if (!highlightCategory) return groups;
        const highlighted = groups.filter(g => g.category.toLowerCase() === highlightCategory.toLowerCase());
        const remaining = groups.filter(g => g.category.toLowerCase() !== highlightCategory.toLowerCase());
        return [...highlighted, ...remaining];
    }, [groups, highlightCategory]);

    // Filter groups based on search term
    const filteredGroups = React.useMemo(() => {
        if (!searchTerm.trim()) return orderedGroups;
        const query = searchTerm.toLowerCase();
        
        return orderedGroups.map(group => ({
            ...group,
            options: group.options.filter(opt => opt.toLowerCase().includes(query))
        })).filter(group => group.options.length > 0);
    }, [orderedGroups, searchTerm]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when opened
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
        }
    }, [isOpen]);

    const handleSelect = (selectedOption) => {
        if (selectedOption === "Other") {
            setIsCustomMode(true);
            setCustomValue(value && value !== "Other" ? value : "");
            setIsOpen(false);
            setSearchTerm("");
            onChange("Other");
            return;
        }
        setIsCustomMode(false);
        onChange(selectedOption);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleCustomSubmit = (e) => {
        if (e) e.preventDefault();
        if (customValue.trim()) {
            onChange(customValue.trim());
            setIsCustomMode(false);
        }
    };

    const totalResults = filteredGroups.reduce((acc, g) => acc + g.options.length, 0);

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            {/* Custom Free-Text Input Mode */}
            {isCustomMode ? (
                <div className="flex items-center gap-1.5">
                    <input
                        type="text"
                        value={customValue}
                        onChange={(e) => {
                            setCustomValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleCustomSubmit(e);
                            }
                        }}
                        placeholder="Type your custom entry..."
                        autoFocus
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-indigo-500 rounded-xl text-sm outline-none ring-2 ring-indigo-500/20 text-slate-900 dark:text-white transition-all shadow-xs"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setIsCustomMode(false);
                            setIsOpen(true);
                        }}
                        title="Back to dropdown options"
                        className="px-2.5 py-2.5 text-xs text-slate-500 hover:text-indigo-600 bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors flex-shrink-0"
                    >
                        List
                    </button>
                </div>
            ) : (
                /* Select Trigger Button */
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border text-left rounded-xl text-sm flex items-center justify-between transition-all shadow-2xs ${
                        isOpen 
                            ? "border-indigo-500 ring-2 ring-indigo-500/20 dark:border-indigo-500" 
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                >
                    <span className={`truncate ${value ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500 font-normal"}`}>
                        {value || placeholder}
                    </span>
                    <FiChevronDown className={`ml-2 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180 text-indigo-600" : ""}`} size={16} />
                </button>
            )}

            {/* Dropdown Menu Overlay */}
            {isOpen && !isCustomMode && (
                <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-72">
                    
                    {/* Search Bar */}
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 sticky top-0 z-10 flex items-center gap-2">
                        <FiSearch className="text-slate-400 ml-1.5" size={14} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Type to search..."
                            className="w-full bg-transparent text-xs text-slate-900 dark:text-white outline-none placeholder-slate-400"
                        />
                        {searchTerm && (
                            <button 
                                type="button" 
                                onClick={() => setSearchTerm("")}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <FiX size={12} />
                            </button>
                        )}
                    </div>

                    {/* Options List */}
                    <div className="overflow-y-auto flex-1 p-1.5 space-y-2 scrollbar-thin">
                        {totalResults === 0 ? (
                            <div className="p-4 text-center">
                                <p className="text-xs text-slate-500 mb-2">No matching predefined options</p>
                                {allowCustom && searchTerm.trim() && (
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(searchTerm.trim())}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
                                    >
                                        <FiPlus size={12} /> Use "{searchTerm.trim()}"
                                    </button>
                                )}
                            </div>
                        ) : (
                            filteredGroups.map((group, gIdx) => {
                                const isHighlighted = highlightCategory && group.category.toLowerCase() === highlightCategory.toLowerCase();
                                return (
                                    <div key={gIdx} className="space-y-0.5">
                                        {/* Category Title Header */}
                                        <div className="px-2.5 py-1 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-950/30 rounded-md">
                                            <span>{group.category}</span>
                                            {isHighlighted && (
                                                <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-200 dark:border-indigo-800">
                                                    Suggested
                                                </span>
                                            )}
                                        </div>

                                        {/* Option Items */}
                                        {group.options.map((option, oIdx) => {
                                            const isSelected = value === option;
                                            return (
                                                <button
                                                    key={oIdx}
                                                    type="button"
                                                    onClick={() => handleSelect(option)}
                                                    className={`w-full px-3 py-2 text-left text-xs rounded-xl flex items-center justify-between transition-colors ${
                                                        isSelected 
                                                            ? "bg-indigo-600 text-white font-semibold shadow-xs" 
                                                            : "text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                                                    }`}
                                                >
                                                    <span className="truncate">{option}</span>
                                                    {isSelected && <FiCheck className="text-white ml-2 flex-shrink-0" size={13} />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            })
                        )}

                        {/* Custom Entry Quick Action */}
                        {allowCustom && (
                            <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCustomMode(true);
                                        setCustomValue("");
                                        setIsOpen(false);
                                    }}
                                    className="w-full px-3 py-2 text-left text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5 transition-colors"
                                >
                                    <FiPlus size={13} /> Other / Enter custom text...
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
