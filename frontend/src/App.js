import './App.css';
import EmployeesContainer from './components/Content/EmployeesPage/EmployeesContainer';
import AddQuizContainer from './components/Content/QuizPage/AddQuiz/AddQuizContainer';
import AssignQuizContainer from './components/Content/QuizPage/AssignQuiz/AssignQuizContainer';
import EditQuizContainer from './components/Content/QuizPage/EditQuiz/EditQuizContainer';
import MyQuizContainer from './components/Content/QuizPage/MyQuizContainer';
import QuizDetailsContainer from './components/Content/QuizPage/Quiz/QuizDetailsContainer';
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
          <Route path='/quiz/edit' element={<EditQuizContainer />} />
          <Route path='/quiz/:quizId' element={<QuizDetailsContainer />} />
          <Route path='/assignQuiz/:quizId' element={<AssignQuizContainer />} />
          <Route path='/employees' element={<EmployeesContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
