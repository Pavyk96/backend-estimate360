import { connect } from "react-redux";
import AssignQuiz from "./AssignQuiz";
import { assignQuiz } from "../../../../redux/quizReducer";
import { useParams } from "react-router-dom";
import { addUserToSelected, fetchAllEmployees, removeUserFromSelected, submitAllUsers, submitSelectedUsers } from "../../../../redux/employeesReducer";

function mapStateToProps(state, ownProps) {
  const { quizId } = ownProps;
  return {
    quiz: state.quiz.quizzes[quizId],
    employees: state.employee.employeesShort,
    selectedUsers: state.employee.selectedUsers
  };
}

function mapDispatchToProps(dispatch){
  return{
    onAssignQuiz: (quizId) => dispatch(assignQuiz(quizId)),
    fetchAllEmployees: () => dispatch(fetchAllEmployees()),
    addUserToSelected: (userId) => dispatch(addUserToSelected(userId)),
    removeUserFromSelected: (userId) => dispatch(removeUserFromSelected(userId)),
    submitSelectedUsers: (quizId, selectedUsers) => dispatch(submitSelectedUsers(quizId, selectedUsers)),
    submitAllUsers: (quizId) => dispatch(submitAllUsers(quizId))
  }
}

function withParams(Component) {
  return (props) => {
    const params = useParams();
    return <Component {...props} quizId={params.quizId} />;
  };
}

const AssignQuizContainer = connect(mapStateToProps, mapDispatchToProps)(AssignQuiz);

export default  withParams(AssignQuizContainer);