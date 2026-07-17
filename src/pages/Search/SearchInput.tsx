import React from "react";

type SearchInputType = {
  onSubmitForm: (e: React.SubmitEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchText: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement, Element>) => void;
  onDelete: () => void;
};

export function SearchInput({
  onSubmitForm,
  inputRef,
  searchText,
  onChangeInput,
  onDelete,
}: SearchInputType) {
  return (
    <form onSubmit={onSubmitForm}>
      <div className="label-input label-input__city">
        <label htmlFor="search-city-input" className="label">
          Enter <b>city</b> or <b>city, country</b>
        </label>
        <div className="input-wrapper">
          <input
            ref={inputRef}
            id="search-city-input"
            type="text"
            value={searchText}
            autoComplete="off"
            onChange={onChangeInput}
          />
          {searchText.length > 0 && (
            <button type="button" className="delete-button" onClick={onDelete}>
              ⟩⟨
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
