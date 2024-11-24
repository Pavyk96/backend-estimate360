import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuizDetails from './QuizDetails';

function mapStateToProps(state, ownProps) {
  const { quizId } = ownProps; 
  return {
    quiz: state.quiz.quizzes[quizId], 
  };
}

function withParams(Component) {
  return (props) => {
    const params = useParams(); 
    return <Component {...props} quizId={params.quizId} />;
  };
}

const ConnectedQuizDetails = connect(mapStateToProps)(QuizDetails);

export default withParams(ConnectedQuizDetails);