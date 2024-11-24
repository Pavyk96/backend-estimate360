import { connect } from "react-redux";
import MyQuiz from "./MyQuiz";
import { assignQuiz } from "../../redux/quizReducer";

function mapStateToProps(state) {
  return {
    quizzes: state.quiz.quizzes
  }
}

function mapDispatchToProps(dispatch){
  return{
    onAssignQuiz: (quizId) => dispatch(assignQuiz(quizId))
  }
}

const MyQuizContainer = connect(mapStateToProps, mapDispatchToProps)(MyQuiz);

export default MyQuizContainer;