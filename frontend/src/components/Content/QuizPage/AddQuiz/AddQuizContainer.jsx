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
    SetQuestionTypeCreator,
    UpdateQuestionTypeCreator,
} from "../../../../redux/quizReducer";

function mapStateToProps(state) {
    return {
        quizId: state.quiz.currentQuiz.id,
        quizTitle: state.quiz.currentQuiz.name,
        quizDecription: state.quiz.currentQuiz.description,
        questions: state.quiz.currentQuiz.questions,
        newQuestionText: state.quiz.newQuestionText,
        questionTypes: state.quiz.questionTypes,
        selectedQuestionType: state.quiz.selectedQuestionType,
    }
}

function mapDispatchToProps(dispatch) {
    return {

        addQuestion: (questionText, qtype,  dispType) => dispatch(addQuestionOnServer(questionText, qtype,  dispType  = "ADD-QUESTION")),
        completeQuizCreation: (quizData) => dispatch(CompleteQuizCreation(quizData)),


        updateQuestionText: (text) => {
            dispatch(UpdateQuestionTextCreator(text));
        },
        SetQuestionType: (type) => dispatch(SetQuestionTypeCreator(type)),
        updateQuestionBody: (id, text) => {
            dispatch(UpdateQuestionBodyCreator(id, text, "UPDATE-QUESTION-TEXT"));
        },
        updateQuestionType: (id, qtype) => {
            dispatch(UpdateQuestionTypeCreator(id, qtype, "UPDATE-QUESTION-TYPE"));
        },
        updateQuestionOnServer: (id, newText, newType) => {
            dispatch(updateQuestionOnServer(id, newText, newType));
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