import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

const StoreProvider = ({ children }) => {
  // const [token, setToken] = React.useState('');
  // const [quizList, setQuizList] = React.useState([]);
  const [newquiz, setNewquiz] = React.useState('');
  const [islogged, setIslogged] = React.useState(false);
  const [newQuestion, setNewQuestion] = React.useState('');

  const store = {
    islogged: [islogged, setIslogged],
    // quizList: [quizList, setQuizList],
    newquiz: [newquiz, setNewquiz],
    newQuestion: [newQuestion, setNewQuestion],
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

StoreContext.Provider.propTypes = {
  value: PropTypes.objectOf(PropTypes.array),
};

StoreContext.defaultProps = {
  value: PropTypes.objectOf(PropTypes.array),
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

StoreProvider.defaultProps = {
  children: PropTypes.node,
};

export default StoreProvider;
