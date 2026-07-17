import { Link, useNavigate } from "react-router";

import "./PageHeader.scss";

type PageHeaderType = {
  goBack?: boolean;
  title: string;
};

export function PageHeader({ title, goBack = false }: PageHeaderType) {
  const navigate = useNavigate();

  return (
    <div id="page-header">
      <div>
        {goBack ? (
          // For the nav page to simply go back to the previous page.
          <button onClick={() => navigate(-1)}>
            ⟨ <span className="visually-hidden">Go back</span>
          </button>
        ) : (
          // For all other pages.
          <Link to="/nav">
            <span className="visually-hidden">Go to navigation</span> ⟩
          </Link>
        )}
      </div>
      <div>
        <div>Simple_Weather</div>
        <div>
          <b>{title}</b>
        </div>
      </div>
    </div>
  );
}
