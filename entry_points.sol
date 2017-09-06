pragma solidity ^0.4.0;

contract SistemaDePonto {

    struct Funcionario {
        address addressFuncionario;
        uint horaEntrada;
        uint horaSaida;
    }

    struct Registro {
        address addressFuncionario;
        uint horario;
        /*
        TABELA REPRESENTATIVA: "status"
          true = ENTRADA;
          false = SAÍDA;
        */
        bool status;
    }

    address private administrador;
    uint count;
    mapping (address => Funcionario) private funcionarios;
    //mapping (address => Registro[]) public registros;
    Registro[] registros;

    function SistemaDePonto(){
        administrador = msg.sender;
    }

    function getAdministrador() returns(address _administrador) {
        return administrador;
    }

    function criarFuncionario(address _addressFuncionario,uint _horaEntrada,uint _horaSaida){
        //Somente o Administrador pode criar novos Funcionários
        require(getAdministrador()==msg.sender);
        //Se não é o primeiro Funcionário a ser add
        if(count > 0){
            //Não pode ser criado um novo Funcionário com o mesmo endereço
            require(funcionarios[_addressFuncionario].addressFuncionario!=_addressFuncionario);
        }
        //Caso tudo esteja OK add o novo Funcionário
        funcionarios[_addressFuncionario] = Funcionario(_addressFuncionario,_horaEntrada,_horaSaida);
        //Aumenta a quantidade de usuários add
        count++;
    }

    function baterPonto(address _addressFuncionario,uint _horario,bool _status){
        //Administrador não bate ponto
        require(getAdministrador() != msg.sender);
        //Somente Funcionário cadastrado bate o ponto
        require(funcionarios[msg.sender].horaEntrada > 0);
        //Se tiver sido cadastrado pelo menos um Registro de Ponto
        if(registros.length > 0){
            //Não se pode bater uma entrada seguida de outra entrada e nem uma saída logo após outra saída
            require(registros[registros.length-1].status != _status);
        }
        registros.push(Registro(_addressFuncionario,_horario,_status));
    }

    function getFuncionario(address _addressFuncionario) returns(uint _horaEntrada,uint _horaSaida){
        return (funcionarios[_addressFuncionario].horaEntrada,funcionarios[_addressFuncionario].horaSaida);
    }

    function getRegistros() returns(uint _horario){
        for(uint i=0;i<registros.length;i++){
            return registros[i].horario;
        }
    }

}
