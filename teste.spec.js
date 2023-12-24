import { Usuario, gerenciamentoUsuarios, validarEmail, validarSenha } from './script.js';

describe('Testes CRUD do sistema de Gerenciamento de Usuários, Cenários de sucesso', () => {
    gerenciamentoUsuarios

    let administrador = new Usuario(
      'Vinicius',
      'dev@gmail.com',
      'Viniadmin@123',
      [true, true, true, true]
    );

  it('Login do administrador, cenário de sucesso', () => { 
    const login = administrador.Login('dev@gmail.com', 'Viniadmin@123');
    expect(login).toEqual("Login efetuado com sucesso")
  });

  it('Cadastro de um usúario sem permissões, cenário de sucesso', () => {
    const cadastro = administrador.cadastrarUsuario('Daniel Monteiro', 'Daniel@gmail.com', 'Daniel123@', [null, null, null, null])
    expect(cadastro).toEqual("Usuário cadastrado com sucesso")
  })

  it('Deve atualizar algum dado do usuário cadastrado acima, cenário de sucesso', () => {
    const atualizar = administrador.atualizarUsuario(1, 'Danielzao', null, null, null, null)
    expect(atualizar).toEqual("Usuário atualizado com sucesso");
  })

  it('Deve listar todos os usuários cadastrados, cenário de sucesso', () => {
    const listar = administrador.listarUsuarios()
    expect(listar).toEqual('Usúarios listados com sucesso');
  })

  it('Deve deletar o usuário cadastrado acima, cenário de sucesso', () => {
    const deletar = administrador.deletarUsuario(1)
    expect(deletar).toEqual('Usuário deletado com sucesso')
  })

}); 

describe('Testes CRUD do sistema de Gerenciamento de Usuários, Cenários de sucesso', () => {

    gerenciamentoUsuarios

    let administrador = new Usuario(
        'Vinicius',
        'dev@gmail.com',
        'Viniadmin@123',
        [true, true, true, true]
      );

    let administradorErro = new Usuario(
      'Vinicius',
      'devgmail.com',
      'Viniadmin23',
      [true, true, true, true]
    );

    it('Login do administrador, cenário de insucesso', () => { 
        const login = administradorErro.Login('devgmail.com', 'Viniadmin23');
        expect(login).toEqual("Erro ao efetuar login, tente novamente")
      });
    
      it('Cadastro de um usúario sem permissões, cenário de insucesso', () => {
        const cadastro = administradorErro.cadastrarUsuario('Daniel Monteiro', 'Daniel@gmail.com', [null, null, null, null])
        expect(cadastro).toEqual("Houve um erro ao tentar cadastrar o usuário, tente novamente")
      })
    
      it('Deve atualizar algum dado do usuário cadastrado acima, cenário de sucesso', () => {
        const atualizar = administradorErro.atualizarUsuario()
        expect(atualizar).toEqual("Usuário não encontrado");
      })
    
      it('Deve listar todos os usuários cadastrados, cenário de sucesso', () => {
        const listar = administradorErro.listarUsuarios()
        expect(listar).toEqual('Não há usuários cadastrados');
      })
    
      it('Deve deletar o usuário cadastrado acima, cenário de sucesso', () => {
        const deletar = administradorErro.deletarUsuario(1)
        expect(deletar).toEqual('Usuário não encontrado');
      })
});


describe('Deve testar validações de e-mail e senha', () => {

  it('Deve retornar uma mensagem de erro da senha errada', () => {
    
    const senha = 'senhaErro'
    const senhaInvalida = validarSenha(senha);
    expect(senhaInvalida).toEqual('Senha inválida, tente novamente')
  })

  it('Deve retornar uma mensagem de sucesso para a senha correto', () => {
    const senha = 'SenhaCorreta@123'
    const senhaValida = validarSenha(senha);
    expect(senhaValida).toEqual('Senha válida')
  })

  it('Deve retornar uma mensagem de erro de um e-mail errado', () => {
    
    const email = 'email.com'
    const emailInvalido = validarEmail(email);
    expect(emailInvalido).toEqual(false)
  })

  it('Deve retornar uma mensagem de sucesso de um e-mail correto', () => {
    
    const email = 'emailcorreto@gmail.com'
    const emailValido = validarEmail(email);
    expect(emailValido).toEqual(true)
  })
})