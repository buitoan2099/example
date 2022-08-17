import {Observer} from 'mobx-react-lite';
import React, {memo, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';
import PapaParse from 'papaparse';
import Text from '@components/text/Text';
import {BaseScreen} from '@components/BaseScreen';
import ButtonTitle from '@components/button/ButtonTitle';
import {vs} from 'src/commons/types';
import {navigateToSecond} from '@navigations';

export const FirstScreen = () => {
  //   const viewModel = FirstViewModel.current;
  // const stylesSheet = useStyleSheet(createStyles);
  // const color = useColor() as ColorType;
  // const dimension = useDimension() as DimensionType;
  const [loading, setLoading] = useState(true);
  const [uri, setUri] = useState('');
  const [csvText, setCsvText] = useState('');
  const [pickCsv, setPickCsv] = useState(0); //0: chưa pick, 1: csv,2: pdf
  const [textPick, setTextPick] = useState('Chưa chọn'); //0: chưa pick, 1: csv,2: pdf

  const HandleCheck = () => {
    // viewModel.onPressPayBill();
    navigateToSecond();
  };

  const HandleChoose = async () => {
    try {
      const typeCSVFile = 'text/comma-separated-values';
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.csv, typeCSVFile],
        copyTo: 'documentDirectory',
      });
      let uriLink = file[0].fileCopyUri ?? '';
      console.log('type', file[0].type);
      if (
        file[0].type === DocumentPicker.types.csv ||
        file[0].type === typeCSVFile
      ) {
        setPickCsv(1);
        fetch(uriLink)
          .then(response => response.text())
          .then(responseText => {
            // console.log('result', JSON.stringify(result, null, 2));
            let options = {};
            let val = PapaParse.parse(responseText, options);
            console.log('result', JSON.stringify(val, null, 2));
            console.log('responseText', responseText);
            setCsvText(responseText);
            setTextPick('CSV');
          });
      } else {
        setTextPick('FDF');
        setPickCsv(2);
        setUri(uriLink);
        setLoading(true);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        throw error;
      }
    }
  };

  const headerView = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{textPick}</Text>
        {pickCsv === 0 ? (
          <></>
        ) : pickCsv === 1 ? (
          <Text style={styles.titleStyle}>{csvText}</Text>
        ) : (
          <View style={{flex: 1}}>
            <Pdf
              trustAllCerts={false}
              source={{
                uri: uri,
                cache: true,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
                setLoading(false);
              }}
              onPageChanged={(page, numberOfPages) => {
                // console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
            {loading ? (
              <ActivityIndicator size={50} style={styles.loading} />
            ) : (
              <></>
            )}
          </View>
        )}
      </>
    );
  };

  return (
    <BaseScreen title={'first'} isBackHide>
      <View style={styles.container}>
        <Observer>{() => headerView()}</Observer>
      </View>
      <View style={styles.bottomButtonView}>
        <ButtonTitle
          title={'button.choose'}
          styleButton={{elevation: 1, marginTop: vs(8)}}
          onPress={HandleChoose}
        />
        <ButtonTitle
          title={'button.check'}
          styleButton={{elevation: 1, marginTop: vs(8)}}
          onPress={HandleCheck}
        />
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginVertical: 20,
  },
  bottomButtonView: {
    width: '100%',
    paddingBottom: vs(16),
    alignSelf: 'center',
    paddingHorizontal: vs(16),
  },
  pdf: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export const FirstScreenM = memo(FirstScreen);
FirstScreenM.displayName = 'FirstScreen';
function csv() {
  throw new Error('Function not implemented.');
}
