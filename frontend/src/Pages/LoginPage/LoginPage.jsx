// import React, { useState, useEffect } from "react";
// import s from './LoginPage.module.css';

// function LoginPage() {
//     // const [htmlContent, setHtmlContent] = useState('');

//     // useEffect(() => {
//     //     debugger
//     //     // Запрос к API
//     //     fetch('http://localhost:8081/auth')
//     //         .then(response => response.text())  // Получаем текстовый HTML
//     //         .then(html => {
//     //             setHtmlContent(html);  // Сохраняем полученный HTML
//     //         })
//     //         .catch(error => {
//     //             console.error("Ошибка при загрузке HTML:", error);
//     //         });
//     // }, []);

//     return (
//         <div className={s.container}>
//             {/* Вставка HTML через dangerouslySetInnerHTML */}
//             {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
            
//             {/* Или вставка HTML в iframe (необходима поддержка CORS на сервере) */}
//             <iframe 
//                 src="http://localhost:8484/realms/estimate/protocol/openid-connect/auth?response_type=code&client_id=estimate-app&redirect_uri=http://localhost:3000/quiz&scope=openid"
//                 style={{ width: '100%', height: '100vh', border: 'none' }}
//             />
//         </div>
//     );
// }

// export default LoginPage;