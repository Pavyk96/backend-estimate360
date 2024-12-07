const savedState = localStorage.getItem('quizState');
const initState = savedState ? JSON.parse(savedState) : {
    quizzes: {},
    currentQuiz: {
        id: null,
        name: "",
        description: "",
        createdAt: "",
        answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
        questions: [],
    },
    viewQuiz: {
        id: null,
        name: "",
        description: "",
        createdAt: "",
        answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
        questions: [],
    },
    newQuestionText: "",
    loading: false,
    error: null
};

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJma2stX0NJcHltczFtSU5GZGlIOXFHNlhMcEs4Si1FcGhPS2ZaM1FEb3FNIn0.eyJleHAiOjE3MzM1NzAxMTQsImlhdCI6MTczMzU2OTgxNCwianRpIjoiMTAxNGY3ZDItNzI1Ny00ODUxLThjY2MtYmJkNzMxYThkY2MzIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrXzE6ODA4MC9yZWFsbXMvZXN0aW1hdGUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMWYxZDcwYTMtZWNlNy00MjkxLWJiYTctN2E2YTlhMTBlMzgxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXN0aW1hdGUtYXBwIiwic2lkIjoiZGY2YjYzZTAtZjMyMC00OTNhLTg4ODktNmFiZTNmNzAxMjEwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJsb2NhbGhvc3Q6ODA4MSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1lc3RpbWF0ZSIsIm9mZmxpbmVfYWNjZXNzIiwiSFIiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiR2VvcmdlIEthYiIsInByZWZlcnJlZF91c2VybmFtZSI6Imh1aSIsImdpdmVuX25hbWUiOiJHZW9yZ2UiLCJmYW1pbHlfbmFtZSI6IkthYiIsImVtYWlsIjoiZ2VvcmdpamthYmlja2lqMUBnbWFpbC5jb20ifQ.H8NvKGLjhg8pJNUDc-cZ7OEjT04xK5A8mXgAJQ7wFdOiRjfYhc0pwu_SKA26XUuIjcJu0lhQ9dpLMjRC7QGgl6QdScXj1-qdZdM-FHtlI0CIdFQDmC_rqjfVt1yPR_iHWXlvOpH3joKyhy-uUmXiZ_0ZMtHxt9kzaJWrHIamPWNMz5NyvIwPyyhxAwWDqzx7iGftUdrOrMfn30i6wlURDwyst7-K5JufsAQXutggPG23frXojU-kdBENMgrScG-4fQIVRvqv63LG15twfAe8YTmZlvOey-ZTKhbLs03jhN32L01104ISz059VgUUOe0qeas1DI_CHVOdJaArpinkHQ"

