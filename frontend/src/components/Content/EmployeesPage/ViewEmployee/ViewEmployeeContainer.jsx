import { connect } from "react-redux";
import ViewEmployee from "./ViewEmployee";

import { useParams } from "react-router-dom";
import { fetchCurrnetEmployee } from "../../../../redux/employeesReducer";


function mapStateToProps(state) {
  return {
    employee: state.employee.currentEmployee
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchCurrnetEmployee: (employeeId) => dispatch(fetchCurrnetEmployee(employeeId)),
  };
}

function withParams(Component) {
  return (props) => {
    const params = useParams();
    return <Component {...props} employeeId={params.employeeId} />;
  };
}

const ViewEmployeeContainer = connect(mapStateToProps, mapDispatchToProps)(ViewEmployee);

export default withParams(ViewEmployeeContainer);