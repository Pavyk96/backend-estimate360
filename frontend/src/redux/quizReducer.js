const initState = {
    quizzes: {},
    currentQuiz: {
        id: null,
        title: "",
        description: "",
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
                answer: ["1", "2", "3", "4", "5"]
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
            newState.currentQuiz = {
                id: null,
                title: "",
                description: "",
                questions: []
            }
            break;
        case "ASSIGN_QUIZ":
            newState.quizzes[action.quizId].assigned = true
            break
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


export default quizReducer;