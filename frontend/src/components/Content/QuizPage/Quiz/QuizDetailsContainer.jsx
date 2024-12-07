import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuizDetails from './QuizDetails';
import { fetchCurrentQuizToView, LoadQuizCreator } from '../../../../redux/quizReducer';


function mapStateToProps(state) {
  return {
    quiz: state.quiz.viewQuiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadQuiz: (quizId) => {
      dispatch(LoadQuizCreator(quizId))
    },
    fetchQuiz: (quizId) => dispatch(fetchCurrentQuizToView(quizId)),

  }
}

function withParams(Component) {
  return (props) => {
    const params = useParams();
    return <Component {...props} quizId={params.quizId} />;
  };
}

const QuizDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(QuizDetails);

export default withParams(QuizDetailsContainer);