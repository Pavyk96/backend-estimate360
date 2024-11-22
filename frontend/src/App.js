import './App.css';
import AddQuizContainer from './components/Content/AddQuiz/AddQuizContainer';
import MyQuizContainer from './components/Content/MyQuizContainer';
import QuizDetailsContainer from './components/Content/Quiz/QuizDetailsContainer';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-wrapper'>
      <Header />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/quiz' element={<MyQuizContainer />} />
          <Route path='/quiz/add' element={<AddQuizContainer />} />
          <Route path='/quiz/:quizId' element={<QuizDetailsContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
