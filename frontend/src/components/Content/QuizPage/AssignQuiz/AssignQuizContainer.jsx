import { connect } from "react-redux";
import AssignQuiz from "./AssignQuiz";
import { assignQuiz } from "../../../../redux/quizReducer";
import { useParams } from "react-router-dom";

function mapStateToProps(state, ownProps) {
  const { quizId } = ownProps;
  return {
    quiz: state.quiz.quizzes[quizId],
  };
}

function mapDispatchToProps(dispatch){
  return{
    onAssignQuiz: (quizId) => dispatch(assignQuiz(quizId))
  }
}

function withParams(Component) {
  return (props) => {
    const params = useParams();
    return <Component {...props} quizId={params.quizId} />;
  };
}

const AssignQuizContainer = connect(mapStateToProps, mapDispatchToProps)(AssignQuiz);

export default  withParams(AssignQuizContainer);