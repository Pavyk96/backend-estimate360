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
        assigned: false,
    },
    viewQuiz: {
        id: null,
        name: "",
        description: "",
        createdAt: "",
        answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
        questions: [],
        assigned: false,
    },
    editQuiz: {
        id: null,
        name: "",
        description: "",
        createdAt: "",
        answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
        questions: [],
        assigned: false,
    },
    questionTypes: ["Инициативность", "Гибкость", "Коммуникативность", "Командная работа", "Ответственность"],
    selectedQuestionType: "",
    newQuestionText: "",
    loading: false,
    error: null
};

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsSThGeVdnZ29JTUpYWERJcG1iOWlZYWM2OVdZNkNfMDZtajV0RjFwc0dJIn0.eyJleHAiOjE3MzM4NDkxMzgsImlhdCI6MTczMzg0ODgzOCwiYXV0aF90aW1lIjoxNzMzODQ4NzQ5LCJqdGkiOiJhMmY3NGQ3YS0wOGY5LTQ2NTktOTc1Zi0zNzU5MGMzMGZhNTMiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg0ODQvcmVhbG1zL2VzdGltYXRlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjAxMWU2YTMyLWU2YWUtNGUxOS1hMmIxLWE0ZjI4YmM2YWM2OCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVzdGltYXRlLWFwcCIsInNpZCI6ImM3ZmY0NTIzLWI0OTktNDhlZC05N2Y3LTlkMWE3YzA5MjFlMSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVzdGltYXRlIiwib2ZmbGluZV9hY2Nlc3MiLCJIUiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoi0JPQtdC-0YDQs9C40Lkg0JrQsNCx0LjRhtC60LjQuSIsInByZWZlcnJlZF91c2VybmFtZSI6Im9yZ3kiLCJnaXZlbl9uYW1lIjoi0JPQtdC-0YDQs9C40LkiLCJmYW1pbHlfbmFtZSI6ItCa0LDQsdC40YbQutC40LkiLCJlbWFpbCI6Imdlb3JnaWprYWJpY2tpakBnbWFpbC5jb20ifQ.P1dplWe00dkj0Zdg2kJnSZeCewGRt5It81RrygoxAN9-orzET1WFyY_l09l6yFof45voLiU3sXIJpafTCHrT39LHVCX5roBoRg4DVKA5ifMM901nw7a2FDAnWso_LUcSN1aBXzgcQelsaJpBeu8qIPC8PFPq47p-JwzSBrD9ikjJjP2opvhHCXHPnUDmoPb0mFTM2Q4yyOthKXHzsNGFW-Kea6Li5bkvmTZaXl3NNJHG0qbkIkRNKcykdJhImw-bYoYTI-_7ku24OJ7Vx3yYuGJkDQu-7mNlYy_9YdKi8An68GdsMuHU0vP6p2P1r6DeD-1i5blYt6Rln4Xjg_d6xg"

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
        case "SET-QUESTION-TYPE":
            newState.selectedQuestionType = action.selectedType;
            break;
        case "UPDATE-QUESTION-TEXT":
            let question = newState.currentQuiz.questions.find(q => q.id === action.id)
            if (question) {
                question.question = action.newText
            }
            break;
        case "UPDATE-QUESTION-TYPE":
            let questionType = newState.currentQuiz.questions.find(q => q.id === action.id)
            if (questionType) {
                questionType.type = action.newType
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
        case "UPDATE-QUESTION-TYPE":
            let questionTypeEdit = newState.editQuiz.questions.find(q => q.id === action.id)
            if (questionTypeEdit) {
                questionTypeEdit.type = action.newType
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
            newState.selectedQuestionType = ""
            console.log(newState.currentQuiz.questions || "Ошибка вопрос не добавился")
            break;

        case "ADD-QUESTION-EDIT":
            console.log(action.newQuestion || "Ошибка нет вопроса")
            newState.editQuiz.questions.push(action.newQuestion);
            newState.newQuestionText = ""
            newState.selectedQuestionType = ""
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
                assigned: action.quiz.assigned,
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
                assigned: action.quiz.assigned,
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
                assigned: false,
            };
            newState.newQuestionText = "";
            newState.questionTypes =  ["Инициативность", "Гибкость", "Коммуникативность", "Командная работа", "Ответственность"];
            newState.selectedQuestionType = "";
            break;

        case "COMPLETE-QUIZ-EDIT":
            newState.editQuiz = {
                id: null,
                name: "",
                description: "",
                createdAt: "",
                answers: ["Не знаю", "Точно нет", "Скорее нет", "По случаю", "Скорее да", "Точно да"],
                questions: [],
                assigned: false,
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

export function SetQuestionTypeCreator(type) {
    return {
        type: "SET-QUESTION-TYPE",
        selectedType: type
    };
}

export function UpdateQuestionBodyCreator(id, text, type) {
    return {
        type: type,
        id: id,
        newText: text
    }
}

export function UpdateQuestionTypeCreator(id, qtype, type) {
    return {
        type: type,
        id: id,
        newType: qtype
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

export function addQuestionOnServer(questionText, qtype, dispType) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        console.log(questionText || "Ошибка вопроса нет в функции")
        console.log(qtype || "Ошибка типа вопроса нет в функции")
        try {
            const questionResponse = await fetch("http://localhost:8081/api/questions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: questionText, type: qtype }),
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

export function updateQuestionOnServer(id, newText, newType) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const payload = {
                question: newText,
                type: newType
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
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function updateQuestionOnServerEdit(id, newText, newType) {
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