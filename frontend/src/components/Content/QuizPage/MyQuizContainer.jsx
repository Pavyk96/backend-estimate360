import { connect } from "react-redux";
import MyQuiz from "./MyQuiz";

function mapStateToProps(state) {
  return {
    quizzes: state.quiz.quizzes
  }
}

function mapDispatchToProps(dispatch){
  return{
    
  }
}

const MyQuizContainer = connect(mapStateToProps, mapDispatchToProps)(MyQuiz);

export default MyQuizContainer;