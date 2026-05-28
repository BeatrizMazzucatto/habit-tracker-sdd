## 1. Refinamento da HomeScreen

- [ ] 1.1 Atualizar o cabeçalho para exibir a data em pt-BR e o progresso numérico (X/Y feitos).
- [ ] 1.2 Implementar o seletor visual de progresso (anel ou barra) conforme o design.
- [ ] 1.3 Garantir que o estado `hydrated` do store seja respeitado para evitar flashes de conteúdo vazio.

## 2. Componentes e Interação

- [ ] 2.1 Verificar e ajustar o `HabitCard` para lidar corretamente com o callback de toggle.
- [ ] 2.2 Integrar o `AddHabitModal` com o FAB (Floating Action Button) na tela principal.
- [ ] 2.3 Implementar o feedback visual de lista vazia (Empty State) com orientações para o usuário.

## 3. Persistência e Validação

- [ ] 3.1 Validar se as alterações de conclusão (toggle) são persistidas corretamente no AsyncStorage.
- [ ] 3.2 Realizar testes manuais de fluxo completo: criar hábito -> marcar como concluído -> fechar app -> abrir app e verificar persistência.
