import { StyleSheet, Text, View } from 'react-native';

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
};

export default function Card({ todo }: Props) {
  return (
    <View style={[styles.card, todo.completed && styles.cardCompleted]}>
      <View style={styles.header}>
        <Text style={styles.title}>{todo.title}</Text>
        <View style={[styles.badge, todo.completed ? styles.badgeDone : styles.badgePending]}>
          <Text style={styles.badgeText}>{todo.completed ? 'Done' : 'Pending'}</Text>
        </View>
      </View>
      {todo.description ? (
        <Text style={styles.description}>{todo.description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#ffd33d',
  },
  cardCompleted: {
    borderLeftColor: '#4caf50',
    opacity: 0.75,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgePending: {
    backgroundColor: '#fff3cd',
  },
  badgeDone: {
    backgroundColor: '#d4edda',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1a1a1a',
  },
});
