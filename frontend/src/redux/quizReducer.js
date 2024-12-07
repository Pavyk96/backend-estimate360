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
    editQuiz: {
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

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJma2stX0NJcHltczFtSU5GZGlIOXFHNlhMcEs4Si1FcGhPS2ZaM1FEb3FNIn0.eyJleHAiOjE3MzM1OTQ3NTEsImlhdCI6MTczMzU5NDQ1MSwianRpIjoiMTUxYzRiNzYtNjZjNS00MTM3LWIxZjctOTU1YjhkNzJiMmNiIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrXzE6ODA4MC9yZWFsbXMvZXN0aW1hdGUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMWYxZDcwYTMtZWNlNy00MjkxLWJiYTctN2E2YTlhMTBlMzgxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXN0aW1hdGUtYXBwIiwic2lkIjoiODBlYjEwMWYtMWIxZi00NzJjLWE4ZTYtYzZjMGZjMzU0NjQ1IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJsb2NhbGhvc3Q6ODA4MSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1lc3RpbWF0ZSIsIm9mZmxpbmVfYWNjZXNzIiwiSFIiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiR2VvcmdlIEthYiIsInByZWZlcnJlZF91c2VybmFtZSI6Imh1aSIsImdpdmVuX25hbWUiOiJHZW9yZ2UiLCJmYW1pbHlfbmFtZSI6IkthYiIsImVtYWlsIjoiZ2VvcmdpamthYmlja2lqMUBnbWFpbC5jb20ifQ.AIj6IcHWbz-gmT5kfue_vddThEUrQlaXgTvoy6hcXcTpMUFt4vr0ec7D2176dCAze0m3mr1rgyA8nsIky1oCyDdS2gu8iSZZ-EcZuo0OrcBDtwBBK9gwDgvHFthVvI4NP5zvWoSxyDdTcgEbTyyXJObwcp4pSBVRwaigAkx61KjsZz4dz-5pszAqJ1AjqXZWOgPO9lQMHxgpLqVqKLUDbvXFId1VsvEjneONSifp3CgvidzzgCfD4hQF6abi1lYpWeKKGkBST3XGuPEU1q6h3a5fMukjMYWdwnOd-zGg1oc__VyUOIurxK_155u2oztGca277lQE_-ogKMhGp-zrOA"

function quizReducer(state = initState, action) {
    let newState = structuredClone(state);
    switch (action.type) {
        case "UPDATE-QUIZ-TITLE":
            newState.currentQuiz.name = action.newText
            break;
        case "UPDATE-QUIZ-DESCRIPTION":
            newState.currentQuiz.description = action.newText
            break
        case "SET-QUESTION-TEXT":
            newState.newQuestionText = action.newText
            break;
        case "UPDATE-QUESTION-TEXT":
            let question = newState.currentQuiz.questions.find(q => q.id === action.id)
            if (question) {
                question.question = action.newText
            }
            break;

        case "UPDATE-QUIZ-TITLE-EDIT":
            newState.editQuiz.name = action.newText
            break;
        case "UPDATE-QUIZ-DESCRIPTION-EDIT":
            newState.editQuiz.description = action.newText
            break
        case "UPDATE-QUESTION-TEXT-EDIT":
            let questionedit = newState.editQuiz.questions.find(q => q.id === action.id)
            if (questionedit) {
                questionedit.question = action.newText
            }
            break;

        case "ASSIGN_QUIZ":
            newState.quizzes[action.quizId].assigned = true
            break

        case "LOAD-QUIZ":
            newState.editQuiz = { ...newState.viewQuiz };
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
            console.log(action.newQuestion || "Ошибка нет вопроса")
            newState.currentQuiz.questions.push(action.newQuestion);
            newState.newQuestionText = ""
            console.log(newState.currentQuiz.questions || "Ошибка вопрос не добавился")
            break;

        case "ADD-QUESTION-EDIT":
            console.log(action.newQuestion || "Ошибка нет вопроса")
            newState.editQuiz.questions.push(action.newQuestion);
            newState.newQuestionText = ""
            console.log(newState.editQuiz.questions || "Ошибка вопрос не добавился")
            break;

        case "SET-EDIT-QUIZ":
            console.log("Устанавливается квиз: для редактирования", action.quiz);
            newState.editQuiz = {
                id: action.quiz.id,
                name: action.quiz.name,
                description: action.quiz.description,
                answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
                createdAt: action.quiz.createdAt,
                questions: action.quiz.questions,
            };
            break;

        case "SET-QUIZ-TO-VIEW":
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
            newState.currentQuiz = {
                id: null,
                name: "",
                description: "",
                createdAt: "",
                answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
                questions: [],
            };
            newState.newQuestionText = "";
            break;

        case "COMPLETE-QUIZ-EDIT":
            newState.editQuiz = {
                id: null,
                name: "",
                description: "",
                createdAt: "",
                answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
                questions: [],
            };
            newState.newQuestionText = "";
            break;
        default:
            break;
    }

    console.log("Сохраняем состояние:", JSON.stringify(newState));
    localStorage.setItem('quizState', JSON.stringify(newState));

    return newState
}


export function UpdateQuizTitleCreator(text, type) {
    return {
        type: type,
        newText: text
    }
}

export function UpdateQuizDescriptionCreator(text, type) {
    return {
        type: type,
        newText: text
    }
}


export function UpdateQuestionTextCreator(text) {
    return {
        type: "SET-QUESTION-TEXT",
        newText: text
    }
}

export function UpdateQuestionBodyCreator(id, text, type) {
    return {
        type: type,
        id: id,
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

export function addQuestionOnServer(questionText, dispType) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        console.log(questionText || "Ошибка вопроса нет в функции")
        try {
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

            dispatch({
                type: dispType,
                newQuestion: newQuestion,
            });
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
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
            dispatch(UpdateQuestionBodyCreator(id, newText, "UPDATE-QUESTION-TEXT"));
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function updateQuestionOnServerEdit(id, newText) {
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
            dispatch(UpdateQuestionBodyCreator(id, newText, "UPDATE-QUESTION-TEXT-EDIT"));
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function CompleteQuizCreation(quizData) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const createQuizResponse = await fetch("http://localhost:8081/api/surveys", {
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

            if (!createQuizResponse.ok) {
                throw new Error(`Ошибка создания квиза: ${createQuizResponse.statusText}`);
            }

            const savedQuiz = await createQuizResponse.json();
            const surveyId = savedQuiz.id;

            const questionIdList = quizData.questions.map((question) => question.id);

            const updateSurveyResponse = await fetch(`http://localhost:8081/api/surveys-questions/${surveyId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    surveyId,
                    questionIdList,
                }),
            });

            if (!updateSurveyResponse.ok) {
                dispatch({ type: "SET-ERROR", error: `Ошибка добавления вопросов в квиз: ${updateSurveyResponse.statusText}` });
            }

            dispatch({
                type: "COMPLETE-QUIZ-CREATION",
            });

            dispatch(fetchAllQuizzes())

        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    }
}

export function CompleteQuizEdit(quizData) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const surveyId = quizData.id;
            const createQuizResponse = await fetch(`http://localhost:8081/api/surveys/${surveyId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: quizData.name,
                    description: quizData.description,
                }),
            });

            if (!createQuizResponse.ok) {
                throw new Error(`Ошибка создания квиза: ${createQuizResponse.statusText}`);
            }
            
            await fetch(`http://localhost:8081/api/surveys-questions/${surveyId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            const questionIdList = quizData.questions.map((question) => question.id);
            const updateSurveyResponse = await fetch(`http://localhost:8081/api/surveys-questions/${surveyId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    surveyId,
                    questionIdList,
                }),
            });

            if (!updateSurveyResponse.ok) {
                dispatch({ type: "SET-ERROR", error: `Ошибка добавления вопросов в квиз: ${updateSurveyResponse.statusText}` });
            }

            dispatch({
                type: "COMPLETE-QUIZ-EDIT",
            });

            dispatch(fetchAllQuizzes())

        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    }
}

// export function fetchEditQuiz(quizId) {
//     return async (dispatch) => {
//         dispatch({ type: "START-LOADING" });
//         try {
//             const response = await fetch(`http://localhost:8081/api/surveys-questions/${quizId}`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error(`Ошибка загрузки квиза: ${response.statusText}`);
//             }
//             const quizData = await response.json();
//             const quiz = {
//                 id: quizData.id,
//                 name: quizData.name,
//                 description: quizData.description,
//                 createdAt: quizData.createdAt,
//                 questions: quizData.questionList.map((question) => ({
//                     id: question.id,
//                     question: question.question,
//                     type: question.type,
//                 })),
//             };

//             dispatch({
//                 type: "SET-EDIT-QUIZ",
//                 quiz,
//             });

//         } catch (error) {
//             dispatch({ type: "SET-ERROR", error: error.message });
//         } finally {
//             dispatch({ type: "STOP-LOADING" });
//         }
//     };
// }



export function fetchQuizToView(quizId) {
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
                type: "SET-QUIZ-TO-VIEW",
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



