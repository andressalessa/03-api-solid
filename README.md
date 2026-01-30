# App

# GymPass style app

## RF (requisitos funcionais)
[x] Deve ser possível se cadastrar;<br>
[x] Deve ser possível se autenticar;<br>
[x] Deve ser possível obter o perfil de um usuário logado;<br>
[x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;<br>
[x] Deve ser possível o usuário obter seu histórico de check-ins;<br>
[x] Deve ser possível o usuário buscar academias próximas (até 10km);<br>
[x] Deve ser possível o usuário buscar academias pelo nome;<br>
[x] Deve ser possível o usuário realizar check-in em uma academia;<br>
[x] Deve ser possível validar o check-in de um usuário;<br>
[x] Deve ser possível cadastrar uma academia;

## RNs (regras de negócio) (a regra de negócio sempre estará associada a um requisito funcional)
[x] O usuário não deve cadastrar com um e-mail duplicado;<br>
[x] O usuário não deve fazer 2 check-ins no mesmo dia;<br>
[x] O usuário não deve fazer check-in se não estiver perto (100m) da academia;<br>
[x] O check-in só pode ser validado até 20min após ser feito;<br>
[ ] O check-in só pode ser validado por administradores;<br>
[ ] A academia só pode ser cadastrada por administradores;

## RNFs (requisitos não-funcionais) (o cliente não tem controle, é muito mais técnico do que funcionalidades)
[x] A senha do usuário precisa estar criptografada;<br>
[x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;<br>
[ ] Todas as listas de dados precisam estar paginados com 20 itens por página;<br>
[ ] O usuário deve ser identificado por um JWt (JSON Web Token);

## Testes
[ ] Validar se usuário está sendo criado com sucesso;<br>
[ ] Validar que usuário não pode se cadastrar com e-mail duplicado;<br>
[ ] Validar se está sendo gerado hash da senha;

# Meu passo a passo

## Autenticação
- Criar um controller chamado profile.ts que irá apenas retornar um status 200 para teste
- Em routes.ts eu crio uma nova roda chamada app.get('/me', profile), importando o controller. Todas as rotas abaixo desta, só poderão ser acessadas por um usuário autenticado.

### JWT (JSON Web Token)

Fluxo -> usuário faz login, envia e-mail/senha, o back-end cria um token único, não-modifcável e STATELESS

Stateless (sem estado) -> Não armazenado em nenhuma estrutura de persistência de dados (banco de dados).

Back-end usa uma palavra-chave (string) para gerar o token único.

JWT é composto por -> header.payload.sign

Envio email/senha e o backend com sua palavra-chave gera o token, sem guardá-lo.

```
header {
    "alg":"HS256", // algorítmo
    "typ": "JWT"
}

payload {
    "sub": "123456", // subject -> id do usuário normalmente (ou aplicação) que criou o token
    "name": "Andressa Lessa",
    "iat": 122212121
}
```

### lib @fastify/jwt
Lib responsável por validar meu token JWT.
O primeiro passo é criar um secret, que ficará nas variáveis de ambiente (a palavra de produção não deve ficar disponível nem para devs).

No app.ts foi necessário acoplar a lib ao fastify, informando qual variável de ambiente ele vai usar
```
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
```

Depois disso, alguns métodos novos ficam disponíveis em request e reply.

- O request.jwtVerify() valida se o token recebido no request é de fato quem gerou o token.
- Depois disso, a var request.user ficará disponível com os dados do usuário que fez a requisição, sendo assim possível validar o restante.
- Foi criado um middleware para que em toda requisição seja possível validar antes o acesso, bastando acrescentar à rota:
```
app.get('/me', { onRequest: [verifyJWT] }, profile)
```
- 




