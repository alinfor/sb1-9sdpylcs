import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getSessionById } from '@/utils/mockData';
import { CalendarClock, MapPin, User, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import ParticipantList from '@/components/ParticipantList';

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const sessionData = getSessionById(id);
      if (sessionData) {
        setSession(sessionData);
        setParticipants(sessionData.participants);
      } else {
        setError('Session non trouvée');
      }
    } catch (err) {
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateAttendance = (participantId, isPresent) => {
    setParticipants(
      participants.map(p => 
        p.id === participantId ? { ...p, present: isPresent } : p
      )
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error || !session) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Session non trouvée'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const presentCount = participants.filter(p => p.present).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.sessionTitle}>{session.title}</Text>
        <View style={styles.sessionType}>
          <Text style={styles.sessionTypeText}>{session.type}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <CalendarClock size={18} color="#64748B" />
          <Text style={styles.infoText}>{session.date}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={18} color="#64748B" />
          <Text style={styles.infoText}>{session.lieu}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <User size={18} color="#64748B" />
          <Text style={styles.infoText}>Formateur: {session.formateur}</Text>
        </View>
      </View>

      <View style={styles.presenceCard}>
        <View style={styles.presenceHeader}>
          <Text style={styles.sectionTitle}>Présences</Text>
          <View style={styles.presenceBadge}>
            <CheckCircle2 size={14} color="#22C55E" />
            <Text style={styles.presenceBadgeText}>
              {presentCount}/{participants.length}
            </Text>
          </View>
        </View>
        
        <Text style={styles.presenceDescription}>
          Cochez les cases pour marquer les participants comme présents
        </Text>
      </View>

      <ParticipantList 
        participants={participants} 
        onToggleAttendance={updateAttendance} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerSection: {
    marginBottom: 16,
  },
  sessionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  sessionType: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  sessionTypeText: {
    fontSize: 14,
    color: '#3B82F6',
    fontFamily: 'Inter-SemiBold',
  },
  infoCard: {
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#1E293B',
    marginLeft: 10,
    fontFamily: 'Inter-Regular',
  },
  presenceCard: {
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
  presenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  presenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  presenceBadgeText: {
    fontSize: 14,
    color: '#22C55E',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  presenceDescription: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});