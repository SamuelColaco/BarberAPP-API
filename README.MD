# ✂️ BarberAPP-API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Docker](https://img.shields.io/badge/Docker-✅-blue)

**BarberAPP-API** é uma API de agendamentos de serviços para barbearia, desenvolvida com **Node.js** junto de **TypeScript** e **Express** utilizando princípios da **Clean Architecture** e **SOLID**. A aplicação oferece funções de agendamento de serviços para barbearias, com envio de notificação por e-mail utilizando a biblioteca **NodeMailer**.

## 📌 Funcionalidades

- Criação de usuários (cliente ou barbeiro)
- Listagem de serviços cadastrados por barbeiros
- Criação de agendamentos com verificação de horário e disponibilidade
- Envio de e-mail confirmando agendamento

---

## 📁 Estrutura do Projeto

```
.
├── app/              
│   └── src/
│       ├── domain/
│       │   ├── entities/
|       |   ├── enums/
│       │   ├── interfaces/
│       │   └── repositories/
│       ├── infra/
│       │   ├──providers/
|       |   ├──http/
|       |      ├──controllers/
|       |      ├──middleware/
|       |      └──routes/ 
│       │   ├──mappers/
|       |   └──providers/
|       |       ├──hash/
|       |       ├──jwt/
|       |       └──mail/
│       ├── test/
|       ├── types/       
│       ├── useCase/
|       |   ├──AppointmentUseCase/
|       |   ├──ServiceUseCase/
|       |   ├──SessionUseCase/
|       |   └──UserUseCase/
│       ├── utils/
│       ├── app.ts
|       ├── env.ts
|       ├── prisma.ts
│       └── server.ts
```

---

## 🚀 Tecnologias

### Backend

- **Node.js + TypeScript + ExpressJs**
- **NodeMailer**
- **Prisma**
- **JWT**
- **Zod**
- **Jest**
- **Clean Architecture / SOLID**
- **Bcrypt**
- **Docker**

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Backend

#### Passos para Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/SamuelColaco/BarberAPP-API.git

2. **Ir para o Diretório**
    ```bash
    cd BarberAPP-API
    
3. **Instalar as Dependências**
    ```bash
    npm install

4. **Crie um arquivo .env na raiz do projeto**
    E coloque nele essas variáveis de ambiente

    DATABASE_URL="escreva a url do banco de dados aqui (postgresql://user:password@db:5432/refund)"

    AUTH_SECRET="Escreva seu secret aqui"

    SMTP_SERVICE="Escreva o serviço SMTP aqui"

    SMTP_USER="Escreva o email de usuario do serviço"

    SMTP_PASS="Escreva a senha de app aqui"

5. **Rode o Servidor**
    ```bash
    npm run dev
    'O servidor estará disponível em http://localhost:3333'


## Docker

- **Comando para rodar o docker-compose**
    ```docker
    docker-compose up -d
- **Comando para verificar o container rodando**
    ```docker
    docker ps ou docker-compose ps
- **Comando para parar o container**
    ```docker
    docker-compose down

---

## 🧱 Entidades

### 🧍‍♂️ User

Usuários podem ser clientes ou barbeiros.

Campos obrigatórios:
- `name`: string
- `email`: string (único)
- `passwordHash`: string
- `role`: Enum("client" ou "barber")

### 🔐 Services

Os serviços disponiveis e seus respectivos preços.

Campos obrigatórios:
- `barberId`: string(referencia o barbeiro que faz o serviço)
- `name`: string
- `price`: number 

### 💸 Appointment

Realiza agendamentos de serviços entre um cliente e um barbeiro

Campos obrigatórios:
- `clientId`: ID do cliente
- `barberId`: ID do barbeiro
- `serviceId`: ID do serviço
- `date`: data marcada do serviço(Data no formato UTC)
- `hour`: hora do serviço(string)
- `status`: Enum("pending", "completed" ou "cancelled") 

---


---

## 📚 Arquitetura (Backend)

- `domain/entities` → Entidades de negócio (ex: `User`)
- `domain/interfaces` → Contratos para serviços e repositórios
- `domain/repositories` → Interfaces para acesso a dados
- `domain/enums` → Enums de contrato com entidades
- `infra/providers` → Serviços como hash e tokens
- `infra/http` → Controllers e rotas estão aqui
- `test` → Arquivos com os testes da API
- `utils` → Pasta com arquivo de erro personalizado  
- `useCase` → Casos de uso (ex: login, agendamento)

---

---
