import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { StoreContext } from '../utils/store';
import PopAddQuiz from '../components/PopAddQuiz';
import apiRequest from '../utils/api';
import QuizCard from '../components/QuizCard';

const Dashboard = () => {
  const context = React.useContext(StoreContext);
  const { islogged: [islogged] } = context;
  const { newquiz: [newquiz] } = context;
  const [addQuizPop, setAddQuizPop] = React.useState(false);
  const [quizList, setQuizList] = React.useState([]);
  const addQuiz = () => {
    setAddQuizPop(true);
  };
  const getDetail = (data) => {
    let totalTime = 0;
    for (let i = 0; i < data.questions.length; i += 1) {
      totalTime += parseInt(data.questions[i].duration, 10);
    }
    return totalTime;
  };
  React.useEffect(() => {
    const fn = async () => {
      const response = await apiRequest('quiz', 'GET');
      const res = await response.json();
      const list = [];
      await Promise.all(res.quizzes.map(async (file) => {
        const quizDetailList = [];
        await apiRequest('getGameDetail', 'GET', file.id)
          .then((dres) => dres.json())
          .then((data) => { quizDetailList.push(data.questions.length, getDetail(data)); });
        list.push([file.active,
          file.id,
          file.name,
          file.oldSessions,
          file.createdAt,
          file.thumbnail,
          file.owner,
          quizDetailList,
        ]);
      }));
      setQuizList(list);
    };
    fn();
  }, [newquiz]);
  const closePopAddQuiz = () => {
    setAddQuizPop(false);
  };
  if (islogged) {
    return (
      <div className="dashboard">
        <Button variant="contained" color="secondary" onClick={addQuiz}>
          Add Quiz
        </Button>
        <div className="quiz-container">
          {quizList.map((item) => <QuizCard key={`quiz-${item[1]}`} active={item[0]} id={item[1]} name={item[2]} oldSessions={item[3]} createdAt={item[4]} thumbnail={item[5]} QuizDetail={item[7]} />)}
        </div>
        {addQuizPop ? <PopAddQuiz close={closePopAddQuiz} /> : null}
      </div>
    );
  }
  return <Redirect to="/" />;
};

export default Dashboard;
