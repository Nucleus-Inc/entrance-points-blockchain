pragma solidity ^0.4.11;

contract EntrancePoints {

    struct Employee {
        address employee_id;
        bytes8 time_input;
        bytes8 time_output;
    }

    struct Record {
        address employee_id;
        bytes8 time;
        bytes16 date;
        bool status;
    }

    address private administrator;
    bool private is_empty;
    
    mapping (address => Employee) private employees;
    mapping (address => mapping(uint => Record)) private records;
    mapping (address => uint) private position;
    
    event EmployeeCreateEvent(address _employee_id,bytes8 _time_input,bytes8 _time_output,uint _code);
    event RecordEvent(address _employee_id,bytes8 _time,bytes16 _date,bool _status,uint _code);
    event RecordDeleteEvent(address _employee_id,uint _code);
    event EmployeeDeleteEvent(address _employee_id,uint _code);
    
    function EntrancePoints(){
        administrator = msg.sender;
        is_empty = true;
    }
    
    function getAdministrator() constant returns(address _administrator) {
        return administrator;
    }
    
    function getHours(address _employee_id) constant returns(bytes8 _time_input,bytes8 time_output){
        return (employees[_employee_id].time_input,employees[_employee_id].time_output);
    }
    
    function getLastPosition(address _employee_id) constant returns(uint _position){
        return (position[_employee_id]);
    }
    
    function getLastRecord(address _employee_id) constant returns(bytes8 _time,bytes16 _date,bool _status){
        return (records[_employee_id][position[_employee_id]-1].time,records[_employee_id][position[_employee_id]-1].date,records[_employee_id][position[_employee_id]-1].status);
    }
    
    function createEmployee(address _employee_id,bytes8 _time_input,bytes8 _time_output) returns(uint _code) {
        require(administrator==msg.sender);
        if(!is_empty)
            require(employees[_employee_id].employee_id!=_employee_id);
        employees[_employee_id] = Employee(_employee_id,_time_input,_time_output);
        position[_employee_id] = 0;
        is_empty = false;
        EmployeeCreateEvent(_employee_id,_time_input,_time_output,200);
        return 200;
    }
    
    function record(address _employee_id,bytes8 _time,bytes16 _date,bool _status) returns(uint _code) {
        require(administrator!=msg.sender);
        require(employees[_employee_id].employee_id>0);
        require(msg.sender==_employee_id);
        records[_employee_id][position[_employee_id]]=Record(_employee_id,_time,_date,_status);
        position[_employee_id]+=1;
        RecordEvent(_employee_id,_time,_date,_status,200);
        return 200;
    }

    function recordDelete(address _employee_id) returns(uint _code){
        require(administrator==msg.sender);
        delete position[_employee_id];
        RecordDeleteEvent(_employee_id,200);
        return 200;
    }
    
    function employeeDelete(address _employee_id) returns(uint _code){
        require(administrator==msg.sender);
        delete employees[_employee_id];
        EmployeeDeleteEvent(_employee_id,200);
        return 200;
    }

}
