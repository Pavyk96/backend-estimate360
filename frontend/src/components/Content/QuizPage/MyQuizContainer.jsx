import { connect } from "react-redux";
import MyQuiz from "./MyQuiz";
import { fetchAllQuizzes } from "../../../redux/quizReducer";

function mapStateToProps(state) {
  return {
    quizzes: state.quiz.quizzes
  }
}

function mapDispatchToProps(dispatch){
  return{
    fetchQuiz: () => dispatch(fetchAllQuizzes()),
  }
}

const MyQuizContainer = connect(mapStateToProps, mapDispatchToProps)(MyQuiz);

export default MyQuizContainer;