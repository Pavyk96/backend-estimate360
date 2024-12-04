import { connect } from "react-redux";
import Employees from "./Employees";


function mapStateToProps(state, ownProps) {
  return {
    
  };
}

function mapDispatchToProps(dispatch){
  return {
    
  };
}


const EmployeesContainer = connect(mapStateToProps, mapDispatchToProps)(Employees);

export default EmployeesContainer;