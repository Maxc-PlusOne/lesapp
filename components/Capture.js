import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, Pressable, View, Modal, Image, TextInput } from 'react-native';
import { globalStyles } from '../app/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { apiService } from '../utils/apiService';
import Loading from './ActivityIndicator';
import Success from './Success';
import Oops from './Oops';


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

    if (!permission.granted) {
        // Camera permissions are not granted yet.
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
        const newAlert = {
            photo: photoUri, location: locationParam.location.coords, accidentType:'Car Crash', sender:'Bobby Malls'}
        try {
            const res = await apiService.post(newAlert)
            if (res.ok) {
                return setSuccessful(true)
            } else {
                setErrorStatus(res.status)
                setError(true)
                
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
            <View style={styles.container}>
                {/* Modal to display photo preview */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.modalView}>

                        {loading ? <Loading /> : (<>
                            <View style={{ flex: 0.4, justifyContent: 'start', alignItems: 'center', flexDirection: 'row', }}>
                                <Text>Preview</Text>
                                <Pressable onPress={toggleModal}>
                                    <MaterialIcons name="close" size={36}
                                        style={{ color: 'red', marginTop: 0, left: 0 }} />
                                </Pressable>
                            </View>
                            <Image source={{ uri: photoUri }} style={globalStyles.imagePreview} />
                            <Text style={globalStyles.inputLabel}>Description (optional)</Text>
                            <TextInput style={globalStyles.input} />
                            <Pressable style={globalStyles.btnPrimary} onPress={submitSOS}>
                                <Text style={globalStyles.btnText}>Send SOS</Text>
                            </Pressable>
                        </>
                        )}
                    </View>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent:'start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingButtom: '4%',
        paddingTop:'4%'
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
    

});
