type ErrorMessageType = {
  onClick: () => void;
};

export function ErrorMessage({ onClick }: ErrorMessageType) {
  return (
    <div id="search-error">
      <span className="label">Error</span>
      City not found. <button onClick={onClick}>Try again</button>
    </div>
  );
}
