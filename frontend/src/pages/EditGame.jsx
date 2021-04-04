import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useHistory, Redirect } from 'react-router-dom';
import apiRequest from '../utils/api';
import { StoreContext } from '../utils/store';
import QuestionsCard from '../components/QuestionCard';
import PopAddQuestion from '../components/PopAddQuestion';
import PopAddThumbnail from '../components/PopAddThumbnail';

const EditGame = ({ match }) => {
  const context = React.useContext(StoreContext);
  const { islogged: [islogged] } = context;
  const { newQuestion: [newQuestion] } = context;
  const history = useHistory();
  const gameId = match.params.quizid;
  const [quizData, setQuizData] = React.useState([]);
  const [addQuestionPop, setAddQuestionPop] = React.useState(false);
  const [saveQuizData, setSaveQuizData] = React.useState([]);
  const [addThumbnail, setAddThumbnail] = React.useState(false);
  const listName = (data) => {
    const nameList = [];
    for (let i = 0; i < data.length; i += 1) {
      nameList.push(data[i].name);
    }
    return nameList;
  };
  const goDashBoard = () => {
    history.push('/dashboard');
  };
  React.useEffect(() => {
    apiRequest('getGameDetail', 'GET', gameId)
      .then((res) => res.json())
      .then((data) => {
        setQuizData(listName(data.questions));
        setSaveQuizData({ questions: data.questions, name: data.name, thumbnail: data.thumbnail });
      });
  }, [gameId, newQuestion]);
  const addQuestion = () => {
    setAddQuestionPop(true);
  };
  const closePopAddQuestion = () => {
    setAddQuestionPop(false);
  };
  const AddThumbnail = () => {
    setAddThumbnail(true);
  };
  const closePopThumbnail = () => {
    setAddThumbnail(false);
  };
  if (islogged) {
    return (
      <>
        <div className="togetherButton">
          <Button variant="contained" color="secondary" onClick={addQuestion}>
            Add New Question
          </Button>
          { addQuestionPop
            ? <PopAddQuestion close={closePopAddQuestion} gameId={gameId} data={saveQuizData} />
            : null }
          <Button variant="contained" color="secondary" onClick={AddThumbnail}>
            Add/Change Quiz Thumbnail
          </Button>
          { addThumbnail
            ? <PopAddThumbnail close={closePopThumbnail} gameId={gameId} data={saveQuizData} />
            : null }
        </div>
        <div className="quiz-container">
          {quizData.map(
            (item) => <QuestionsCard name={item} gameId={gameId} data={saveQuizData} />,
          )}
        </div>
        <Button variant="contained" color="grey" onClick={goDashBoard}>
          Return
        </Button>
      </>
    );
  }
  return <Redirect to="/" />;
};

EditGame.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
};

EditGame.defaultProps = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
};

export default EditGame;
