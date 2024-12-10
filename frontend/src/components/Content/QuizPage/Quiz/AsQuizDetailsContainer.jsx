import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AsQuizDetails from './AsQuizDetails';
import { fetchQuizToView, LoadQuizCreator } from '../../../../redux/quizReducer';


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
    fetchQuiz: (quizId) => dispatch(fetchQuizToView(quizId)),

  }
}

function withParams(Component) {
  return (props) => {
    const params = useParams();
    return <Component {...props} quizId={params.quizId} />;
  };
}

const AsQuizDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(AsQuizDetails);

export default withParams(AsQuizDetailsContainer);