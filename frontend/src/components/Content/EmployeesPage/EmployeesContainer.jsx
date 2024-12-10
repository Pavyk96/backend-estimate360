import { connect } from "react-redux";
import Employees from "./Employees";
import { fetchAllEmployees } from "../../../redux/employeesReducer";


function mapStateToProps(state) {
  return {
    employees: state.employee.employeesShort
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchAllEmployees: () => dispatch(fetchAllEmployees()),
  };
}

const EmployeesContainer = connect(mapStateToProps, mapDispatchToProps)(Employees);

export default EmployeesContainer;