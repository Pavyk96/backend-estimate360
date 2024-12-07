const savedState = localStorage.getItem('employeeState');
const initState = savedState ? JSON.parse(savedState) : {
    employeesShort: {},
    currentemployee: {
        id: null,
        name: "",
        surname: "",
        email: "",
        post: "",
        chief: "",
        subordinates: [],
    },
    loading: false,
    error: null
}

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJma2stX0NJcHltczFtSU5GZGlIOXFHNlhMcEs4Si1FcGhPS2ZaM1FEb3FNIn0.eyJleHAiOjE3MzM1NzA0MjksImlhdCI6MTczMzU3MDEyOSwianRpIjoiZmQ0MDAwMDUtN2Q5OC00M2VjLTg0ODktZjI5OGVkODljNzhlIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrXzE6ODA4MC9yZWFsbXMvZXN0aW1hdGUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMWYxZDcwYTMtZWNlNy00MjkxLWJiYTctN2E2YTlhMTBlMzgxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXN0aW1hdGUtYXBwIiwic2lkIjoiZGIxNDQ2N2QtN2UyYS00YzFjLWEzMDMtMDAzN2RlMzM3N2IxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJsb2NhbGhvc3Q6ODA4MSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1lc3RpbWF0ZSIsIm9mZmxpbmVfYWNjZXNzIiwiSFIiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiR2VvcmdlIEthYiIsInByZWZlcnJlZF91c2VybmFtZSI6Imh1aSIsImdpdmVuX25hbWUiOiJHZW9yZ2UiLCJmYW1pbHlfbmFtZSI6IkthYiIsImVtYWlsIjoiZ2VvcmdpamthYmlja2lqMUBnbWFpbC5jb20ifQ.O-A4-YPypryMXGJ9uGh2F2IxVMKCzHNMkwbe1OlBwIAxjkTHO1ysjPS3CTPvxu6AllFVZTVbgCHEt_Z9qnBgUvVM9ztPyeI6743D5a4T2hWuTfxMYbVjNBmQ85E07pcmORVA_qaJeKJaaXLGHCFRP053f-8ANmo5Afu_KFhQ6jfc2xT3l_Dn3wIzACTEF_Omzen5azgyA_Fo6GF-ecP1SkHDh4nGfypSXoee4qq44oYaF0qD6XuxUa7wUccU3KxdFADUGOuY2TQ5VmNLIRIH6Vn9xSzhTGdlYxywQPYEJMMfukoLqDiAM4kz536yZIUB6ODnSrucX6dWn2Xe8JtXHg"

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
        default:
            break;
    }

    console.log("Сохраняем состояние:", JSON.stringify(newState));
    localStorage.setItem('employeeState', JSON.stringify(newState));

    return newState

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

export default employeesReducer;

