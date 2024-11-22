import { connect } from "react-redux";
import AddQuiz from "./AddQuiz";
import {
    AddQuestionCreator,
    UpdateQuestionBodyCreator,
    UpdateQuestionTextCreator,
    UpdateQuizDescriptionCreator,
    UpdateQuizTitleCreator,
    SaveQuizCreator
} from "../../../redux/quizReducer";

function mapStateToProps(state) {
    return {
        quizTitle: state.quiz.currentQuiz.title,
        quizDecription: state.quiz.currentQuiz.description,
        questions: state.quiz.currentQuiz.questions,
        newQuestionText: state.quiz.newQuestionText
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: () => {
            dispatch(AddQuestionCreator());
        },
        updateQuestionText: (text) => {
            dispatch(UpdateQuestionTextCreator(text));
        },
        updateQuestionBody: (id, text) => {
            dispatch(UpdateQuestionBodyCreator(id, text));
        },
        updateQuizTitle: (text) => {
            dispatch(UpdateQuizTitleCreator(text));
        },
        updateQuizDescription: (text) => {
            dispatch(UpdateQuizDescriptionCreator(text));
        },
        saveQuiz: () => {
            dispatch(SaveQuizCreator());
          }
    }
}

const AddQuizContainer = connect(mapStateToProps, mapDispatchToProps)(AddQuiz);

export default AddQuizContainer;