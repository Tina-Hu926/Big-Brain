/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('quizQuestionPublicReturn', question);
  // const public = JSON.stringify({
  //   questionName: question.name
  // });
  // console.log(typeof(question.name));
  const publicinfo = {
    questionName: question.name,
    answers: question.answers,
    duration: question.duration,
    pic: question.pic,
    videoLink: question.videoLink,
  }
  return publicinfo;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  console.log('quizQuestionGetCorrectAnswers');
  // const answer = {
  //   correct: question.correctAnswer,
  // }
  // let list=[];
  // list.push(question.correctAnswer)
  return question.correctAnswer; // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  console.log('quizQuestionGetAnswers');
  return [
    123,
    456,
    678,
  ]; // For a single answer
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  console.log('quizQuestionGetDuration', question.duration);
  return question.duration;
};
