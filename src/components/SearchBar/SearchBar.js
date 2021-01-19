import React, { Component } from 'react';
import s from './SearchBar.module.css';
import PropTypes from 'prop-types';

const SearchBar = ({ children }) => {
  return <header className={s.Searchbar}>{children}</header>;
};

export default SearchBar;

SearchBar.propTypes = {
  children: PropTypes.element.isRequired,
};
