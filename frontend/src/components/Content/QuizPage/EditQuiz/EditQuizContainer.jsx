import { connect } from "react-redux";
import EditQuiz from "./EditQuiz";
import {
    UpdateQuestionTextCreator,
    addQuestionOnServer,
    UpdateQuestionBodyCreator,
    UpdateQuizTitleCreator,
    UpdateQuizDescriptionCreator,
    CompleteQuizEdit,
    SetQuestionTypeCreator,
    UpdateQuestionTypeCreator,
    updateQuestionOnServer,
} from "../../../../redux/quizReducer";

function mapStateToProps(state) {
    return {
        quizId: state.quiz.editQuiz.id,
        quizTitle: state.quiz.editQuiz.name,
        quizDecription: state.quiz.editQuiz.description,
        questions: state.quiz.editQuiz.questions,
        newQuestionText: state.quiz.newQuestionText,
        questionTypes: state.quiz.questionTypes,
        selectedQuestionType: state.quiz.selectedQuestionType,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: (questionText, qtype, dispType) => dispatch(addQuestionOnServer(questionText, qtype, dispType  = "ADD-QUESTION-EDIT")),
        CompleteQuizEdit: (quizData) => dispatch(CompleteQuizEdit(quizData)),


        updateQuestionText: (text) => {
            dispatch(UpdateQuestionTextCreator(text));
        },
        SetQuestionType: (type) => dispatch(SetQuestionTypeCreator(type)),
        updateQuestionBody: (id, text) => {
            dispatch(UpdateQuestionBodyCreator(id, text, "UPDATE-QUESTION-TEXT-EDIT"));
        },
        updateQuestionType: (id, qtype) => {
            dispatch(UpdateQuestionTypeCreator(id, qtype, "UPDATE-QUESTION-TYPE-EDIT"));
        },
        updateQuestionOnServer: (id, newText, newType) => {
            dispatch(updateQuestionOnServer(id, newText, newType));
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