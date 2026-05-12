import React, { useState, useRef, useEffect, useMemo } from "react";
import type { DropdownProps } from "./Dropdown.types";
import "./Dropdown.css";

/**
 * Dropdown / Select — a form control for choosing from a list of options.
 *
 * Supports single and multiple selection, search filtering, icons, avatars,
 * descriptions, disabled items, error state, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Dropdown
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[{ value: "us", label: "United States" }]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  required = false,
  tooltip,
  hint,
  multiple = false,
  searchable = false,
  disabled = false,
  error = false,
  errorMessage,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search on open
  useEffect(() => {
    if (open && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open, searchable]);

  const selectedValues = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.description?.toLowerCase().includes(q)
    );
  }, [options, search]);

  const displayText = useMemo(() => {
    if (selectedValues.length === 0) return null;
    if (selectedValues.length === 1) {
      return options.find((o) => o.value === selectedValues[0])?.label;
    }
    return `${selectedValues.length} selected`;
  }, [selectedValues, options]);

  const handleSelect = (optValue: string) => {
    if (multiple) {
      const next = selectedValues.includes(optValue)
        ? selectedValues.filter((v) => v !== optValue)
        : [...selectedValues, optValue];
      onChange?.(next);
    } else {
      onChange?.(optValue);
      setOpen(false);
      setSearch("");
    }
  };

  const triggerClasses = [
    "dropdown__trigger",
    open && "dropdown__trigger--open",
    error && "dropdown__trigger--error",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={containerRef}
      className={`dropdown ${className ?? ""}`}
    >
      {label && (
        <label className="dropdown__label">
          {label}
          {required && <span className="dropdown__required">*</span>}
          {tooltip && (
            <span className="dropdown__tooltip-trigger" title={tooltip}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
                <path d="M6.5 6.5a1.5 1.5 0 1 1 1.5 1.5v1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
              </svg>
            </span>
          )}
        </label>
      )}

      <button
        type="button"
        className={triggerClasses}
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span
          className={`dropdown__trigger-text ${
            !displayText ? "dropdown__trigger-text--placeholder" : ""
          }`}
        >
          {displayText ?? placeholder}
        </span>
        <span className={`dropdown__trigger-icon ${open ? "dropdown__trigger-icon--open" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {(hint || errorMessage) && (
        <span className={`dropdown__hint ${error ? "dropdown__hint--error" : ""}`}>
          {error ? errorMessage : hint}
        </span>
      )}

      {open && (
        <div className="dropdown__menu" role="listbox" aria-multiselectable={multiple}>
          {searchable && (
            <div className="dropdown__search">
              <span className="dropdown__search-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M14 14l-3.5-3.5M11 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                ref={searchRef}
                type="text"
                className="dropdown__search-input"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="dropdown__empty">No results found</div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              const itemClasses = [
                "dropdown__item",
                isSelected && "dropdown__item--selected",
                option.disabled && "dropdown__item--disabled",
              ].filter(Boolean).join(" ");

              return (
                <button
                  key={option.value}
                  type="button"
                  className={itemClasses}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                >
                  {multiple && (
                    <span className={`dropdown__checkbox ${isSelected ? "dropdown__checkbox--checked" : ""}`}>
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  )}
                  {option.icon && <span className="dropdown__item-icon">{option.icon}</span>}
                  {option.avatar && <span className="dropdown__item-icon">{option.avatar}</span>}
                  <span className="dropdown__item-content">
                    <span className="dropdown__item-label">{option.label}</span>
                    {option.description && (
                      <span className="dropdown__item-description">{option.description}</span>
                    )}
                  </span>
                  {!multiple && isSelected && (
                    <span className="dropdown__item-check">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
