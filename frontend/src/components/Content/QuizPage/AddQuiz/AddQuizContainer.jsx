import { connect } from "react-redux";
import AddQuiz from "./AddQuiz";
import {
    UpdateQuestionBodyCreator,
    UpdateQuestionTextCreator,
    UpdateQuizDescriptionCreator,
    UpdateQuizTitleCreator,
    updateQuestionOnServer,
    saveQuizToServer,
    addQuestionToQuiz,
    fetchCurrentQuiz,
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

        saveQuizOnServer: (quizData) => dispatch(saveQuizToServer(quizData)),
        addQuestion: (quizId, questionText) => dispatch(addQuestionToQuiz(quizId, questionText)),
        fetchQuiz: (quizId) => dispatch(fetchCurrentQuiz(quizId)),
        completeQuizCreation: () => dispatch(CompleteQuizCreation()),


        updateQuestionText: (text) => {
            dispatch(UpdateQuestionTextCreator(text));
        },
        updateQuestionBody: (id, text) => {
            dispatch(UpdateQuestionBodyCreator(id, text));
        },
        updateQuestionOnServer: (id, newText) => {
            dispatch(updateQuestionOnServer(id, newText));
        },
        updateQuizTitle: (text) => {
            dispatch(UpdateQuizTitleCreator(text));
        },
        updateQuizDescription: (text) => {
            dispatch(UpdateQuizDescriptionCreator(text));
        },
    }
}

const AddQuizContainer = connect(mapStateToProps, mapDispatchToProps)(AddQuiz);

export default AddQuizContainer;