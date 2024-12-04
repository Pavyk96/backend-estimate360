import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuizDetails from './QuizDetails';
import { LoadQuizCreator } from '../../../../redux/quizReducer';

function mapStateToProps(state, ownProps) {
  const { quizId } = ownProps;
  return {
    quiz: state.quiz.quizzes[quizId],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadQuiz: (quizId) => {
      dispatch(LoadQuizCreator(quizId))
    }
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