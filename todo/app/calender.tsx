import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import Card from '@/components/card';
import AddTodoModal from '@/components/AddTodoModal';

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch('http://localhost:3000/todos');
  if (!res.ok) throw new Error('Failed to load todos');
  return res.json();
}

async function createTodo(data: { title: string; description: string }): Promise<Todo> {
  const res = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, completed: false }),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
}

export default function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const { mutate: addTodo } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  function handleAddTodo(data: { title: string; description: string }) {
    addTodo(data);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Todos</Text>
      {isLoading && <ActivityIndicator size="large" color="#ffd33d" />}
      {isError && <Text style={styles.error}>Failed to load todos</Text>}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card todo={item} />}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+ Add Todo</Text>
      </TouchableOpacity>

      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 100,
  },
  error: {
    color: '#d32f2f',
    marginBottom: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    backgroundColor: '#ffd33d',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});