function quizReducer(state = initState, action) {
    let newState = structuredClone(state);
    switch (action.type) {
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
            newState.currentQuiz.name = action.newText
            break;
        case "UPDATE-QUIZ-DESCRIPTION":
            newState.currentQuiz.description = action.newText
            break
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



        case "START-LOADING":
            newState.loading = true;
            break;
        case "STOP-LOADING":
            newState.loading = false;
            break;
        case "SET-ERROR":
            newState.error = action.error;
            break;

        case "ADD-QUESTION":
            newState.currentQuiz.questions.push(action.newQuestion);
            newState.newQuestionText = ""
            break;

        case "SET-CURRENT-QUIZ":
            console.log("Устанавливается текущий квиз:", action.quiz);
            newState.currentQuiz = {
                id: action.quiz.id,
                name: action.quiz.name,
                description: action.quiz.description,
                answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
                createdAt: action.quiz.createdAt,
                questions: action.quiz.questions, 
            };
            break;

        case "SET-CURRENT-QUIZ-TO-VIEW":
            console.log("Устанавливается текущий квиз для просмотра:", action.quiz);
            newState.viewQuiz = {
                id: action.quiz.id,
                name: action.quiz.name,
                description: action.quiz.description,
                answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
                createdAt: action.quiz.createdAt,
                questions: action.quiz.questions, 
            };
            break;

        case "SET-QUIZZES":
            newState.quizzes = { ...action.quizzes };
            break;

        case "COMPLETE-QUIZ-CREATION":
            if (newState.currentQuiz.id && newState.currentQuiz.name) {
                newState.currentQuiz = {
                    id: null,
                    name: "",
                    description: "",
                    createdAt: "",
                    answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
                    questions: [],
                };
                newState.newQuestionText = "";
            } else {
                newState.error = "Квиз не завершен. Укажите название и добавьте вопросы.";
            }
            break;
        default:
            break;
    }

    console.log("Сохраняем состояние:", JSON.stringify(newState));
    localStorage.setItem('quizState', JSON.stringify(newState));

    return newState
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

export function saveQuizToServer(quizData) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            // Создание квиза
            const surveyResponse = await fetch("http://localhost:8081/api/surveys", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: quizData.name,
                    description: quizData.description,
                }),
            });
            if (!surveyResponse.ok) {
                throw new Error(`Ошибка создания квиза: ${surveyResponse.statusText}`);
            }
            const savedQuiz = await surveyResponse.json();            

            // Установка текущего квиза
            console.log('ID сохраненного квиза:', savedQuiz.id);
            dispatch({
                type: "SET-CURRENT-QUIZ",
                quiz: { id: savedQuiz.id, name: quizData.name, description: quizData.description, createdAt: savedQuiz.createdAt, questions: [] },
            });
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function addQuestionToQuiz(quizId, questionText) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            // Создание вопроса
            const questionResponse = await fetch("http://localhost:8081/api/questions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: questionText, type: "first_type" }),
            });
            if (!questionResponse.ok) {
                throw new Error(`Ошибка создания вопроса: ${questionResponse.statusText}`);
            }
            const newQuestion = await questionResponse.json();

            // Добавление вопроса в анкету
            const addToSurveyResponse = await fetch(
                `http://localhost:8081/api/surveys-questions/surveys/${quizId}/questions/${newQuestion.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!addToSurveyResponse.ok) {
                throw new Error(`Ошибка добавления вопроса в анкету: ${addToSurveyResponse.statusText}`);
            }

            // Обновление текущего квиза
            dispatch({
                type: "ADD-QUESTION",
                newQuestion: newQuestion,
            });
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function fetchCurrentQuiz(quizId) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const response = await fetch(`http://localhost:8081/api/surveys-questions/${quizId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Ошибка загрузки квиза: ${response.statusText}`);
            }
            const quizData = await response.json();
            const quiz = {
                id: quizData.id,
                name: quizData.name,
                description: quizData.description,
                createdAt: quizData.createdAt,
                questions: quizData.questionList.map((question) => ({
                    id: question.id,
                    question: question.question,
                    type: question.type,
                })),
            };

            dispatch({
                type: "SET-CURRENT-QUIZ",
                quiz,
            });

        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function fetchCurrentQuizToView(quizId) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const response = await fetch(`http://localhost:8081/api/surveys-questions/${quizId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Ошибка загрузки квиза: ${response.statusText}`);
            }
            const quizData = await response.json();
            const quiz = {
                id: quizData.id,
                name: quizData.name,
                description: quizData.description,
                createdAt: quizData.createdAt,
                questions: quizData.questionList.map((question) => ({
                    id: question.id,
                    question: question.question,
                    type: question.type,
                })),
            };

            dispatch({
                type: "SET-CURRENT-QUIZ-TO-VIEW",  // Устанавливаем квиз для отображения
                quiz,
            });

        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function fetchAllQuizzes() {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const response = await fetch("http://localhost:8081/api/surveys", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Ошибка загрузки опросов: ${response.statusText}`);
            }
            const quizzes = await response.json();
            const quizzesMap = quizzes.reduce((map, quiz) => {
                map[quiz.id] = {
                    id: quiz.id,
                    name: quiz.name,
                    description: quiz.description,
                    createdAt: quiz.createdAt,
                    assigned: false,
                };
                return map;
            }, {});

            dispatch({
                type: "SET-QUIZZES",
                quizzes: quizzesMap,
            });
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function CompleteQuizCreation() {
    return {
        type: "COMPLETE-QUIZ-CREATION",
    };
}

export function updateQuestionOnServer(id, newText) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const payload = {
                question: newText,
                type: "fitst_type"
            };
            const response = await fetch(`http://localhost:8081/api/questions/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error(`Ошибка обновления вопроса: ${response.statusText}`);
            }
            dispatch(UpdateQuestionBodyCreator(id, newText));
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}




export function formatDate(dateString) {
    // Парсим строку даты
    const date = new Date(dateString);
    // Проверяем, валидна ли дата
    if (isNaN(date)) {
        return "Неверная дата"; // Обработка ошибки
    }
    // Форматируем дату в читаемый вид
    return date.toLocaleString("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}


export default quizReducer;



