import {BaseScreen} from '@components/BaseScreen';
import ButtonTitle from '@components/button/ButtonTitle';
import Text from '@components/text/Text';
import {navigateToSecond} from '@navigations';
import {vs} from '@utils';
import {Observer} from 'mobx-react-lite';
import React, {memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {ShowPdfViewModel} from './showPdfVM';

export const FirstScreen = () => {
  const viewModel = ShowPdfViewModel.current;
  // const stylesSheet = useStyleSheet(createStyles);
  // const color = useColor() as ColorType;
  // const dimension = useDimension() as DimensionType;

  const requestStoragePermission = async () => {
    try {
      const status = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (status) {
        console.log('You can use the storage');
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === 'android') {
          await requestStoragePermission();
        } else {
          // iOS here, so you can go to your Save flow directly
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const HandleCheck = () => {
    // viewModel.onPressPayBill();
    // navigateToSecond();
    console.log(viewModel.isLoading);
  };

  const HandleLink = (url: string) => viewModel.HandleLink(url);

  const HandleChoose = () => viewModel.HandleChoose();

  const headerView = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{viewModel.textPick}</Text>
        <Text
          style={styles.titleStyle}
          onPress={() => HandleLink(viewModel.pdfUrl)}>
          {'https:' + viewModel.pdfUrl}
        </Text>
        <Text
          style={styles.titleStyle}
          onPress={() => HandleLink(viewModel.csvUrl)}>
          {'https:' + viewModel.csvUrl}
        </Text>
        <View style={{flex: 1}}>
          {viewModel.pickCsv === 0 ? (
            <></>
          ) : viewModel.pickCsv === 1 ? (
            <Text style={styles.titleStyle}>{viewModel.csvText}</Text>
          ) : (
            <Pdf
              trustAllCerts={false}
              source={{
                uri: viewModel.uri,
                cache: true,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
                viewModel.update('isLoading', false);
              }}
              onPageChanged={(page, numberOfPages) => {
                // console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log('error', error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
          )}
          {viewModel.isLoading ? (
            <ActivityIndicator size={50} style={styles.loading} />
          ) : (
            <></>
          )}
        </View>
      </>
    );
  };

  return (
    <BaseScreen title={'first'} isBackHide>
      <View style={styles.container}>
        <Observer>{() => headerView()}</Observer>
      </View>
      <Observer>
        {() => (
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
        )}
      </Observer>
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
    marginVertical: vs(8),
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
