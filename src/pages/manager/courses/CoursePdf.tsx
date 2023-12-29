import {Page, Text, Document, StyleSheet, PDFViewer, View, Image} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 20
    },
    date: {
        fontSize: 18,
        textAlign: 'right',
        marginBottom: 20
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 250,
        padding: 40
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    table: {
        display: "flex",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableColParticipant: {
        width: "60%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColSignature: {
        width: "40%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14,
    },
    tableCellParticipant: {
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14,
    }
});

type Props = {
    participants: { id: string, name: string }[];
    name: string;
    startDate: string;
    endDate: string;
    module: string;
    location: string;
}

const CoursePdf = (props: Props) => (
    <PDFViewer height="100%" width="100%">
        <Document title="BKF Kurs">
            <Page size="A4" orientation="landscape" style={styles.body}>
                <View>
                    <Image style={styles.image}
                           src="https://cdn.iaccam.com/bfkmanager.png"/>
                    <Text style={styles.title} fixed>
                        Teilnehmerliste
                    </Text>
                    <Text style={styles.date} fixed>
                        Start Datum: {props.startDate}
                    </Text>
                    <Text style={styles.date} fixed>
                        End Datum: {props.endDate}
                    </Text>
                    <Text style={styles.title} fixed>
                        {props.name}
                    </Text>
                    <Text style={styles.subtitle} fixed>
                        {props.module}
                    </Text>
                    <Text style={styles.subtitle} fixed>
                        {props.location}
                    </Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColParticipant}>
                            <Text style={styles.tableCell}>Teilnehmer</Text>
                        </View>
                        <View style={styles.tableColSignature}>
                            <Text style={styles.tableCell}>Unterschrift</Text>
                        </View>
                    </View>
                    {
                        props.participants.map((participant) => <View style={styles.tableRow}>
                            <View style={styles.tableColParticipant}>
                                <Text style={styles.tableCellParticipant}>{participant.name} - keine Zuordnung</Text>
                            </View>
                            <View style={styles.tableColSignature}>
                                <Text style={styles.tableCell}> </Text>
                            </View>
                        </View>)
                    }
                    <View style={styles.tableRow}>
                        <View style={styles.tableColParticipant}>
                            <Text style={styles.tableCellParticipant}>{" "}</Text>
                        </View>
                        <View style={styles.tableColSignature}>
                            <Text style={styles.tableCell}>{" "}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColParticipant}>
                            <Text style={styles.tableCellParticipant}>{" "}</Text>
                        </View>
                        <View style={styles.tableColSignature}>
                            <Text style={styles.tableCell}>{" "}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColParticipant}>
                            <Text style={styles.tableCellParticipant}>{" "}</Text>
                        </View>
                        <View style={styles.tableColSignature}>
                            <Text style={styles.tableCell}>{" "}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    </PDFViewer>
);


export default CoursePdf;
