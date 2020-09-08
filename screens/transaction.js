import React from 'react';

import {StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
export default class Transaction_screen extends React.Component{
    constructor(){
        super()
        this.state={HasCameraPermission:null,scaned:false,ScanedData:'',buttonstate:'normal'}
    }

        
    getcamperm=async()=>{
const {status}=await Permissions.askAsync(Permissions.CAMERA)
this.setState({
HasCameraPermission:status==="granted",buttonstate:'clicked',scanned:false

})
    }
    handlebarcodescanner=async({type,data})=>{
        this.setState({
            scanned:true,ScanedData:data,buttonstate:'normal'
        })
    }
    render(){
        const scanned=this.state.scaned
        const buttonstate=this.state.buttonstate
        const HasCameraPermission=this.state.HasCameraPermission
        if(buttonstate==="clicked"&&HasCameraPermission){
return(
<BarCodeScanner onBarCodeScanned={scanned?undefined:this.handlebarcodescanner}style={StyleSheet.absoluteFillObject}/>
)

        }
        else if(buttonstate==="normal"){

        
        return(
<View style={styles.container}>
    <Text style={styles.displayText}> {HasCameraPermission===true?this.state.ScanedData:"requestCameraPermision"}  </Text>
    <TouchableOpacity style={styles.buttonText}OnPress={this.getcamperm}>

<Text style={styles.displayText}>

scan QRcode!

</Text>

    </TouchableOpacity>
    </View>
        )


        }
        

    }
    
}


const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
 displayText:{ fontSize: 15, textDecorationLine: 'underline' }, scanButton:{ backgroundColor: '#2196F3',
  padding: 10, margin: 10 },
   buttonText:{ fontSize: 20, } });




