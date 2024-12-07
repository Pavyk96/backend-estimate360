import { connect } from "react-redux";
import EditQuiz from "./EditQuiz";
import {
    UpdateQuestionTextCreator,
    addQuestionOnServer,
    updateQuestionOnServerEdit,
    UpdateQuestionBodyCreator,
    UpdateQuizTitleCreator,
    UpdateQuizDescriptionCreator,
    CompleteQuizEdit,
} from "../../../../redux/quizReducer";

function mapStateToProps(state) {
    return {
        quizId: state.quiz.editQuiz.id,
        quizTitle: state.quiz.editQuiz.name,
        quizDecription: state.quiz.editQuiz.description,
        questions: state.quiz.editQuiz.questions,
        newQuestionText: state.quiz.newQuestionText,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: (questionText, dispType) => dispatch(addQuestionOnServer(questionText, dispType  = "ADD-QUESTION-EDIT")),
        CompleteQuizEdit: (quizData) => dispatch(CompleteQuizEdit(quizData)),


        updateQuestionText: (text) => {
            dispatch(UpdateQuestionTextCreator(text));
        },
        updateQuestionBody: (id, text) => {
            dispatch(UpdateQuestionBodyCreator(id, text, "UPDATE-QUESTION-TEXT-EDIT"));
        },
        updateQuestionOnServer: (id, newText) => {
            dispatch(updateQuestionOnServerEdit(id, newText));
        },
        updateQuizTitle: (text) => {
            dispatch(UpdateQuizTitleCreator(text, "UPDATE-QUIZ-TITLE-EDIT"));
        },
        updateQuizDescription: (text) => {
            dispatch(UpdateQuizDescriptionCreator(text, "UPDATE-QUIZ-DESCRIPTION-EDIT"));
        },
    }
}

const EditQuizContainer = connect(mapStateToProps, mapDispatchToProps)(EditQuiz);

export default EditQuizContainer;