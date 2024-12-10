const savedState = localStorage.getItem('employeeState');
const initState = savedState ? JSON.parse(savedState) : {
    employeesShort: {},
    currentEmployee: {
        user: {},
        chief: {},
        subordinates: []
    },
    loading: false,
    error: null
}


const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsSThGeVdnZ29JTUpYWERJcG1iOWlZYWM2OVdZNkNfMDZtajV0RjFwc0dJIn0.eyJleHAiOjE3MzM4NDk1NjUsImlhdCI6MTczMzg0OTI2NSwiYXV0aF90aW1lIjoxNzMzODQ4NzQ5LCJqdGkiOiI2NmMwNWU1Yi1iZGQ2LTQyMzctODYxOS03NjJjYmQwNTZkN2QiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg0ODQvcmVhbG1zL2VzdGltYXRlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjAxMWU2YTMyLWU2YWUtNGUxOS1hMmIxLWE0ZjI4YmM2YWM2OCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVzdGltYXRlLWFwcCIsInNpZCI6ImM3ZmY0NTIzLWI0OTktNDhlZC05N2Y3LTlkMWE3YzA5MjFlMSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVzdGltYXRlIiwib2ZmbGluZV9hY2Nlc3MiLCJIUiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoi0JPQtdC-0YDQs9C40Lkg0JrQsNCx0LjRhtC60LjQuSIsInByZWZlcnJlZF91c2VybmFtZSI6Im9yZ3kiLCJnaXZlbl9uYW1lIjoi0JPQtdC-0YDQs9C40LkiLCJmYW1pbHlfbmFtZSI6ItCa0LDQsdC40YbQutC40LkiLCJlbWFpbCI6Imdlb3JnaWprYWJpY2tpakBnbWFpbC5jb20ifQ.EuhHXs844uR5wHLidoKsN_RpsPHhpnM09rFHjkhBxR5_ZuVUxgINCNgrdpwtsHWkP35qLV3PacHgZYa69nn_vzi4cPo-iSeZ_KQn-VBe3EW1RLOyd7wQV3QNRDADPk1Og3cZnrQpuZcdCFL8jXvsbKC9Fwfe7SEL0CGRFC62SXIp9DoNdWuoCMXl6-31j7Ortzkyvo2-XybafbcBRyCWFMeaT9YJI3o1YcTjwbb6rCZgQpchVEou5ncG2Vfrzj-0Djwl6qVFEGG2thRWgs4awjZMlS6rM0n0UJ0dfV3V4qIVx8nSL4EtiXRJRfGnVML-cCxou2_I9C0VOYGKZlasgQ"

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

