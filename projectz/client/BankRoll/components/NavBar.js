
import { StyleSheet, Text, View, Link } from 'react-native';
const NavBar = () => {
    return (
        <View>
            {/* <Text>Nav Bar</Text> */}
            {/* <NavBar className="navBar">
              
            </NavBar> */}
            <Text className="bg-blue-400 h-5" >Fiance Fordge</Text>
            <View style={styles.links}>
                <Text style={styles.text} href="/">Home</Text>
                <Text style={styles.text} href="">Settings</Text>
                {/* <Link href="/test">Test</Link> */}

            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    title: {
        paddingBottom: 3,
        fontSize: 20,
        color: 'blue',

    },
    links: {
        marginBottom: 20,
        borderColor: 'black'
    }
});
export default NavBar;