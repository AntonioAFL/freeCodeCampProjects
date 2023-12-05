import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SocialMediaButton({ icon, url, id = "" }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="socialMedia"
      id={id}
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}

export default SocialMediaButton;
