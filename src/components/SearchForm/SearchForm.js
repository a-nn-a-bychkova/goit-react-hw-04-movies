import { Component, useState } from 'react';
import { toast } from 'react-toastify';
import s from './SearchForm.module.css';
import PropTypes from 'prop-types';

export default function SearchForm(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    const { onSubmit } = props;
    event.preventDefault();
    if (searchQuery.trim() === '') {
      // toast.error('The request is empty');
      return alert('The request is empty');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <form onSubmit={handleSubmit} className={s.SearchForm}>
      <button type="submit" className={s.button}>
        <span className={s.label}>Search</span>
      </button>

      <input
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search for favourite movies"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
