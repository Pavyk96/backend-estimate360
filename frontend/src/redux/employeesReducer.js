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


const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsSThGeVdnZ29JTUpYWERJcG1iOWlZYWM2OVdZNkNfMDZtajV0RjFwc0dJIn0.eyJleHAiOjE3MzQwMjA3MTUsImlhdCI6MTczNDAyMDQxNSwiYXV0aF90aW1lIjoxNzM0MDIwMTYzLCJqdGkiOiJiZjhhZjBiNS04MjFjLTRjNWUtODBjNC1kMTQwYjczYmQ5OGQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg0ODQvcmVhbG1zL2VzdGltYXRlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjAxMWU2YTMyLWU2YWUtNGUxOS1hMmIxLWE0ZjI4YmM2YWM2OCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVzdGltYXRlLWFwcCIsInNpZCI6ImUwMzI1MjdiLWU0M2ItNDM3My1iYzI1LWYxYzY4Yzg5NmU1MyIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVzdGltYXRlIiwib2ZmbGluZV9hY2Nlc3MiLCJIUiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoi0JPQtdC-0YDQs9C40Lkg0JrQsNCx0LjRhtC60LjQuSIsInByZWZlcnJlZF91c2VybmFtZSI6Im9yZ3kiLCJnaXZlbl9uYW1lIjoi0JPQtdC-0YDQs9C40LkiLCJmYW1pbHlfbmFtZSI6ItCa0LDQsdC40YbQutC40LkiLCJlbWFpbCI6Imdlb3JnaWprYWJpY2tpakBnbWFpbC5jb20ifQ.B3yAX9bYreMagDLPi84F4hFCUcV7V7B_1RzS5EExzYayIF-g_NXX455SrIUxEozFbn-G5cnMqMrXJOJX5X5lXFSKsZJZE08ep6W4KMCmv3mqd4Y6CD7tb3ju0LEvIpt-4-cF7jK6qBzj9out856SIU6hmBA5GI8D91wCgPArq6fjeU2zDCVZY6WuX0bleVYSUMsRj0K9J2imb_mCOrjJ-PEHX3cyMyAJGglU_WNociHw_PaVsc3-gD1xcec3pz49mLBhWAWUbAtIsbewbSKtxdGrnAuD5gk55oWXrUuhpOIfTDOEsIiT5-ainT6lwjz_YVxpKEff-KWZbg63wS46JA"

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
    debugger
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });

        try {
            const validUsers = selectedUsers.filter(userId => userId !== null);
            if (validUsers.length === 0) {
                throw new Error("Список выбранных пользователей пуст.");
            }

            const requests = validUsers.map(userId => {
                return fetch('http://localhost:8081/api/users-surveys', {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
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
    debugger
    return async (dispatch) => {
        dispatch({ type: "START-LOADING" });

        try {
            const response = await fetch(`http://localhost:8081/api/all-users-surveys/${surveyId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
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
            const response = await fetch("http://localhost:8081/api/reduced-users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
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
            const response = await fetch(`http://localhost:8081/api/full-users/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
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

