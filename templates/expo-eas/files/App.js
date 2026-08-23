import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const notes = [
  { day: "TODAY", title: "Make the first screen useful", accent: "#C7E86B" },
  { day: "FRI", title: "Test the preview build", accent: "#F6A68A" },
  { day: "MON", title: "Share with the team", accent: "#8EC9EE" }
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>{{displayName}}</Text>
            <Text style={styles.title}>Good morning.</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>FN</Text>
          </View>
        </View>

        <View style={styles.focus}>
          <Text style={styles.focusLabel}>TODAY'S FOCUS</Text>
          <Text style={styles.focusTitle}>Turn one clear idea into a working release.</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>3 of 5 steps complete</Text>
        </View>

        <Text style={styles.sectionTitle}>Next notes</Text>
        <View style={styles.noteList}>
          {notes.map((note) => (
            <View key={note.title} style={styles.note}>
              <View style={[styles.noteMarker, { backgroundColor: note.accent }]} />
              <Text style={styles.noteDay}>{note.day}</Text>
              <Text style={styles.noteTitle}>{note.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F0E8"
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 38
  },
  eyebrow: {
    color: "#66706A",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  title: {
    marginTop: 5,
    color: "#141A17",
    fontFamily: "serif",
    fontSize: 34,
    fontWeight: "600"
  },
  avatar: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#14221C"
  },
  avatarText: {
    color: "#D9FF63",
    fontSize: 12,
    fontWeight: "800"
  },
  focus: {
    minHeight: 270,
    justifyContent: "flex-end",
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#14221C"
  },
  focusLabel: {
    marginBottom: 18,
    color: "#D9FF63",
    fontSize: 11,
    fontWeight: "800"
  },
  focusTitle: {
    maxWidth: 290,
    marginBottom: 30,
    color: "#F5F6EF",
    fontFamily: "serif",
    fontSize: 30,
    lineHeight: 36
  },
  progressTrack: {
    height: 5,
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: "#35443D"
  },
  progressFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#D9FF63"
  },
  progressText: {
    marginTop: 10,
    color: "#9FAAA4",
    fontSize: 12
  },
  sectionTitle: {
    marginTop: 34,
    marginBottom: 12,
    color: "#141A17",
    fontSize: 16,
    fontWeight: "700"
  },
  noteList: {
    borderTopWidth: 1,
    borderTopColor: "#CFD1C8"
  },
  note: {
    minHeight: 74,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CFD1C8"
  },
  noteMarker: {
    width: 10,
    height: 38,
    marginRight: 14,
    borderRadius: 3
  },
  noteDay: {
    width: 54,
    color: "#6A746E",
    fontSize: 10,
    fontWeight: "800"
  },
  noteTitle: {
    flex: 1,
    color: "#202723",
    fontSize: 15,
    fontWeight: "600"
  }
});
