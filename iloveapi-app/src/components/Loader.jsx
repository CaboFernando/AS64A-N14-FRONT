import Spinner from "react-bootstrap/Spinner";
import PropTypes from 'prop-types';

export default function Loader({ message }) {
  return (
    <div className="text-center my-4">
      <Spinner animation="border" role="status" variant="primary" />
      <p className="mt-2 text-muted">{message}</p>
    </div>
  );
}

Loader.propTypes = {
    message: PropTypes.string.isRequired,
};
