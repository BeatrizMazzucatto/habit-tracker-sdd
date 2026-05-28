# home-screen Specification

## Purpose
TBD - created by archiving change tela-home. Update Purpose after archive.
## Requirements
### Requirement: Progresso Diário Visual
A tela Home SHALL exibir no cabeçalho a contagem de hábitos concluídos em relação ao total de hábitos ativos para o dia (ex: "3/5 feitos").

#### Scenario: Visualização do cabeçalho com hábitos
- **WHEN** a tela Home é carregada com 5 hábitos cadastrados e 2 marcados como feitos
- **THEN** o texto de progresso deve exibir "2/5 feitos"

#### Scenario: Visualização do cabeçalho sem hábitos
- **WHEN** a tela Home é carregada e não há hábitos cadastrados
- **THEN** o texto de progresso deve exibir "Começar"

### Requirement: Lista de Hábitos Interativa
A tela Home SHALL listar todos os hábitos ativos, permitindo que o usuário marque ou desmarque a conclusão de cada um diretamente na lista.

#### Scenario: Marcar hábito como concluído
- **WHEN** o usuário toca no botão de conclusão de um hábito não concluído
- **THEN** o hábito deve ser marcado como concluído para o dia atual e o contador de progresso deve ser incrementado

#### Scenario: Desmarcar hábito concluído
- **WHEN** o usuário toca no botão de conclusão de um hábito já concluído
- **THEN** o hábito deve voltar para o estado não concluído e o contador de progresso deve ser decrementado

### Requirement: Navegação para Criação
A tela Home SHALL possuir um botão de ação flutuante (FAB) que, ao ser clicado, abre o fluxo de criação de um novo hábito.

#### Scenario: Clicar no FAB
- **WHEN** o usuário toca no botão "+" (FAB)
- **THEN** o modal de adição de hábito deve ser exibido na tela

