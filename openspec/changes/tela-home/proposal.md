## Why

Atualmente, o aplicativo possui uma tela inicial básica. Esta mudança visa consolidar a funcionalidade da "Home Screen" como a central de controle diário do usuário, proporcionando uma visão clara do progresso do dia e permitindo interações rápidas para manter a consistência dos hábitos.

## What Changes

- Refatoração/Aprimoramento da `HomeScreen` para exibir uma lista de hábitos filtrada para o dia atual.
- Implementação de um contador de progresso visual (X de Y hábitos concluídos) no cabeçalho.
- Integração de checkboxes funcionais em cada item da lista para marcar/desmarcar conclusão.
- Adição de um botão de ação flutuante (FAB) para navegar até a tela de criação de novos hábitos.
- Persistência local garantida via `AsyncStorage` (já existente no store, mas validando a integração na Home).

## Capabilities

### New Capabilities
- `home-screen`: Implementação completa da interface da tela principal, incluindo o contador de progresso e a lista interativa de hábitos.

### Modified Capabilities
- `habit-list`: Atualização dos requisitos de visualização para incluir o estado de conclusão em tempo real e o feedback visual de progresso diário.

## Impact

- `app/index.tsx`: Principal arquivo afetado, onde a lógica de exibição e o contador de progresso residem.
- `store/habitStore.ts`: Utilização intensiva dos métodos `toggleToday` e `getHabitsWithStats`.
- `components/HabitCard.tsx`: Verificação da responsividade ao toggle e exibição correta do estado de "concluído hoje".
- `types/index.ts`: Nenhuma mudança estrutural esperada, mas será a referência para os dados.
