const savedState = localStorage.getItem('tokenState');
const initState = savedState ? JSON.parse(savedState) : {
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
}

function tokenReducer(state = initState, action) {
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

        case "SET_TOKENS":
            newState.accessToken = action.token.accessToken;
            newState.refreshToken = action.token.refreshToken;
            break;
        default:
            break;
    }

    console.log("Сохраняем состояние:", JSON.stringify(newState));
    localStorage.setItem('tokenState', JSON.stringify(newState));

    return newState
}
let lastUsedCode = null;


export function fetchToken(code) {
    return async (dispatch) => {
        if (code === lastUsedCode) {
            console.warn("Этот code уже был использован:", code);
            return;
        }

        // Сохраняем текущий код как последний использованный
        lastUsedCode = code;
        dispatch({ type: "START-LOADING" });
        try {
            const response = await fetch('http://localhost:8081/api/auth/callback', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                // Если статус 500, просто логируем ошибку и продолжаем
                if (response.status === 500) {
                    console.error("Ошибка 500: проблема на сервере");
                    return;
                }
                throw new Error(`Ошибка при отправке данных: ${response.statusText}`);
            }

            const tokenData = await response.json();
            const token = {
                accessToken: tokenData.access_token,
                refreshToken: tokenData.refresh_token,
            };

            dispatch({
                type: "SET_TOKENS",
                token: token,
            });
            dispatch(autoRefreshToken());
        } catch (error) {
            // Логируем ошибку и отправляем в состояние только в случае критических ошибок
            console.error("Ошибка при выполнении fetchToken:", error.message);
            dispatch({ type: "SET-ERROR", error: error.message });
        } finally {
            // Завершаем загрузку в любом случае
            dispatch({ type: "STOP-LOADING" });
        }
    };
}


export function autoRefreshToken() {
    debugger
    return async (dispatch) => {
        setInterval(async () => {
            const savedState = JSON.parse(localStorage.getItem('tokenState'));
            const { refreshToken } = savedState; // Получение текущего refreshToken
            if (!refreshToken) return;

            try {
                console.log("ХУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУЙ", refreshToken);
                const response = await fetch('http://localhost:8081/api/auth/refresh-token', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh_token: refreshToken
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Ошибка обновления токенов: ${response.statusText}`);
                }

                const tokenData = await response.json();
                const newToken = {
                    accessToken: tokenData.access_token,
                    refreshToken: tokenData.refresh_token,
                };

                dispatch({
                    type: "SET_TOKENS",
                    token: newToken,
                });

            } catch (error) {
                console.error("Ошибка при обновлении токена:", error.message);
            }
        },  5 * 60 * 1000 - 1000); 
    };
}



export default tokenReducer;

