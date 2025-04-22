import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CalendarClock, Users } from 'lucide-react-native';
import { getSessions } from '@/utils/mockData';

export default function SessionsScreen() {
  const router = useRouter();
  const [sessions] = useState(getSessions());

  const navigateToSessionDetails = (sessionId: string) => {
    router.push(`/session/${sessionId}`);
  };

  const renderSessionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => navigateToSessionDetails(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionTitle}>{item.title}</Text>
        <View style={styles.sessionBadge}>
          <Text style={styles.sessionBadgeText}>{item.type}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <CalendarClock size={16} color="#64748B" />
        <Text style={styles.infoText}>{item.date}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.sessionFooter}>
        <View style={styles.infoRow}>
          <Users size={16} color="#64748B" />
          <Text style={styles.infoText}>
            {item.participants.length} participants
          </Text>
        </View>
        <Text style={styles.formateur}>
          {item.formateur}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Sessions de Formation</Text>
      </View>

      <FlatList
        data={sessions}
        renderItem={renderSessionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  sessionBadge: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sessionBadgeText: {
    fontSize: 12,
    color: '#3B82F6',
    fontFamily: 'Inter-SemiBold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  sessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formateur: {
    fontSize: 14,
    color: '#3B82F6',
    fontFamily: 'Inter-SemiBold',
  },
});