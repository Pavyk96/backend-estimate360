const initState = {
    quizzes: {},
    currentQuiz: {
        id: null,
        title: "",
        description: "",
        answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
        questions: [],
    },
    newQuestionText: ""
}

function quizReducer(state = initState, action) {
    let newState = structuredClone(state);
    switch (action.type) {
        case "ADD-QUESTION":
            let newQuestion = {
                id: newState.currentQuiz.questions.length + 1,
                question: newState.newQuestionText,
            };
            newState.currentQuiz.questions.push(newQuestion)
            newState.newQuestionText = ""
            break;
        case "UPDATE-QUESTION-TEXT":
            newState.newQuestionText = action.newText
            break;
        case "UPDATE-QUESTION-BODY":
            let question = newState.currentQuiz.questions.find(q => q.id === action.id)
            if (question) {
                question.question = action.newText
            }
            break;
        case "UPDATE-QUIZ-TITLE":
            newState.currentQuiz.title = action.newText
            break;
        case "UPDATE-QUIZ-DESCRIPTION":
            newState.currentQuiz.description = action.newText
            break
        case "SAVE_QUIZ":
            const quizId = Date.now()
            newState.quizzes[quizId] = {
                ...newState.currentQuiz,
                id: quizId,
                date: new Date().toLocaleDateString(),
                assigned: false
            }
            newState.currentQuiz = initState.currentQuiz
            break;
        case "ASSIGN_QUIZ":
            newState.quizzes[action.quizId].assigned = true
            break
        case "LOAD-QUIZ":
            newState.currentQuiz = { ...newState.quizzes[action.quizId] };
            if (newState.quizzes[action.quizId]) {
                delete newState.quizzes[action.quizId];
            }
            break;
        case "DELETE-QUIZ":
            delete newState.quizzes[action.quizId];
            break;
        default:
            break;
    }
    return newState
}

export function AddQuestionCreator() {
    return {
        type: "ADD-QUESTION"
    }
}

export function UpdateQuestionTextCreator(text) {
    return {
        type: "UPDATE-QUESTION-TEXT",
        newText: text
    }
}

export function UpdateQuestionBodyCreator(id, text) {
    return {
        type: "UPDATE-QUESTION-BODY",
        id: id,
        newText: text
    }
}

export function UpdateQuizTitleCreator(text) {
    return {
        type: "UPDATE-QUIZ-TITLE",
        newText: text
    }
}

export function UpdateQuizDescriptionCreator(text) {
    return {
        type: "UPDATE-QUIZ-DESCRIPTION",
        newText: text
    }
}

export function SaveQuizCreator() {
    return {
        type: "SAVE_QUIZ"
    }
}

export function assignQuiz(quizId) {
    return {
        type: "ASSIGN_QUIZ",
        quizId
    }
}

export function LoadQuizCreator(quizId) {
    return {
        type: "LOAD-QUIZ",
        quizId
    };
}

export function DeleteQuizCreator(quizId) {
    return {
        type: "DELETE-QUIZ",
        quizId
    };
}


export default quizReducer;