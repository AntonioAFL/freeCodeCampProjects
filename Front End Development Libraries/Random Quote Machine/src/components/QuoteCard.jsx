import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import SocialMediaButton from "./SocialMediaButton";

function QuoteCard() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const getQuote = () => {
    // Adding '/random' to the url return a random quote from the database
    let url = "https://api.quotable.io/random";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let randomQuote = data.content;
        let randomAuthor = data.author;

        setQuote(randomQuote);
        setAuthor(randomAuthor);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleClick = () => {
    getQuote();
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div id="quote-box">
      <div id="text">
        <p>{`"${quote}"`}</p>
      </div>
      <div id="author">
        <p>{`- ${author} -`}</p>
      </div>
      <div id="footer">
        <div id="socialMedias">
          <SocialMediaButton
            icon={faGithub}
            url={"https://github.com/AntonioAFL"}
          />
          <SocialMediaButton
            icon={faLinkedin}
            url={
              "https://www.linkedin.com/in/antonio-aguirre-flores-1494031ba/"
            }
          />
          <SocialMediaButton
            icon={faXTwitter}
            url={"https://www.twitter.com/intent/tweet"}
            id="tweet-quote"
          />
        </div>
        <button onClick={handleClick} id="new-quote">
          <FontAwesomeIcon icon={faRandom} />
        </button>
      </div>
    </div>
  );
}

export default QuoteCard;
