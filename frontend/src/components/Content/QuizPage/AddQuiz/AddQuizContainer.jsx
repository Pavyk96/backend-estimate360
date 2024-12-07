import { connect } from "react-redux";
import AddQuiz from "./AddQuiz";
import {
    UpdateQuestionBodyCreator,
    UpdateQuestionTextCreator,
    UpdateQuizDescriptionCreator,
    UpdateQuizTitleCreator,
    updateQuestionOnServer,
    addQuestionOnServer,
    CompleteQuizCreation,
} from "../../../../redux/quizReducer";

function mapStateToProps(state) {
    return {
        quizId: state.quiz.currentQuiz.id,
        quizTitle: state.quiz.currentQuiz.name,
        quizDecription: state.quiz.currentQuiz.description,
        questions: state.quiz.currentQuiz.questions,
        newQuestionText: state.quiz.newQuestionText,
    }
}

function mapDispatchToProps(dispatch) {
    return {

        addQuestion: (questionText, dispType) => dispatch(addQuestionOnServer(questionText, dispType  = "ADD-QUESTION")),
        completeQuizCreation: (quizData) => dispatch(CompleteQuizCreation(quizData)),


        updateQuestionText: (text) => {
            dispatch(UpdateQuestionTextCreator(text));
        },
        updateQuestionBody: (id, text) => {
            dispatch(UpdateQuestionBodyCreator(id, text, "UPDATE-QUESTION-TEXT"));
        },
        updateQuestionOnServer: (id, newText) => {
            dispatch(updateQuestionOnServer(id, newText));
        },
        updateQuizTitle: (text) => {
            dispatch(UpdateQuizTitleCreator(text, "UPDATE-QUIZ-TITLE"));
        },
        updateQuizDescription: (text) => {
            dispatch(UpdateQuizDescriptionCreator(text, "UPDATE-QUIZ-DESCRIPTION"));
        },
    }
}

const AddQuizContainer = connect(mapStateToProps, mapDispatchToProps)(AddQuiz);

export default AddQuizContainer;