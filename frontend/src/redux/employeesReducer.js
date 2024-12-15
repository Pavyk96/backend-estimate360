const savedState = localStorage.getItem('employeeState');
const initState = savedState ? JSON.parse(savedState) : {
    employeesShort: {},
    currentEmployee: {
        user: {},
        chief: {},
        subordinates: []
    },
    selectedUsers: [],
    loading: false,
    error: null
}




function employeesReducer(state = initState, action) {
    let newState = structuredClone(state);
    switch (action.type) {
        case "START-LOADING":
            newState.loading = true;
            break;
        case "STOP-LOADING":
            newState.loading = false;
            break;
        case "SET-ERROR":
            newState.error = action.error;
            break;

        case "SET-EMPLOYEES-SHORT":
            newState.employeesShort = { ...action.employeesShort };
            break;

        case "SET-CURRNET-EMPLOYEE":
            newState.currentEmployee = {
                user: action.currentEmployee.user,
                chief: action.currentEmployee.chief,
                subordinates: action.currentEmployee.subordinates
            };
            break;
        case "ADD-USER":
            newState.selectedUsers = newState.selectedUsers.filter(userId => userId !== null);
            if (!newState.selectedUsers.includes(action.userId)) {
                newState.selectedUsers.push(action.userId);
            }
            break;
        case "REMOVE-USER":
            newState.selectedUsers = newState.selectedUsers.filter(userId => userId !== action.userId);
            break;
        case "CLEAR-SELECTED-USERS":
            newState.selectedUsers = [];
            break;
        default:
            break;
    }

    console.log("Сохраняем состояние:", JSON.stringify(newState));
    localStorage.setItem('employeeState', JSON.stringify(newState));

    return newState

}

export function addUserToSelected(userId) {
    return {
        type: "ADD-USER",
        userId,
    };
}

export function removeUserFromSelected(userId) {
    return {
        type: "REMOVE-USER",
        userId,
    };
}

export function clearSelectedUsers() {
    return {
        type: "CLEAR-SELECTED-USERS",
    };
}


export function submitSelectedUsers(surveyId, selectedUsers) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const savedState = JSON.parse(localStorage.getItem('tokenState'));
            const { accessToken } = savedState; // Получение текущего accessToken
            if (!accessToken) throw new Error("Токен доступа отсутствует");

            const validUsers = selectedUsers.filter(userId => userId !== null);
            if (validUsers.length === 0) {
                throw new Error("Список выбранных пользователей пуст.");
            }
            const requests = validUsers.map(userId => {
                return fetch('http://localhost:8081/api/users-surveys', {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        surveyId,
                    }),
                });
            });
            const responses = await Promise.all(requests);
            responses.forEach(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка при отправке данных: ${response.statusText}`);
                }
            });
            dispatch(clearSelectedUsers());
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function submitAllUsers(surveyId) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const savedState = JSON.parse(localStorage.getItem('tokenState'));
            const { accessToken } = savedState; // Получение текущего accessToken
            if (!accessToken) throw new Error("Токен доступа отсутствует");

            const response = await fetch(`http://localhost:8081/api/all-users-surveys/${surveyId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error(`Ошибка при отправке данных: ${response.statusText}`);
            }
            dispatch(clearSelectedUsers());
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export function fetchAllEmployees() {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const savedState = JSON.parse(localStorage.getItem('tokenState'));
            const { accessToken } = savedState; // Получение текущего accessToken
            if (!accessToken) throw new Error("Токен доступа отсутствует");

            const response = await fetch("http://localhost:8081/api/reduced-users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Ошибка загрузки сотрудников: ${response.statusText}`);
            }
            const employees = await response.json();
            const employeesMap = employees.reduce((map, employee) => {
                map[employee.id] = {
                    id: employee.id,
                    name: employee.name,
                    surname: employee.surname,
                    email: employee.email,
                    post: employee.post,
                };
                return map;
            }, {});

            dispatch({
                type: "SET-EMPLOYEES-SHORT",
                employeesShort: employeesMap,
            });
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}


export function fetchCurrnetEmployee(id) {
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });
        try {
            const savedState = JSON.parse(localStorage.getItem('tokenState'));
            const { accessToken } = savedState; // Получение текущего accessToken
            if (!accessToken) throw new Error("Токен доступа отсутствует");

            const response = await fetch(`http://localhost:8081/api/full-users/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Ошибка загрузки сотрудников: ${response.statusText}`);
            }

            const employee = await response.json();
            console.log("Полученные данные:", employee);
            const currentEmp = {
                user: employee.user,
                chief: employee.chief,
                subordinates: employee.subordinates
            }

            dispatch({
                type: "SET-CURRNET-EMPLOYEE",
                currentEmployee: currentEmp,
            });
        } catch (error) {
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            dispatch({ type: "STOP-LOADING" });
        }
    };
}

export default employeesReducer;

