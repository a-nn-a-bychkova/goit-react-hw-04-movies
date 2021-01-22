import styles from './Container.module.css';
import PropTypes, { arrayOf } from 'prop-types';

export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

Container.propTypes = {
  children: arrayOf(PropTypes.element).isRequired,
};
