import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Circle } from 'lucide-react-native';
import { useState } from 'react';

interface Participant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  present: boolean;
}

interface ParticipantListProps {
  participants: Participant[];
  onToggleAttendance: (id: string, present: boolean) => void;
}

export default function ParticipantList({ participants, onToggleAttendance }: ParticipantListProps) {
  const [selectedFilter, setSelectedFilter] = useState<'tous' | 'presents' | 'absents'>('tous');

  const filteredParticipants = participants.filter(participant => {
    if (selectedFilter === 'tous') return true;
    if (selectedFilter === 'presents') return participant.present;
    if (selectedFilter === 'absents') return !participant.present;
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'tous' && styles.filterButtonActive]}
          onPress={() => setSelectedFilter('tous')}
        >
          <Text style={[styles.filterText, selectedFilter === 'tous' && styles.filterTextActive]}>
            Tous ({participants.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'presents' && styles.filterButtonActive]}
          onPress={() => setSelectedFilter('presents')}
        >
          <Text style={[styles.filterText, selectedFilter === 'presents' && styles.filterTextActive]}>
            Présents ({participants.filter(p => p.present).length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'absents' && styles.filterButtonActive]}
          onPress={() => setSelectedFilter('absents')}
        >
          <Text style={[styles.filterText, selectedFilter === 'absents' && styles.filterTextActive]}>
            Absents ({participants.filter(p => !p.present).length})
          </Text>
        </TouchableOpacity>
      </View>

      {filteredParticipants.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Aucun participant {
              selectedFilter === 'presents' ? 'présent' : 
              selectedFilter === 'absents' ? 'absent' : ''
            }
          </Text>
        </View>
      ) : (
        filteredParticipants.map(participant => (
          <TouchableOpacity
            key={participant.id}
            style={styles.participantCard}
            onPress={() => onToggleAttendance(participant.id, !participant.present)}
            activeOpacity={0.7}
          >
            <View style={styles.participantInfo}>
              <Text style={styles.participantName}>
                {participant.prenom} {participant.nom}
              </Text>
              <Text style={styles.participantEmail}>{participant.email}</Text>
            </View>
            <View style={styles.checkboxContainer}>
              {participant.present ? (
                <CheckCircle size={24} color="#3B82F6" />
              ) : (
                <Circle size={24} color="#94A3B8" />
              )}
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#F1F5F9',
  },
  filterButtonActive: {
    backgroundColor: '#EBF5FF',
  },
  filterText: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-SemiBold',
  },
  filterTextActive: {
    color: '#3B82F6',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  emptyStateText: {
    color: '#94A3B8',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  participantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  participantEmail: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  checkboxContainer: {
    marginLeft: 16,
  },
});