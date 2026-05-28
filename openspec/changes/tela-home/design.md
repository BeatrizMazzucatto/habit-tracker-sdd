## Context

O aplicativo de rastreamento de hábitos atualmente possui uma estrutura básica com Zustand para gerenciamento de estado e AsyncStorage para persistência. A `HomeScreen` já existe, mas precisa de refinamentos visuais e funcionais para se tornar a peça central da experiência do usuário, focando no progresso diário.

## Goals / Non-Goals

**Goals:**
- Prover um cabeçalho informativo com data e progresso numérico (X/Y).
- Implementar uma lista de hábitos que permite marcar a conclusão sem sair da tela.
- Fornecer feedback visual imediato ao completar um hábito (atualização do contador e animação de checkbox).
- Garantir que os dados persistam após o fechamento do app.

**Non-Goals:**
- Implementar visualizações históricas detalhadas (gráficos de barras, etc.) nesta etapa.
- Adicionar sincronização com nuvem ou backend.
- Refatorar o sistema de navegação Expo Router.

## Decisions

- **Uso do Zustand Hook `getHabitsWithStats`**: Optamos por usar este seletor existente no store para derivar os dados de conclusão de hoje. Isso centraliza a lógica de "o que é considerado concluído hoje" no store, mantendo o componente da UI limpo.
- **Botão Flutuante (FAB) para Adição**: Utilizar um FAB posicionado no canto inferior direito, seguindo padrões de design móvel, para facilitar a entrada de novos hábitos.
- **Interface em Português (pt-BR)**: Toda a interface visível ao usuário será em português, utilizando `date-fns` para formatação da data local.
- **Componentização do HabitCard**: Manter o `HabitCard` como um componente puro que recebe callbacks (`onToggle`, `onDelete`), facilitando testes e reutilização.

## Risks / Trade-offs

- **[Risco] Sobrescrita de AsyncStorage** → Mitigação: O store já utiliza uma flag `hydrated` para evitar salvar o estado inicial vazio antes que os dados sejam carregados do disco.
- **[Risco] Performance com Listas Longas** → Mitigação: Como o número de hábitos diários de um usuário médio é baixo (< 20), o uso de `ScrollView` simples é suficiente e mais simples que `FlatList` para este caso de uso inicial.
