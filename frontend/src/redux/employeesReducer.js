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

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJma2stX0NJcHltczFtSU5GZGlIOXFHNlhMcEs4Si1FcGhPS2ZaM1FEb3FNIn0.eyJleHAiOjE3MzM1ODE2NzgsImlhdCI6MTczMzU4MTM3OCwianRpIjoiZDRjMzkwMmYtYmY3MC00M2ZlLWJmZDAtMGI4YjBkMjA4NDZjIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrXzE6ODA4MC9yZWFsbXMvZXN0aW1hdGUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMWYxZDcwYTMtZWNlNy00MjkxLWJiYTctN2E2YTlhMTBlMzgxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXN0aW1hdGUtYXBwIiwic2lkIjoiYzE1ZGM0MzktNGIzNS00MmMwLWFlMTgtZjE1NTlhYjk5YjA5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJsb2NhbGhvc3Q6ODA4MSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1lc3RpbWF0ZSIsIm9mZmxpbmVfYWNjZXNzIiwiSFIiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiR2VvcmdlIEthYiIsInByZWZlcnJlZF91c2VybmFtZSI6Imh1aSIsImdpdmVuX25hbWUiOiJHZW9yZ2UiLCJmYW1pbHlfbmFtZSI6IkthYiIsImVtYWlsIjoiZ2VvcmdpamthYmlja2lqMUBnbWFpbC5jb20ifQ.Ygk-d_wQc4ShsIEZDSTCE711xfDeUB4Z8qFGb-zqWRrffCk5XnFmisyiMb_BDoIgILW1pNQNyRhCu5U6--ibu_SOrZVE8UxGoDN5M_Nuxo1L-wldYepX3wdfXFKBBYl4wMb2M_O0hetqH2xOa7B5yMhxRooAFIeScqy85qDDXzC3Z11Lhg8pqhYDDqNzUAlb5b37RvEkaluuC2zafGSlFgDHkNDdXbsOiC0v8GMxkvaCKY1V-SlPKNimtIw6NwderaCc5HY02r_gz95WFXgDu9lTHJf7IoGsr1cqJUTiuGTBOGCoNhd2T1jmWfaAUQOkkKMLRGJ3mlRRfYNaRB6fjg"

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

