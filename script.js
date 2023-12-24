
let gerenciamentoUsuarios = [];

//Função para validar E-mail
function validarEmail(email) {
    let emailValido = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailValido.test(email);
}

//Função para validar Senha
function validarSenha(senha) {
    let senhaValida = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
    if (!senhaValida.test(senha)) {
        return 'Senha inválida, tente novamente' //Return utilizado para teste
    } 
    return 'Senha válida' //Return utilizado para teste
}

class Usuario {
    constructor(nome, email, senha, permissao_admin = []) {

        const senhaValida = validarSenha(senha);
        if (!senhaValida) {
            console.log("Senha inválida, tente novamente");
            return 'Senha inválida, tente novamente';
        }

        const emailValido = validarEmail(email);
        if (!emailValido) {
            console.log("E-mail inválido, insira um e-mail válido");
            return;
        }

        const emailExistente = gerenciamentoUsuarios.find((usuario) => usuario.email === email);
        if (emailExistente) {
            console.log("E-mail já existe, tente outro");
            return 'E-mail já existe, tente outro';
        }

        const [verbo_post, verbo_get, verbo_delete, verbo_put] = permissao_admin;

        this.id = gerenciamentoUsuarios.length + 1;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataCriacao = new Date();
        this.login = null;
        this.ativo = true;
        this.verbo_post = verbo_post ? this.cadastrarUsuario : () => console.log('Você não tem permissão para cadastrar um novo usuário');
        this.verbo_get = verbo_get ? this.listarUsuarios : () => console.log('Você não tem permissão para listar os usuários');
        this.verbo_delete = verbo_delete ? this.deletarUsuario : () => console.log('Você não tem permissão para deletar esse usuário');
        this.verbo_put = verbo_put ? this.atualizarUsuario : () => console.log('Você não tem permissão para deletar esse usuário');

        const usuario = {
            id: this.id,
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            dataCriacao: this.dataCriacao,
            login: this.login,
            ativo: this.ativo,
            verbo_post: permissao_admin[0],
            verbo_get: permissao_admin[1],
            verbo_put: permissao_admin[2],
            verbo_delete: permissao_admin[3]
        };

        gerenciamentoUsuarios.push(usuario);
    }


    //Método para cadastrar usuário
    cadastrarUsuario(nome, email, senha, permissao_admin) {
        if (this.ativo === true) {

            const usuario = new Usuario(
                nome,
                email,
                senha,
                permissao_admin
            );

            console.log(`Usuário ${usuario.nome} cadastrado com sucesso`);
            return 'Usuário cadastrado com sucesso'; //Return utilizado para teste
        } else {
            console.log('Ocorreu um erro ao cadastrar o usuário');
            return 'Houve um erro ao tentar cadastrar o usuário, tente novamente' //Return utilizado para teste
        }
        
    }

    //Método para listar usuários
    listarUsuarios() {
        if(this.ativo === true) {
        console.log("Esses são os seguintes usuários cadastrados:");
        gerenciamentoUsuarios.forEach((usuario) => {
            console.log(
                `Nome: ${usuario.nome}, E-mail: ${usuario.email}`
            );           
        });
        return 'Usúarios listados com sucesso' //Return utilizado para teste
        } else{
            console.log("Não há usuários cadastrados.");
            return 'Não há usuários cadastrados'; //Return utilizado para teste
        }  
    }

    //Método para deletar usuário
    deletarUsuario(id) {
        const usuarioDeletado = gerenciamentoUsuarios.find((usuario) => {
            return usuario.id === id;
        });

        if (usuarioDeletado) {
            gerenciamentoUsuarios = gerenciamentoUsuarios.filter((usuario) => {
                return usuario.id !== id;
        
            })
            console.log(`O usuário ${usuarioDeletado.nome} foi deletado com sucesso`);
            return 'Usuário deletado com sucesso' //Return utilizado para teste
           
        } else {
            console.log("O usuário não foi encontrado");
            return 'Usuário não encontrado' //Return utilizado para teste
        }
    }

    //Método para atualizar usuário com base no ID
    atualizarUsuario(id, nomeAtualizado, emailAtualizado, senhaAtualizada, novoAtivo, novoPermissao_admin) {
        const usuarioAtualizado = gerenciamentoUsuarios.find(
            usuario => usuario.id === id);

        if (!usuarioAtualizado) {
            console.log('Usuário não encontrado');
            return 'Usuário não encontrado'; //Return utilizado para teste
        }

        if (nomeAtualizado) {
            usuarioAtualizado.nome = nomeAtualizado;
        }

        if (emailAtualizado) {
            usuarioAtualizado.email = emailAtualizado;
        }

        if (senhaAtualizada) {
            usuarioAtualizado.senha = senhaAtualizada;
        }

        if (novoAtivo !== undefined) {
            usuarioAtualizado.ativo = novoAtivo;
        }

        if (novoPermissao_admin) {
            usuarioAtualizado.novoPermissao_admin = novoPermissao_admin;
        }

        return 'Usuário atualizado com sucesso'; //Return utilizado para teste

    }

    //Método para atualizar status de atividade
    atualizarStatus(id, alterarAtivo) {
        const statusAtivo = gerenciamentoUsuarios.find(
            usuario => usuario.id === id);

            if(!statusAtivo) {
                console.log('Usuário não encontrado');
                return;
            }
            
            if(alterarAtivo === true){
                statusAtivo.ativo = alterarAtivo
            } else if (alterarAtivo === false) {
                statusAtivo.ativo = alterarAtivo
            }
    }

    //Método de Login
    Login(email, senha) {
        const login = gerenciamentoUsuarios.find((usuario) => usuario.email);
        

        if(login && login.senha) {
            login.login = new Date();
           
            return 'Login efetuado com sucesso'; //Return utilizado para teste
            
        } else {
           console.log('E-mail ou senha incorretos, tente novamente')
           return 'Erro ao efetuar login, tente novamente'; //Return utilizado para teste
        }
    }

    //Método de Logout
    Logout(id) {
        const logout = gerenciamentoUsuarios.find((usuario) => usuario.id === id);

        if(logout){
            logout.login == null;
            return (
                console.log('Logout feito com sucesso')
            )
        } else {
            console.log('Usuário não encontrado ou não está logado')
        }
    }
}

export { Usuario, gerenciamentoUsuarios, validarEmail, validarSenha };