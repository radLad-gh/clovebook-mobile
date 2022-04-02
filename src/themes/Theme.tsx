import { StyleSheet } from 'react-native';

export const colors = {
    background: '#e2ddf9',
    accent: '#0c2245ff',
    panel: '#bdaed4',
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    discover: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeScreen: {
        backgroundColor: colors.background,
        justifyContent: 'flex-start', 
        alignItems: 'center'   
    },
    searchBar: {
        top: 0,
        marginTop: 15,
    },
    card: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        backgroundColor: colors.panel,
        marginTop: 15,
        elevation: 3,
    }
});

export default styles;