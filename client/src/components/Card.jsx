import PropTypes from "prop-types";

const ArtworkCard = ({ artwork }) => {
    console.log(artwork);
    return (
        <article>
        <h3>{artwork}</h3>
        </article>
    );
};

export default ArtworkCard;
