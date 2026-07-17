import "./Loading.scss";

type LoadingProps = {
  loading?: boolean;
  message?: string;
};

export function Loading({ message = "Loading" }: LoadingProps) {
  return (
    <div className="loader">
      <span className="terminal-loader">
        <span className="dot 1"></span>
        <span className="dot 2"></span>
        <span className="dot 3"></span>
        <span className="dot 4"></span>
        <span className="dot 5"></span>
        <span className="dot 6 "></span>
      </span>
      {message && <span className="message">{message}</span>}
    </div>
  );
}
