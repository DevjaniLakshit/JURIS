import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
  },
  themeBtn: { position: 'absolute', top: 20, right: 24, zIndex: 2 },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { marginTop: 20, textAlign: 'center' },
  subtitle: { marginTop: 6, textAlign: 'center', maxWidth: 280 },
  formError: { marginBottom: 16 },
  label: { marginBottom: 6 },
  fieldError: { marginTop: 6 },
  eye: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  forgot: { alignSelf: 'flex-end', marginTop: 12, marginBottom: 24 },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 20,
  },
  orText: { marginHorizontal: 4 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  disclaimer: { textAlign: 'center', marginTop: 20 },
});

export default styles;
