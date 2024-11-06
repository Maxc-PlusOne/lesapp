import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, Pressable, View, Modal, Image, TextInput, SafeAreaView } from 'react-native';
import { RNPickerSelectStyles, globalColors, globalStyles } from '../app/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { apiService } from '../utils/apiService';
import Loading from './ActivityIndicator';
import Success from './Success';
import Oops from './Oops';
import storageService from '../utils/storageService';
import RNPickerSelect from 'react-native-picker-select';


export default function Capture({ route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState(null); // State to store the captured photo
    const cameraRef = useRef(null); // Ref to the camera instance
    const navigation = useNavigation();
    const { locationParam } = route.params;
    const [loading, setLoading] = useState(null);
    const [successful, setSuccessful] = useState(null);
    const [error, setError] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    // Camera permissions are not granted yet.
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>This app needs your permission to use the camera</Text>
                <Pressable style={globalStyles.btnPrimary} onPress={requestPermission}>
                    <Text style={globalStyles.btnText}>Grant Permission</Text>
                </Pressable>
            </View>
        );
    }

    // Function to toggle between front and back camera
    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    // Function to toggle the modal
    function toggleModal() {
        setModalVisible((current) => !current);
    }


    //Sending data using service API
    async function sendData() {
        setLoading(true)

        const userId = await storageService.get('userId')
        const newAlert = {
            photo: photoUri,
            location: {
                lat: locationParam.location.coords.latitude,
                lng: locationParam.location.coords.longitude
            },
            user: userId.replace(/['"]/g, '') ,
            severity: null
        }
        try {
            const res = await apiService.post('alerts', newAlert)
            if (res.status) {
                setErrorStatus(res.status)
                setError(true)
            } else {
                return setSuccessful(true)
            }
            //return console.log(res);
        } catch {
            return (setError(true))
        } finally {
            setLoading(false)
           
        }
    }
    //Function to send SOS (API Request)
    function submitSOS() {
      sendData()
    }
    //Function to close CameraView
    function closeCamera() {
        navigation.goBack();
    }


    // Function to capture a photo
    async function capturePhoto() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri); // Set the photo URI in state
            toggleModal(); // Show the modal to display the photo preview
        }
    }

    if (successful) {
        return (
            <Success title='Request Sent' message='Emergency Services will contact you as soon as possible.' buttonText='Done' onButtonPress={closeCamera} />
        )
    } else if (error) {
        return <Oops status={errorStatus} />
    } else {
        return (
            <SafeAreaView style={styles.container}>
                {/* Modal to display photo preview */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={toggleModal}
                >
                    <Pressable style={styles.modalView}>

                        {loading ? <Loading /> : (<>
                            <View style={styles.header}>
                                <Pressable onPress={toggleModal}>
                                {/*    <MaterialIcons name='arrow-back-ios-new' size={24} style={styles.headerIcon} />*/}
                                </Pressable>
                                <Text style={globalStyles.title}>Preview</Text>
                                <Pressable onPress={() => toggleModal, closeCamera}>
                                {/*    <MaterialIcons name="close" size={28} style={styles.headerIcon} />*/}
                                </Pressable>
                            </View>
                            <Image source={{ uri: photoUri }} style={globalStyles.imagePreview} />
                            <View>
                                <Text style={globalStyles.inputLabel}>Description (optional)</Text>
                                <RNPickerSelect
                                    style={RNPickerSelectStyles}
                                    onValueChange={(value)=>value }
                                    items={[
                                        {label:'Car Accident', value : 'Car'},
                                        {label:'Slip / Fall', value : 'S/L'},
                                        {label:'Heart Attack / Stroke', value : 'Heart & Stroke'},
                                        {label:'Burns / Chemical Exposure', value : 'Burns'},
                                        {label:'Other', value : 'Other'},
                                    ] }
                                />
                            </View>
                            <Pressable style={[globalStyles.btnSecondary]} onPress={toggleModal}>
                                <Text style={[globalStyles.btnText, { color: globalColors.secondary.xstrong }]}>Retake</Text>
                            </Pressable>
                            <View style={styles.btnContainer}>
                                <Pressable
                                    style={[globalStyles.btnSecondary, { width: '50%' }]}
                                    onPress={toggleModal, closeCamera}
                                >
                                    <Text style={[globalStyles.btnText, { color: globalColors.secondary.xstrong }]}>Cancel</Text>
                                </Pressable>
                                <Pressable style={[globalStyles.btnPrimary, {width:'50%'}]} onPress={submitSOS}>
                                    <Text style={globalStyles.btnText}>Send SOS</Text>
                                </Pressable>
                            </View>
                        </>
                        )}
                    </Pressable>
                </Modal>
                {/*Camera View to capture photo*/}
                <CameraView
                    style={styles.camera}
                    ref={cameraRef}
                    facing={facing}
                    flash='auto'
                >
                    <View style={styles.buttonContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={toggleCameraFacing}><MaterialIcons name='cameraswitch' size={36} color='white' /></Pressable>

                            {/* Capture button */}
                            <Pressable style={styles.btnCapture} onPress={capturePhoto}>
                                <View style={styles.btnInner}>
                                    <MaterialIcons name='circle' size={40} color='white' />
                                </View>
                            </Pressable>
                            <Pressable onPress={closeCamera}><MaterialIcons name='close' size={36} color='white' /></Pressable>
                        </View>
                    </View>
                </CameraView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: '4%',
        paddingTop:'8%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'center',
        width:'80%'
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: '2%',
        padding: '8%',
    },
    btnCapture: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 60,
        backgroundColor: 'white',
        borderRadius: '100%',
        marginHorizontal: '16%',
    },
    btnInner: {
        width: '90%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    header: {
        marginTop:24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',  // This spaces items in the row
    width: '80%',  // Ensure the width spans the full container if needed

    },
    btnContainer: {
        position:'absolute',
        bottom: '4%',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '85%',
        gap:'5%'

    },
    headerIcon: {
        color: 'black'
    }
    

});
