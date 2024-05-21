import React from "react";
import style from "./ContributorCard.module.css";

const ContributorCard = ({ contributor }) => {
  return (
    <div className={style.contributorCard}>
      <img
        src={contributor.avatar_url}
        alt={`${contributor.login} avatar`}
        className={style.avatar}
      />
      <div className={style.contributorDetails}>
        <h2 className={style.contributorName}>{contributor.login}</h2>
        <p className={style.contributorContributions}>
          Contributions: {contributor.contributions}
        </p>
        <div className={style.contributorLinks}>
          <a
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={style.profileLink}
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContributorCard;
