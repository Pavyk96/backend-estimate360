import { connect } from "react-redux";
import MyQuiz from "./MyQuiz";
import { fetchAllQuizzes } from "../../../redux/quizReducer";
import { fetchToken } from "../../../redux/tokenReducer";

function mapStateToProps(state) {
  return {
    quizzes: state.quiz.quizzes
  }
}

function mapDispatchToProps(dispatch){
  return{
    fetchQuiz: () => dispatch(fetchAllQuizzes()),
    fetchToken: (code) => dispatch(fetchToken(code))
  }
}

const MyQuizContainer = connect(mapStateToProps, mapDispatchToProps)(MyQuiz);

export default MyQuizContainer;