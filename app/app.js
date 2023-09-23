import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import * as Clipboard from 'expo-clipboard'

const SIZES = {
  large : 32,
  medium : 24,
  small : 32,
}

const COLORS = {
  primary : '#fff',
  primary_small : '#bbb',
  secondary : '#f1f',
  background : '#000',
  background2 : '#222',
}


const TileOptions = [
  'txt',
  'xls',
  'xlsx',
  'doc',
  'docx',
  'djvu',
  'epub',
  'jpg',
  'png',
  'bmp',
  'gif',
  'pdf',
  'csv',
  'log',
  'bak',
  'ppt',
  'pptx',
  'php',
  'asp',
  'aspx',
  'jsp',
  'sql'
];

export default function App() {
  const [domain, onChangeDomain] = useState("");
  const [keyword, onChangeKeyword] = useState("");
  const [selectedTiles, setSelectedTiles] = useState([]);
  const router = useRouter()
  const [genText, setGenText] = useState("")



  
  const toggleTileSelection = (option) => {
    if (selectedTiles.includes(option)) {
      setSelectedTiles(selectedTiles.filter((item) => item !== option));
    } else {
      setSelectedTiles([...selectedTiles, option]);
    }
  };

  



  return (
    <SafeAreaView style={{ backgroundColor: COLORS.background, height:'100%' }}>
      <View style={{left:20, right:20}}>
        <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.background, color:COLORS.primary },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (<></>),
        }}
        />
        <Text style={{ color: COLORS.primary, fontSize:SIZES.large }}>Enter Domain</Text>
        <TextInput
          style={{ color: COLORS.primary_small, backgroundColor: COLORS.background2 }}
          onChangeText={onChangeDomain}
          value={domain}
          placeholder="google.com"
        />

        <Text style={{ color: COLORS.primary, fontSize:SIZES.large }}><br/><br/>Choose Extensions </Text>
        <Text style={{ color: COLORS.primary_small }}>of files you want to search</Text>
        <View style={styles.container}>
          <View style={styles.tilesContainer}>
            {TileOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tile,
                  {
                    backgroundColor: selectedTiles.includes(option)
                      ? COLORS.secondary
                      : COLORS.primary_small,
                  },
                ]}
                onPress={() => toggleTileSelection(option)}
              >
                <Text style={styles.tileText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={{ color: COLORS.primary, fontSize:SIZES.large }}><br/><br/>Enter keyword</Text>
        <Text style={{ color: COLORS.primary_small }}>if you want</Text>
        <TextInput
          style={{ color: COLORS.primary_small, backgroundColor: COLORS.background2 }}
          onChangeText={onChangeKeyword}
          value={keyword}
          placeholder="password"
        />


        <TouchableOpacity
          style={{
              top:30,
              backgroundColor: COLORS.secondary,
              width: 150,
              height: 50,
              borderRadius:10,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          onPress={() => {
            const exts = selectedTiles.join(" | ext:")
            setGenText(`site:${domain} ${exts?"& (ext:":""}${exts}${exts?")":""} ${keyword?"&":""} ${keyword}`)
          }}
        >
          <Text style={styles.tileText} >Generate Google Dorks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Clipboard.setStringAsync(genText)}>
        <Text style={{ color: COLORS.secondary, top:50 }}>{genText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
    width: 50,
    height: 25,
    borderRadius:10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  selectedText: {
    marginTop: 20,
    fontSize: SIZES.medium,
  },
});
