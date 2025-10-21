# App

# GymPass style app

## RF (requisitos funcionais)
[x] Deve ser possível se cadastrar;
[x] Deve ser possível se autenticar;
[ ] Deve ser possível obter o perfil de um usuário logado;
[ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
[ ] Deve ser possível o usuário obter seu histórico de check-ins;
[ ] Deve ser possível o usuário buscar academias próximas;
[ ] Deve ser possível o usuário buscar academias pelo nome;
[x] Deve ser possível o usuário realizar check-in em uma academia;
[ ] Deve ser possível validar o check-in de um usuário;
[x] Deve ser possível cadastrar uma academia;

## RNs (regras de negócio) (a regra de negócio sempre estará associada a um requisito funcional)
[x] O usuário não deve cadastrar com um e-mail duplicado;
[x] O usuário não deve fazer 2 check-ins no mesmo dia;
[x] O usuário não deve fazer check-in se não estiver perto (100m) da academia;
[ ] O check-in só pode ser validado até 20min após ser feito;
[ ] O check-in só pode ser validado por administradores;
[ ] A academia só pode ser cadastrada por administradores;

## RNFs (requisitos não-funcionais) (o cliente não tem controle, é muito mais técnico do que funcionalidades)
[x] A senha do usuário precisa estar criptografada;
[x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
[ ] Todas as listas de dados precisam estar paginados com 20 itens por página;
[ ] O usuário deve ser identificado por um JWt (JSON Web Token);

## Testes
[ ] Validar se usuário está sendo criado com sucesso
[ ] Validar que usuário não pode se cadastrar com e-mail duplicado
[ ] Validar se está sendo gerado hash da senha