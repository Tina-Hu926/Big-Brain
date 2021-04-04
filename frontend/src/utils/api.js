const URL = 'http://localhost:5005/admin/';
const playURL = 'http://localhost:5005/play/';

const apiRequest = async (type, method, request, optional) => {
  const token = localStorage.getItem('token');
  let response;
  switch (type) {
    case 'auth/login': {
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
        method,
        body: JSON.stringify({
          email: request[0],
          password: request[1],
        }),
      };
      response = await fetch(`${URL}${type}`, options);
      break;
    }
    case 'auth/register': {
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
        method,
        body: JSON.stringify({
          email: request[0],
          password: request[1],
          name: request[2],
        }),
      };
      response = await fetch(`${URL}${type}`, options);
      break;
    }
    case 'auth/logout': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}${type}`, options);
      break;
    }
    case 'quiz/new': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
        body: JSON.stringify({
          name: request,
        }),
      };
      response = await fetch(`${URL}${type}`, options);
      break;
    }
    case 'quiz': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}${type}`, options);
      break;
    }
    case 'getGameDetail': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}quiz/${request}`, options);
      break;
    }
    case 'auth/quiz/quizid': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      if (optional === 'null') {
        response = await fetch(`${URL}quiz/${request}`, options);
      } else {
        response = await fetch(`${URL}quiz/${request[0]}/${request[1]}`, options);
      }
      break;
    }
    case 'startquiz': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}quiz/${request}/start`, options);
      break;
    }
    case 'stopquiz': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}quiz/${request}/end`, options);
      break;
    }
    case 'joinsession': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
        body: JSON.stringify({
          name: request[1],
        }),
      };
      response = await fetch(`${playURL}join/${request[0]}`, options);
      break;
    }
    case 'checksession': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}session/${request}/status`, options);
      break;
    }
    case 'getOneQuiz': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}quiz/${request}`, options);
      break;
    }
    case 'putGameDetail': {
      const questions = request[1];
      const name = request[2];
      const thumbnail = request[3];
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
        body: JSON.stringify({
          questions,
          name,
          thumbnail,
        }),
      };
      response = await fetch(`${URL}quiz/${request[0]}`, options);
      break;
    }
    case 'playerStatus': {
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
        method,
      };
      response = await fetch(`${playURL}${request}/status`, options);
      break;
    }
    case 'advance': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}quiz/${request}/advance`, options);
      break;
    }
    case 'adminResult': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        method,
      };
      response = await fetch(`${URL}session/${request}/results`, options);
      break;
    }
    case 'getQuestion': {
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
        method,
      };
      response = await fetch(`${playURL}${request}/question`, options);
      break;
    }
    case 'getAnswer': {
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
        method,
      };
      response = await fetch(`${playURL}${request}/answer`, options);
      break;
    }
    case 'putAnswer': {
      const answerIds = request[1];
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
        method,
        body: JSON.stringify({
          answerIds,
        }),
      };
      response = await fetch(`${playURL}${request[0]}/answer`, options);
      break;
    }
    case 'playerResult': {
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
        method,
      };
      response = await fetch(`${playURL}${request}/results`, options);
      break;
    }
    // no default
  }
  if (response.status === 200) {
    return response;
  }
  if (response.status === 400) {
    return response;
  }
  if (response.status === 404) {
    return response;
  }
  return response;
};

export default apiRequest;
